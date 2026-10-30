-- 관리자(/admin) 상담 관리용: schema.sql 실행 후 SQL Editor에서 한 번 실행
-- 이메일 없이 "아이디 + 비밀번호"로 로그인하며, 확인은 전부 DB 함수 안에서 이뤄집니다.

create extension if not exists pgcrypto with schema extensions;

alter table consultations add column if not exists done boolean not null default false;

-- 이전 방식(Supabase Auth)용 정책이 있었다면 제거
drop policy if exists "admin read" on consultations;
drop policy if exists "admin update" on consultations;
drop policy if exists "admin delete" on consultations;

-- 관리자 계정 (비밀번호는 bcrypt 해시로만 저장). RLS를 켜고 정책을 만들지 않아 외부에서는 읽을 수 없음
create table if not exists admins (
  username text primary key,
  password_hash text not null
);
create table if not exists admin_attempts (
  username text primary key,
  fails int not null default 0,
  locked_until timestamptz
);
alter table admins enable row level security;
alter table admin_attempts enable row level security;
revoke all on admins, admin_attempts from anon, authenticated;

-- 아이디/비밀번호 확인. 5회 연속 실패하면 10분간 잠김. (예외를 던지지 않아 실패 기록이 유지됨)
create or replace function admin_check(u text, p text) returns boolean
language plpgsql security definer set search_path = public, extensions as $$
declare
  a admins%rowtype;
  t admin_attempts%rowtype;
  nf int;
begin
  select * into a from admins where username = u;
  if not found then
    perform pg_sleep(1);
    return false;
  end if;

  select * into t from admin_attempts where username = u;
  if found and t.locked_until is not null and t.locked_until > now() then
    return false;
  end if;

  if a.password_hash = crypt(p, a.password_hash) then
    delete from admin_attempts where username = u;
    return true;
  end if;

  nf := case when t.username is null or (t.locked_until is not null and t.locked_until <= now()) then 1 else t.fails + 1 end;
  insert into admin_attempts (username, fails, locked_until)
  values (u, nf, case when nf >= 5 then now() + interval '10 minutes' end)
  on conflict (username) do update
    set fails = excluded.fails, locked_until = excluded.locked_until;
  perform pg_sleep(1);
  return false;
end $$;

create or replace function admin_login(u text, p text) returns boolean
language sql security definer set search_path = public, extensions as $$
  select admin_check(u, p);
$$;

-- 인증 실패 시 null, 성공 시 상담 목록(jsonb 배열)
create or replace function admin_list(u text, p text) returns jsonb
language plpgsql security definer set search_path = public, extensions as $$
begin
  if not admin_check(u, p) then return null; end if;
  return coalesce((select jsonb_agg(to_jsonb(c) order by c.created_at desc) from consultations c), '[]'::jsonb);
end $$;

create or replace function admin_set_done(u text, p text, row_id uuid, v boolean) returns boolean
language plpgsql security definer set search_path = public, extensions as $$
begin
  if not admin_check(u, p) then return false; end if;
  update consultations set done = v where id = row_id;
  return true;
end $$;

create or replace function admin_delete(u text, p text, row_id uuid) returns boolean
language plpgsql security definer set search_path = public, extensions as $$
begin
  if not admin_check(u, p) then return false; end if;
  delete from consultations where id = row_id;
  return true;
end $$;

-- 비밀번호 변경: 현재 비밀번호 확인 후 변경. 'ok' | 'auth'(현재 비밀번호 불일치/잠김) | 'short'(8자 미만)
create or replace function admin_change_password(u text, p text, new_p text) returns text
language plpgsql security definer set search_path = public, extensions as $
begin
  if not admin_check(u, p) then return 'auth'; end if;
  if length(new_p) < 8 then return 'short'; end if;
  update admins set password_hash = crypt(new_p, gen_salt('bf')) where username = u;
  return 'ok';
end $;

grant execute on function admin_login(text, text), admin_list(text, text),
  admin_set_done(text, text, uuid, boolean), admin_delete(text, text, uuid),
  admin_change_password(text, text, text) to anon;
revoke execute on function admin_check(text, text) from public, anon, authenticated;

-- ▼ 관리자 계정 만들기: 아래 한 줄의 아이디/비밀번호를 원하는 값으로 바꿔서 따로 실행하세요.
-- insert into admins (username, password_hash) values ('내아이디', crypt('내비밀번호', gen_salt('bf')));
-- 비밀번호 변경: update admins set password_hash = crypt('새비밀번호', gen_salt('bf')) where username = '내아이디';
