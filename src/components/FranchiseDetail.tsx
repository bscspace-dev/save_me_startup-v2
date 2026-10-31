import Link from "next/link";
import { won, type Listing } from "@/lib/data";
import type { FranchiseInfo } from "@/lib/franchise";
import { FranchiseGallery } from "./FranchiseGallery";
import { BrandLogo } from "./BrandLogo";
import { MenuPhoto } from "./MenuPhoto";
import { ListingConsultButton } from "./ListingConsultButton";
import { Icon } from "./Icons";
import { Head, ProfitPanel, card, inner, man } from "./DetailParts";
const sum = (rows: { amount: number }[]) => rows.reduce((a, r) => a + r.amount, 0);

const baseTabs = [
  ["브랜드 경쟁력", "#strengths"],
  ["대표 메뉴", "#menu"],
  ["창업 모델", "#model"],
  ["예상 수익", "#profit"],
  ["창업 비용", "#cost"],
] as const;

const FTC = "https://franchise.ftc.go.kr"; // 공정거래위원회 가맹사업정보제공시스템

export function FranchiseDetail({ l, f }: { l: Listing; f: FranchiseInfo }) {
  const tabs: (readonly [string, string])[] = f.facts ? [["브랜드 현황", "#facts"], ...baseTabs] : [...baseTabs];
  const startupTotal = sum(f.startupLeft) + sum(f.startupRight);
  const infoRows = [
    ["브랜드", f.brand],
    ["업종", `${f.group} · ${f.sector}`],
    ["모집지역", f.area],
    ["추천상권", f.place],
    ["운영모델", f.opModel],
    ["예상 창업비", `약 ${won(startupTotal)}원`],
  ];
  const modelStats = [
    ["표준 면적", f.model.size],
    ["권장 좌석", f.model.seats],
    ["적합 상권", f.model.place],
    ["예상 월매출", f.model.sales],
  ];
  const modelInfo = [
    ["user", "권장 인원", f.model.staff],
    ["clock", "권장 영업시간", f.model.hours],
    ["pan", "평균 조리시간", f.model.cook],
  ];

  return (
    <main className="bg-[#f7f6f4] pb-24">
      <div className="mx-auto max-w-[1100px] px-6 pt-8">
        <p className="text-[11.5px] text-neutral-500">
          <Link href="/listings?type=프랜차이즈" className="transition hover:text-brand">← 목록으로</Link>
        </p>

        {/* 상단 요약 */}
        <section className="mt-4 grid overflow-hidden rounded-3xl border border-neutral-200 bg-white lg:grid-cols-[1.35fr_1fr]">
          <FranchiseGallery slides={f.gallery} badges={[l.rec ? "추천 브랜드" : "프랜차이즈", "신규 가맹 모집", ...(f.sponsored ? ["광고"] : [])]} photos={{ id: l.id, count: l.photos ?? 0 }} />
          <div className="p-8 md:p-10">
            <BrandLogo src={`/listings/${l.id}/logo.png`} alt={`${f.brand} 로고`} />
            <p className="text-[11px] font-bold tracking-[0.14em] text-brand">{f.eyebrow}</p>
            <h1 className="mt-4 text-[30px] font-black leading-[1.25] tracking-tight">{f.headline[0]}<br /><span className="text-brand">{f.headline[1]}</span></h1>
            <p className="mt-4 text-[13px] leading-relaxed text-neutral-500">{f.desc}</p>
            <dl className="mt-7 divide-y divide-neutral-100 border-t border-neutral-100 text-[12.5px]">
              <div className="flex py-3.5"><dt className="w-[84px] shrink-0 text-neutral-400">등록번호</dt><dd className="font-bold">{l.id}</dd></div>
              {infoRows.map(([k, v]) => (
                <div key={k} className="flex py-3.5"><dt className="w-[84px] shrink-0 text-neutral-400">{k}</dt><dd className="font-bold">{v}</dd></div>
              ))}
            </dl>
            {l.sold ? (
              <p className="mt-5 rounded-lg bg-neutral-100 py-4 text-center text-[13.5px] font-bold text-neutral-500">모집이 마감된 브랜드입니다</p>
            ) : (
              <ListingConsultButton id={l.id} kind="가맹상담" title={`${f.brand} (${l.title})`} label="가맹 상담 신청하기  →" className="mt-5 block w-full rounded-lg bg-brand py-4 text-center text-[14px] font-bold text-white transition hover:bg-brand-dark" />
            )}
          </div>
        </section>

        {/* 섹션 이동 */}
        <nav className={`mt-5 grid grid-cols-2 divide-neutral-200 overflow-hidden rounded-2xl border border-neutral-200 bg-white text-center text-[13px] font-bold ${tabs.length > 5 ? "sm:grid-cols-6" : "sm:grid-cols-5"} sm:divide-x`}>
          {tabs.map(([label, href]) => (
            <a key={href} href={href} className="py-4 transition hover:bg-neutral-50 hover:text-brand">{label}</a>
          ))}
        </nav>

        <div className="mt-5 space-y-5">
          {/* 브랜드 현황 (정보공개서 기준, 제공된 경우에만) */}
          {f.facts && (
            <section id="facts" className={`${card} scroll-mt-24`}>
              <Head eyebrow="BRAND FACTS" title="브랜드 현황" />
              <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {([
                  ["설립", f.facts.since],
                  ["가맹점", `${f.facts.stores.toLocaleString()}개`],
                  ["직영점", `${f.facts.direct.toLocaleString()}개`],
                  ["본사", f.facts.hq],
                  ...(f.facts.opened !== undefined ? [["최근 1년 신규 개점", `${f.facts.opened.toLocaleString()}개`]] : []),
                  ...(f.facts.closed !== undefined ? [["최근 1년 계약 종료·해지", `${f.facts.closed.toLocaleString()}개`]] : []),
                ] as [string, string][]).map(([k, v]) => (
                  <div key={k} className={`${inner} p-5`}>
                    <p className="text-[10.5px] text-neutral-400">{k}</p>
                    <p className="mt-2 text-[16px] font-black">{v}</p>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-[11px] text-neutral-400">정보공개서 {f.facts.disclosure} 기준 · <a href={FTC} target="_blank" rel="noopener noreferrer" className="font-bold text-brand underline underline-offset-2">공정거래위원회 가맹사업정보제공시스템에서 확인 →</a></p>
            </section>
          )}

          {/* 브랜드 영상 */}
          {f.video && (
            <section className={card}>
              <Head eyebrow="BRAND FILM" title="브랜드 영상" />
              <div className="mt-7 aspect-video overflow-hidden rounded-xl bg-black">
                <iframe src={`https://www.youtube-nocookie.com/embed/${f.video}`} title={`${f.brand} 브랜드 영상`} loading="lazy" allow="encrypted-media; picture-in-picture" allowFullScreen className="size-full" />
              </div>
            </section>
          )}

          {/* 브랜드 경쟁력 */}
          <section id="strengths" className={`${card} scroll-mt-24`}>
            <Head eyebrow="WHY THIS BRAND" title="이 브랜드의 경쟁력" />
            <div className="mt-7 grid gap-4 md:grid-cols-3">
              {f.strengths.map((s, i) => (
                <div key={s.title} className={`${inner} p-6`}>
                  <p className="text-[11px] font-bold text-brand">{String(i + 1).padStart(2, "0")}</p>
                  <h3 className="mt-5 text-[15.5px] font-black">{s.title}</h3>
                  <p className="mt-2 text-[12px] leading-relaxed text-neutral-500">{s.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* 대표 메뉴 */}
          <section id="menu" className={`${card} scroll-mt-24`}>
            <Head eyebrow="SIGNATURE MENU" title="대표 메뉴" />
            <div className="mt-7 grid gap-4 md:grid-cols-3">
              {f.menus.map((m, i) => (
                <div key={m.name} className="flex flex-col overflow-hidden rounded-xl border border-neutral-200 bg-white p-6">
                  <MenuPhoto src={`/listings/${l.id}/menu-${i + 1}.jpg`} alt={m.name} />
                  <h3 className="flex items-center gap-2 text-[14.5px] font-black">
                    {m.name}
                    {m.badge && <span className="rounded bg-orange-50 px-1.5 py-0.5 text-[9px] font-bold text-brand">{m.badge}</span>}
                  </h3>
                  <p className="mt-2 text-[12px] text-neutral-400">{m.desc}</p>
                  <p className="mt-8 text-[17px] font-black">{m.price.toLocaleString()}원</p>
                </div>
              ))}
            </div>
          </section>

          {/* 표준 창업 모델 */}
          <section id="model" className={`${card} scroll-mt-24`}>
            <Head eyebrow="STANDARD MODEL" title="표준 창업 모델" />
            <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {modelStats.map(([k, v]) => (
                <div key={k} className={`${inner} p-5`}>
                  <p className="text-[10.5px] text-neutral-400">{k}</p>
                  <p className="mt-2 text-[16px] font-black">{v}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 grid gap-4 border-t border-neutral-100 pt-6 md:grid-cols-3">
              {modelInfo.map(([ic, k, v]) => (
                <div key={k} className="flex items-center gap-3 rounded-xl bg-[#faf9f7] px-5 py-4">
                  <Icon name={ic} className="size-5 shrink-0 text-brand" />
                  <div>
                    <p className="text-[10.5px] text-neutral-400">{k}</p>
                    <p className="mt-0.5 text-[12.5px] font-bold">{v}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 월 예상 순수익 */}
          <section id="profit" className={`${card} scroll-mt-24`}>
            <Head eyebrow="PROFIT ANALYSIS" title="월 예상 순수익" />
<ProfitPanel revenue={f.revenue} costs={f.costs} title="예상 월 순수익" rateLabel="예상 수익률" caption="점주 직접 운영 기준" />
            <p className="mt-4 text-[10.5px] text-neutral-400">{f.profitNote}</p>
          </section>

          {/* 가맹 조건 및 예상 비용 */}
          <section id="cost" className={`${card} scroll-mt-24`}>
            <Head eyebrow="STARTUP COST" title="가맹 조건 및 예상 비용" />
            <div className="mt-7 grid gap-3 md:grid-cols-2">
              <div className="rounded-xl bg-[#fff4ea] px-6 py-4">
                <p className="text-[10.5px] font-bold text-brand">산정 기준</p>
                <p className="mt-1 text-[13.5px] font-black">{f.basis}</p>
              </div>
              <div className="rounded-xl bg-neutral-100 px-6 py-4">
                <p className="text-[10.5px] text-neutral-400">월 정기 가맹 비용</p>
                <p className="mt-1 text-[13.5px] font-black">{f.royalty}</p>
              </div>
            </div>
            <div className="mt-4 overflow-hidden rounded-xl border border-neutral-200">
              <div className="grid bg-white text-[12.5px] md:grid-cols-2 md:divide-x md:divide-neutral-100">
                {[f.startupLeft, f.startupRight].map((col, ci) => (
                  <div key={ci} className="divide-y divide-neutral-100">
                    {col.map((r) => (
                      <div key={r.label} className="flex items-center justify-between px-6 py-4">
                        <span className="text-neutral-500">{r.label}</span>
                        <b>{man(r.amount)}</b>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-between bg-ink px-6 py-5 text-white">
                <div>
                  <p className="text-[11px] font-bold">총 예상 창업비</p>
                  <p className="mt-0.5 text-[10px] text-white/60">VAT·점포 임차비 별도</p>
                </div>
                <p className="text-[22px] font-black">약 {won(startupTotal)}원</p>
              </div>
            </div>
            <p className="mt-4 rounded-lg bg-[#faf9f7] px-5 py-3.5 text-[10.5px] text-neutral-400">{f.startupNote}</p>
          </section>

          {/* 광고·정보공개서 안내 */}
          <aside className="rounded-2xl border border-neutral-200 bg-white px-6 py-5 text-[11px] leading-relaxed text-neutral-400">
            {f.sponsored && <p className="mb-1.5 font-bold text-neutral-600">이 페이지는 가맹본부의 의뢰로 제작된 광고입니다</p>}
            <p>표시된 예상 수익·비용 등 수치는 가맹본부가 제공한 자료와 예상치이며 실제와 다를 수 있습니다. 가맹계약 전 반드시 가맹본부의 정보공개서를 확인하세요. (<a href={FTC} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-brand">가맹사업정보제공시스템 franchise.ftc.go.kr</a>)</p>
          </aside>
        </div>
      </div>
    </main>
  );
}
