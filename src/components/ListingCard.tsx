"use client";
import { motion } from "motion/react";
import { kindBadge, photoSrc, won, type Listing } from "@/lib/data";
import { shops } from "@/lib/shop";
import { transfers } from "@/lib/transfer";

export function ListingCard({ l, i = 0, wide = false }: { l: Listing; i?: number; wide?: boolean }) {
  const premium = l.kind === "상가매물" ? shops[l.id]?.premium : undefined;
  const t = l.kind === "전수창업" ? transfers[l.id] : undefined;
  const desc = t ? `${t.headline[0]} ${t.headline[1]} · ${t.days}일 1:1 교육` : l.title;
  return (
    <motion.a
      href={`/listings/${l.id}`} layout
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.35, delay: Math.min(i, 8) * 0.04 }}
      whileHover={{ y: -5 }}
      className={`block overflow-hidden rounded-lg border border-neutral-200 bg-white shadow-sm transition-shadow hover:shadow-lg ${wide ? "flex" : ""}`}
    >
      <div className={`relative bg-neutral-100 ${wide ? "w-[200px] shrink-0" : "h-[150px]"}`}>
        {l.photos ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={photoSrc(l.id, 1)} alt={l.title} className="absolute inset-0 size-full object-cover" />
        ) : null}
        <div className="absolute left-2 top-2 flex gap-1 text-[10px] font-bold text-white">
          {l.rec && <span className="rounded bg-brand px-1.5 py-0.5">추천</span>}
          {l.isNew && <span className="rounded bg-blue-800 px-1.5 py-0.5">NEW</span>}
          <span className={`rounded px-1.5 py-0.5 ${kindBadge[l.kind] ?? "bg-ink/70"}`}>{l.kind}</span>
        </div>
        {l.sold && <div className="absolute inset-0 grid place-items-center bg-black/55 text-[15px] font-bold text-white">계약완료</div>}
      </div>
      <div className="min-h-[104px] flex-1 p-3.5">
        <p className="text-[16px] font-black">{won(l.price)}원</p>
        {premium !== undefined && <p className="mt-1 text-[11.5px] font-bold text-brand">권리금 {won(premium)}원</p>}
        <h3 className="mt-2 line-clamp-2 text-[12.5px] leading-snug text-neutral-700">{desc}</h3>
        <p className="mt-2 text-[10.5px] text-neutral-400">[{l.id}] 대구 {l.region} | {l.category} | {l.op} | {l.area}㎡</p>
      </div>
    </motion.a>
  );
}
