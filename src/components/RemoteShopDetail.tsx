"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import type { Listing } from "@/lib/data";
import { fetchRemoteListingStrict, fetchRemotePhotos } from "@/lib/remote";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { PromoDetail } from "./PromoDetail";
import { ShopDetail } from "./ShopDetail";
import { StartupDetail } from "./StartupDetail";
import { startupOf } from "@/lib/startup";
import { TransferDetail } from "./TransferDetail";
import { transferOf } from "@/lib/transfer";
import { YoutubePopup } from "./YoutubePopup";

type State = { l: Listing; photos: string[] } | "loading" | "none" | "error";

// 관리자에서 등록한 상가매물(Supabase) 상세 — 정적 매물과 같은 ShopDetail 화면을 쓴다
export function RemoteShopDetail({ id }: { id: number }) {
  const [state, setState] = useState<State>("loading");
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let alive = true;
    Promise.all([fetchRemoteListingStrict(id), fetchRemotePhotos(id)]).then(([l, photos]) => {
      if (alive) setState(l && (l.shop || l.promo || l.startup || l.transfer) ? { l, photos } : "none");
    }).catch(() => { if (alive) setState("error"); }); // 인터넷 연결 문제: "없음"이 아니라 오류로 알려준다
    return () => { alive = false; };
  }, [id, attempt]);

  return (
    <>
      <Header active={typeof state === "object" ? (state.l.promo ? "프랜차이즈창업" : state.l.startup ? "신규창업" : state.l.transfer ? "전수창업" : "상가매물") : "상가매물"} />
      {state === "loading" && <main className="grid min-h-[60vh] place-items-center text-[13px] text-neutral-400">불러오는 중...</main>}
      {state === "error" && (
        <main className="grid min-h-[60vh] place-items-center text-center">
          <div>
            <p className="text-[15px] font-bold">자료를 불러오지 못했습니다</p>
            <p className="mt-1 text-[12px] text-neutral-400">인터넷 연결을 확인한 뒤 다시 시도해주세요</p>
            <button onClick={() => { setState("loading"); setAttempt((n) => n + 1); }} className="mt-4 rounded-lg bg-brand px-5 py-2.5 text-[13px] font-bold text-white">다시 시도</button>
          </div>
        </main>
      )}
      {state === "none" && (
        <main className="grid min-h-[60vh] place-items-center text-center">
          <div>
            <p className="text-[15px] font-bold">매물을 찾을 수 없습니다</p>
            <Link href="/listings" className="mt-3 inline-block text-[13px] text-brand underline underline-offset-4">매물 목록으로</Link>
          </div>
        </main>
      )}
      {typeof state === "object" && state.l.shop && <ShopDetail l={state.l} s={state.l.shop} srcs={state.photos} />}
      {typeof state === "object" && state.l.promo && <PromoDetail l={state.l} srcs={state.photos} />}
      {typeof state === "object" && state.l.transfer && <TransferDetail l={state.l} t={transferOf(state.l)!} srcs={state.photos} />}
      {typeof state === "object" && state.l.startup && <StartupDetail l={state.l} c={startupOf(state.l)!} srcs={state.photos} />}
      <Footer />
      <YoutubePopup />
    </>
  );
}
