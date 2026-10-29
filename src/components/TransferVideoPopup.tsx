"use client";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

export function TransferVideoPopup() {
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
          className="fixed inset-0 z-[110] grid place-items-center bg-black/75 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setOpen(false)}
        >
          <motion.div
            className="relative w-full max-w-[420px] overflow-hidden rounded-2xl bg-black shadow-2xl"
            initial={{ scale: 0.92, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.92, y: 20 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button onClick={() => setOpen(false)} aria-label="닫기" className="absolute right-3 top-3 z-10 grid size-8 place-items-center rounded-full bg-black/50 text-white hover:bg-black/70">✕</button>
            <video src="/transfer-intro.mp4" className="max-h-[80vh] w-full" autoPlay muted playsInline controls />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
