"use client";
import { useEffect, useRef, useState } from "react";
import type { Listing } from "@/lib/data";
import { ListingCard } from "./ListingCard";

// 전수창업 매물 카드를 한 화면에 3개(태블릿 2개, 모바일 1개 남짓)씩 보여주고 좌우로 넘겨 본다
export function TransferSlider({ items }: { items: Listing[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const [edge, setEdge] = useState({ start: true, end: false });

  const update = () => {
    const el = ref.current;
    if (!el) return;
    setEdge({ start: el.scrollLeft <= 4, end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 4 });
  };

  useEffect(() => {
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const move = (dir: 1 | -1) => {
    const el = ref.current;
    if (el) el.scrollBy({ left: dir * el.clientWidth, behavior: "smooth" });
  };

  const arrow = "absolute top-1/2 z-10 grid size-11 -translate-y-1/2 place-items-center rounded-full border border-neutral-300 bg-white text-[18px] font-bold shadow-md transition hover:border-brand hover:text-brand disabled:cursor-default disabled:opacity-30 disabled:hover:border-neutral-300 disabled:hover:text-inherit";

  return (
    <div>
      <div className="relative">
      <div
        ref={ref}
        onScroll={update}
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth text-left [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {items.map((l, i) => (
          <div key={l.id} className="shrink-0 basis-[82%] snap-start sm:basis-[calc((100%-16px)/2)] lg:basis-[calc((100%-32px)/3)]">
            <ListingCard l={l} i={i} />
          </div>
        ))}
      </div>
      <button type="button" aria-label="이전 매물" onClick={() => move(-1)} disabled={edge.start} className={`${arrow} left-1 lg:-left-5`}>‹</button>
      <button type="button" aria-label="다음 매물" onClick={() => move(1)} disabled={edge.end} className={`${arrow} right-1 lg:-right-5`}>›</button>
      </div>
      <a href="/listings?type=전수창업" className="mt-6 inline-block text-[13px] font-bold text-brand">전수창업 전체보기 →</a>
    </div>
  );
}
