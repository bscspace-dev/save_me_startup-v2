"use client";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { hideFor24h, isHidden } from "@/lib/popupHide";

const popups = [
  { src: "/main-popup-1.png", alt: "사부님 참여는 이렇게 진행돼요" },
];

// 테스트 안내 팝업(z-120) 아래에 깔려, 안내를 닫으면 이어서 보인다
export function MainPopups() {
  const [shown, setShown] = useState(popups.map(() => false));
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { setShown(popups.map((p) => !isHidden(p.src))); }, []);
  const anyOpen = shown.some(Boolean);
  const close = (i: number) => setShown((s) => s.map((v, j) => (j === i ? false : v)));

  useEffect(() => {
    if (!anyOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setShown(popups.map(() => false));
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [anyOpen]);

  return (
    <AnimatePresence>
      {anyOpen && (
        <motion.div
          className="fixed inset-0 z-[100] overflow-y-auto bg-black/70 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setShown(popups.map(() => false))}
        >
          <div className="mx-auto flex min-h-full max-w-[57.5rem] flex-col items-center justify-start gap-4 md:justify-center pt-[4.75rem] md:flex-row md:items-start">
            <AnimatePresence>
              {popups.map((p, i) => shown[i] && (
                <motion.div
                  key={p.src}
                  className="relative w-full max-w-[27.5rem] overflow-hidden rounded-2xl bg-white shadow-2xl"
                  initial={{ scale: 0.92, y: 20 }}
                  animate={{ scale: 1, y: 0 }}
                  exit={{ scale: 0.92, opacity: 0 }}
                  transition={{ delay: i * 0.08 }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <button onClick={() => close(i)} aria-label="닫기" className="absolute right-3 top-3 z-10 grid size-10 place-items-center rounded-full bg-white text-[1.125rem] font-bold text-ink shadow-lg ring-2 ring-black/20 transition hover:bg-neutral-100">✕</button>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={p.src} alt={p.alt} className="block w-full" />
                  <div className="flex border-t border-neutral-200 text-[0.8125rem] font-bold">
                    <button onClick={() => { hideFor24h(p.src); close(i); }} className="flex-1 py-3 text-neutral-500 hover:bg-neutral-50">24시간 동안 보지 않기</button>
                    <button onClick={() => close(i)} className="flex-1 border-l border-neutral-200 py-3 hover:bg-neutral-50">닫기</button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
