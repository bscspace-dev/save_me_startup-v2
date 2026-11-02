"use client";
import { motion } from "motion/react";
import { kindBadge, photoSrc, won, type Listing } from "@/lib/data";
import { franchises } from "@/lib/franchise";
import { shops } from "@/lib/shop";
import { transferOf } from "@/lib/transfer";
import { startupOf } from "@/lib/startup";

export function ListingCard({ l, i = 0, wide = false }: { l: Listing; i?: number; wide?: boolean }) {
  const shop = l.shop ?? (l.kind === "상가매물" ? shops[l.id] : undefined);
  const premium = shop?.premium;
  const t = l.kind === "전수창업" ? transferOf(l) : undefined;
  // 프랜차이즈는 창업비용보다 브랜드명을 가장 크게 보여준다
  const brand = l.kind === "프랜차이즈" ? (l.promo?.brand ?? franchises[l.id]?.brand) : undefined;
  // 신규창업은 매물이 아니라 창업컨설팅 상가로 보여준다 (매물번호·금액 없음)
  const c = l.kind === "신규창업" ? startupOf(l) : undefined;
  const menus = t?.menuNames?.[0]; // 전수메뉴가 여러 개여도 첫 번째만 보여준다
  const title = brand ?? (c ? c.title : t ? undefined : `${won(l.price)}원`);
  const accent = brand ? `창업비용 약 ${won(l.price)}원`
    : c ? `컨설팅 비용 약 ${won(l.cost)}원`
    : t ? `${t.master.name} 사부의 전수메뉴`
    : premium !== undefined ? (shop?.premiumLabel ? `권리금 ${shop.premiumLabel}` : premium === 0 ? (shop?.showZero ? "권리금 없음" : "무권리") : `권리금 ${won(premium)}원`) : "";
  const body = c ? c.summary : t ? (menus ?? "") : l.title;
  const meta = t ? (l.transfer?.address ?? `대구 ${l.region}`)
    : c ? (l.startup?.address ?? `대구 ${l.region}`)
    : l.promo ? `${l.category} | ${l.op}`
    : shop ? `${shop.address} | ${shop.buildingType} | ${Math.round(l.area / 3.3058)}평 | ${shop.floor.split(" / ")[0]}`
    : `대구 ${l.region} | ${l.category} | ${l.op} | ${l.area}㎡`;
  return (
    <motion.a
      href={`/listings/${l.id}`}
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: Math.min(i, 8) * 0.04 }}
      whileHover={{ y: -5 }}
      className={`block overflow-hidden rounded-lg border border-neutral-200 bg-white shadow-sm transition-shadow hover:shadow-lg ${wide ? "flex" : ""}`}
    >
      <div className={`relative bg-neutral-100 ${wide ? "w-[200px] shrink-0" : "h-[150px]"}`}>
        {l.photos ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={l.thumb ?? photoSrc(l.id, 1)} alt={l.title} className="absolute inset-0 size-full object-cover" />
        ) : null}
        <div className="absolute left-2 top-2 flex gap-1 text-[10px] font-bold text-white">
          {!c && l.rec && <span className="rounded bg-brand px-1.5 py-0.5">추천</span>}
          {!c && l.isNew && <span className="rounded bg-blue-800 px-1.5 py-0.5">NEW</span>}
          <span className={`rounded px-1.5 py-0.5 ${kindBadge[l.kind] ?? "bg-ink/70"}`}>{c ? "신규창업" : l.kind}</span>
        </div>
        {!c && <span className="absolute bottom-2 left-2 rounded bg-black/60 px-1.5 py-0.5 text-[10px] font-bold text-white">{l.kind === "프랜차이즈" || l.kind === "전수창업" ? "등록번호" : "매물번호"} {l.id}</span>}
        {l.sold && l.kind !== "전수창업" && <div className="absolute inset-0 grid place-items-center bg-black/55 text-[15px] font-bold text-white">계약완료</div>}
      </div>
      <div className="min-h-[104px] flex-1 p-3.5">
        {/* 모든 유형이 같은 구성: 작은 분류 / 큰 제목 / 선 / 강조 문구 / 본문 / 정보 */}
        <p className="text-[11px] font-bold tracking-wide text-neutral-400">{t || brand || c ? l.category : `${l.region} · ${shop?.buildingType ?? l.category}`}</p>
        {title && <p className="mt-1 text-[16px] font-black tracking-tight">{title}</p>}
        {(title || accent) && <div className="my-2.5 h-px w-8 bg-neutral-300" />}
        {accent && <p className="text-[11px] font-bold text-brand">{accent}</p>}
        <h3 className={`${accent ? "mt-1" : ""} line-clamp-2 ${t ? "text-[17px] font-semibold tracking-tight text-neutral-700" : "text-[12.5px] leading-snug text-neutral-700"}`}>{body}</h3>
        <p className="mt-2 text-[10.5px] text-neutral-400">{meta}</p>
      </div>
    </motion.a>
  );
}
