"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import type { Listing } from "@/lib/data";
import { fetchRemoteListing, fetchRemotePhotos } from "@/lib/remote";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { ShopDetail } from "./ShopDetail";
import { YoutubePopup } from "./YoutubePopup";

type State = { l: Listing; photos: string[] } | "loading" | "none";

// 관리자에서 등록한 상가매물(Supabase) 상세 — 정적 매물과 같은 ShopDetail 화면을 쓴다
export function RemoteShopDetail({ id }: { id: number }) {
  const [state, setState] = useState<State>("loading");

  useEffect(() => {
    let alive = true;
    Promise.all([fetchRemoteListing(id), fetchRemotePhotos(id)]).then(([l, photos]) => {
      if (alive) setState(l?.shop ? { l, photos } : "none");
    });
    return () => { alive = false; };
  }, [id]);

  return (
    <>
      <Header active="상가매물" />
      {state === "loading" && <main className="grid min-h-[60vh] place-items-center text-[13px] text-neutral-400">불러오는 중...</main>}
      {state === "none" && (
        <main className="grid min-h-[60vh] place-items-center text-center">
          <div>
            <p className="text-[15px] font-bold">매물을 찾을 수 없습니다.</p>
            <Link href="/listings" className="mt-3 inline-block text-[13px] text-brand underline underline-offset-4">매물 목록으로</Link>
          </div>
        </main>
      )}
      {typeof state === "object" && state.l.shop && <ShopDetail l={state.l} s={state.l.shop} srcs={state.photos} />}
      <Footer />
      <YoutubePopup />
    </>
  );
}
