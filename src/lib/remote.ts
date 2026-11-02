import { supabase } from "./supabase";
import type { Listing, Promo, Startup, TransferData } from "./data";
import type { ShopInfo } from "./shop";

// 관리자에서 등록한 매물(상가매물·프랜차이즈 홍보, Supabase) → 기존 Listing 형태로 변환
type Row = { id: number; data: Omit<Listing, "id" | "photos" | "thumb" | "sold" | "kind" | "views" | "shop" | "promo" | "startup" | "transfer"> & { kind?: string; shop?: ShopInfo; promo?: Promo; startup?: Startup; transfer?: TransferData }; thumb: string | null; photo_count: number; sold: boolean; hidden?: boolean };

const toListing = (r: Row): Listing => ({
  ...r.data,
  id: r.id,
  kind: r.data.kind ?? "상가매물",
  views: 0,
  photos: r.photo_count,
  thumb: r.thumb ?? undefined,
  sold: r.sold,
  hidden: !!r.hidden,
});

// 인터넷이 불안정할 때 한 번 실패했다고 "자료 없음"으로 보이지 않도록 몇 번 더 시도한다
const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));
async function retry<T extends { error: unknown }>(run: () => PromiseLike<T>): Promise<T> {
  let last!: T;
  for (let i = 0; i < 4; i++) {
    try { last = await run(); if (!last.error) return last; } catch (e) { last = { error: e } as T; }
    if (i < 3) await wait(500 * (i + 1));
  }
  return last;
}

// hide-listings.sql 을 아직 실행하지 않아 hidden 컬럼이 없으면 그 컬럼 없이 다시 조회한다
let cols = "id,data,thumb,photo_count,sold,hidden";
const noHiddenCol = (e: unknown) => cols.includes("hidden") && (e as { code?: string } | null)?.code === "42703";

let lastList: Listing[] | null = null; // 마지막으로 성공한 목록 (연결이 끊겨도 이걸 보여준다)

// 숨김 처리한 매물은 방문자 화면에서 빼고, 관리자 화면에서만 all=true 로 불러온다
export async function fetchRemoteListings(all = false): Promise<Listing[]> {
  if (!supabase) return [];
  const run = () => retry(() => supabase!.from("shop_listings").select(cols).order("id", { ascending: false }));
  let { data, error } = await run();
  if (noHiddenCol(error)) { cols = "id,data,thumb,photo_count,sold"; ({ data, error } = await run()); }
  if (error || !data) return (lastList ?? []).filter((l) => all || !l.hidden);
  lastList = (data as unknown as Row[]).map(toListing);
  return lastList.filter((l) => all || !l.hidden);
}

// 연결 실패는 null(없음)과 구분하려고 예외를 던진다 — 상세페이지에서 "다시 시도"를 보여주기 위함
export async function fetchRemoteListingStrict(id: number, all = false): Promise<Listing | null> {
  if (!supabase) return null;
  const run = () => retry(() => supabase!.from("shop_listings").select(cols).eq("id", id).maybeSingle());
  let { data, error } = await run();
  if (noHiddenCol(error)) { cols = "id,data,thumb,photo_count,sold"; ({ data, error } = await run()); }
  if (error) throw new Error("연결 실패");
  const l = data ? toListing(data as unknown as Row) : null;
  return l && (all || !l.hidden) ? l : null;
}

// 관리자(수정 화면)용: 숨긴 매물도 불러온다
export async function fetchRemoteListing(id: number): Promise<Listing | null> {
  try { return await fetchRemoteListingStrict(id, true); } catch { return null; }
}

export async function fetchRemotePhotos(id: number): Promise<string[]> {
  if (!supabase) return [];
  const { data } = await retry(() => supabase!.from("shop_photos").select("n,data").eq("listing_id", id).order("n"));
  return (data ?? []).map((p: { data: string }) => p.data);
}
