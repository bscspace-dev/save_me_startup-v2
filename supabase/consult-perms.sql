-- 상담 권한을 구분별로 나누기: SQL Editor에서 한 번 실행 (admin-roles.sql 또는 update-all.sql 이 이미 실행되어 있어야 합니다)
-- 구분: 프랜차이즈 · 상가매물 · 전수창업 · 신규창업 · 등록 문의 · 기타. 예전 consult 권한 계정은 전부 받습니다.
-- 로그인 중인 관리자는 로그아웃되지 않습니다.

-- 상담 관리 (구분별 consult_* 권한)
-- 상담 구분 → 필요한 권한. 관리자 화면(page.tsx 의 kindOf)과 같은 기준이다. 어디에도 안 맞으면 기타.
create or replace function consultation_perm(t text) returns text
language sql immutable set search_path = public as $$
  select 'consult_' || case
    when t like '매물상담[%' or t = '상가매물' then 'listing'
    when t like '가맹상담[%' or t = '프랜차이즈' then 'franchise'
    when t like '매물등록문의%' then 'register'
    when t = '신규창업' then 'newbiz'
    when t = '전수창업' then 'transfer'
    else 'other' end;
$$;
revoke execute on function consultation_perm(text) from public, anon, authenticated;

create or replace function admin_list(u text, p text) returns jsonb
language plpgsql security definer set search_path = public, extensions as $$
begin
  if not admin_check(u, p) then return null; end if;
  return coalesce((select jsonb_agg(to_jsonb(c) order by c.created_at desc) from consultations c where admin_can(u, consultation_perm(c.type))), '[]'::jsonb);
end $$;

create or replace function admin_set_done(u text, p text, row_id uuid, v boolean) returns boolean
language plpgsql security definer set search_path = public, extensions as $$
begin
  if not admin_check(u, p) then return false; end if;
  update consultations set done = v where id = row_id and admin_can(u, consultation_perm(type));
  return found;
end $$;

create or replace function admin_delete(u text, p text, row_id uuid) returns boolean
language plpgsql security definer set search_path = public, extensions as $$
begin
  if not admin_check(u, p) then return false; end if;
  delete from consultations where id = row_id and admin_can(u, consultation_perm(type));
  return found;
end $$;

drop function if exists admin_account_save(text, text, text, text, boolean, text[]);
create or replace function admin_account_save(u text, p text, target text, new_pw text, sup boolean, pms text[], nm text) returns text
language plpgsql security definer set search_path = public, extensions as $$
declare
  clean text[];
  already boolean;
  nm2 text := btrim(coalesce(nm, ''));
begin
  if not admin_check(u, p) or not exists (select 1 from admins where username = u and is_super) then return 'auth'; end if;
  if target !~ '^[A-Za-z0-9_.-]{3,30}$' then return 'badid'; end if;
  if length(nm2) > 20 then return 'noname'; end if;
  if target = u then return 'self'; end if; -- 내 계정은 여기서 바꿀 수 없다 (비밀번호는 상단 "비밀번호 변경")
  clean := coalesce((select array_agg(x) from unnest(coalesce(pms, '{}')) x
                     where x in ('consult_franchise', 'consult_listing', 'consult_transfer', 'consult_newbiz', 'consult_register', 'consult_other', 'reg_franchise', 'reg_shop', 'reg_transfer', 'reg_startup', 'main')), '{}');
  select exists (select 1 from admins where username = target) into already;

  if already then
    if coalesce(new_pw, '') <> '' then
      if length(new_pw) < 8 then return 'short'; end if;
      update admins set password_hash = crypt(new_pw, gen_salt('bf')) where username = target;
      delete from admin_attempts where username = target;
    end if;
    update admins set is_super = coalesce(sup, false), perms = clean, display_name = coalesce(nullif(nm2, ''), display_name) where username = target;
  else
    if length(coalesce(new_pw, '')) < 8 then return 'short'; end if;
    if exists (select 1 from admin_withdrawn where username = target) then return 'withdrawn'; end if;
    if nm2 = '' then return 'noname'; end if;
    insert into admins (username, password_hash, is_super, perms, display_name) values (target, crypt(new_pw, gen_salt('bf')), coalesce(sup, false), clean, nm2);
  end if;

  if not exists (select 1 from admins where is_super) then return 'last'; end if;
  return 'ok';
end $$;

-- 예전 "상담 관리(consult)" 권한이 있던 계정은 구분별 상담 권한을 모두 받는다 (여러 번 실행해도 안전)
update admins
set perms = (select array_agg(distinct x) from unnest(array_remove(perms, 'consult') || array['consult_franchise', 'consult_listing', 'consult_transfer', 'consult_newbiz', 'consult_register', 'consult_other']) x)
where 'consult' = any(perms);
