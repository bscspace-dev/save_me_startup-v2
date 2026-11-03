"use client";
import { RichText } from "./RichText";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import Link from "next/link";
import { categories, kindBadge, listings, withNew, type Listing } from "@/lib/data";
import { fetchRemoteListings } from "@/lib/remote";
import { useToday } from "@/lib/today";
import { ListingCard } from "./ListingCard";
import { Reveal } from "./Reveal";

const NEON = "#d3ff31"; // 업종별 카드의 포인트(네온) 색
// 글씨 테두리(어두운 색): 글자는 네온, 바깥을 8방향 그림자로 둘러싼다
const OUTLINE = [[2,0],[-2,0],[0,2],[0,-2],[1.5,1.5],[-1.5,1.5],[1.5,-1.5],[-1.5,-1.5]].map(([x, y]) => `${x}px ${y}px 0 #1b1b1b`).join(", ");

function Placeholder({ dark = false }: { dark?: boolean }) {
  return <div className={`size-full ${dark ? "bg-neutral-800" : "bg-neutral-100"}`} />;
}

function SectionHead({ eyebrow, title, sub, more, badge, href = "/listings" }: { eyebrow?: string; title: string; sub?: string; more?: string; badge?: React.ReactNode; href?: string }) {
  return (
    <div className="flex items-end justify-between">
      <div>
        {badge ?? <p className="text-[11px] font-bold text-brand">{eyebrow}</p>}
        <h2 className="mt-2 text-[30px] font-black tracking-tight">{title}</h2>
        {sub && <p className="mt-2 text-[13px] text-neutral-500">{sub}</p>}
      </div>
      {more && <Link href={href} className="pb-1 text-[12px] font-bold text-brand">{more} →</Link>}
    </div>
  );
}

export function Categories() {
  return (
    <section className="bg-[#faf9f7]">
      <div className="mx-auto max-w-[1280px] px-6 py-16">
        <Reveal>
          <p className="flex items-center gap-2.5 text-[13px] font-bold tracking-[0.16em] text-neutral-700 md:text-[16px]">
            <span className="h-[1.1em] w-[4px] rounded-sm" style={{ background: NEON }} />STARTUP CATEGORY
          </p>
          <h2 className="mt-3 font-gmarket text-[38px] font-bold leading-[1.25] tracking-tight md:text-[58px]">
            어떤 <span style={{ color: NEON, textShadow: OUTLINE }}>창업</span>을 찾고 계신가요?
          </h2>
          <p className="mt-4 font-gmarket text-[17px] font-medium leading-relaxed text-[#2d2d2d] md:text-[20px]">관심 있는 분야를 선택하고, 내게 맞는 창업 정보를 확인해보세요.</p>
          <div className="mt-5 h-1.5 w-16 rounded-full" style={{ background: NEON }} />
        </Reveal>
        {/* 큰 화면은 4칸, 작은 화면은 옆으로 밀어서 본다 */}
        <div className="-mx-6 mt-9 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-4 lg:mx-0 lg:grid lg:grid-cols-4 lg:overflow-visible lg:px-0 lg:pb-0">
          {categories.map((c, i) => (
            <Reveal key={c.title} delay={i * 0.08} className="w-[260px] shrink-0 snap-start sm:w-[280px] lg:w-auto">
              <motion.a href={`/listings?type=${c.tag}`} whileHover={{ y: -6 }} className="flex h-full flex-col rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-xl">
                <span className="self-start rounded bg-ink px-2 py-1 text-[10px] font-black tracking-wider" style={{ color: NEON }}>{c.en}</span>
                <div className="grid h-[172px] place-items-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={c.img} alt="" aria-hidden className="size-[156px] object-contain" />
                </div>
                <h3 className="text-center text-[20px] font-black tracking-tight">{c.title}</h3>
                <p className="mt-2.5 min-h-[58px] text-center text-[14.5px] leading-relaxed text-neutral-500">{c.desc}</p>
                <div className="mt-auto flex items-center justify-between gap-2 border-t border-neutral-100 pt-3.5 text-[10.5px] text-neutral-400">
                  <span className="flex min-w-0 items-center gap-1.5"><span className="size-1.5 shrink-0 rounded-full" style={{ background: NEON }} /><span className="truncate">{c.foot}</span></span>
                  <span className="shrink-0 rounded-full px-3 py-1.5 text-[11px] font-black text-ink" style={{ background: NEON }}>둘러보기 →</span>
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
      <div className="mx-auto max-w-[1280px] px-6 py-16">
        <Reveal>
          <SectionHead
            badge={<span className="inline-block rounded bg-brand px-2 py-0.5 text-[10px] font-bold text-white">구해줘창업 PICK</span>}
            title="이달의 추천 창업"
            sub="전문 컨설턴트가 직접 선별한 이번 달의 추천 창업 컨텐츠입니다"
            more="전체 Pick 보기"
          />
        </Reveal>
        <div className="mt-8 grid gap-4 lg:grid-cols-[1.35fr_1fr]">
          <Reveal>
            <article className="overflow-hidden rounded-lg bg-white shadow-sm">
              <div className="relative h-[270px] overflow-hidden bg-[#2a211b]">
                <Placeholder dark />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/10" />
                <div className="absolute left-3 top-3 flex gap-1.5 text-[10px] font-bold text-white">
                  <span className="rounded bg-brand px-2 py-0.5">PICK</span>
                  <span className={`rounded px-2 py-0.5 ${kindBadge["전수창업"]}`}>전수창업</span>
                </div>
                <div className="absolute bottom-4 left-5 text-white">
                  <p className="text-[11px] text-white/70">수성구 · 전세전문점</p>
                  <h3 className="mt-1 text-[22px] font-black">오래된 단골 손님이 있는 국밥집</h3>
                </div>
              </div>
              <div className="p-5">
                <p className="text-[12.5px] text-neutral-600">25년 운영 노하우와 단골 고객을 함께 이어받을 수 있는 전수창업 매물. 레시피·운영방식 상세 교육 포함</p>
                <dl className="mt-4 flex gap-8 text-[11px]">
                  {[["면적", "약 49㎡"], ["전수비", "협의 후 결정"], ["업종", "한식·탕·국밥"]].map(([k, v]) => (
                    <div key={k}><dt className="text-neutral-400">{k}</dt><dd className="mt-0.5 text-[13px] font-bold">{v}</dd></div>
                  ))}
                </dl>
                <a href="#consult" className="mt-5 block rounded bg-brand py-3 text-center text-[13px] font-bold text-white transition hover:bg-brand-dark">이 매물 상담하기</a>
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
                  <div className="w-[120px] shrink-0"><Placeholder /></div>
                  <div className="flex flex-col justify-center p-4">
                    <div className="flex gap-1.5 text-[9.5px] font-bold">
                      <span className={`rounded px-1.5 py-0.5 text-white ${kindBadge[p.tag]}`}>{p.tag}</span>
                      <span className="rounded bg-neutral-100 px-1.5 py-0.5 text-neutral-600">{p.loc}</span>
                    </div>
                    <h3 className="mt-2 text-[14px] font-black">{p.title}</h3>
                    <p className="mt-1.5 text-[11px] text-neutral-500"><RichText text={p.desc} /></p>
                    <a href="#consult" className="mt-2 text-[11px] font-bold text-brand">{p.cta} →</a>
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
const filters = [
  { label: "전수창업", kind: "전수창업" },
  { label: "프랜차이즈창업", kind: "프랜차이즈" },
  { label: "상가매물", kind: "상가매물" },
  { label: "신규창업", kind: "신규창업" },
];
export function NewListings() {
  const [active, setActive] = useState(filters[0].kind);
  // 관리자에서 등록한 상가매물도 함께 보여준다
  const [remote, setRemote] = useState<Listing[]>([]);
  useEffect(() => { fetchRemoteListings().then(setRemote); }, []);
  // 등록일(date)이 있는 매물은 7일이 지나면 제외, 없는 매물은 그대로 노출 (날짜 비교는 브라우저에서만)
  const today = useToday();
  const fresh = (d?: string) => !d || !today || (new Date(today).getTime() - new Date(d).getTime()) / 86400000 <= 7;

  const list = withNew([...remote, ...listings])
    .sort((a, b) => b.id - a.id)
    .filter((l) => !l.sold && l.kind === active && fresh(l.date))
    .slice(0, 6);

  return (
    <section id="new" className="mx-auto max-w-[1280px] px-6 py-16">
      <Reveal>
        <SectionHead
          badge={<p className="flex items-center gap-2 text-[11px]"><span className="rounded bg-blue-800 px-2 py-0.5 font-bold text-white">NEW</span><span className="text-neutral-400">최근 7일 내 등록</span></p>}
          title="신규 등록"
          more="전체 매물 보기"
          href={`/listings?type=${active}`}
        />
      </Reveal>
      <div className="mt-6 flex flex-wrap gap-2">
        {filters.map((f) => (
          <button key={f.kind} onClick={() => setActive(f.kind)} className={`rounded-full border px-4 py-1.5 text-[12px] transition ${active === f.kind ? "border-ink bg-ink font-bold text-white" : "border-neutral-300 text-neutral-600 hover:border-brand hover:text-brand"}`}>{f.label}</button>
        ))}
      </div>
      <div className="mt-6 grid min-h-[300px] items-start gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {list.length === 0 && <p className="col-span-3 py-20 text-center text-[13px] text-neutral-400">해당 유형의 신규 매물이 아직 없습니다</p>}
        {list.map((l, i) => <ListingCard key={l.id} l={l} i={i} />)}
      </div>
    </section>
  );
}
