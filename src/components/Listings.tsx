"use client";
import Link from "next/link";
import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { listings, type Listing } from "@/lib/data";
import { ListingCard } from "./ListingCard";
import { ListingInquiryPopup } from "./ListingInquiryPopup";

const categories = ["한식·분식", "카페·음료", "베이커리·디저트", "프랜차이즈", "기타 업종"];
const ops = ["직접운영", "반오토", "풀오토"];
const costRanges = [
  { label: "5천만 미만", test: (v: number) => v < 5000 },
  { label: "5천만~1억", test: (v: number) => v >= 5000 && v < 10000 },
  { label: "1억~2억", test: (v: number) => v >= 10000 && v < 20000 },
  { label: "2억 이상", test: (v: number) => v >= 20000 },
];
const kindColor: Record<string, string> = {
  프랜차이즈: "bg-orange-50 text-brand",
  상가매물: "bg-emerald-50 text-emerald-700",
  전수창업: "bg-[#f4ebe4] text-[#7a4a2b]",
  신규창업: "bg-blue-50 text-blue-700",
};
const sorts = ["최신순", "인기순", "추천순", "금액순", "면적순"] as const;
type Sort = (typeof sorts)[number];

const PAGE_SIZE = 8;

const selectCls = "h-9 rounded border border-neutral-300 bg-white px-3 text-[12px] text-neutral-600 outline-none focus:border-brand";

export function ListingsView() {
  const params = useSearchParams();
  const [kind, setKind] = useState(params.get("type") ?? "");
  const [q, setQ] = useState("");
  const [region, setRegion] = useState(params.get("region") ?? "");
  const [category, setCategory] = useState(params.get("category") ?? "");
  const [cost, setCost] = useState(params.get("cost") ?? "");
  const [op, setOp] = useState(params.get("op") ?? "");
  const [sort, setSort] = useState<Sort>("최신순");
  const [desc, setDesc] = useState(true);
  const [wide, setWide] = useState(false);
  const [inquiryOpen, setInquiryOpen] = useState(false);

  const reset = () => { setKind(""); setQ(""); setRegion(""); setCategory(""); setCost(""); setOp(""); setSort("최신순"); setDesc(true); };

  const list = useMemo(() => {
    const costTest = costRanges.find((c) => c.label === cost)?.test;
    const out = listings.filter((l) =>
      (!q || l.title.includes(q) || String(l.id).includes(q) || l.region.includes(q)) &&
      (!kind || l.kind === kind) &&
      (!region || l.region === region) &&
      (!category || (category === "기타 업종" ? !categories.slice(0, 4).includes(l.category) : l.category === category)) &&
      (!costTest || costTest(l.cost)) &&
      (!op || l.op === op),
    );
    const key: Record<Sort, (l: Listing) => number> = {
      최신순: (l) => l.id, 인기순: (l) => l.views, 추천순: (l) => (l.rec ? 1e6 : 0) + l.id, 금액순: (l) => l.price, 면적순: (l) => l.area,
    };
    return out.sort((a, b) => (desc ? key[sort](b) - key[sort](a) : key[sort](a) - key[sort](b)));
  }, [kind, q, region, category, cost, op, sort, desc]);

  const filterKey = [kind, q, region, category, cost, op, sort, desc].join("|");
  const [pageState, setPageState] = useState({ key: filterKey, n: 1 });
  const totalPages = Math.max(1, Math.ceil(list.length / PAGE_SIZE));
  const page = Math.min(pageState.key === filterKey ? pageState.n : 1, totalPages);
  const goPage = (n: number) => {
    setPageState({ key: filterKey, n });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const pageList = list.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const sortable = (s: Sort) => s === "금액순" || s === "면적순";

  return (
    <>
      {/* 검색 필터 바 */}
      <div className="border-b border-neutral-200 bg-neutral-50">
        <div className="mx-auto flex max-w-[1280px] flex-wrap items-center gap-2 px-6 py-3">
          <div className="flex">
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="관심지역 또는 매물번호를 입력해 주세요" className="h-9 w-[260px] rounded-l border border-r-0 border-neutral-300 bg-white px-3 text-[12px] outline-none placeholder:text-neutral-400 focus:border-brand" />
            <span className="grid h-9 w-11 place-items-center rounded-r bg-brand text-[12px] font-bold text-white">검색</span>
          </div>
          <select value={category} onChange={(e) => setCategory(e.target.value)} className={selectCls}>
            <option value="">업종</option>
            {categories.map((c) => <option key={c}>{c}</option>)}
          </select>
          <select value={cost} onChange={(e) => setCost(e.target.value)} className={selectCls}>
            <option value="">창업비용</option>
            {costRanges.map((c) => <option key={c.label}>{c.label}</option>)}
          </select>
          <select value={op} onChange={(e) => setOp(e.target.value)} className={selectCls}>
            <option value="">운영방식</option>
            {ops.map((c) => <option key={c}>{c}</option>)}
          </select>
          <button onClick={reset} className="h-9 rounded border border-neutral-300 bg-white px-3 text-[12px] text-neutral-600 transition hover:border-brand hover:text-brand">초기화</button>

          <div className="ml-auto flex overflow-hidden rounded border border-neutral-300 bg-white text-[12px] font-bold">
            {[["목록", false], ["와이드", true]].map(([label, w]) => (
              <button key={label as string} onClick={() => setWide(w as boolean)} className={`px-4 py-2 transition ${wide === w ? "bg-brand text-white" : "text-neutral-500 hover:text-brand"}`}>{label as string}</button>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto grid max-w-[1280px] gap-6 px-6 py-8 lg:grid-cols-[1fr_180px]">

        {/* 목록 */}
        <section>
          <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
            <p className="text-[12px] text-neutral-500">{kind && <b className={`mr-2 rounded px-2 py-1 text-[13px] ${kindColor[kind] ?? "text-ink"}`}>{kind}</b>}{region && <b className="mr-2 text-ink">{region}</b>}총 <b className="text-brand">{list.length}</b>건</p>
            <div className="flex divide-x divide-neutral-300 overflow-hidden rounded border border-neutral-300 text-[12px]">
              {sorts.map((s) => (
                <button key={s} onClick={() => { if (s === sort && sortable(s)) setDesc(!desc); else { setSort(s); setDesc(true); } }} className={`px-4 py-2 transition ${sort === s ? "bg-neutral-100 font-bold text-ink" : "bg-white text-neutral-500 hover:text-brand"}`}>
                  {s}{sortable(s) && sort === s ? (desc ? " ↓" : " ↑") : sortable(s) ? " ↑" : ""}
                </button>
              ))}
            </div>
          </div>

          {list.length === 0 ? (
            <p className="py-32 text-center text-[13px] text-neutral-400">조건에 맞는 매물이 없습니다. 필터를 초기화해 보세요.</p>
          ) : (
            <motion.div key={page} layout className={`grid gap-4 ${wide ? "md:grid-cols-2" : "sm:grid-cols-2 xl:grid-cols-3"}`}>
              <AnimatePresence mode="popLayout">
                {pageList.map((l, i) => (
                  <ListingCard key={l.id} l={l} i={i} wide={wide} />
                ))}
              </AnimatePresence>
                <button
                  onClick={() => setInquiryOpen(true)}
                  aria-label="매물 등록 문의"
                  className={`grid place-items-center rounded-lg border-2 border-dashed border-neutral-300 bg-white text-neutral-400 transition hover:border-brand hover:text-brand ${wide ? "min-h-[104px]" : "min-h-[254px]"}`}
                >
                  <span className="text-center">
                    <span className="block text-[44px] font-light leading-none">+</span>
                    <span className="mt-2 block text-[12px] font-bold">매물 등록 문의</span>
                  </span>
                </button>
            </motion.div>
          )}

          {totalPages > 1 && (
            <nav aria-label="페이지 이동" className="mt-10 flex items-center justify-center gap-1.5 text-[13px]">
              <button onClick={() => goPage(page - 1)} disabled={page === 1} className="h-9 rounded border border-neutral-300 bg-white px-3 text-neutral-600 transition hover:border-brand hover:text-brand disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-neutral-300 disabled:hover:text-neutral-600">이전</button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                <button key={n} onClick={() => goPage(n)} aria-current={n === page ? "page" : undefined} className={`size-9 rounded border font-bold transition ${n === page ? "border-brand bg-brand text-white" : "border-neutral-300 bg-white text-neutral-600 hover:border-brand hover:text-brand"}`}>{n}</button>
              ))}
              <button onClick={() => goPage(page + 1)} disabled={page === totalPages} className="h-9 rounded border border-neutral-300 bg-white px-3 text-neutral-600 transition hover:border-brand hover:text-brand disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-neutral-300 disabled:hover:text-neutral-600">다음</button>
            </nav>
          )}
        </section>

        {/* 우측 배너 */}
        <aside className="hidden space-y-3 self-start lg:block">
          <Link href="/#consult" className="block rounded-lg bg-brand p-4 text-white transition hover:bg-brand-dark">
            <p className="text-[10px] text-white/80">구해줘창업</p>
            <p className="mt-1 text-[16px] font-black leading-snug">내 조건에 맞는<br />매장 찾기</p>
            <span className="mt-3 inline-block rounded bg-white px-2 py-1 text-[10px] font-bold text-brand">무료 상담 신청하기 →</span>
          </Link>
          <Link href="/#consult" className="block rounded-lg border border-orange-200 bg-cream p-4 transition hover:shadow-md">
            <p className="text-[10px] text-neutral-500">구해줘창업</p>
            <p className="mt-1 text-[15px] font-black leading-snug">인수 전,<br />이건 알고 가세요</p>
            <span className="mt-3 inline-block text-[10px] font-bold text-brand">자세히 보기 →</span>          </Link>
        </aside>
      </div>
      <ListingInquiryPopup open={inquiryOpen} onClose={() => setInquiryOpen(false)} />
    </>
  );
}
