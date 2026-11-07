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
