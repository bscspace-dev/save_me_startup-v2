-- 엑셀로 상가매물 등록 + "확인필요" 확인 후 게시: SQL Editor에서 한 번 실행
-- 전제: shops.sql, hide-listings.sql, admin-roles.sql(또는 update-all.sql) 이 이미 실행되어 있어야 합니다.
-- · admin_shop_import : 엑셀에서 읽은 매물들을 "숨김 + 확인필요(data.needsReview = true)" 상태로 한꺼번에 등록 (상가매물 등록 권한 reg_shop 필요, 한 번에 최대 100건)
-- · admin_shop_confirm : 확인필요 매물을 확인한 뒤 게시 (숨김 해제 + 확인필요 표시 제거)

create or replace function admin_shop_import(u text, p text, items jsonb) returns int
language plpgsql security definer set search_path = public, extensions as $$
declare
  it jsonb;
  n int := 0;
begin
  if not admin_check(u, p) or not admin_can(u, 'reg_shop') then return null; end if;
  if jsonb_typeof(items) <> 'array' or jsonb_array_length(items) = 0 or jsonb_array_length(items) > 100 then return null; end if;
  for it in select * from jsonb_array_elements(items) loop
    insert into shop_listings (data, thumb, photo_count, sold, hidden)
    values (it || '{"needsReview": true}'::jsonb, null, 0, false, true);
    n := n + 1;
  end loop;
  return n;
end $$;

create or replace function admin_shop_confirm(u text, p text, listing_id bigint) returns boolean
language plpgsql security definer set search_path = public, extensions as $$
begin
  if not admin_check(u, p) or not admin_can(u, 'reg_shop') then return false; end if;
  update shop_listings
  set hidden = false, data = data - 'needsReview'
  where id = listing_id and data->>'needsReview' = 'true';
  return found;
end $$;

grant execute on function admin_shop_import(text, text, jsonb), admin_shop_confirm(text, text, bigint) to anon;
