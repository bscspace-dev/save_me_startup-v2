"use client";
import { useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ConsultCard } from "./ConsultForm";

function PopupBody({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <motion.div className="fixed inset-0 z-[100] overflow-y-auto bg-black/70 p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
      <div className="grid min-h-full place-items-center">
        <motion.div
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-[440px]"
          initial={{ scale: 0.92, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.92, y: 20 }}
        >
          <button type="button" onClick={onClose} aria-label="닫기" className="absolute right-4 top-4 z-10 grid size-8 place-items-center rounded-full bg-neutral-100 text-ink hover:bg-neutral-200">✕</button>
          <ConsultCard />
        </motion.div>
      </div>
    </motion.div>
  );
}

export function ConsultPopup({ open, onClose }: { open: boolean; onClose: () => void }) {
  return <AnimatePresence>{open && <PopupBody onClose={onClose} />}</AnimatePresence>;
}
