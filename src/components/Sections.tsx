"use client";
import { useState } from "react";
import { motion } from "motion/react";
import { categories, newListings } from "@/lib/data";
import { Reveal } from "./Reveal";

const toneCls = {
  brand: { badge: "bg-brand", link: "bg-orange-50 text-brand", icon: "text-brand" },
  brown: { badge: "bg-[#7a4a2b]", link: "bg-[#f4ebe4] text-[#7a4a2b]", icon: "text-[#7a4a2b]" },
  green: { badge: "bg-emerald-700", link: "bg-emerald-50 text-emerald-700", icon: "text-emerald-700" },
  blue: { badge: "bg-blue-700", link: "bg-blue-50 text-blue-700", icon: "text-blue-700" },
} as const;

function Placeholder({ dark = false }: { dark?: boolean }) {
  return <div className={`size-full ${dark ? "bg-neutral-800" : "bg-neutral-100"}`} />;
}

function SectionHead({ eyebrow, title, sub, more, badge }: { eyebrow?: string; title: string; sub?: string; more: string; badge?: React.ReactNode }) {
  return (
    <div className="flex items-end justify-between">
      <div>
        {badge ?? <p className="text-[11px] font-bold text-brand">{eyebrow}</p>}
        <h2 className="mt-2 text-[30px] font-black tracking-tight">{title}</h2>
        {sub && <p className="mt-2 text-[13px] text-neutral-500">{sub}</p>}
      </div>
      <a href="/listings" className="pb-1 text-[12px] font-bold text-brand">{more} →</a>
    </div>
  );
}

export function Categories() {
  return (
    <section className="mx-auto max-w-[1280px] px-6 py-16">
      <Reveal><SectionHead eyebrow="창업 유형별 탐색" title="업종별 창업 매물" more="전체 매물 보기" /></Reveal>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {categories.map((c, i) => {
          const t = toneCls[c.tone];
          return (
            <Reveal key={c.title} delay={i * 0.08}>
              <motion.a href="/listings" whileHover={{ y: -6 }} className="block overflow-hidden rounded-lg border border-neutral-200 bg-white shadow-sm transition-shadow hover:shadow-lg">
                <div className="relative h-[178px] overflow-hidden">
                  <Placeholder />
                  <span className={`absolute left-2.5 top-2.5 rounded px-2 py-0.5 text-[10px] font-bold text-white ${t.badge}`}>{c.tag}</span>
                </div>
                <div className="p-4">
                  <h3 className="text-[16px] font-black">{c.title}</h3>
                  <p className="mt-2.5 min-h-[58px] text-[11.5px] leading-relaxed text-neutral-500">{c.desc}</p>
                  <div className="mt-3 flex items-center justify-between border-t border-neutral-100 pt-3 text-[10.5px] text-neutral-400">
                    <span>{c.foot}</span>
                    <span className={`rounded-full px-2.5 py-1 font-bold ${t.link}`}>보러가기</span>
                  </div>
                </div>
              </motion.a>
            </Reveal>
          );
        })}
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
            sub="전문 컨설턴트가 직접 선별한 이번 달의 추천 창업 컨텐츠입니다."
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
                  <span className="rounded bg-black/55 px-2 py-0.5">전수창업</span>
                </div>
                <div className="absolute bottom-4 left-5 text-white">
                  <p className="text-[11px] text-white/70">수성구 · 전세전문점</p>
                  <h3 className="mt-1 text-[22px] font-black">오래된 단골 손님이 있는 국밥집</h3>
                </div>
              </div>
              <div className="p-5">
                <p className="text-[12.5px] text-neutral-600">25년 운영 노하우와 단골 고객을 함께 이어받을 수 있는 전수창업 매물. 레시피·운영방식 상세 교육 포함.</p>
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
              { img: "pick-1", tag: "전수창업", loc: "달서구", title: "분위기 좋은 베이커리 카페", desc: "소규모 제조·카페 겸업. 레시피 및 인테리어 가이드 포함.", cta: "상담 문의" },
              { img: "pick-2", tag: "상가매물", loc: "중구", title: "대구 도심 코너 상가 1층", desc: "유동인구 多, 카페·음식점 적합. 즉시 입점 가능.", cta: "상담 문의" },
            ].map((p, i) => (
              <Reveal key={p.title} delay={0.1 + i * 0.1} className="flex-1">
                <motion.article whileHover={{ x: 4 }} className="flex h-full overflow-hidden rounded-lg bg-white shadow-sm">
                  <div className="w-[120px] shrink-0"><Placeholder /></div>
                  <div className="flex flex-col justify-center p-4">
                    <div className="flex gap-1.5 text-[9.5px] font-bold">
                      <span className="rounded bg-neutral-100 px-1.5 py-0.5 text-neutral-600">{p.tag}</span>
                      <span className="rounded bg-neutral-100 px-1.5 py-0.5 text-neutral-600">{p.loc}</span>
                    </div>
                    <h3 className="mt-2 text-[14px] font-black">{p.title}</h3>
                    <p className="mt-1.5 text-[11px] text-neutral-500">{p.desc}</p>
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

const filters = ["전체", "한식·분식", "카페·음료", "베이커리·디저트", "프랜차이즈", "기타 업종"];
const filterOf: Record<string, string[]> = {
  "한식·분식": ["한식"], "카페·음료": ["카페"], "베이커리·디저트": ["베이커리"], 프랜차이즈: ["프랜차이즈"], "기타 업종": [],
};

export function NewListings() {
  const [active, setActive] = useState("전체");
  const list = newListings.filter((l) => active === "전체" || (filterOf[active] ?? []).some((k) => l.meta.includes(k)));

  return (
    <section id="new" className="mx-auto max-w-[1280px] px-6 py-16">
      <Reveal>
        <SectionHead
          badge={<p className="flex items-center gap-2 text-[11px]"><span className="rounded bg-blue-800 px-2 py-0.5 font-bold text-white">NEW</span><span className="text-neutral-400">최근 7일 내 등록</span></p>}
          title="신규 등록"
          more="전체 매물 보기"
        />
      </Reveal>
      <div className="mt-6 flex flex-wrap gap-2">
        {filters.map((f) => (
          <button key={f} onClick={() => setActive(f)} className={`rounded-full border px-4 py-1.5 text-[12px] transition ${active === f ? "border-ink bg-ink font-bold text-white" : "border-neutral-300 text-neutral-600 hover:border-brand hover:text-brand"}`}>{f}</button>
        ))}
      </div>
      <div className="mt-6 grid min-h-[300px] gap-4 md:grid-cols-3">
        {list.length === 0 && <p className="col-span-3 py-20 text-center text-[13px] text-neutral-400">해당 업종의 신규 매물이 아직 없습니다.</p>}
        {list.map((l, i) => (
          <motion.article key={l.title} layout initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }} whileHover={{ y: -6 }} className="self-start overflow-hidden rounded-lg border border-neutral-200 bg-white shadow-sm transition-shadow hover:shadow-lg">
            <div className="relative h-[170px] overflow-hidden">
              <Placeholder />
              <div className="absolute left-2.5 top-2.5 flex gap-1.5 text-[10px] font-bold text-white">
                <span className="rounded bg-blue-800 px-2 py-0.5">NEW</span>
                <span className="rounded bg-black/55 px-2 py-0.5">{l.tag}</span>
              </div>
            </div>
            <div className="p-4">
              <p className="text-[10.5px] text-neutral-400">{l.meta}</p>
              <h3 className="mt-1.5 text-[15px] font-black">{l.title}</h3>
              <p className="mt-1.5 text-[11px] text-neutral-500">{l.info}</p>
              <div className="mt-4 flex items-center justify-between border-t border-neutral-100 pt-3 text-[10.5px] text-neutral-400">
                <span>{l.price}</span>
                <a href="#consult" className="rounded bg-orange-50 px-2.5 py-1 font-bold text-brand">문의하기</a>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
