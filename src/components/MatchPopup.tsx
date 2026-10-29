"use client";
import { useEffect } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { brands } from "@/lib/data";
import { Icon } from "./Icons";

export const categoryOptions = ["한식·분식", "카페·음료", "베이커리·디저트", "기타 업종"];
export const costOptions = ["5천만 미만", "5천만~1억", "1억~2억", "2억 이상"];

type Initial = { category: string; cost: string };

// 메인 카드에서 고른 업종으로 고정
function MatchForm({ onClose, initial }: { onClose: () => void; initial: Initial }) {
  const category = initial.category;

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const list = brands.filter((b) => (!category || b.category === category));

  return (
    <motion.div className="fixed inset-0 z-[100] grid place-items-center bg-black/70 p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
      <motion.div
        onClick={(e) => e.stopPropagation()}
        className="relative flex max-h-[90vh] w-full max-w-[520px] flex-col overflow-hidden rounded-2xl bg-white shadow-2xl"
        initial={{ scale: 0.92, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.92, y: 20 }}
      >
        <button type="button" onClick={onClose} aria-label="닫기" className="absolute right-4 top-4 z-10 grid size-8 place-items-center rounded-full bg-neutral-100 hover:bg-neutral-200">✕</button>

        <div className="space-y-3 border-b border-neutral-100 p-6 pb-5">
          <div>
            <p className="flex items-center gap-1.5 text-[11px] font-bold text-brand"><Icon name="search" className="size-3.5" />맞춤 창업 검색</p>
            <h3 className="mt-2 text-[20px] font-black leading-snug">전수창업을 추천드립니다</h3>
            <p className="mt-2 text-[12px] text-neutral-500">선택하신 업종 <b className="ml-1 rounded-full bg-orange-50 px-2.5 py-1 text-brand">{category}</b></p>
            <Link href="/transfer" className="mt-3 inline-block text-[12px] font-bold text-brand underline underline-offset-4">전수창업이 뭔가요? →</Link>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto bg-neutral-50 p-4">
          <p className="mb-3 text-[12px] text-neutral-500">추천 브랜드 <b className="text-brand">{list.length}</b>개</p>
          {list.length === 0 ? (
            <p className="py-12 text-center text-[13px] text-neutral-400">조건에 맞는 브랜드가 아직 없습니다.<br />상담을 신청하시면 맞는 브랜드를 찾아드립니다.</p>
          ) : (
            <ul className="space-y-3">
              <AnimatePresence mode="popLayout">
                {list.map((b, i) => (
                  <motion.li key={b.name} layout initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.96 }} transition={{ delay: i * 0.04 }} className="rounded-lg border border-neutral-200 bg-white p-4">
                    <div className="flex items-center gap-1.5 text-[10px] font-bold">
                      <span className="rounded bg-[#7a4a2b] px-1.5 py-0.5 text-white">전수창업</span>
                      <span className="rounded bg-neutral-100 px-1.5 py-0.5 text-neutral-600">{b.category}</span>
                    </div>
                    <h4 className="mt-2 text-[15px] font-black">{b.name}</h4>
                    <p className="mt-1 text-[12px] leading-relaxed text-neutral-500">{b.desc}</p>
                    <div className="mt-3 flex items-center justify-between gap-2 text-[11px] text-neutral-400">
                      <span>창업비용 {b.cost} · {b.ops.join("/")} · {b.area}</span>
                      <a href="#consult" onClick={onClose} className="shrink-0 rounded bg-orange-50 px-3 py-1.5 text-[11px] font-bold text-brand transition hover:bg-brand hover:text-white">상담 신청</a>
                    </div>
                  </motion.li>
                ))}
              </AnimatePresence>
            </ul>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

export function MatchPopup({ open, onClose, initial }: { open: boolean; onClose: () => void; initial: Initial }) {
  return <AnimatePresence>{open && <MatchForm onClose={onClose} initial={initial} />}</AnimatePresence>;
}
