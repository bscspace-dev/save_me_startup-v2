"use client";
import { useEffect, useMemo, useState } from "react";
import { listings as staticListings, withNew, type Listing } from "@/lib/data";
import { fetchRemoteListings } from "@/lib/remote";
import { TransferSlider } from "./TransferSlider";

// 전수창업 상세 하단: 지금 보는 매물을 뺀 다른 전수창업 카드 (관리자에서 등록한 매물 포함)
export function OtherTransfers({ currentId }: { currentId: number }) {
  const [remote, setRemote] = useState<Listing[]>([]);
  useEffect(() => { fetchRemoteListings().then(setRemote); }, []);
  const items = useMemo(
    () => withNew([...remote, ...staticListings]).filter((l) => l.kind === "전수창업" && l.id !== currentId && !l.sold),
    [remote, currentId],
  );
  if (!items.length) return null;

  return (
    <section className="mt-12">
      <h2 className="text-[24px] font-black tracking-tight">다른 <span className="text-brand">전수창업</span></h2>
      <div className="mt-6"><TransferSlider items={items} /></div>
    </section>
  );
}
