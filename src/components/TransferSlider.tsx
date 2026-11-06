"use client";
import { useEffect, useRef, useState } from "react";
import type { Listing } from "@/lib/data";
import { fetchRemoteListings } from "@/lib/remote";
import { ListingCard } from "./ListingCard";

// 전수창업 매물 카드를 한 화면에 3개(태블릿 2개, 모바일 1개 남짓)씩 보여주고 좌우로 넘겨 본다
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

  const arrow = "absolute top-1/2 z-10 grid size-11 -translate-y-1/2 place-items-center rounded-full border border-neutral-300 bg-white text-[1.125rem] font-bold shadow-md transition hover:border-brand hover:text-brand disabled:cursor-default disabled:opacity-30 disabled:hover:border-neutral-300 disabled:hover:text-inherit";

  return (
    <div>
      <div className="relative">
      <div
        ref={ref}
        onScroll={update}
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth text-left [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {(items ?? []).map((l, i) => (
          <div key={l.id} className="shrink-0 basis-[82%] snap-start sm:basis-[calc((100%-1rem)/2)] lg:basis-[calc((100%-2rem)/3)]">
            <ListingCard l={l} i={i} />
          </div>
        ))}
      </div>
      <button type="button" aria-label="이전 매물" onClick={() => move(-1)} disabled={edge.start} className={`${arrow} left-1 lg:-left-5`}>‹</button>
      <button type="button" aria-label="다음 매물" onClick={() => move(1)} disabled={edge.end} className={`${arrow} right-1 lg:-right-5`}>›</button>
      </div>
      {items && items.length === 0 && <p className="py-10 text-center text-[0.8125rem] text-neutral-400">진행 중인 전수창업 매물이 없습니다.</p>}
      <a href="/listings?type=전수창업" className="mt-6 inline-block text-[0.8125rem] font-bold text-brand">전수창업 전체보기 →</a>
    </div>
  );
}
