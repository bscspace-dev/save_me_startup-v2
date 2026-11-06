"use client";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { businessCategories, listings as staticListings, withNew, type Listing } from "@/lib/data";
import { fetchRemoteListings } from "@/lib/remote";
import { ListingRow, filters, ICON } from "./Sections";
import { ListingInquiryPopup } from "./ListingInquiryPopup";
import { ConsultPopup } from "./ConsultPopup";

type Sort = "최신순" | "인기순" | "추천순" | "금액순" | "면적순";
const sortOptions: { label: string; sort: Sort; desc: boolean }[] = [
  { label: "최신순", sort: "최신순", desc: true },
  { label: "인기순", sort: "인기순", desc: true },
  { label: "추천순", sort: "추천순", desc: true },
  { label: "금액 높은순", sort: "금액순", desc: true },
  { label: "금액 낮은순", sort: "금액순", desc: false },
  { label: "면적 넓은순", sort: "면적순", desc: true },
  { label: "면적 좁은순", sort: "면적순", desc: false },
];

// 한 페이지 12칸: 매물 11개 + 맨 마지막 칸은 항상 "매물 등록 문의" (웹 한 줄 3개 × 4줄, 모바일·태블릿 12줄 / 신규창업은 문의 칸이 없어 매물 12개)
const PAGE_CELLS = 12;


export function ListingsView() {
  const params = useSearchParams();
  const kind = params.get("type") ?? "";
  const region = params.get("region") ?? "";
  const category = params.get("category") ?? "";
  const [sort, setSort] = useState<Sort>("최신순");
  const [desc, setDesc] = useState(true);
  const [sortOpen, setSortOpen] = useState(false);
  const [inquiryOpen, setInquiryOpen] = useState(false);
  const [consultOpen, setConsultOpen] = useState(false);
  // 관리자에서 등록한 상가매물을 정적 매물 앞에 합친다
  const [remote, setRemote] = useState<Listing[]>([]);
  useEffect(() => { fetchRemoteListings().then(setRemote); }, []);
  const listings = useMemo(() => withNew([...remote, ...staticListings]), [remote]);

  const list = useMemo(() => {
    const out = listings.filter((l) =>
      (!kind || l.kind === kind) &&
      (!region || l.region === region) &&
      (!category || (category === "기타 업종" ? !businessCategories.slice(0, -1).includes(l.category) : l.category === category)),
    );
    const key: Record<Sort, (l: Listing) => number> = {
      최신순: (l) => l.id, 인기순: (l) => l.views, 추천순: (l) => (l.rec ? 1e6 : 0) + l.id, 금액순: (l) => l.price, 면적순: (l) => l.area,
    };
    return out.sort((a, b) => (desc ? key[sort](b) - key[sort](a) : key[sort](a) - key[sort](b)));
  }, [listings, kind, region, category, sort, desc]);

  const filterKey = [kind, region, category, sort, desc].join("|");
  const [pageState, setPageState] = useState({ key: filterKey, n: 1 });
  const pageSize = kind === "신규창업" ? PAGE_CELLS : PAGE_CELLS - 1;
  const totalPages = Math.max(1, Math.ceil(list.length / pageSize));
  const page = Math.min(pageState.key === filterKey ? pageState.n : 1, totalPages);
  const goPage = (n: number) => {
    setPageState({ key: filterKey, n });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const pageList = list.slice((page - 1) * pageSize, page * pageSize);


  return (
    <>
      {/* 검색 필터 바 */}
      <div className="bg-[#f5f2f2]">
        <div className="mx-auto grid max-w-[80rem] grid-cols-2 gap-2 px-6 pb-2 pt-8 sm:flex sm:flex-wrap sm:items-center">
          {filters.map((f) => {
            const k = f.kind;
            const on = kind === k;
            return (
              <Link key={k} href={k ? `/listings?type=${k}` : "/listings"} className={`inline-flex items-center justify-center gap-1.5 rounded-full border py-1.5 pl-3.5 pr-4 font-gmarket text-[0.8125rem] font-bold transition ${on ? "border-ink bg-ink text-white" : "border-ink/70 bg-white text-ink hover:bg-neutral-100"}`}>
                <svg viewBox="0 0 24 24" aria-hidden className="size-4 shrink-0" {...ICON}>{f.icon}</svg>{f.label}
              </Link>
            );
          })}
        </div>
      </div>

      <div className="bg-[#f5f2f2]">
      <div className="mx-auto max-w-[80rem] px-6 py-8">

        {/* 목록 */}
        <section>
          <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
            <p className="text-[0.8125rem] text-[#2d2d2d] sm:text-[0.875rem]">{kind && <b className="mr-2 inline-block align-middle rounded bg-[#F0C33F] px-2.5 py-0.5 text-[0.75rem] font-black md:text-[0.875rem] tracking-wider text-ink">{kind}</b>}{region && <b className="mr-2 text-ink">{region}</b>}총 <b className="text-[#D49F12]">{list.length}</b>건</p>
            <div className="relative">
              <button onClick={() => setSortOpen(!sortOpen)} aria-haspopup="listbox" aria-expanded={sortOpen} className="flex cursor-pointer items-center gap-2 rounded border border-[#2d2d2d] bg-white py-2 pl-4 pr-3 font-gmarket text-[0.75rem] font-bold text-[#2d2d2d] transition hover:bg-neutral-100">
                {sortOptions.find((o) => o.sort === sort && o.desc === desc)?.label}
                <svg viewBox="0 0 24 24" aria-hidden className={`size-3.5 transition-transform ${sortOpen ? "rotate-180" : ""}`} {...ICON}><path d="M6 9l6 6 6-6" /></svg>
              </button>
              {sortOpen && (
                <>
                  <button aria-label="닫기" className="fixed inset-0 z-10 cursor-default" onClick={() => setSortOpen(false)} />
                  <ul role="listbox" className="absolute right-0 top-full z-20 mt-1 w-36 overflow-hidden rounded border border-[#2d2d2d] bg-white py-1 font-gmarket text-[0.75rem] text-[#2d2d2d] shadow-lg">
                    {sortOptions.map((o) => {
                      const on = o.sort === sort && o.desc === desc;
                      return (
                        <li key={o.label} role="option" aria-selected={on}>
                          <button onClick={() => { setSort(o.sort); setDesc(o.desc); setSortOpen(false); }} className={`block w-full cursor-pointer px-4 py-2 text-left transition ${on ? "bg-[#F0C33F] font-bold" : "hover:bg-neutral-100"}`}>{o.label}</button>
                        </li>
                      );
                    })}
                  </ul>
                </>
              )}
            </div>
          </div>

          {list.length === 0 ? (
            <p className="py-32 text-center text-[0.8125rem] text-[#2d2d2d] sm:text-[0.875rem]">조건에 맞는 매물이 없습니다</p>
          ) : (
            <div key={`${filterKey}-${page}`}>
              {/* 목록형: 모바일·태블릿은 한 줄에 하나, 웹은 한 줄에 3개 */}
              <div className="space-y-3 lg:grid lg:grid-cols-3 lg:gap-3 lg:space-y-0">
                {pageList.map((l, i) => <ListingRow key={l.id} l={l} i={i} />)}
                {kind !== "신규창업" && (
                  <button onClick={() => setInquiryOpen(true)} aria-label="매물 등록 문의" className="flex min-h-[4.5rem] w-full cursor-pointer items-center justify-center gap-3 rounded-xl lg:h-[9.375rem] border-2 border-dashed border-neutral-300 bg-white text-neutral-400 transition hover:border-[#D49F12] hover:text-[#D49F12]">
                    <span className="text-[1.75rem] font-light leading-none font-gmarket">+</span>
                    <span className="text-[0.8125rem] font-bold">매물 등록 문의</span>
                  </button>
                )}
              </div>
            </div>
          )}

          {totalPages > 1 && (
            <nav aria-label="페이지 이동" className="mt-10 flex items-center justify-center gap-1.5 text-[0.8125rem]">
              <button onClick={() => goPage(page - 1)} disabled={page === 1} className="h-9 rounded border border-neutral-300 bg-white px-3 text-neutral-600 transition hover:border-[#D49F12] hover:text-[#D49F12] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-neutral-300 disabled:hover:text-neutral-600">이전</button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                <button key={n} onClick={() => goPage(n)} aria-current={n === page ? "page" : undefined} className={`size-9 rounded border font-bold transition ${n === page ? "border-[#D49F12] bg-[#D49F12] text-white" : "border-neutral-300 bg-white text-neutral-600 hover:border-[#D49F12] hover:text-[#D49F12]"}`}>{n}</button>
              ))}
              <button onClick={() => goPage(page + 1)} disabled={page === totalPages} className="h-9 rounded border border-neutral-300 bg-white px-3 text-neutral-600 transition hover:border-[#D49F12] hover:text-[#D49F12] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-neutral-300 disabled:hover:text-neutral-600">다음</button>
            </nav>
          )}
          {/* 하단 배너 */}
          <div className="mt-8 grid gap-3 sm:mt-10 sm:grid-cols-2 sm:gap-4">
            <Link href="/transfer" className="flex cursor-pointer items-center justify-between gap-4 rounded-lg bg-[#F0C33F] px-5 py-4 text-left text-ink transition hover:shadow-md">
              <span>
                <span className="block text-[0.625rem] text-ink">구해줘창업</span>
                <span className="mt-1 block font-gmarket text-[1rem] font-bold leading-snug">창업 전, 이건 알고 가세요</span>
              </span>
              <span className="shrink-0 text-[0.625rem] font-bold text-ink">자세히 보기 →</span>
            </Link>
            <button onClick={() => setConsultOpen(true)} className="flex cursor-pointer items-center justify-between gap-4 rounded-lg border border-[#F0C33F] bg-[#FFF6D6] px-5 py-4 text-left transition hover:shadow-md">
              <span>
                <span className="block text-[0.625rem] text-ink">구해줘창업</span>
                <span className="mt-1 block font-gmarket text-[1rem] font-bold leading-snug">내 조건에 맞는 매장 찾기</span>
              </span>
              <span className="shrink-0 rounded bg-white px-2 py-1 text-[0.625rem] font-bold text-ink">무료 상담 신청하기 →</span>
            </button>
          </div>

        </section>
      </div>
      </div>
      <ListingInquiryPopup open={inquiryOpen} onClose={() => setInquiryOpen(false)} only={kind || undefined} />
      <ConsultPopup open={consultOpen} onClose={() => setConsultOpen(false)} />
    </>
  );
}
