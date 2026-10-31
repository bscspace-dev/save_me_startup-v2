"use client";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ConsultCard } from "./ConsultForm";

// 신규창업 상세의 상담 버튼: 누르면 신규창업 상담신청 폼이 팝업으로 열린다 (유형은 신규창업으로 고정)
export function StartupConsultButton({ className }: { className?: string }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <button onClick={() => setOpen(true)} className={className}>신규창업 상담  →</button>
      <AnimatePresence>
        {open && (
          <motion.div className="fixed inset-0 z-[100] grid place-items-center overflow-y-auto bg-black/70 p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setOpen(false)}>
            <motion.div className="relative w-full max-w-[460px]" initial={{ scale: 0.92, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.92, y: 20 }} onClick={(e) => e.stopPropagation()}>
              <button type="button" onClick={() => setOpen(false)} aria-label="닫기" className="absolute right-4 top-4 z-10 grid size-8 place-items-center rounded-full bg-neutral-100 hover:bg-neutral-200">✕</button>
              <ConsultCard title="신규창업 상담신청" only="신규창업" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
