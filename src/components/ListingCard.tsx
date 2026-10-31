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
  const desc = c ? c.summary : t ? `${t.master.name} 사부(전수자)` : l.title;
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
        <p className="text-[16px] font-black">{brand ?? (c ? c.title : t ? `${l.category} · ${t.master.store}` : `${won(l.price)}원`)}</p>
        {premium !== undefined && <p className="mt-1 text-[11.5px] font-bold text-brand">{shop?.premiumLabel ? `권리금 ${shop.premiumLabel}` : premium === 0 ? (shop?.showZero ? "권리금 없음" : "무권리") : `권리금 ${won(premium)}원`}</p>}
        <h3 className="mt-2 line-clamp-2 text-[12.5px] leading-snug text-neutral-700">{desc}</h3>
        {brand && <p className="mt-2 text-[11.5px] font-bold text-brand">창업비용 약 {won(l.price)}원</p>}
        {!t && <p className="mt-2 text-[10.5px] text-neutral-400">{c ? `${l.startup?.address ?? `대구 ${l.region}`} | ${l.category} | 컨설팅 비용 약 ${won(l.cost)}원` : l.promo ? `${l.category} | ${l.op}` : shop ? `${shop.address} | ${shop.buildingType} | ${Math.round(l.area / 3.3058)}평 | ${shop.floor.split(" / ")[0]}` : `대구 ${l.region} | ${l.category} | ${l.op} | ${l.area}㎡`}</p>}
      </div>
    </motion.a>
  );
}
