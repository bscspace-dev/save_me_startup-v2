"use client";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { supabase } from "@/lib/supabase";

const field = "w-full rounded border border-neutral-200 px-3.5 py-3 text-[13px] outline-none transition placeholder:text-neutral-300 focus:border-brand";

function ConsultForm({ id, title, onClose }: { id: number; title: string; onClose: () => void }) {
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    setStatus("sending");
    const row = { name: f.get("name"), phone: f.get("phone"), type: `매물상담[${id}]`, region: "", message: f.get("message") };
    if (!supabase) { console.warn("Supabase 환경변수가 설정되지 않았습니다."); setStatus("done"); return; }
    const { error } = await supabase.from("consultations").insert(row);
    setStatus(error ? "error" : "done");
  }

  return (
    <motion.div className="fixed inset-0 z-[100] grid place-items-center bg-black/70 p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
      <motion.form
        onSubmit={onSubmit}
        onClick={(e) => e.stopPropagation()}
        className="relative max-h-[90vh] w-full max-w-[460px] overflow-y-auto rounded-2xl bg-white p-7 shadow-2xl"
        initial={{ scale: 0.92, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.92, y: 20 }}
      >
        <button type="button" onClick={onClose} aria-label="닫기" className="absolute right-4 top-4 grid size-8 place-items-center rounded-full bg-neutral-100 hover:bg-neutral-200">✕</button>
        <p className="text-[11px] font-bold text-brand">매물 상담</p>
        <h3 className="mt-2 text-[20px] font-black">이 매물에 대해 문의하기</h3>
        <p className="mt-2 rounded bg-neutral-50 px-3 py-2 text-[12px] text-neutral-600"><b className="mr-1 text-neutral-400">[{id}]</b>{title}</p>

        <label className="mt-5 block text-[12px] font-bold">이름 *</label>
        <input name="name" required placeholder="성함을 입력해주세요" className={`${field} mt-1.5`} />

        <label className="mt-4 block text-[12px] font-bold">연락처 *</label>
        <input name="phone" required inputMode="tel" placeholder="010-0000-0000" className={`${field} mt-1.5`} />

        <label className="mt-4 block text-[12px] font-bold">문의 내용 (선택)</label>
        <textarea name="message" rows={3} placeholder="궁금한 점을 자유롭게 적어주세요" className={`${field} mt-1.5 resize-none`} />

        <label className="mt-4 flex items-center gap-2 text-[11px] text-neutral-400">
          <input type="checkbox" required className="accent-[#d9480f]" />개인정보 수집 및 이용에 동의합니다.
        </label>

        <motion.button whileTap={{ scale: 0.98 }} disabled={status === "sending" || status === "done"} className="mt-5 w-full rounded bg-brand py-3.5 text-[14px] font-bold text-white transition hover:bg-brand-dark disabled:opacity-70">
          {status === "sending" ? "전송 중..." : status === "done" ? "문의가 접수되었습니다 ✓" : "이 매물 상담 신청하기"}
        </motion.button>
        {status === "error" && <p className="mt-2 text-center text-[11px] text-red-600">전송에 실패했습니다. 잠시 후 다시 시도해주세요.</p>}
      </motion.form>
    </motion.div>
  );
}

export function ListingConsultButton({ id, title, label = "이 매물 상담하기", className = "mt-6 block w-full rounded bg-brand py-3.5 text-center text-[14px] font-bold text-white transition hover:bg-brand-dark" }: { id: number; title: string; label?: string; className?: string }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button onClick={() => setOpen(true)} className={className}>{label}</button>
      <AnimatePresence>{open && <ConsultForm id={id} title={title} onClose={() => setOpen(false)} />}</AnimatePresence>
    </>
  );
}
