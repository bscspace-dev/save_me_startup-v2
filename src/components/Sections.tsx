"use client";
import { RichText } from "./RichText";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import Link from "next/link";
import { byNewest, categories, kindBadge, listings, photoSrc, withNew, won, type Listing } from "@/lib/data";
import { franchises } from "@/lib/franchise";
import { shops } from "@/lib/shop";
import { transferOf } from "@/lib/transfer";
import { startupOf } from "@/lib/startup";
import { fetchRemoteListings } from "@/lib/remote";
import { useToday } from "@/lib/today";
import { Reveal } from "./Reveal";

const NEON = "#F0C33F"; // 업종별 카드의 포인트(네온) 색

function Placeholder({ dark = false }: { dark?: boolean }) {
  return <div className={`size-full ${dark ? "bg-neutral-800" : "bg-neutral-100"}`} />;
}

function SectionHead({ eyebrow, title, sub, more, badge, href = "/listings" }: { eyebrow?: string; title: string; sub?: string; more?: string; badge?: React.ReactNode; href?: string }) {
  return (
    <div className="flex items-end justify-between">
      <div>
        {badge ?? <p className="text-[0.75rem] font-bold text-brand">{eyebrow}</p>}
        <h2 className="mt-2 text-[1.875rem] font-black tracking-tight font-gmarket">{title}</h2>
        {sub && <p className="mt-2 text-[0.875rem] text-neutral-500">{sub}</p>}
      </div>
      {more && <Link href={href} className="pb-1 text-[0.75rem] font-bold text-brand">{more} →</Link>}
    </div>
  );
}

export function Categories() {
  return (
    <section className="bg-[#f5f2f2]">
      <div className="mx-auto max-w-[80rem] px-6 pb-8 pt-6">
        <Reveal>
          <p className="flex items-center gap-2.5 text-[0.75rem] font-bold tracking-[0.16em] text-[#2d2d2d] md:text-[0.875rem]">
            <span className="h-[1.1em] w-[0.25rem] rounded-sm" style={{ background: NEON }} />STARTUP CATEGORY
          </p>
          <h2 className="mt-2 font-gmarket text-[1.75rem] font-bold leading-[1.25] tracking-tight md:text-[2.125rem]">
            어떤 <span style={{ color: "#D49F12" }}>창업</span>을 찾고 계신가요?
          </h2>
          <p className="mt-3 font-gmarket text-[0.9375rem] font-medium leading-relaxed text-[#2d2d2d] md:text-[0.9375rem]">관심 있는 분야를 선택하고, 내게 맞는 창업 정보를 확인해보세요.</p>
          <div className="mt-3 h-1.5 w-16 rounded-full" style={{ background: NEON }} />
        </Reveal>
        {/* 큰 화면은 4칸, 작은 화면은 옆으로 밀어서 본다 */}
        <div className="-mx-6 mt-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-4 lg:mx-0 lg:grid lg:grid-cols-4 lg:overflow-visible lg:px-0 lg:pb-0">
          {categories.map((c, i) => (
            <Reveal key={c.title} delay={i * 0.08} className="w-[16.25rem] shrink-0 snap-start sm:w-[17.5rem] lg:w-auto">
              <motion.a href={`/listings?type=${c.tag}`} whileHover={{ y: -6 }} className="flex h-full flex-col rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-xl">
                <span className="self-start rounded bg-ink px-2 py-1 text-[0.75rem] font-black tracking-wider" style={{ color: NEON }}>{c.en}</span>
                <div className="grid h-[8rem] place-items-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={c.img} alt="" aria-hidden className="size-[7.25rem] object-contain" />
                </div>
                <h3 className="text-center text-[1.25rem] font-black tracking-tight">{c.title}</h3>
                <p className="mt-2 min-h-[2.75rem] text-center text-[0.875rem] leading-relaxed text-[#2d2d2d]">{c.desc}</p>
                <div className="mt-auto flex items-center justify-between gap-2 border-t border-neutral-100 pt-3.5 text-[0.75rem] text-[#2d2d2d]">
                  <span className="flex min-w-0 items-center gap-1.5"><span className="size-1.5 shrink-0 rounded-full" style={{ background: NEON }} /><span className="truncate">{c.foot}</span></span>
                  <span className="shrink-0 rounded-full px-3 py-1 text-[0.75rem] font-black text-ink" style={{ background: NEON }}>둘러보기 →</span>
                </div>
              </motion.a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Picks() {
  return (
    <section className="bg-sand">
      <div className="mx-auto max-w-[80rem] px-6 py-16">
        <Reveal>
          <SectionHead
            badge={<span className="inline-block rounded bg-brand px-2 py-0.5 text-[0.75rem] font-bold text-white">구해줘창업 PICK</span>}
            title="이달의 추천 창업"
            sub="전문 컨설턴트가 직접 선별한 이번 달의 추천 창업 컨텐츠입니다"
            more="전체 Pick 보기"
          />
        </Reveal>
        <div className="mt-8 grid gap-4 lg:grid-cols-[1.35fr_1fr]">
          <Reveal>
            <article className="overflow-hidden rounded-lg bg-white shadow-sm">
              <div className="relative h-[16.875rem] overflow-hidden bg-[#2a211b]">
                <Placeholder dark />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/10" />
                <div className="absolute left-3 top-3 flex gap-1.5 text-[0.75rem] font-bold text-white">
                  <span className="rounded bg-brand px-2 py-0.5">PICK</span>
                  <span className={`rounded px-2 py-0.5 ${kindBadge["전수창업"]}`}>전수창업</span>
                </div>
                <div className="absolute bottom-4 left-5 text-white">
                  <p className="text-[0.75rem] text-white/70">수성구 · 전세전문점</p>
                  <h3 className="mt-1 text-[1.25rem] font-black">오래된 단골 손님이 있는 국밥집</h3>
                </div>
              </div>
              <div className="p-5">
                <p className="text-[0.7813rem] text-neutral-600">25년 운영 노하우와 단골 고객을 함께 이어받을 수 있는 전수창업 매물. 레시피·운영방식 상세 교육 포함</p>
                <dl className="mt-4 flex gap-8 text-[0.75rem]">
                  {[["면적", "약 49㎡"], ["전수비", "협의 후 결정"], ["업종", "한식·탕·국밥"]].map(([k, v]) => (
                    <div key={k}><dt className="text-neutral-400">{k}</dt><dd className="mt-0.5 text-[0.875rem] font-bold">{v}</dd></div>
                  ))}
                </dl>
                <a href="#consult" className="mt-5 block rounded bg-brand py-3 text-center text-[0.875rem] font-bold text-white transition hover:bg-brand-dark">이 매물 상담하기</a>
              </div>
            </article>
          </Reveal>
          <div className="flex flex-col gap-4">
            {[
              { img: "pick-1", tag: "전수창업", loc: "달서구", title: "분위기 좋은 베이커리 카페", desc: "소규모 제조·카페 겸업. 레시피 및 인테리어 가이드 포함", cta: "상담 문의" },
              { img: "pick-2", tag: "상가매물", loc: "중구", title: "대구 도심 코너 상가 1층", desc: "유동인구 多, 카페·음식점 적합. 즉시 입점 가능", cta: "상담 문의" },
            ].map((p, i) => (
              <Reveal key={p.title} delay={0.1 + i * 0.1} className="flex-1">
                <motion.article whileHover={{ x: 4 }} className="flex h-full overflow-hidden rounded-lg bg-white shadow-sm">
                  <div className="w-[7.5rem] shrink-0"><Placeholder /></div>
                  <div className="flex flex-col justify-center p-4">
                    <div className="flex gap-1.5 text-[0.75rem] font-bold">
                      <span className={`rounded px-1.5 py-0.5 text-white ${kindBadge[p.tag]}`}>{p.tag}</span>
                      <span className="rounded bg-neutral-100 px-1.5 py-0.5 text-neutral-600">{p.loc}</span>
                    </div>
                    <h3 className="mt-2 text-[0.875rem] font-black">{p.title}</h3>
                    <p className="mt-1.5 text-[0.75rem] text-neutral-500"><RichText text={p.desc} /></p>
                    <a href="#consult" className="mt-2 text-[0.75rem] font-bold text-brand">{p.cta} →</a>
                  </div>
                </motion.article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// 버튼 이름 → 매물 유형(kind). 전수창업이 가장 먼저 노출된다
export const ICON = { fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round", strokeLinejoin: "round" } as const;
export const filters = [
  { label: "전수창업", kind: "전수창업", more: "전수창업 자세히 보기", icon: <><path d="M4 8h15M15 4l4 4-4 4" /><path d="M20 16H5M9 12l-4 4 4 4" /></> },
  { label: "프랜차이즈창업", kind: "프랜차이즈", more: "브랜드 자세히 보기", icon: <><path d="M3 9l1.5-5h15L21 9" /><path d="M3 9c0 1.7 1.3 3 3 3s3-1.3 3-3c0 1.7 1.3 3 3 3s3-1.3 3-3c0 1.7 1.3 3 3 3s3-1.3 3-3" /><path d="M5 12v8h14v-8" /><path d="M10 20v-5h4v5" /></> },
  { label: "상가매물", kind: "상가매물", more: "매물 자세히 보기", icon: <><path d="M12 21s-7-6.2-7-11.2A7 7 0 0 1 19 9.8C19 14.8 12 21 12 21z" /><circle cx="12" cy="10" r="2.5" /></> },
  { label: "신규창업", kind: "신규창업", more: "창업 자세히 보기", icon: <><path d="M9 18h6M10 21h4" /><path d="M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2.1h5c0-.9.4-1.6 1-2.1A6 6 0 0 0 12 3z" /></> },
];

// 홈 "새롭게 등록된 창업 정보" 카드: 사진 / 가운데 큰 제목 / 짧은 설명 / 자세히 보기
// 카드·목록 줄이 함께 쓰는 표시 정보 (제목·설명)
function cardInfo(l: Listing) {
  const shop = l.shop ?? (l.kind === "상가매물" ? shops[l.id] : undefined);
  const t = l.kind === "전수창업" ? transferOf(l) : undefined;
  const c = l.kind === "신규창업" ? startupOf(l) : undefined;
  const brand = l.kind === "프랜차이즈" ? (l.promo?.brand ?? franchises[l.id]?.brand) : undefined;
  // 전수창업 카드 제목은 사부 이름이 아니라 대표 메뉴 (두 개까지, 더 있으면 ' 등')
  const menus = t?.menuNames ?? [];
  const menuTitle = menus.length ? menus.slice(0, 2).join(", ") + (menus.length > 2 ? " 등" : "") : undefined;
  const title = brand ?? c?.title ?? menuTitle ?? l.title;
  const desc = brand ? (l.promo?.desc || l.title) : c ? c.summary : t ? `${t.master.name} 사부의 전수메뉴` : (shop?.desc || `${l.region} · ${shop?.buildingType ?? l.category}`);
  const address = l.kind === "상가매물" ? shop?.address : undefined; // 상가매물 소재지
  return { title, desc, brand, address };
}

export function NewCard({ l, i, fluid = false }: { l: Listing; i: number; fluid?: boolean }) {
  const { title, desc, brand, address } = cardInfo(l);
  return (
    <Reveal delay={Math.min(i, 8) * 0.05} className={fluid ? "" : "w-[16.25rem] shrink-0 snap-start sm:w-[17.5rem] lg:w-auto"}>
      <motion.a href={`/listings/${l.id}`} whileHover={{ y: -6 }} className="flex h-full flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm transition-shadow hover:shadow-xl">
        <div className={`relative bg-neutral-100 ${fluid ? "h-[9.375rem] sm:h-[13rem]" : "h-[9.375rem] sm:h-[10.625rem]"}`}>
          {l.photos ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={l.thumb ?? photoSrc(l.id, 1)} alt={l.title} className="absolute inset-0 size-full object-cover" />
          ) : null}
          {l.sold && l.kind !== "전수창업" && <div className="absolute inset-0 grid place-items-center bg-black/55 text-[0.9375rem] font-bold text-white">계약완료</div>}
        </div>
        <div className="flex flex-1 flex-col px-5 pb-4 pt-5">
          <h3 className="line-clamp-1 text-center font-gmarket text-[1.25rem] font-bold tracking-tight">{title}</h3>
          {address && (
            <p className="mt-1.5 flex items-center justify-center gap-1 text-center text-[0.8125rem] text-neutral-500">
              <svg viewBox="0 0 24 24" aria-hidden className="size-[0.875rem] shrink-0 text-[#D49F12]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 21s-7-6.2-7-11.2A7 7 0 0 1 19 9.8C19 14.8 12 21 12 21z" /><circle cx="12" cy="10" r="2.5" /></svg>
              <span className="line-clamp-1">{address}</span>
            </p>
          )}
          <p className="mt-2 line-clamp-2 min-h-[2.625rem] text-center text-[0.875rem] leading-relaxed text-[#2d2d2d]">{brand ? <RichText text={desc.replace(/\s*\n\s*/g, " ")} max={40} /> : desc}</p>
          {(() => {
            // 아래 줄: "자세히 보기" 대신 핵심 금액을 보여준다 (금액 정보가 없으면 자세히 보기)
            const price = priceInfo(l);
            return price ? (
              <div className="mt-auto flex items-center justify-between gap-2 border-t border-neutral-100 pt-3.5 text-[0.875rem]">
                <span className="shrink-0 text-neutral-500">{price.label}</span>
                <span className="line-clamp-1 font-gmarket font-bold text-[#D49F12]">{price.value}</span>
              </div>
            ) : (
              <div className="mt-auto flex items-center justify-between border-t border-neutral-100 pt-3.5 text-[0.875rem] font-bold text-ink">
                <span>자세히 보기</span><span aria-hidden className="text-[1.25rem] leading-none">→</span>
              </div>
            );
          })()}
        </div>
      </motion.a>
    </Reveal>
  );
}

// 목록 줄 오른쪽에 보여줄 핵심 금액 (유형마다 기준이 달라 이름표와 값을 함께 만든다)
function priceInfo(l: Listing): { label: string; value: string } | undefined {
  const shop = l.shop ?? (l.kind === "상가매물" ? shops[l.id] : undefined);
  if (l.kind === "프랜차이즈") return { label: "창업비용", value: l.price > 0 ? `약 ${won(l.price)}원` : "본사와 협의" };
  if (l.kind === "신규창업") return { label: "컨설팅 비용", value: `약 ${won(l.cost)}원` };
  if (l.kind === "전수창업") return { label: "전수 비용", value: `약 ${won(l.price)}원` };
  if (shop && shop.premium !== undefined) {
    return { label: "권리금", value: shop.premiumLabel ?? (shop.premium === 0 ? (shop.showZero ? "없음" : "무권리") : `${won(shop.premium)}원`) };
  }
  return l.price > 0 ? { label: "금액", value: `${won(l.price)}원` } : undefined;
}

// 매물 목록 페이지의 가로형 줄: 왼쪽 사진 / 제목 / 설명 / 지역·업종 / 오른쪽 핵심 금액
export function ListingRow({ l, i }: { l: Listing; i: number }) {
  const { title, desc, brand, address } = cardInfo(l);
  const meta = [address ?? l.region, l.category].filter(Boolean).join(" · ");
  const price = priceInfo(l);
  return (
    <Reveal delay={Math.min(i, 8) * 0.04}>
      <motion.a href={`/listings/${l.id}`} whileHover={{ y: -2 }} className="group flex h-[8.375rem] items-stretch overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-sm transition-shadow hover:border-[#F0C33F] hover:shadow-lg sm:h-[9.375rem]">
        <div className="relative w-[6.5rem] shrink-0 bg-neutral-100 sm:w-[10rem]">
          {l.photos ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={l.thumb ?? photoSrc(l.id, 1)} alt={l.title} className="absolute inset-0 size-full object-cover" />
          ) : null}
          {l.sold && l.kind !== "전수창업" && <div className="absolute inset-0 grid place-items-center bg-black/55 text-[0.8125rem] font-bold text-white">계약완료</div>}
        </div>
        <div className="flex min-w-0 flex-1 items-center gap-4 px-4 sm:px-6">
          <div className="min-w-0 flex-1">
            <h3 className="line-clamp-1 font-gmarket text-[1rem] font-bold tracking-tight transition-colors group-hover:text-[#D49F12] sm:text-[1.125rem]">{title}</h3>
            <p className="mt-1 line-clamp-2 text-[0.8125rem] leading-relaxed text-[#2d2d2d] sm:text-[0.875rem]">{brand ? <RichText text={desc.replace(/\s*\n\s*/g, " ")} max={60} /> : desc}</p>
            <p className="mt-1 line-clamp-1 text-[0.75rem] text-neutral-500">
              {meta}
              {price && <span className="font-bold text-[#D49F12] sm:hidden lg:inline">{meta ? " · " : ""}{price.label} {price.value}</span>}
            </p>
          </div>
          <div className="hidden w-[11rem] shrink-0 self-stretch border-l border-neutral-200 pl-6 sm:flex sm:flex-col sm:justify-center sm:text-right lg:hidden">
            {price && (
              <>
                <p className="text-[0.75rem] text-neutral-500">{price.label}</p>
                <p className="mt-0.5 line-clamp-1 font-gmarket text-[1.0625rem] font-bold tabular-nums text-[#D49F12]">{price.value}</p>
              </>
            )}
          </div>
        </div>
      </motion.a>
    </Reveal>
  );
}

export function NewListings() {
  const [active, setActive] = useState(filters[0].kind);
  // 관리자에서 등록한 상가매물도 함께 보여준다
  const [remote, setRemote] = useState<Listing[]>([]);
  useEffect(() => { fetchRemoteListings().then(setRemote); }, []);
  // 등록일(date)이 있는 매물은 7일이 지나면 제외, 없는 매물은 그대로 노출 (날짜 비교는 브라우저에서만)
  const today = useToday();
  const fresh = (d?: string) => !d || !today || (new Date(today).getTime() - new Date(d).getTime()) / 86400000 <= 7;

  const list = withNew([...remote, ...listings])
    .sort(byNewest)
    .filter((l) => !l.sold && l.kind === active && fresh(l.date))
    .slice(0, 8);

  return (
    <section id="new" className="bg-[#f5f2f2]">
    <div className="mx-auto max-w-[80rem] px-6 pb-16 pt-6">
      <Reveal>
        <div>
          <p className="flex items-center gap-2.5 text-[0.75rem] font-bold tracking-[0.16em] text-[#2d2d2d] md:text-[0.875rem]">
            <span className="rounded bg-[#F0C33F] px-2.5 py-0.5 text-[0.75rem] font-black tracking-wider text-ink md:text-[0.875rem]">NEW</span>LATEST UPDATES
          </p>
          <div className="mt-2 flex flex-wrap items-center justify-between gap-x-4 gap-y-3">
            <h2 className="font-gmarket text-[1.75rem] font-bold leading-[1.25] tracking-tight md:text-[2.125rem]">
              새롭게 등록된 <span style={{ color: "#D49F12" }}>창업</span> 정보
            </h2>
            <Link href={`/listings?type=${active}`} className="inline-flex items-center gap-2 rounded-full border border-ink px-5 py-1.5 font-gmarket text-[0.875rem] font-bold text-ink transition hover:bg-ink hover:text-white">
              전체보기 <span aria-hidden className="text-[1rem] leading-none">→</span>
            </Link>
          </div>
          <p className="mt-3 font-gmarket text-[0.9375rem] font-medium leading-relaxed text-[#2d2d2d] md:text-[0.9375rem]">구해줘창업의 새로운 매물과 창업 소식을 확인해보세요.</p>
          <div className="mt-3 h-1.5 w-16 rounded-full" style={{ background: NEON }} />
        </div>
      </Reveal>
      <div className="mt-5 grid grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:justify-center sm:gap-2">
        {filters.map((f) => (
          <button key={f.kind} onClick={() => setActive(f.kind)} className={`inline-flex cursor-pointer items-center justify-center gap-1.5 rounded-full border py-1.5 pl-3.5 pr-4 font-gmarket text-[0.8125rem] font-bold transition ${active === f.kind ? "border-ink bg-ink text-white" : "border-ink/70 bg-white text-ink hover:bg-neutral-100"}`}>
            <svg viewBox="0 0 24 24" aria-hidden className="size-4 shrink-0" {...ICON}>{f.icon}</svg>{f.label}
          </button>
        ))}
      </div>
      <div className="mt-5 -mx-6 flex min-h-[18.75rem] snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-4 lg:mx-0 lg:grid lg:grid-cols-4 lg:items-stretch lg:overflow-visible lg:px-0 lg:pb-0">
        {list.length === 0 && <p className="w-full py-20 lg:col-span-4 text-center text-[0.875rem] text-neutral-400">해당 유형의 신규 매물이 아직 없습니다</p>}
        {list.map((l, i) => <NewCard key={l.id} l={l} i={i} />)}
      </div>
    </div>
    </section>
  );
}
