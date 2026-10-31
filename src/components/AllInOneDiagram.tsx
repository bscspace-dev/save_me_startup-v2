"use client";
import { useRef, useState } from "react";
import { motion, useInView } from "motion/react";

// 흩어져 있던 6개 콘텐츠가 모이면, 왼쪽에 작은 원으로 나열되고 오른쪽에 올인원 시스템이 크게 나타나는 그림
// from: 흩어져 있을 때 자리, to: 왼쪽에 나열됐을 때 자리 (컨테이너 대비 %)
const to = [[10, 20], [28, 20], [10, 50], [28, 50], [10, 80], [28, 80]];
const items = [
  { label: "상가 분석", points: ["상권 및 타겟 검증", "수익성 및 접근성 분석"], from: [58, 12] },
  { label: "인테리어", points: ["콘셉트와 시각화", "3D도면 및 평면 설계"], from: [94, 24] },
  { label: "브랜드 스토리", points: ["가게만의 이야기", "고객 공감대 형성"], from: [52, 52] },
  { label: "로고", points: ["가게만의 심볼 제작", "시각적 정체성 구축"], from: [93, 78] },
  { label: "사후관리", points: ["시설 및 품질 점검", "사후 A/S 전담 시스템"], from: [60, 90] },
  { label: "마케팅", points: ["맞춤 광고제작", "인지도 극대화"], from: [76, 50] },
];

export function AllInOneDiagram() {
  const [run, setRun] = useState(0); // 다시 보기를 누를 때마다 처음부터 재생
  // 그림 전체가 보이는지 한 번만 판단해 모든 요소가 같은 순간에 움직이게 한다 (요소마다 따로 판단하면 위치에 따라 하나씩 움직인다)
  const ref = useRef<HTMLDivElement>(null);
  const shown = useInView(ref, { once: true, amount: 0.8 });
  const move = { type: "spring" as const, stiffness: 170, damping: 20 };

  return (
    <div ref={ref}>
      <div key={run} className="relative mx-auto aspect-[16/10] w-full max-w-[880px]">
        {/* 가운데: 작은 원들에서 올인원 시스템으로 이어지는 화살표 */}
        <motion.svg
          viewBox="0 0 40 24"
          className="absolute left-[43%] top-1/2 w-[8%] -translate-x-1/2 -translate-y-1/2 text-brand"
          aria-hidden
          initial={{ opacity: 0, x: -10 }}
          animate={shown ? { opacity: 1, x: 0 } : undefined}
          transition={{ delay: 0.8, duration: 0.25 }}
        >
          <path d="M2 12h28M22 3l11 9-11 9" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        </motion.svg>

        {/* 오른쪽: 모이면 크게 나타나는 올인원 시스템 */}
        <motion.div
          className="absolute left-[77%] top-1/2 grid aspect-square h-[92%] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-brand p-3 text-center text-white shadow-xl ring-8 ring-orange-100"
          initial={{ scale: 0.4, opacity: 0 }}
          animate={shown ? { scale: 1, opacity: 1 } : undefined}
          transition={{ delay: 0.85, type: "spring", stiffness: 180, damping: 14 }}
        >
          <div>
            <p className="text-[10px] font-bold tracking-wide text-white/80 sm:text-[13px]">ALL-IN-ONE</p>
            <p className="mt-1 text-[22px] font-black leading-tight sm:text-[40px]">올인원<br />시스템</p>
            <p className="mt-2 hidden text-[13px] text-white/80 sm:block">처음부터 끝까지 한 번에</p>
          </div>
        </motion.div>

        {/* 왼쪽: 흩어진 자리에서 모여 작은 원으로 나열되는 6개 콘텐츠 */}
        {items.map((it, i) => (
          <motion.div
            key={it.label}
            className="absolute grid aspect-square h-[27%] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border p-1 text-center shadow-sm"
            initial={{ left: `${it.from[0]}%`, top: `${it.from[1]}%`, backgroundColor: "#f5f5f5", borderColor: "#d4d4d4", scale: 0.85 }}
            animate={shown ? { left: `${to[i][0]}%`, top: `${to[i][1]}%`, backgroundColor: "#fff4ea", borderColor: "#fed7aa", scale: 1 } : undefined}
            transition={{ ...move, delay: 0.6 }}
          >
            <div>
              <p className="text-[11px] font-black leading-tight sm:text-[14px]">{it.label}</p>
              <span className="mx-auto my-1.5 hidden h-px w-6 bg-brand/40 md:block" />
              <ul className="hidden max-w-[104px] space-y-0.5 text-left text-[10px] leading-snug text-neutral-600 md:block lg:max-w-[118px] lg:text-[11px]">
                {it.points.map((t) => (
                  <li key={t} className="flex items-start gap-1">
                    <span className="mt-[5px] size-1 shrink-0 rounded-full bg-brand" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>

      {/* 모바일: 원이 작아 설명은 아래에 따로 표시 */}
      <ul className="mx-auto mt-6 grid max-w-[420px] gap-3 text-left md:hidden">
        {items.map((it) => (
          <li key={it.label} className="rounded-lg border border-neutral-200 bg-white p-4">
            <p className="text-[14px] font-black">{it.label}</p>
            <ul className="mt-2 space-y-1 text-[12.5px] text-neutral-600">
              {it.points.map((t) => (
                <li key={t} className="flex items-start gap-2"><span className="mt-[7px] size-1 shrink-0 rounded-full bg-brand" />{t}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>

      <button type="button" onClick={() => setRun((r) => r + 1)} className="mt-6 rounded-full border border-neutral-300 px-4 py-2 text-[12px] font-bold text-neutral-500 transition hover:border-brand hover:text-brand">
        ↻ 다시 보기
      </button>
    </div>
  );
}
