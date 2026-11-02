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
