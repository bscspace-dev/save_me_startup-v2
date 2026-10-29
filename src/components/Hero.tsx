"use client";
import { motion } from "motion/react";
import { regions } from "@/lib/data";
import { Icon } from "./Icons";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#1c1512]">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_20%,rgba(217,120,50,.45),transparent_55%),radial-gradient(ellipse_at_20%_90%,rgba(120,60,20,.5),transparent_50%)]" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-black/60" />
      <div className="relative mx-auto grid max-w-[1280px] items-center gap-8 px-6 py-8 lg:grid-cols-[200px_1fr_320px]">
        <motion.aside initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} className="hidden overflow-hidden rounded-lg bg-black/55 text-white backdrop-blur lg:block">
          <div className="flex items-center gap-2 bg-brand px-4 py-2.5 text-[12px] font-bold"><Icon name="pin" className="size-3.5" />대구 지역 검색</div>
          <ul className="px-4 py-2 text-[12px]">
            {regions.map(([r, n]) => (
              <li key={r}><a href={`/listings?region=${r}`} className="flex justify-between border-b border-white/10 py-[7px] transition hover:text-brand"><span>{r}</span><span className="text-white/50">{n}건</span></a></li>
            ))}
          </ul>
        </motion.aside>

        <div className="py-10 text-white">
          <motion.span initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="inline-block rounded bg-brand px-3 py-1 text-[11px] font-bold">대구 상가창업 컨설팅 플랫폼</motion.span>
          <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.7 }} className="mt-5 text-[40px] font-black leading-[1.25] md:text-[52px]">
            내 창업,<br />제대로 구해드립니다.
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="mt-5 text-[14px] leading-relaxed text-white/80">
            매물 탐색부터 전수창업·신규창업까지<br />구해줘창업이 함께합니다.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }} className="mt-7 flex gap-3 text-[14px] font-bold">
            <a href="/listings" className="rounded bg-brand px-6 py-3 transition hover:bg-brand-dark">매물 바로 보기</a>
            <a href="#consult" className="rounded border border-white/30 bg-black/40 px-6 py-3 transition hover:bg-black/60">무료 창업상담</a>
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="space-y-3">
          <div className="rounded-lg bg-white p-5 shadow-xl">
            <p className="flex items-center gap-1.5 text-[11px] font-bold text-brand"><Icon name="search" className="size-3.5" />내 조건에 맞는 창업?</p>
            <h2 className="mt-2 text-[16px] font-black leading-snug">원하는 조건을 입력하면<br />맞춤 매물을 찾아드려요</h2>
            <div className="mt-4 space-y-2 text-[12px]">
              {["업종 선택", "지역 선택 (대구)"].map((p) => (
                <div key={p} className="relative">
                  <select defaultValue="" className="w-full appearance-none rounded border border-neutral-200 px-3 py-2.5 text-neutral-400 outline-none focus:border-brand">
                    <option value="" disabled>{p}</option>
                  </select>
                  <Icon name="chevron" className="pointer-events-none absolute right-2 top-1/2 size-4 -translate-y-1/2 text-neutral-400" />
                </div>
              ))}
              <a href="/listings" className="block rounded bg-brand py-3 text-center text-[13px] font-bold text-white transition hover:bg-brand-dark">맞춤 매물 검색</a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
