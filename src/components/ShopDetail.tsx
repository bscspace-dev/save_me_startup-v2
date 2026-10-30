import Link from "next/link";
import { won, type Listing } from "@/lib/data";
import { GALLERY, type ShopInfo } from "@/lib/shop";
import { FranchiseGallery } from "./FranchiseGallery";
import { ListingConsultButton } from "./ListingConsultButton";
import { Icon } from "./Icons";
import { Head, card, inner, man } from "./DetailParts";

const tabs = [
  ["매물 정보", "#info"],
  ["임대 조건", "#lease"],
  ["현재 현황", "#status"],
] as const;

const pyeong = (m2: number) => Math.round(m2 / 3.3058);

export function ShopDetail({ l, s }: { l: Listing; s: ShopInfo }) {
  const py = pyeong(l.area);
  const fixed = s.rent + s.maintenance;
  const premiumText = s.premiumLabel ?? (s.premium ? man(s.premium) : "무권리");
  const rentLabel = s.rentNote ? `월세 (${s.rentNote})` : "월세";
  const dong = s.address.split(" ").slice(1).join(" ");

  const summary = [
    ["소재지", s.address],
    ["매물 유형", s.buildingType],
    ["면적", `전용 ${l.area}㎡ (약 ${py}평)`],
    ["권리금", s.premiumLabel ?? (s.premium ? man(s.premium) : "없음 (무권리)")],
    ["해당 층", s.floor.split(" / ")[0]],
  ];
  const basic = [
    ["소재지", s.address], ["건축물 용도", s.buildingType],
    ["전용면적", `${l.area}㎡ (약 ${py}평)`], ["해당 층", s.floor],
    ["방향", s.direction], ["주차", s.parking],
    ["사용승인일", s.approved], ["입주 가능일", s.moveIn],
    ...(s.extraInfo ?? []),
  ];
  const status = s.vacant ? [
    ["store", "현업종", s.currentUse ?? ""],
    ["spark", "추천 업종", s.recommended ?? "-"],
    ["clock", "입주 가능일", s.moveIn],
    ["check", "관리비", s.maintenanceNote ?? `${s.maintenance}만원`],
  ] : [
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
          <FranchiseGallery slides={s.gallery ?? GALLERY} badges={[l.rec ? "추천 상가" : "상가매물", "실매물 확인"]} photos={{ id: l.id, count: l.photos ?? 0 }} />
          <div className="p-8 md:p-10">
            <h1 className="text-[30px] font-black leading-[1.25] tracking-tight">{s.headline[0]}<br />{s.headline[1]}</h1>
            <p className="mt-4 text-[13px] leading-relaxed text-neutral-500">{s.desc}</p>
            <div className="mt-5 rounded-xl bg-[#fff4ea] px-5 py-4">
              <p className="text-[10.5px] font-bold text-brand">임대 조건</p>
              <div className="mt-3 grid grid-cols-3 gap-2 text-center">
                {[["권리금", s.premiumLabel ?? (s.premium || "무권리"), true], ["보증금", s.deposit, false], [rentLabel, s.rent, false]].map(([k, v, hl]) => (
                  <div key={k as string} className={`rounded-lg px-2 py-3 ${hl ? "bg-brand text-white" : "bg-white"}`}>
                    <p className={`text-[10.5px] font-bold ${hl ? "text-white/80" : "text-neutral-400"}`}>{k as string}</p>
                    <p className={`mt-1 text-[18px] font-black tracking-tight ${hl ? "" : "text-brand"}`}>{typeof v === "string" ? v : <>{v.toLocaleString()}<span className="ml-0.5 text-[10px] font-bold">만원</span></>}</p>
                  </div>
                ))}
              </div>
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
            <p className="mt-1.5 text-[24px] font-black tracking-tight">{premiumText}</p>
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
              {[["보증금", s.deposit, false], [rentLabel, s.rent, false], ["관리비", s.maintenance || s.maintenanceLabel || "매월 변동", false], ["권리금", s.premiumLabel ?? (s.premium || "무권리"), true]].map(([k, v, hl]) => (
                <div key={k as string} className={`rounded-xl border p-5 ${hl ? "border-orange-200 bg-[#fff4ea]" : "border-neutral-200 bg-[#faf9f7]"}`}>
                  <p className={`text-[10.5px] ${hl ? "font-bold text-brand" : "text-neutral-400"}`}>{k as string}</p>
                  <p className="mt-2 text-[24px] font-black tracking-tight">{typeof v === "string" ? <span className="text-[19px]">{v}</span> : <>{v.toLocaleString()}<span className="ml-1 text-[11px] font-bold text-neutral-400">만원</span></>}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 grid overflow-hidden rounded-xl bg-ink text-white sm:grid-cols-2 sm:divide-x sm:divide-white/15">
              <div className="flex items-center justify-between px-6 py-4 text-[12px]"><span>월 고정비 (월세 + 관리비)</span><b className="text-[15px]">{s.maintenance ? man(fixed) : s.maintenanceLabel ? man(s.rent) : `${man(s.rent)} + 관리비`}</b></div>
              <div className="flex items-center justify-between px-6 py-4 text-[12px]"><span className="text-white/80">보증금 + 권리금</span><b className="text-[15px] text-[#ff7a45]">{s.premiumLabel ? `${won(s.deposit)}원 + 권리금` : `${won(s.deposit + s.premium)}원`}</b></div>
            </div>
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
          </section>
        </div>
      </div>
    </main>
  );
}
