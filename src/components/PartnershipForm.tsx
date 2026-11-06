"use client";
import { useState } from "react";
import { motion } from "motion/react";
import { supabase } from "@/lib/supabase";
import { NameInput } from "./NameInput";
import { PhoneInput } from "./PhoneInput";

const field = "w-full rounded-md border border-[#2d2d2d] bg-white px-3 py-2.5 text-[0.875rem] outline-none transition placeholder:text-neutral-300 focus:border-[#F0C33F]";
const kinds = ["광고 문의", "제휴 문의", "기타"];

// 광고·제휴 문의: 상담 목록(consultations)에 '광고제휴문의'로 저장되고, 관리자에서는 '기타'로 보인다
export function PartnershipForm() {
  const [kind, setKind] = useState(kinds[0]);
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    setStatus("sending");
    const message = `[${kind}] 회사·브랜드: ${f.get("company")}${f.get("email") ? ` / 이메일: ${f.get("email")}` : ""}\n${f.get("message") ?? ""}`;
    const row = { name: f.get("name"), phone: f.get("phone"), type: "광고제휴문의", region: "", message };
    if (!supabase) { console.warn("Supabase 환경변수가 설정되지 않았습니다"); setStatus("error"); return; } // 저장되지 않았는데 접수된 것처럼 보이지 않게 한다
    const { error } = await supabase.from("consultations").insert(row);
    setStatus(error ? "error" : "done");
  }

  const sending = status === "sending" || status === "done";

  return (
    <form onSubmit={onSubmit} className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm sm:p-8">
      <p className="text-[0.875rem] font-bold">문의 유형</p>
      <div className="mt-2 flex flex-wrap gap-2">
        {kinds.map((k) => (
          <button type="button" key={k} onClick={() => setKind(k)} className={`cursor-pointer rounded-full border px-4 py-1.5 text-[0.8125rem] transition ${kind === k ? "border-[#F0C33F] bg-[#F0C33F] font-bold text-ink" : "border-neutral-300 text-neutral-500 hover:border-[#F0C33F]"}`}>{k}</button>
        ))}
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <div><label className="text-[0.8125rem] font-bold">회사·브랜드명 *</label><input name="company" required maxLength={40} placeholder="회사 또는 브랜드명" className={`${field} mt-1.5`} /></div>
        <div><label className="text-[0.8125rem] font-bold">담당자명 *</label><NameInput className={`${field} mt-1.5`} /></div>
        <div><label className="text-[0.8125rem] font-bold">연락처 *</label><PhoneInput className={`${field} mt-1.5`} /></div>
        <div><label className="text-[0.8125rem] font-bold">이메일 (선택)</label><input name="email" type="email" maxLength={60} placeholder="example@company.com" className={`${field} mt-1.5`} /></div>
      </div>

      <label className="mt-4 block text-[0.8125rem] font-bold">문의 내용 *</label>
      <textarea name="message" required rows={5} maxLength={1000} placeholder="광고 또는 제휴를 원하는 내용을 자유롭게 적어주세요" className={`${field} mt-1.5 resize-none`} />

      <label className="mt-4 flex items-center gap-2 text-[0.8125rem] text-[#2d2d2d]">
        <input type="checkbox" required className="accent-[#F0C33F]" />개인정보 수집 및 이용에 동의합니다
        <a href="/privacy" target="_blank" rel="noopener noreferrer" className="font-bold underline underline-offset-2 hover:text-ink">[보기]</a>
      </label>

      <motion.button whileTap={{ scale: 0.98 }} disabled={sending} className="mt-5 w-full cursor-pointer rounded-lg bg-[#F0C33F] py-3.5 text-[0.9375rem] font-bold text-ink transition hover:brightness-95 disabled:opacity-70">
        {status === "sending" ? "전송 중..." : status === "done" ? "문의가 접수되었습니다 ✓" : "문의 보내기"}
      </motion.button>
      {status === "error" && <p className="mt-2 text-center text-[0.75rem] text-red-600">전송에 실패했습니다. 잠시 후 다시 시도해주세요</p>}
      <p className="mt-3 text-center text-[0.6875rem] text-neutral-400">접수 후 영업일 기준 3일 내 담당자가 연락드립니다</p>
    </form>
  );
}
