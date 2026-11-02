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
