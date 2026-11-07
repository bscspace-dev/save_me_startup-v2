"use client";
import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

// 스크롤로 화면에 들어올 때 아래에서 살짝 올라오며 나타나는 효과 (움직임 줄이기 설정이면 효과 없음)
const view = { once: true, amount: 0.15 } as const;

function useVariants(i: number, dy: number) {
  const reduce = useReducedMotion();
  return {
    initial: reduce ? false : { opacity: 0, y: dy },
    whileInView: { opacity: 1, y: 0 },
    viewport: view,
    transition: { duration: 0.6, delay: reduce ? 0 : Math.min(i, 5) * 0.09, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  } as const;
}

export function Reveal({ children, className, i = 0 }: { children: ReactNode; className?: string; i?: number }) {
  return <motion.div {...useVariants(i, 28)} className={className}>{children}</motion.div>;
}

export function RevealLi({ children, className, i = 0 }: { children: ReactNode; className?: string; i?: number }) {
  return <motion.li {...useVariants(i, 22)} className={className}>{children}</motion.li>;
}

export function RevealDiv({ children, className, i = 0 }: { children: ReactNode; className?: string; i?: number }) {
  return <motion.div {...useVariants(i, 22)} className={className}>{children}</motion.div>;
}

// 화면에 들어오면 0%에서 목표 폭까지 차오르는 막대
export function GrowBar({ pct, className, i = 0 }: { pct: number; className?: string; i?: number }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { width: 0 }}
      whileInView={{ width: `${pct}%` }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 1.3, delay: reduce ? 0 : 0.15 + i * 0.25, ease: [0.22, 1, 0.36, 1] }}
    />
  );
}

// 카드 위에 큰 X 표시가 그려지듯 나타나는 효과
export function DrawX({ className }: { className?: string }) {
  const reduce = useReducedMotion();
  const p = (d: string, delay: number) => (
    <motion.path
      d={d}
      initial={reduce ? false : { pathLength: 0, opacity: 0 }}
      whileInView={{ pathLength: 1, opacity: 1 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
    />
  );
  return (
    <svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden className={className} fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" vectorEffect="non-scaling-stroke">
      {p("M10 10 L90 90", 0.5)}
      {p("M90 10 L10 90", 0.85)}
    </svg>
  );
}

// 형광펜이 왼쪽에서 오른쪽으로 칠해지는 강조 텍스트
export function Highlight({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion();
  return (
    <span className="relative isolate inline-block px-1.5 text-[#1b1b1b]">
      <motion.span
        aria-hidden
        className="absolute inset-x-0 bottom-0.5 top-1.5 -z-10 origin-left rounded-md bg-[#F0C33F]"
        initial={reduce ? false : { scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, amount: 0.8 }}
        transition={{ duration: 0.7, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
      />
      {children}
    </span>
  );
}
