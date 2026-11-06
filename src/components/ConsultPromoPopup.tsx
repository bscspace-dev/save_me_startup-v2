"use client";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { hideFor24h, isHidden } from "@/lib/popupHide";
import { ConsultPopup } from "./ConsultPopup";

const NEON = "#F0C33F";
const KEY = "consult-promo";

// 메인 배너 오른쪽 상담 카드와 같은 디자인의 안내 팝업.
// 들어오면 한 번 보여주고, "상담 신청하기"를 누르면 상담 신청 팝업으로 이어진다. 24시간 동안 보지 않기를 지원한다
export function ConsultPromoPopup() {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(false);
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { setOpen(!isHidden(KEY)); }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div className="fixed inset-0 z-[100] overflow-y-auto bg-black/70 p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setOpen(false)}>
            <div className="grid min-h-full place-items-center">
              <motion.div
                onClick={(e) => e.stopPropagation()}
                className="relative w-full max-w-[25rem] overflow-hidden rounded-3xl bg-white shadow-2xl"
                initial={{ scale: 0.92, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.92, y: 20 }}
              >
                <button type="button" onClick={() => setOpen(false)} aria-label="닫기" className="absolute right-4 top-4 z-10 grid size-8 cursor-pointer place-items-center rounded-full bg-neutral-100 text-ink hover:bg-neutral-200">✕</button>

                <div className="relative p-6 lg:p-7">
                  <span className="inline-block rounded-full px-4 py-0.5 font-gmarket text-[0.8125rem] font-bold text-ink" style={{ background: NEON }}>무료 1:1 창업 상담</span>
                  <div className="pointer-events-none absolute right-[1.25rem] top-[3.75rem] size-[9.375rem]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/hero-shop.png" alt="" aria-hidden className="size-full object-contain" />
                  </div>
                  <h2 className="mt-2 font-gmarket text-[1.5rem] font-bold leading-[1.35] tracking-tight text-ink md:text-[1.625rem]">
                    창업이 고민될 땐,<br />전문가와 먼저<br />상담해보세요.
                  </h2>
                  <p className="mt-3 font-sans text-[0.9375rem] leading-relaxed text-[#2d2d2d]">
                    매물·업종·예산·전수창업·신규창업까지<br />맞춤형으로 안내드립니다.
                  </p>
                  <button type="button" onClick={() => { setOpen(false); setForm(true); }} className="mt-5 flex w-full cursor-pointer items-center justify-between rounded-xl px-5 py-3 font-gmarket text-[0.9375rem] font-bold text-ink shadow-[0_0.625rem_1.5rem_-0.5rem_rgba(201,154,20,.65)] transition hover:brightness-95" style={{ background: NEON }}>
                    <span className="flex items-center gap-2.5">
                      <svg viewBox="0 0 24 24" aria-hidden className="size-[1.5rem]" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 5h16a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H9l-4 3v-3H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1z" /><path d="M8 11h.01M12 11h.01M16 11h.01" strokeWidth="2.6" /></svg>
                      상담 신청하기
                    </span>
                    <span aria-hidden className="text-[2rem] font-bold leading-none font-gmarket">→</span>
                  </button>
                </div>

                <div className="flex border-t border-neutral-200 text-[0.8125rem] font-bold">
                  <button type="button" onClick={() => { hideFor24h(KEY); setOpen(false); }} className="flex-1 cursor-pointer py-3 text-neutral-500 hover:bg-neutral-50">24시간 동안 보지 않기</button>
                  <button type="button" onClick={() => setOpen(false)} className="flex-1 cursor-pointer border-l border-neutral-200 py-3 hover:bg-neutral-50">닫기</button>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <ConsultPopup open={form} onClose={() => setForm(false)} />
    </>
  );
}
