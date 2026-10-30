-- 관리자(/admin)에서 등록하는 상가매물: admin.sql 실행 후 SQL Editor에서 한 번 실행
-- 매물번호는 20001부터 자동 증가 (기존 정적 매물 10xxx번과 겹치지 않음)

create sequence if not exists shop_listing_id_seq start 20001;

create table if not exists shop_listings (
  id bigint primary key default nextval('shop_listing_id_seq'),
  data jsonb not null,            -- 목록 필드(title, region, area, price …) + shop(상세 정보)
  thumb text,                     -- 목록 카드용 작은 이미지(data URL)
  photo_count int not null default 0,
  sold boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists shop_photos (
  listing_id bigint not null references shop_listings(id) on delete cascade,
  n int not null,
  data text not null,             -- 줄인 이미지(data URL)
  primary key (listing_id, n)
);

-- 방문자는 읽기만 가능. 쓰기는 아래 관리자 함수(아이디/비밀번호 확인)로만 가능
alter table shop_listings enable row level security;
alter table shop_photos enable row level security;
drop policy if exists "public read" on shop_listings;
drop policy if exists "public read" on shop_photos;
create policy "public read" on shop_listings for select to anon using (true);
create policy "public read" on shop_photos for select to anon using (true);

-- 저장(새 매물이면 listing_id 를 null 로). 인증 실패 시 null, 성공 시 매물번호
create or replace function admin_shop_save(
  u text, p text, listing_id bigint, d jsonb, t text, photos jsonb, is_sold boolean
) returns bigint
language plpgsql security definer set search_path = public, extensions as $$
declare
  rid bigint;
  cnt int;
begin
  if not admin_check(u, p) then return null; end if;
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
  update shop_listings set sold = v where id = listing_id;
  return true;
end $$;

create or replace function admin_shop_delete(u text, p text, listing_id bigint) returns boolean
language plpgsql security definer set search_path = public, extensions as $$
begin
  if not admin_check(u, p) then return false; end if;
  delete from shop_listings where id = listing_id;
  return true;
end $$;

grant execute on function
  admin_shop_save(text, text, bigint, jsonb, text, jsonb, boolean),
  admin_shop_set_sold(text, text, bigint, boolean),
  admin_shop_delete(text, text, bigint)
to anon;
