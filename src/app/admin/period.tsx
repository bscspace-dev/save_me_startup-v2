"use client";
import { useMemo, useState } from "react";

const sel = "rounded border border-neutral-300 bg-white px-2.5 py-2 text-[12px] font-bold outline-none focus:border-brand";

// 목록을 년도·월로 걸러 보고, 한 번에 일정 건수만 보여주는 관리자 공통 도구
// dateOf 는 "2026-03-05" 또는 ISO 시각 문자열을 돌려준다. 앞 7글자(년-월)만 쓴다.
export function usePeriod<T>(items: T[] | null, dateOf: (t: T) => string | null | undefined, size = 20) {
  const [year, setYear] = useState("all");
  const [month, setMonth] = useState("all");
  const [page, setPage] = useState(1);

  const years = useMemo(() => {
    const ys = new Set<string>();
    (items ?? []).forEach((t) => { const y = dateOf(t)?.slice(0, 4); if (y && /^\d{4}$/.test(y)) ys.add(y); });
    return [...ys].sort().reverse();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items]);

  const filtered = useMemo(() => (items ?? []).filter((t) => {
    const d = dateOf(t) ?? "";
    return (year === "all" || d.slice(0, 4) === year) && (month === "all" || d.slice(5, 7) === month.padStart(2, "0"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }), [items, year, month]);

  const pages = Math.max(1, Math.ceil(filtered.length / size));
  const cur = Math.min(page, pages);
  const view = filtered.slice((cur - 1) * size, cur * size);

  const now = new Date();
  const thisMonth = () => { setYear(String(now.getFullYear())); setMonth(String(now.getMonth() + 1)); setPage(1); };
  const reset = () => { setYear("all"); setMonth("all"); setPage(1); };
  const active = year !== "all" || month !== "all";

  const bar = (
    <div className="flex flex-wrap items-center gap-2 text-[12px]">
      <span className="font-bold text-neutral-500">기간</span>
      <select value={year} onChange={(e) => { setYear(e.target.value); if (e.target.value === "all") setMonth("all"); setPage(1); }} className={sel} aria-label="년도">
        <option value="all">전체 년도</option>
        {years.map((y) => <option key={y} value={y}>{y}년</option>)}
      </select>
      <select value={month} onChange={(e) => { setMonth(e.target.value); setPage(1); }} className={sel} aria-label="월">
        <option value="all">전체 월</option>
        {Array.from({ length: 12 }, (_, i) => <option key={i} value={String(i + 1)}>{i + 1}월</option>)}
      </select>
      <button type="button" onClick={thisMonth} className="cursor-pointer rounded border border-neutral-300 bg-white px-2.5 py-2 font-bold hover:border-brand hover:text-brand">이번 달</button>
      {active && <button type="button" onClick={reset} className="cursor-pointer px-1 font-bold text-neutral-400 underline underline-offset-4 hover:text-brand">전체 보기</button>}
      <span className="text-neutral-400">{filtered.length}건{active && items ? ` / 전체 ${items.length}건` : ""}</span>
    </div>
  );

  const pager = pages > 1 && (
    <div className="mt-4 flex items-center justify-center gap-1 text-[12px] font-bold">
      <button type="button" disabled={cur === 1} onClick={() => setPage(cur - 1)} className="cursor-pointer rounded border border-neutral-300 bg-white px-3 py-1.5 enabled:hover:border-brand disabled:opacity-40">이전</button>
      <span className="px-3 text-neutral-500">{cur} / {pages}</span>
      <button type="button" disabled={cur === pages} onClick={() => setPage(cur + 1)} className="cursor-pointer rounded border border-neutral-300 bg-white px-3 py-1.5 enabled:hover:border-brand disabled:opacity-40">다음</button>
    </div>
  );

  return { view, filtered, bar, pager, empty: !!items && items.length > 0 && filtered.length === 0 };
}
