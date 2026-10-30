import { supabase } from "./supabase";
import type { Listing } from "./data";
import type { ShopInfo } from "./shop";

// 관리자에서 등록한 상가매물(Supabase) → 기존 Listing 형태로 변환
type Row = { id: number; data: Omit<Listing, "id" | "photos" | "thumb" | "sold" | "kind" | "views" | "shop"> & { shop: ShopInfo }; thumb: string | null; photo_count: number; sold: boolean };

const toListing = (r: Row): Listing => ({
  ...r.data,
  id: r.id,
  kind: "상가매물",
  views: 0,
  photos: r.photo_count,
  thumb: r.thumb ?? undefined,
  sold: r.sold,
});

export async function fetchRemoteListings(): Promise<Listing[]> {
  if (!supabase) return [];
  const { data, error } = await supabase.from("shop_listings").select("id,data,thumb,photo_count,sold").order("id", { ascending: false });
  if (error || !data) return [];
  return (data as Row[]).map(toListing);
}

export async function fetchRemoteListing(id: number): Promise<Listing | null> {
  if (!supabase) return null;
  const { data } = await supabase.from("shop_listings").select("id,data,thumb,photo_count,sold").eq("id", id).maybeSingle();
  return data ? toListing(data as Row) : null;
}

export async function fetchRemotePhotos(id: number): Promise<string[]> {
  if (!supabase) return [];
  const { data } = await supabase.from("shop_photos").select("n,data").eq("listing_id", id).order("n");
  return (data ?? []).map((p: { data: string }) => p.data);
}
