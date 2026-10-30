"use client";
import { useState } from "react";
import { motion } from "motion/react";
import { supabase } from "@/lib/supabase";
import { Icon } from "./Icons";
import { Reveal } from "./Reveal";

const types = ["프랜차이즈", "상가매물", "전수창업", "신규창업"];
const regions = ["중구", "동구", "서구", "남구", "북구", "수성구", "달서구", "달성군", "군위군"];
const field = "w-full rounded border border-neutral-200 px-3.5 py-3 text-[13px] outline-none transition placeholder:text-neutral-300 focus:border-brand";

export function ConsultCard() {
  const [type, setType] = useState("프랜차이즈");
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    setStatus("sending");
    const row = { name: f.get("name"), phone: f.get("phone"), type, region: f.get("region"), message: f.get("message") };
    if (!supabase) { console.warn("Supabase 환경변수가 설정되지 않았습니다."); setStatus("done"); return; }
    const { error } = await supabase.from("consultations").insert(row);
    setStatus(error ? "error" : "done");
  }

  return (
      <form onSubmit={onSubmit} className="rounded-xl bg-white p-7 text-ink shadow-2xl">
        <h3 className="text-[19px] font-black">간편 상담 신청</h3>
        <p className="mt-1.5 text-[11px] text-neutral-400">신청 내용 확인 후 1영업일 내 연락드립니다.</p>

        <label className="mt-5 block text-[12px] font-bold">이름 *</label>
        <input name="name" required placeholder="성함을 입력해주세요" className={`${field} mt-1.5`} />

        <label className="mt-4 block text-[12px] font-bold">연락처 *</label>
        <input name="phone" required inputMode="tel" placeholder="010-0000-0000" className={`${field} mt-1.5`} />

        <p className="mt-4 text-[12px] font-bold">관심 창업 유형</p>
        <div className="mt-1.5 flex flex-wrap gap-2">
          {types.map((t) => (
            <button type="button" key={t} onClick={() => setType(t)} className={`rounded-full border px-3.5 py-1.5 text-[11.5px] transition ${type === t ? "border-brand bg-orange-50 font-bold text-brand" : "border-neutral-300 text-neutral-500 hover:border-brand"}`}>{t}</button>
          ))}
        </div>

        <label className="mt-4 block text-[12px] font-bold">희망 지역 (대구)</label>
        <div className="relative mt-1.5">
          <select name="region" defaultValue="" className={`${field} appearance-none text-neutral-500`}>
            <option value="">구·군 선택</option>
            {regions.map((r) => <option key={r}>{r}</option>)}
          </select>
          <Icon name="chevron" className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-neutral-400" />
        </div>

        <label className="mt-4 block text-[12px] font-bold">상담 내용 (선택)</label>
        <textarea name="message" rows={3} placeholder="예산, 업종, 현재 상황 등 자유롭게 적어주세요" className={`${field} mt-1.5 resize-none`} />

        <label className="mt-4 flex items-center gap-2 text-[11px] text-neutral-400">
          <input type="checkbox" required className="accent-[#d9480f]" />개인정보 수집 및 이용에 동의합니다.
        </label>

        <motion.button whileTap={{ scale: 0.98 }} disabled={status === "sending" || status === "done"} className="mt-5 w-full rounded bg-brand py-3.5 text-[14px] font-bold text-white transition hover:bg-brand-dark disabled:opacity-70">
          {status === "sending" ? "전송 중..." : status === "done" ? "신청이 접수되었습니다 ✓" : "무료 창업상담 신청하기"}
        </motion.button>
        {status === "error" && <p className="mt-2 text-center text-[11px] text-red-600">전송에 실패했습니다. 잠시 후 다시 시도해주세요.</p>}
        <p className="mt-3 text-center text-[10px] text-neutral-300">신청 후 영업일 기준 1일 내 담당 컨설턴트가 연락드립니다.</p>
      </form>
  );
}

export function Consult() {
  return (
    <section id="consult" className="bg-[#1a1a1a] text-white">
      <div className="mx-auto grid max-w-[1280px] items-center gap-12 px-6 py-24 lg:grid-cols-[1fr_440px]">
        <Reveal>
          <p className="text-[11px] font-bold text-brand">무료 창업 상담</p>
          <h2 className="mt-5 text-[38px] font-black leading-[1.3]">창업, 이제<br />구해줘창업에 맡기세요.</h2>
          <p className="mt-6 max-w-[520px] text-[13.5px] leading-relaxed text-white/70">업종·지역·예산이 아직 미정이라도 괜찮습니다. 지금의 고민을 들려주시면 전문 컨설턴트가 함께 방향을 잡아드립니다.</p>
          <ul className="mt-8 space-y-2.5 text-[13px] text-white/85">
            {["대구 지역 전문 컨설턴트 1:1 매칭", "프랜차이즈·전수창업·신규창업 전 유형 상담", "상담 신청 후 24시간 내 연락"].map((t) => (
              <li key={t} className="flex items-center gap-2"><Icon name="check" className="size-4 text-brand" />{t}</li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.15}>
          <ConsultCard />
        </Reveal>
      </div>
    </section>
  );
}
