"use client";
import Link from "next/link";
import { motion } from "motion/react";

const paths = [
  { no: "01", title: "매물 탐색", desc: "대구 상가·프랜차이즈 매물", href: "/listings" },
  { no: "02", title: "전수창업", desc: "검증된 기술을 배워 시작", href: "/transfer" },
  { no: "03", title: "신규창업", desc: "브랜딩부터 오픈까지", href: "/identity" },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#1c1512]">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_85%_15%,rgba(217,120,50,.5),transparent_55%),radial-gradient(ellipse_at_10%_100%,rgba(120,60,20,.55),transparent_50%)]" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/25 to-black/50" />
      <div className="relative mx-auto grid max-w-[1280px] items-center gap-10 px-6 py-16 lg:grid-cols-[1fr_380px] lg:py-24">
        <div className="text-white">
          <motion.span initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="inline-block rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-[11.5px] font-bold tracking-wide backdrop-blur">대구 상가창업 컨설팅 플랫폼</motion.span>
          <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.7 }} className="mt-6 text-[42px] font-black leading-[1.2] tracking-tight md:text-[60px]">
            내 창업,<br /><span className="text-[#ff7a45]">제대로</span> 구해드립니다
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="mt-6 max-w-[460px] text-[15px] leading-relaxed text-white/75">
            매물 탐색부터 전수창업·신규창업까지<br />구해줘창업이 처음부터 끝까지 함께합니다
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="mt-12 grid gap-3 sm:grid-cols-3">
            {paths.map((p) => (
              <Link key={p.no} href={p.href} className="group rounded-xl border border-white/15 bg-white/[0.07] p-4 backdrop-blur transition hover:-translate-y-0.5 hover:border-brand hover:bg-white/15">
                <p className="text-[10.5px] font-bold text-[#ff7a45]">{p.no}</p>
                <p className="mt-1.5 text-[15px] font-black">{p.title}</p>
                <p className="mt-1 text-[11.5px] text-white/60">{p.desc}</p>
              </Link>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
