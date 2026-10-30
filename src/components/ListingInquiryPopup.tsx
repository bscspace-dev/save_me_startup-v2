"use client";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { supabase } from "@/lib/supabase";

const types = ["상가매물", "전수창업", "프랜차이즈", "신규창업"];
const regions = ["중구", "동구", "서구", "남구", "북구", "수성구", "달서구", "달성군", "군위군"];
const field = "w-full rounded border border-neutral-200 px-3.5 py-3 text-[13px] outline-none transition placeholder:text-neutral-300 focus:border-brand";

function InquiryForm({ onClose }: { onClose: () => void }) {
  const [type, setType] = useState(types[0]);
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
    const row = { name: f.get("name"), phone: f.get("phone"), type: `매물등록문의(${type})`, region: f.get("region"), message: f.get("message") };
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
        <p className="text-[11px] font-bold text-brand">매물 등록 문의</p>
        <h3 className="mt-2 text-[20px] font-black">내 매물을 등록하고 싶으신가요?</h3>
        <p className="mt-1.5 text-[11px] text-neutral-400">신청 내용 확인 후 1영업일 내 연락드립니다.</p>

        <label className="mt-5 block text-[12px] font-bold">이름 *</label>
        <input name="name" required placeholder="성함을 입력해주세요" className={`${field} mt-1.5`} />

        <label className="mt-4 block text-[12px] font-bold">연락처 *</label>
        <input name="phone" required inputMode="tel" placeholder="010-0000-0000" className={`${field} mt-1.5`} />

        <p className="mt-4 text-[12px] font-bold">등록할 매물 유형</p>
        <div className="mt-1.5 flex flex-wrap gap-2">
          {types.map((t) => (
            <button type="button" key={t} onClick={() => setType(t)} className={`rounded-full border px-3.5 py-1.5 text-[11.5px] transition ${type === t ? "border-brand bg-orange-50 font-bold text-brand" : "border-neutral-300 text-neutral-500 hover:border-brand"}`}>{t}</button>
          ))}
        </div>

        <label className="mt-4 block text-[12px] font-bold">매물 지역 (대구)</label>
        <select name="region" defaultValue="" className={`${field} mt-1.5 text-neutral-500`}>
          <option value="">구·군 선택</option>
          {regions.map((r) => <option key={r}>{r}</option>)}
        </select>

        <label className="mt-4 block text-[12px] font-bold">매물 내용 (선택)</label>
        <textarea name="message" rows={3} placeholder="업종, 면적, 희망 금액 등 자유롭게 적어주세요" className={`${field} mt-1.5 resize-none`} />

        <label className="mt-4 flex items-center gap-2 text-[11px] text-neutral-400">
          <input type="checkbox" required className="accent-[#d9480f]" />개인정보 수집 및 이용에 동의합니다.
        </label>

        <motion.button whileTap={{ scale: 0.98 }} disabled={status === "sending" || status === "done"} className="mt-5 w-full rounded bg-brand py-3.5 text-[14px] font-bold text-white transition hover:bg-brand-dark disabled:opacity-70">
          {status === "sending" ? "전송 중..." : status === "done" ? "문의가 접수되었습니다 ✓" : "매물 등록 문의하기"}
        </motion.button>
        {status === "error" && <p className="mt-2 text-center text-[11px] text-red-600">전송에 실패했습니다. 잠시 후 다시 시도해주세요.</p>}
      </motion.form>
    </motion.div>
  );
}

export function ListingInquiryPopup({ open, onClose }: { open: boolean; onClose: () => void }) {
  return <AnimatePresence>{open && <InquiryForm onClose={onClose} />}</AnimatePresence>;
}
