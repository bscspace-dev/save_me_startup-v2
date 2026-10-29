"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";

export function Faq({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <ul className="mx-auto mt-10 max-w-[720px] space-y-3">
      {items.map((it, i) => (
        <li key={it.q} className="overflow-hidden rounded-lg border border-neutral-200 bg-white shadow-sm">
          <button onClick={() => setOpen(open === i ? null : i)} className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-[14px] font-bold">
            {it.q}
            <motion.span animate={{ rotate: open === i ? 45 : 0 }} className="text-[20px] font-normal leading-none text-brand">+</motion.span>
          </button>
          <AnimatePresence initial={false}>
            {open === i && (
              <motion.p initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden px-5 text-[13px] leading-relaxed text-neutral-600">
                <span className="block pb-5">{it.a}</span>
              </motion.p>
            )}
          </AnimatePresence>
        </li>
      ))}
    </ul>
  );
}
