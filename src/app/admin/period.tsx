"use client";
import { useMemo, useState } from "react";
import type { Listing } from "@/lib/data";

const sel = "rounded border border-neutral-300 bg-white px-2.5 py-2 text-[0.75rem] font-bold outline-none focus:border-brand";

// 등록 관리 목록의 검색 대상 글자 (번호·제목·지역·업종·브랜드·사부·가게·주소)
export const listingText = (l: Listing) =>
  [l.id, l.title, l.region, l.category, l.promo?.brand, l.transfer?.name, l.transfer?.store, l.transfer?.address, l.startup?.address].filter((v) => v != null).join(" ");

export type Status<T> = { key: string; label: string; test: (t: T) => boolean };
export type Sort<T> = { key: string; label: string; cmp: (a: T, b: T) => number };

// 상태 칩: 노출중(고객에게 보임) · 숨김 · (마감 표시가 있는 종류만) 계약완료/모집마감
export const listingStatuses = (soldLabel?: string): Status<Listing>[] => [
  { key: "show", label: "노출중", test: (l) => !l.hidden },
  { key: "hidden", label: "숨김", test: (l) => !!l.hidden },
  ...(soldLabel ? [{ key: "sold", label: soldLabel, test: (l: Listing) => !!l.sold }] : []),
];

// 정렬: 최신·오래된·조회수 + 종류마다 다른 금액 기준 낮은/높은순
export const listingSorts = (cost?: { label: string; of: (l: Listing) => number }): Sort<Listing>[] => [
  { key: "new", label: "최신 등록순", cmp: (a, b) => (b.date ?? "").localeCompare(a.date ?? "") || b.id - a.id },
  { key: "old", label: "오래된 순", cmp: (a, b) => (a.date ?? "").localeCompare(b.date ?? "") || a.id - b.id },
  { key: "views", label: "조회수 높은 순", cmp: (a, b) => b.views - a.views || b.id - a.id },
  ...(cost ? [
    { key: "cost-asc", label: `${cost.label} 낮은 순`, cmp: (a: Listing, b: Listing) => cost.of(a) - cost.of(b) },
    { key: "cost-desc", label: `${cost.label} 높은 순`, cmp: (a: Listing, b: Listing) => cost.of(b) - cost.of(a) },
  ] : []),
];

// 목록 카드 제목 옆에 붙이는 상태 배지 (숨김·마감이 사진 위가 아니라 제목에서 바로 보인다)
export function StateBadges({ l, soldLabel }: { l: Listing; soldLabel?: string }) {
  return (
    <>
      {l.hidden && <span className="mr-1.5 shrink-0 rounded bg-neutral-800 px-1.5 py-0.5 align-middle text-[0.6563rem] font-bold text-white">숨김</span>}
      {soldLabel && l.sold && <span className="mr-1.5 shrink-0 rounded bg-orange-100 px-1.5 py-0.5 align-middle text-[0.6563rem] font-bold text-brand">{soldLabel}</span>}
    </>
  );
}

type Opts<T> = {
  size?: number;                       // 한 쪽에 보여줄 건수
  searchOf?: (t: T) => string;         // 주면 기간 줄에 검색창이 생긴다
  statuses?: Status<T>[];              // 주면 상태 칩(건수 표시)이 생긴다
  sorts?: Sort<T>[];                   // 주면 정렬 선택이 생긴다 (첫 번째가 기본)
  resetKey?: string;                   // 바뀌면 1쪽으로 돌아간다 (바깥의 탭·검색어 등)
};

// 목록을 년도·월로 걸러 보고, 검색·상태·정렬을 적용해 한 번에 일정 건수만 보여주는 관리자 공통 도구
// dateOf 는 "2026-03-05" 또는 ISO 시각 문자열을 돌려준다. 앞 7글자(년-월)만 쓴다.
export function usePeriod<T>(items: T[] | null, dateOf: (t: T) => string | null | undefined, { size = 20, searchOf, statuses, sorts, resetKey = "" }: Opts<T> = {}) {
  const [year, setYear] = useState("all");
  const [month, setMonth] = useState("all");
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("all");
  const [sortKey, setSortKey] = useState(sorts?.[0]?.key ?? "");
  const [page, setPage] = useState(1);
  const [prevKey, setPrevKey] = useState(resetKey);
  if (prevKey !== resetKey) { setPrevKey(resetKey); setPage(1); } // 탭·검색이 바뀌면 첫 쪽부터

  const years = useMemo(() => {
    const ys = new Set<string>();
    (items ?? []).forEach((t) => { const y = dateOf(t)?.slice(0, 4); if (y && /^\d{4}$/.test(y)) ys.add(y); });
    return [...ys].sort().reverse();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items]);

  // 현재 선택한 기간에 속하는지 (기간을 고르지 않았으면 모두 true)
  const inPeriod = (t: T) => {
    const d = dateOf(t) ?? "";
    return (year === "all" || d.slice(0, 4) === year) && (month === "all" || d.slice(5, 7) === month.padStart(2, "0"));
  };

  // 기간·검색까지만 적용한 목록: 상태 칩의 건수는 이 목록 기준이라 아래 결과와 맞아떨어진다
  const kw = q.trim().toLowerCase();
  const base = useMemo(() => (items ?? []).filter((t) => inPeriod(t) && (!kw || !searchOf || searchOf(t).toLowerCase().includes(kw))),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [items, year, month, kw]);

  const filtered = useMemo(() => {
    const st = statuses?.find((s) => s.key === status);
    const out = st ? base.filter(st.test) : base;
    const so = sorts?.find((s) => s.key === sortKey);
    return so ? [...out].sort(so.cmp) : out;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [base, status, sortKey]);

  const pages = Math.max(1, Math.ceil(filtered.length / size));
  const cur = Math.min(page, pages);
  const view = filtered.slice((cur - 1) * size, cur * size);

  const now = new Date();
  const thisMonth = () => { setYear(String(now.getFullYear())); setMonth(String(now.getMonth() + 1)); setPage(1); };
  const reset = () => { setYear("all"); setMonth("all"); setQ(""); setStatus("all"); setPage(1); };
  const active = year !== "all" || month !== "all";
  const narrowed = active || !!kw || status !== "all"; // 기간·검색·상태로 줄여 보고 있는지

  const chip = (on: boolean) => `cursor-pointer rounded-full border px-3 py-1.5 font-bold transition ${on ? "border-ink bg-ink text-white" : "border-neutral-300 bg-white text-neutral-600 hover:border-brand hover:text-brand"}`;

  const bar = (
    <div className="space-y-2.5 text-[0.75rem]">
      <div className="flex flex-wrap items-center gap-2">
        <span className="font-bold text-neutral-500">기간</span>
        <select value={year} onChange={(e) => { setYear(e.target.value); if (e.target.value === "all") setMonth("all"); setPage(1); }} className={sel} aria-label="년도">
          <option value="all">전체 년도</option>
          {years.map((y) => <option key={y} value={y}>{y}년</option>)}
        </select>
        <select value={month} onChange={(e) => { setMonth(e.target.value); if (e.target.value !== "all" && year === "all") setYear(years[0] ?? String(now.getFullYear())); setPage(1); }} className={sel} aria-label="월">
          <option value="all">전체 월</option>
          {Array.from({ length: 12 }, (_, i) => <option key={i} value={String(i + 1)}>{i + 1}월</option>)}
        </select>
        <button type="button" onClick={thisMonth} className="cursor-pointer rounded border border-neutral-300 bg-white px-2.5 py-2 font-bold hover:border-brand hover:text-brand">이번 달</button>
        {searchOf && <input value={q} onChange={(e) => { setQ(e.target.value); setPage(1); }} placeholder="제목·지역·업종·번호 검색" aria-label="검색" className={`${sel} w-[12.5rem] font-normal`} />}
        {sorts && (
          <select value={sortKey} onChange={(e) => { setSortKey(e.target.value); setPage(1); }} className={`${sel} ml-auto`} aria-label="정렬">
            {sorts.map((s) => <option key={s.key} value={s.key}>{s.label}</option>)}
          </select>
        )}
      </div>
      <div className="flex flex-wrap items-center gap-2">
        {statuses && (
          <>
            <button type="button" onClick={() => { setStatus("all"); setPage(1); }} className={chip(status === "all")}>전체 {base.length}</button>
            {statuses.map((s) => (
              <button key={s.key} type="button" onClick={() => { setStatus(s.key); setPage(1); }} className={chip(status === s.key)}>{s.label} {base.filter(s.test).length}</button>
            ))}
          </>
        )}
        {narrowed && <button type="button" onClick={reset} className="cursor-pointer px-1 font-bold text-neutral-400 underline underline-offset-4 hover:text-brand">전체 보기</button>}
        <span className="text-neutral-400">{filtered.length}건{narrowed && items ? ` / 전체 ${items.length}건` : ""}</span>
      </div>
    </div>
  );

  const pager = pages > 1 && (
    <div className="mt-4 flex items-center justify-center gap-1 text-[0.75rem] font-bold">
      <button type="button" disabled={cur === 1} onClick={() => setPage(cur - 1)} className="cursor-pointer rounded border border-neutral-300 bg-white px-3 py-1.5 enabled:hover:border-brand disabled:opacity-40">이전</button>
      <span className="px-3 text-neutral-500">{cur} / {pages}</span>
      <button type="button" disabled={cur === pages} onClick={() => setPage(cur + 1)} className="cursor-pointer rounded border border-neutral-300 bg-white px-3 py-1.5 enabled:hover:border-brand disabled:opacity-40">다음</button>
    </div>
  );

  return { view, filtered, bar, pager, inPeriod, active, reset, empty: !!items && items.length > 0 && filtered.length === 0 };
}
