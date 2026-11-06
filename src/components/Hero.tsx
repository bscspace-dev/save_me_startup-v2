"use client";
import Link from "next/link";
import { motion } from "motion/react";
import { useState } from "react";
import { ConsultPopup } from "./ConsultPopup";

const NEON = "#F0C33F"; // 배너의 포인트(네온) 색

const paths = [
  { icon: "store", title: "프랜차이즈 창업", href: "/listings?type=프랜차이즈" },
  { icon: "pin", title: "상가매물 찾기", href: "/listings?type=상가매물" },
  { icon: "swap", title: "전수창업", href: "/transfer" },
  { icon: "bulb", title: "신규창업", href: "/identity" },
] as const;

// 알약 버튼 안의 선 아이콘 (글자색을 따라간다)
function PathIcon({ k }: { k: (typeof paths)[number]["icon"] }) {
  const d = {
    store: <><path d="M3 9l1.5-5h15L21 9" /><path d="M3 9c0 1.7 1.3 3 3 3s3-1.3 3-3c0 1.7 1.3 3 3 3s3-1.3 3-3c0 1.7 1.3 3 3 3s3-1.3 3-3" /><path d="M5 12v8h14v-8" /><path d="M10 20v-5h4v5" /></>,
    pin: <><path d="M12 21s-7-6.2-7-11.2A7 7 0 0 1 19 9.8C19 14.8 12 21 12 21z" /><circle cx="12" cy="10" r="2.5" /></>,
    swap: <><path d="M4 8h15M15 4l4 4-4 4" /><path d="M20 16H5M9 12l-4 4 4 4" /></>,
    bulb: <><path d="M9 18h6M10 21h4" /><path d="M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2.1h5c0-.9.4-1.6 1-2.1A6 6 0 0 0 12 3z" /></>,
  }[k];
  return <svg viewBox="0 0 24 24" aria-hidden className="size-[1.125rem] shrink-0" style={{ color: NEON }} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{d}</svg>;
}

// 오른쪽 카드의 가게 3D 이미지 (핀 포함)
function ShopIcon() {
  return (
    <div className="pointer-events-none absolute right-[-0.125rem] top-[2.8125rem] lg:right-[0.125rem] size-[9.375rem]">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/hero-shop.png" alt="" aria-hidden className="size-full object-contain" />
    </div>
  );
}

export function Hero() {
  const [consult, setConsult] = useState(false);

  return (
    <section className="relative overflow-hidden bg-[#2d2d2d]">
      {/* 메인 배너 이미지: public/hero-banner.webp 로 고정 (관리자 등록 기능은 제거). 이미지를 바꾸려면 이 파일을 교체한다 */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/hero-banner.webp" alt="" aria-hidden className={`absolute inset-0 hidden size-full lg:block translate-x-[calc(10px-4.2%)] -translate-y-[40px] scale-[1.1] origin-[50%_40%] object-cover object-[50%_40%] `} />
      {/* 화면이 좁아지면(lg 미만) 배너 이미지와 덮개를 숨기고 배경색 #2D2D2D 만 보여준다 */}
      <div className="absolute inset-0 hidden bg-gradient-to-r from-black/20 via-transparent to-black/10 lg:block" />

      <div className="relative mx-auto grid max-w-[80rem] items-center gap-10 px-6 py-10 lg:grid-cols-[1fr_25rem] lg:py-12">
        <div className="text-white">
          <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="font-gmarket text-[1.875rem] font-medium leading-[1.25] tracking-tight md:text-[2.875rem]">
            {/* G마켓 산스 굵기: 창업 M · 을 L · 찾는 가장 M · SMART B · 한 L · 방법 M (M=500, L=300, B=700) */}
            창업<span className="font-light">을</span> 찾는<br />
            가장 <span className="font-bold" style={{ color: NEON }}>SMART</span><span className="font-light">한</span> 방법
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25 }} className="mt-6 max-w-[38.75rem] font-gmarket text-[0.9375rem] font-medium leading-relaxed text-white/80 md:text-[0.9375rem]">
            매물 탐색부터 전수창업·신규창업까지,<br />
            당신에게 맞는 창업의 모든 순간을 <span style={{ color: "#D49F12" }}>구해줘창업</span>이 함께합니다.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }} className="mt-9 flex flex-wrap gap-2.5">
            {paths.map((p) => (
              <Link key={p.title} href={p.href} className="group inline-flex min-w-[9.375rem] items-center justify-center gap-2 rounded-full border border-white/70 bg-transparent px-7 py-1.5 font-gmarket text-[0.9375rem] font-medium text-white transition hover:-translate-y-0.5 hover:border-[#F0C33F] hover:bg-white/10 hover:text-[#F0C33F]">
                <PathIcon k={p.icon} />
                {p.title}
              </Link>
            ))}
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, duration: 0.6 }} className="relative rounded-3xl bg-white p-6 shadow-2xl lg:p-7">
          <span className="inline-block rounded-full px-4 py-0.5 font-gmarket text-[0.8125rem] font-bold text-ink" style={{ background: NEON }}>무료 1:1 창업 상담</span>
          <ShopIcon />
          <h2 className="mt-2 font-gmarket text-[1.5rem] font-bold leading-[1.35] tracking-tight text-ink md:text-[1.625rem]">
            창업이 고민될 땐,<br />전문가와 먼저<br />상담해보세요.
          </h2>
          <p className="mt-3 font-sans text-[0.9375rem] leading-relaxed text-[#2d2d2d]">
            매물·업종·예산·전수창업·신규창업까지<br />맞춤형으로 안내드립니다.
          </p>
          <button type="button" onClick={() => setConsult(true)} className="mt-5 flex w-full cursor-pointer items-center justify-between rounded-xl px-5 py-3 font-gmarket text-[0.9375rem] font-bold text-ink shadow-[0_0.625rem_1.5rem_-0.5rem_rgba(201,154,20,.65)] transition hover:brightness-95" style={{ background: NEON }}>
            <span className="flex items-center gap-2.5">
              <svg viewBox="0 0 24 24" aria-hidden className="size-[1.5rem]" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 5h16a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H9l-4 3v-3H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1z" /><path d="M8 11h.01M12 11h.01M16 11h.01" strokeWidth="2.6" /></svg>
              상담 신청하기
            </span>
            <span aria-hidden className="text-[2rem] font-bold leading-none">→</span>
          </button>
        </motion.div>
      </div>
      <ConsultPopup open={consult} onClose={() => setConsult(false)} />
    </section>
  );
}
