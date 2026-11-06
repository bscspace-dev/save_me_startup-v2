"use client";
import { useEffect, useRef, useState } from "react";
import type { Listing } from "@/lib/data";
import { fetchRemoteListings } from "@/lib/remote";
import { NewCard } from "./Sections";

// 전수창업 매물 카드를 메인과 같은 크기·디자인으로 보여준다 (웹은 한 줄 4개, 태블릿·모바일은 카드 너비 고정) — 좌우로 넘겨 본다
// items 를 주지 않으면 관리자에서 등록한 전수창업(DB) 중 진행 중인 매물을 직접 불러온다
export function TransferSlider({ items: given }: { items?: Listing[] }) {
  const [fetched, setFetched] = useState<Listing[] | null>(null);
  const items = given ?? fetched;
  const ref = useRef<HTMLDivElement>(null);
  const [edge, setEdge] = useState({ start: true, end: false });

  const update = () => {
    const el = ref.current;
    if (!el) return;
    setEdge({ start: el.scrollLeft <= 4, end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 4 });
  };

  useEffect(() => {
    if (given) return;
    let alive = true;
    fetchRemoteListings().then((l) => { if (alive) setFetched(l.filter((x) => x.kind === "전수창업" && !x.sold && x.transfer)); });
    return () => { alive = false; };
  }, [given]);

  useEffect(() => {
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [items]);

  const move = (dir: 1 | -1) => {
    const el = ref.current;
    if (el) el.scrollBy({ left: dir * el.clientWidth, behavior: "smooth" });
  };

  const arrow = "absolute top-1/2 z-10 grid size-11 -translate-y-1/2 place-items-center rounded-full border border-neutral-300 bg-white text-[1.125rem] font-bold shadow-md transition hover:border-[#F0C33F] hover:text-[#D49F12] disabled:cursor-default disabled:opacity-30 disabled:hover:border-neutral-300 disabled:hover:text-inherit";

  return (
    <div>
      <div className="relative">
      <div
        ref={ref}
        onScroll={update}
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth text-left [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {(items ?? []).map((l, i) => (
          <div key={l.id} className="shrink-0 snap-start lg:basis-[calc((100%-3rem)/4)]">
            <NewCard l={l} i={i} />
          </div>
        ))}
      </div>
      <button type="button" aria-label="이전 매물" onClick={() => move(-1)} disabled={edge.start} className={`${arrow} left-1 lg:-left-5`}>‹</button>
      <button type="button" aria-label="다음 매물" onClick={() => move(1)} disabled={edge.end} className={`${arrow} right-1 lg:-right-5`}>›</button>
      </div>
      {items && items.length === 0 && <p className="py-10 text-center text-[0.8125rem] text-neutral-400">진행 중인 전수창업 매물이 없습니다.</p>}
      <a href="/listings?type=전수창업" className="mt-6 inline-block text-[0.875rem] font-bold text-[#D49F12]">전수창업 전체보기 →</a>
    </div>
  );
}
