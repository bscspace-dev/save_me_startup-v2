"use client";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

export function TestNoticePopup() {
  const [open, setOpen] = useState(true);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[120] grid place-items-center bg-black/70 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setOpen(false)}
        >
          <motion.div
            role="dialog"
            aria-label="테스트 중 안내"
            className="w-full max-w-[380px] rounded-2xl bg-white p-7 text-center shadow-2xl"
            initial={{ scale: 0.92, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.92, y: 20 }}
            onClick={(e) => e.stopPropagation()}
          >
            <span className="inline-block rounded bg-orange-50 px-2.5 py-1 text-[11px] font-bold text-brand">TEST</span>
            <h3 className="mt-4 text-[22px] font-black">현재 테스트 중입니다</h3>
            <p className="mt-3 text-[13px] leading-relaxed text-neutral-600">
              본 사이트는 정식 오픈 전 테스트 운영 중이며,<br />게시된 내용은 실제와 다를 수 있습니다.
            </p>
            <button onClick={() => setOpen(false)} className="mt-6 w-full rounded-lg bg-brand py-3.5 text-[14px] font-bold text-white">확인</button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
