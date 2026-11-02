-- 한 번에 실행용: 매물 숨기기 + 아이디별 동시접속 제한 + 계정별 메뉴 권한 + 메인 배너 + 최고 관리자 설정
-- 전제: schema.sql, admin.sql, shops.sql 은 이미 실행되어 있어야 합니다.
-- 실행하면 지금 로그인 중인 관리자는 모두 한 번 로그아웃됩니다.

-- 관리자에서 매물 숨기기: shops.sql 실행 후 SQL Editor에서 한 번 실행
-- 숨긴 매물은 방문자 화면(목록·상세·메인)에서 보이지 않고, 관리자 화면에서는 "숨김"으로 표시됩니다.

alter table shop_listings add column if not exists hidden boolean not null default false;

create or replace function admin_shop_set_hidden(u text, p text, listing_id bigint, v boolean) returns boolean
language plpgsql security definer set search_path = public, extensions as $$
begin
  if not admin_check(u, p) then return false; end if;
  update shop_listings set hidden = v where id = listing_id;
  return true;
end $$;

grant execute on function admin_shop_set_hidden(text, text, bigint, boolean) to anon;

-- 관리자 계정당 동시 접속 1명만 허용: admin.sql, shops.sql 실행 후 SQL Editor에서 한 번 실행
-- 로그인하면 새 세션 토큰이 발급되고 이전에 로그인해 있던 사람은 자동으로 로그아웃됩니다.
-- 이 파일을 실행하면 현재 로그인 중인 모든 관리자는 한 번 로그아웃됩니다. (다시 로그인하면 됩니다)

alter table admins add column if not exists session_token text;
alter table admins add column if not exists session_at timestamptz;

-- 기존 "비밀번호 확인" 함수는 이름만 바꿔 로그인과 비밀번호 변경에서 쓴다 (5회 실패 잠금 유지)
do $$ begin
  if exists (select 1 from pg_proc where proname = 'admin_check' and pronamespace = 'public'::regnamespace)
     and not exists (select 1 from pg_proc where proname = 'admin_check_pw' and pronamespace = 'public'::regnamespace) then
    alter function admin_check(text, text) rename to admin_check_pw;
  end if;
end $$;
revoke execute on function admin_check_pw(text, text) from public, anon, authenticated;

-- 다른 모든 관리자 함수(상담·매물 등록 등)가 부르는 확인 함수: 이제 p는 비밀번호가 아니라 로그인 때 받은 세션 토큰
create or replace function admin_check(u text, p text) returns boolean
language sql stable security definer set search_path = public, extensions as $$
  select exists (
    select 1 from admins
    where username = u and session_token is not null and session_token = p
      and session_at > now() - interval '12 hours'
  );
$$;
revoke execute on function admin_check(text, text) from public, anon, authenticated;

-- 로그인: 성공하면 세션 토큰(text), 실패하면 null. 새 토큰이 발급되면 이전 세션은 무효가 된다
drop function if exists admin_login(text, text);
create function admin_login(u text, p text) returns text
language plpgsql security definer set search_path = public, extensions as $$
declare t text;
begin
  if not admin_check_pw(u, p) then return null; end if;
  t := encode(gen_random_bytes(24), 'hex');
  update admins set session_token = t, session_at = now() where username = u;
  return t;
end $$;

create or replace function admin_logout(u text, p text) returns boolean
language plpgsql security definer set search_path = public, extensions as $$
begin
  update admins set session_token = null, session_at = null where username = u and session_token = p;
  return true;
end $$;

-- 비밀번호 변경: p는 현재 비밀번호 (세션 토큰이 아님)
create or replace function admin_change_password(u text, p text, new_p text) returns text
language plpgsql security definer set search_path = public, extensions as $$
begin
  if not admin_check_pw(u, p) then return 'auth'; end if;
  if length(new_p) < 8 then return 'short'; end if;
  update admins set password_hash = crypt(new_p, gen_salt('bf')) where username = u;
  return 'ok';
end $$;

grant execute on function admin_login(text, text), admin_logout(text, text),
  admin_change_password(text, text, text) to anon;

-- 관리자 계정별 메뉴 권한: admin.sql, shops.sql(, hide-listings.sql, admin-single-session.sql) 실행 후 SQL Editor에서 한 번 실행
-- · 최고 관리자(is_super)는 모든 메뉴를 쓰고 "계정 관리"에서 아이디/비밀번호를 만들고 메뉴 권한을 체크로 줍니다.
-- · 그 외 계정은 체크된 메뉴만 보이고, 서버(DB 함수)에서도 같은 권한을 다시 확인합니다.
-- 권한 키: consult(상담 관리), reg_franchise, reg_shop, reg_transfer, reg_startup, main(메인 페이지 관리)

alter table admins add column if not exists is_super boolean not null default false;
alter table admins add column if not exists perms text[] not null default '{}';
alter table admins add column if not exists display_name text; -- 관리자 화면에 "이름 님"으로 표시

-- 탈퇴한 아이디 기록: 한 번 탈퇴한 아이디는 같은 이름으로 다시 만들 수 없다
create table if not exists admin_withdrawn (
  username text primary key,
  display_name text,
  withdrawn_at timestamptz not null default now()
);
alter table admin_withdrawn enable row level security;
revoke all on admin_withdrawn from anon, authenticated;

-- 처음 한 번: 지금 있는 계정은 모두 최고 관리자로 둔다 (이후 "계정 관리"에서 바꿀 수 있음)
update admins set is_super = true where not exists (select 1 from admins a where a.is_super);

create or replace function admin_can(u text, perm text) returns boolean
language sql stable security definer set search_path = public, extensions as $$
  select exists (select 1 from admins where username = u and (is_super or perm = any(perms)));
$$;
revoke execute on function admin_can(text, text) from public, anon, authenticated;

-- 매물 유형 → 필요한 권한 (kind가 없으면 상가매물)
create or replace function admin_kind_perm(k text) returns text
language sql immutable set search_path = public as $$
  select case k when '프랜차이즈' then 'reg_franchise' when '전수창업' then 'reg_transfer' when '신규창업' then 'reg_startup' else 'reg_shop' end;
$$;
revoke execute on function admin_kind_perm(text) from public, anon, authenticated;

-- 내 권한 조회. 인증 실패 시 null
create or replace function admin_me(u text, p text) returns jsonb
language plpgsql security definer set search_path = public, extensions as $$
declare a admins%rowtype;
begin
  if not admin_check(u, p) then return null; end if;
  select * into a from admins where username = u;
  return jsonb_build_object('super', a.is_super, 'perms', to_jsonb(a.perms), 'name', a.display_name);
end $$;

-- 상담 관리 (consult 권한)
create or replace function admin_list(u text, p text) returns jsonb
language plpgsql security definer set search_path = public, extensions as $$
begin
  if not admin_check(u, p) then return null; end if;
  if not admin_can(u, 'consult') then return '[]'::jsonb; end if;
  return coalesce((select jsonb_agg(to_jsonb(c) order by c.created_at desc) from consultations c), '[]'::jsonb);
end $$;

create or replace function admin_set_done(u text, p text, row_id uuid, v boolean) returns boolean
language plpgsql security definer set search_path = public, extensions as $$
begin
  if not admin_check(u, p) or not admin_can(u, 'consult') then return false; end if;
  update consultations set done = v where id = row_id;
  return true;
end $$;

create or replace function admin_delete(u text, p text, row_id uuid) returns boolean
language plpgsql security definer set search_path = public, extensions as $$
begin
  if not admin_check(u, p) or not admin_can(u, 'consult') then return false; end if;
  delete from consultations where id = row_id;
  return true;
end $$;

-- 매물 등록·수정·삭제 (유형별 reg_* 권한)
create or replace function admin_shop_save(
  u text, p text, listing_id bigint, d jsonb, t text, photos jsonb, is_sold boolean
) returns bigint
language plpgsql security definer set search_path = public, extensions as $$
declare
  rid bigint;
  cnt int;
  old_kind text;
begin
  if not admin_check(u, p) then return null; end if;
  if not admin_can(u, admin_kind_perm(d->>'kind')) then return null; end if;
  if listing_id is not null then
    select data->>'kind' into old_kind from shop_listings where id = listing_id;
    if not admin_can(u, admin_kind_perm(old_kind)) then return null; end if;
  end if;
  cnt := coalesce(jsonb_array_length(photos), 0);

  if listing_id is null then
    insert into shop_listings (data, thumb, photo_count, sold) values (d, t, cnt, is_sold) returning id into rid;
  else
    update shop_listings set data = d, thumb = t, photo_count = cnt, sold = is_sold where id = listing_id returning id into rid;
    if rid is null then return null; end if;
    delete from shop_photos where shop_photos.listing_id = rid;
  end if;

  insert into shop_photos (listing_id, n, data)
  select rid, ord::int, val
  from jsonb_array_elements_text(photos) with ordinality as x(val, ord);

  return rid;
end $$;

create or replace function admin_shop_set_sold(u text, p text, listing_id bigint, v boolean) returns boolean
language plpgsql security definer set search_path = public, extensions as $$
begin
  if not admin_check(u, p) then return false; end if;
  if not admin_can(u, admin_kind_perm((select data->>'kind' from shop_listings where id = listing_id))) then return false; end if;
  update shop_listings set sold = v where id = listing_id;
  return true;
end $$;

create or replace function admin_shop_set_hidden(u text, p text, listing_id bigint, v boolean) returns boolean
language plpgsql security definer set search_path = public, extensions as $$
begin
  if not admin_check(u, p) then return false; end if;
  if not admin_can(u, admin_kind_perm((select data->>'kind' from shop_listings where id = listing_id))) then return false; end if;
  update shop_listings set hidden = v where id = listing_id;
  return true;
end $$;

create or replace function admin_shop_delete(u text, p text, listing_id bigint) returns boolean
language plpgsql security definer set search_path = public, extensions as $$
begin
  if not admin_check(u, p) then return false; end if;
  -- 게시물 삭제는 최고 관리자만 (일반 계정은 등록 권한이 있어도 삭제 불가, 숨기기는 가능)
  if not exists (select 1 from admins where username = u and is_super) then return false; end if;
  delete from shop_listings where id = listing_id;
  return true;
end $$;

-- 메인 페이지 배너 이미지 (main 권한). 이미지는 브라우저에서 줄인 data URL 로 저장한다
create table if not exists main_banners (
  n int primary key,
  data text not null
);
alter table main_banners enable row level security;
drop policy if exists "public read" on main_banners;
create policy "public read" on main_banners for select to anon using (true);

-- 배너 전체를 순서대로 교체 저장 (최대 5장, 빈 배열이면 기본 배경으로 돌아감)
create or replace function admin_banner_save(u text, p text, imgs jsonb) returns boolean
language plpgsql security definer set search_path = public, extensions as $$
begin
  if not admin_check(u, p) or not admin_can(u, 'main') then return false; end if;
  if jsonb_typeof(imgs) <> 'array' or jsonb_array_length(imgs) > 5 then return false; end if;
  delete from main_banners where true;
  insert into main_banners (n, data)
  select ord::int, val from jsonb_array_elements_text(imgs) with ordinality as x(val, ord);
  return true;
end $$;

-- 계정 관리 (최고 관리자만)
create or replace function admin_account_list(u text, p text) returns jsonb
language plpgsql security definer set search_path = public, extensions as $$
begin
  if not admin_check(u, p) or not exists (select 1 from admins where username = u and is_super) then return null; end if;
  return coalesce((select jsonb_agg(jsonb_build_object('username', username, 'name', display_name, 'super', is_super, 'perms', to_jsonb(perms)) order by is_super desc, username) from admins), '[]'::jsonb);
end $$;

-- 계정 만들기/수정. 결과: ok | auth(권한 없음) | badid(아이디 형식) | noname(이름 없음/20자 초과) | withdrawn(탈퇴한 아이디) | short(비밀번호 8자 미만) | self(내 계정은 변경 불가) | last(최고 관리자가 한 명도 안 남음)
-- new_pw 를 비우면 기존 비밀번호 유지(수정), 새 계정은 비밀번호와 이름 필수
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
                     where x in ('consult', 'reg_franchise', 'reg_shop', 'reg_transfer', 'reg_startup', 'main')), '{}');
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

create or replace function admin_account_delete(u text, p text, target text) returns text
language plpgsql security definer set search_path = public, extensions as $$
begin
  if not admin_check(u, p) or not exists (select 1 from admins where username = u and is_super) then return 'auth'; end if;
  if target = u then return 'self'; end if;
  insert into admin_withdrawn (username, display_name) select username, display_name from admins where username = target on conflict (username) do nothing;
  delete from admin_attempts where username = target;
  delete from admins where username = target;
  return 'ok';
end $$;

grant execute on function
  admin_me(text, text), admin_account_list(text, text),
  admin_account_save(text, text, text, text, boolean, text[], text), admin_account_delete(text, text, text), admin_banner_save(text, text, jsonb)
to anon;

-- ============================================================
-- 마무리 (이 파일을 처음 실행할 때 한 번만): 최고 관리자는 minofe0426 한 명만
-- ============================================================
update admins set is_super = (username = 'minofe0426');

-- kkbbss1841 은 모든 메뉴를 쓰되 게시물 삭제와 계정 관리는 못 하게 (이미 권한이 있으면 그대로 둠)
update admins
set perms = array['consult', 'reg_franchise', 'reg_shop', 'reg_transfer', 'reg_startup', 'main']
where username = 'kkbbss1841' and not is_super and cardinality(perms) = 0;

-- 이름 표시: 관리자 화면 위쪽에 "이름 최고 관리자님"으로 나옵니다. 이름이 비어 있으면 아이디가 나옵니다.
-- 본인 계정은 화면에서 못 바꾸므로 필요하면 아래 이름을 고쳐서 실행하세요.
-- update admins set display_name = '홍길동' where username = 'minofe0426';

-- 확인: minofe0426 만 is_super = true 여야 합니다
select username, display_name, is_super, perms from admins order by is_super desc, username;
