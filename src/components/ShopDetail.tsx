import Link from "next/link";
import { won, type Listing } from "@/lib/data";
import { GALLERY, salesMonths, type ShopInfo } from "@/lib/shop";
import { FranchiseGallery } from "./FranchiseGallery";
import { ListingConsultButton } from "./ListingConsultButton";
import { Icon } from "./Icons";
import { Head, ProfitPanel, card, inner, man } from "./DetailParts";

const tabs = [
  ["매물 정보", "#info"],
  ["임대 조건", "#lease"],
  ["현재 현황", "#status"],
] as const;

const pyeong = (m2: number) => Math.round(m2 / 3.3058);

export function ShopDetail({ l, s }: { l: Listing; s: ShopInfo }) {
  const py = pyeong(l.area);
  const fixed = s.rent + s.maintenance;
  const avg = Math.round(s.sales.reduce((a, v) => a + v, 0) / s.sales.length);
  const max = Math.max(...s.sales);
  const dong = s.address.split(" ").slice(1).join(" ");

  const summary = [
    ["소재지", s.address],
    ["매물 유형", s.buildingType],
    ["면적", `전용 ${l.area}㎡ (약 ${py}평)`],
    ["권리금", man(s.premium)],
    ["해당 층", s.floor.split(" / ")[0]],
  ];
  const basic = [
    ["소재지", s.address], ["건축물 용도", s.buildingType],
    ["전용면적", `${l.area}㎡ (약 ${py}평)`], ["해당 층", s.floor],
    ["방향", s.direction], ["주차", s.parking],
    ["사용승인일", s.approved], ["입주 가능일", s.moveIn],
  ];
  const status = [
    ["user", "운영 형태", s.operation],
    ["clock", "영업시간", s.hours],
    ["store", "정기 휴무", s.closed],
    ["pan", "운영 기간", s.years],
  ];

  return (
    <main className="bg-[#f7f6f4] pb-24">
      <div className="mx-auto max-w-[1100px] px-6 pt-8">
        <p className="text-[11.5px] text-neutral-500">
          <Link href="/listings?type=상가매물" className="transition hover:text-brand">← 목록으로</Link>
        </p>

        {/* 상단 요약 */}
        <section className="mt-4 grid overflow-hidden rounded-3xl border border-neutral-200 bg-white lg:grid-cols-[1.35fr_1fr]">
          <FranchiseGallery slides={GALLERY} badges={[l.rec ? "추천 상가" : "상가매물", "실매물 확인"]} photos={{ id: l.id, count: l.photos ?? 0 }} />
          <div className="p-8 md:p-10">
            <p className="text-[11px] text-neutral-400">{s.address} | {s.shortType}</p>
            <h1 className="mt-3 text-[30px] font-black leading-[1.25] tracking-tight">{s.headline[0]}<br /><span className="text-brand">{s.headline[1]}</span></h1>
            <p className="mt-4 text-[13px] leading-relaxed text-neutral-500">{s.desc}</p>
            <div className="mt-5 rounded-xl bg-[#fff4ea] px-5 py-4">
              <p className="text-[10.5px] font-bold text-brand">임대 조건</p>
              <div className="mt-3 grid grid-cols-3 gap-2 text-center">
                {[["권리금", s.premium, true], ["보증금", s.deposit, false], ["월세", s.rent, false]].map(([k, v, hl]) => (
                  <div key={k as string} className={`rounded-lg px-2 py-3 ${hl ? "bg-brand text-white" : "bg-white"}`}>
                    <p className={`text-[10.5px] font-bold ${hl ? "text-white/80" : "text-neutral-400"}`}>{k as string}</p>
                    <p className={`mt-1 text-[18px] font-black tracking-tight ${hl ? "" : "text-brand"}`}>{(v as number).toLocaleString()}<span className="ml-0.5 text-[10px] font-bold">만원</span></p>
                  </div>
                ))}
              </div>
              <p className="mt-3 text-[10.5px] text-brand/80">관리비 {s.maintenance}만원 별도</p>
            </div>
            <dl className="mt-5 divide-y divide-neutral-100 text-[12.5px]">
              {summary.map(([k, v]) => (
                <div key={k} className="flex py-3.5"><dt className="w-[84px] shrink-0 text-neutral-400">{k}</dt><dd className="font-bold">{v}</dd></div>
              ))}
            </dl>
            {l.sold ? (
              <p className="mt-5 rounded-lg bg-neutral-100 py-4 text-center text-[13.5px] font-bold text-neutral-500">계약이 완료된 매물입니다</p>
            ) : (
              <ListingConsultButton id={l.id} title={`${dong} ${s.shortType} (${l.title})`} label="이 상가 문의하기  →" className="mt-5 block w-full rounded-lg bg-brand py-4 text-center text-[14px] font-bold text-white transition hover:bg-brand-dark" />
            )}
          </div>
        </section>

        {/* 핵심 수치 */}
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl border border-neutral-200 bg-white px-6 py-5">
            <p className="text-[10.5px] text-neutral-400">전용면적</p>
            <p className="mt-1.5 text-[24px] font-black tracking-tight">약 {py}평</p>
          </div>
          <div className="rounded-2xl border border-neutral-200 bg-white px-6 py-5">
            <p className="text-[10.5px] text-neutral-400">보증금</p>
            <p className="mt-1.5 text-[24px] font-black tracking-tight">{man(s.deposit)}</p>
          </div>
          <div className="rounded-2xl border border-neutral-200 bg-white px-6 py-5">
            <p className="text-[10.5px] text-neutral-400">월세</p>
            <p className="mt-1.5 text-[24px] font-black tracking-tight">{man(s.rent)}</p>
          </div>
          <div className="rounded-2xl border border-neutral-200 bg-white px-6 py-5">
            <p className="text-[10.5px] text-neutral-400">권리금</p>
            <p className="mt-1.5 text-[24px] font-black tracking-tight">{man(s.premium)}</p>
          </div>
        </div>

        {/* 섹션 이동 */}
        <nav className="mt-5 grid grid-cols-3 divide-x divide-neutral-200 overflow-hidden rounded-2xl border border-neutral-200 bg-white text-center text-[13px] font-bold">
          {tabs.map(([label, href]) => (
            <a key={href} href={href} className="py-4 transition hover:bg-neutral-50 hover:text-brand">{label}</a>
          ))}
        </nav>

        <div className="mt-5 space-y-5">
          {/* 매물 기본 정보 */}
          <section id="info" className={`${card} scroll-mt-24`}>
            <Head eyebrow="PROPERTY INFO" title="매물 기본 정보" />
            <dl className={`${inner} mt-7 grid bg-white text-[12.5px] md:grid-cols-2 md:[&>div:nth-child(odd)]:border-r`}>
              {basic.map(([k, v], i) => (
                <div key={k} className={`flex border-neutral-100 px-6 py-4 ${i < basic.length - 2 ? "border-b" : ""} ${i === basic.length - 2 ? "max-md:border-b" : ""}`}>
                  <dt className="w-[92px] shrink-0 text-neutral-400">{k}</dt><dd className="font-bold">{v}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-4 rounded-xl bg-[#fff4ea] px-6 py-5">
              <p className="text-[10.5px] font-bold text-brand">입지 포인트</p>
              <p className="mt-1.5 text-[12.5px] font-bold">{s.point}</p>
            </div>
          </section>

          {/* 임대 및 권리 조건 */}
          <section id="lease" className={`${card} scroll-mt-24`}>
            <Head eyebrow="LEASE TERMS" title="임대 및 권리 조건" />
            <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[["보증금", s.deposit, false], ["월세", s.rent, false], ["관리비", s.maintenance, false], ["권리금", s.premium, true]].map(([k, v, hl]) => (
                <div key={k as string} className={`rounded-xl border p-5 ${hl ? "border-orange-200 bg-[#fff4ea]" : "border-neutral-200 bg-[#faf9f7]"}`}>
                  <p className={`text-[10.5px] ${hl ? "font-bold text-brand" : "text-neutral-400"}`}>{k as string}</p>
                  <p className="mt-2 text-[24px] font-black tracking-tight">{(v as number).toLocaleString()}<span className="ml-1 text-[11px] font-bold text-neutral-400">만원</span></p>
                </div>
              ))}
            </div>
            <div className="mt-4 grid overflow-hidden rounded-xl bg-ink text-white sm:grid-cols-2 sm:divide-x sm:divide-white/15">
              <div className="flex items-center justify-between px-6 py-4 text-[12px]"><span>월 고정비 (월세 + 관리비)</span><b className="text-[15px]">{man(fixed)}</b></div>
              <div className="flex items-center justify-between px-6 py-4 text-[12px]"><span className="text-white/80">보증금 + 권리금</span><b className="text-[15px] text-[#ff7a45]">{won(s.deposit + s.premium)}원</b></div>
            </div>
            <ul className="mt-4 flex flex-wrap gap-2 text-[11px] text-neutral-500">
              {s.features.map((f) => (
                <li key={f} className="flex items-center gap-1.5 rounded-full border border-neutral-200 px-3 py-1.5"><Icon name="check" className="size-3 text-brand" />{f}</li>
              ))}
            </ul>
            <p className="mt-3 text-[10.5px] text-neutral-400">* 권리금 협의 범위와 시설 포함 여부는 임대인·현 임차인 확인 후 최종 결정됩니다.</p>
          </section>

          {/* 현재 사용 현황 */}
          <section id="status" className={`${card} scroll-mt-24`}>
            <Head eyebrow="CURRENT STATUS" title="현재 사용 현황" />
            <div className="mt-7 grid gap-3 md:grid-cols-2">
              {status.map(([ic, k, v]) => (
                <div key={k} className="flex items-center gap-3 rounded-xl bg-[#faf9f7] px-5 py-4">
                  <Icon name={ic} className="size-5 shrink-0 text-brand" />
                  <div><p className="text-[10.5px] text-neutral-400">{k}</p><p className="mt-0.5 text-[12.5px] font-bold">{v}</p></div>
                </div>
              ))}
            </div>
            <div className="mt-4 rounded-xl border border-neutral-200 p-6">
              <p className="text-[13px] font-black">최근 6개월 월 매출</p>
              <div className="flex items-center justify-between text-[10.5px]">
                <span className="text-neutral-400">단위: 만원</span>
                <span className="font-bold text-brand">평균 {avg.toLocaleString()}만원</span>
              </div>
              <div className="mt-6 grid grid-cols-6 items-end gap-3 sm:gap-5">
                {s.sales.map((v, i) => (
                  <div key={i} className="flex flex-col items-center">
                    <span className={`text-[11px] font-bold ${i === s.sales.length - 1 ? "text-brand" : "text-neutral-500"}`}>{v.toLocaleString()}</span>
                    <div className="mt-1.5 flex h-[120px] w-full items-end">
                      <div className={`w-full rounded-t-md ${i === s.sales.length - 1 ? "bg-brand" : "bg-neutral-200"}`} style={{ height: `${Math.round((v / max) * 100)}%` }} />
                    </div>
                    <span className="mt-2 text-[10.5px] text-neutral-400">{salesMonths[i]}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* 현재 임차인 운영 자료 */}
          <section className={card}>
            <Head eyebrow="DISCLOSED SALES" title="현재 임차인 운영 자료" />
            <ProfitPanel revenue={s.revenue} costs={s.costs} title="공개 월 순수익" rateLabel="수익률" caption={s.operatorNote} revenueLabel="월 매출" />
            <p className="mt-4 text-[10.5px] text-neutral-400">* 현 임차인이 참고용으로 제공한 운영 자료입니다. 상가 임대 조건과 별개의 정보이며 향후 업종과 운영 방식에 따른 수익을 보장하지 않습니다.</p>
          </section>
        </div>
      </div>
    </main>
  );
}
