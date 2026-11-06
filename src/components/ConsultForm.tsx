"use client";
import { useState } from "react";
import { motion } from "motion/react";
import { supabase } from "@/lib/supabase";
import { Reveal } from "./Reveal";
import { NameInput } from "./NameInput";
import { PhoneInput } from "./PhoneInput";

const types = ["프랜차이즈", "상가매물", "전수창업", "신규창업"];
const field = "w-full rounded border border-neutral-200 px-3.5 py-3 text-[0.8125rem] outline-none transition placeholder:text-neutral-300 focus:border-[#F0C33F]";

export function ConsultCard({ title = "간편 상담 신청", only, wide = false }: { title?: string; only?: string; wide?: boolean }) {
  const [type, setType] = useState(only ?? "프랜차이즈");
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    setStatus("sending");
    const row = { name: f.get("name"), phone: f.get("phone"), type, region: "", message: f.get("message") };
    if (!supabase) { console.warn("Supabase 환경변수가 설정되지 않았습니다"); setStatus("error"); return; } // 저장되지 않았는데 접수된 것처럼 보이지 않게 한다
    const { error } = await supabase.from("consultations").insert(row);
    setStatus(error ? "error" : "done");
  }

  const sending = status === "sending" || status === "done";
  const wf = "w-full rounded-md border border-[#2d2d2d] bg-white px-3 py-2 text-[0.875rem] outline-none transition placeholder:text-neutral-300 focus:border-ink";
  const row = "mt-3 grid grid-cols-1 gap-1.5 sm:grid-cols-[5.25rem_1fr] sm:items-center sm:gap-3";

  // 홈 하단 큰 상담 카드: 왼쪽 폼 / 세로선 / 오른쪽 노란 신청 버튼
  if (wide) return (
    <form onSubmit={onSubmit} className="grid rounded-3xl bg-white p-6 text-ink shadow-2xl sm:p-8 lg:grid-cols-[1fr_20rem]">
      <div className="lg:border-r lg:border-neutral-200 lg:pr-10">
        <h3 className="flex items-center gap-2.5 font-gmarket text-[1.5rem] font-bold leading-none"><span className="h-[1em] w-[0.3125rem] rounded-sm bg-[#F0C33F]" />{title}</h3>
        <p className="mt-2 text-[0.875rem] text-[#2d2d2d]">신청 내용 확인 후 1영업일 내 연락드립니다</p>

        <div className={row}><label className="text-[0.875rem] font-bold">이름 *</label><NameInput className={wf} /></div>
        <div className={row}><label className="text-[0.875rem] font-bold">연락처 *</label><PhoneInput className={wf} /></div>
        <div className={row}>
          <p className="text-[0.875rem] font-bold">관심 창업 유형</p>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {(only ? [only] : types).map((t) => (
              <button type="button" key={t} disabled={!!only} onClick={() => setType(t)} className={`cursor-pointer rounded-full border px-2 py-1 text-[0.875rem] transition ${type === t ? "border-ink bg-ink font-bold text-white" : "border-[#2d2d2d] text-[#2d2d2d] hover:border-ink"} disabled:cursor-default`}>{t}</button>
            ))}
          </div>
        </div>
        <div className={`${row} sm:items-start`}>
          <label className="text-[0.875rem] font-bold sm:pt-2">상담 내용 (선택)</label>
          <div>
            <textarea name="message" rows={5} placeholder="예산, 업종, 현재 상황 등 자유롭게 적어주세요" className={`${wf} resize-none`} />
            <label className="mt-2 flex items-center gap-2 text-[0.875rem] text-[#2d2d2d]"><input type="checkbox" required className="accent-ink" />개인정보 수집 및 이용에 동의합니다 <a href="/privacy" target="_blank" rel="noopener noreferrer" className="font-bold underline underline-offset-2 hover:text-ink">[보기]</a></label>
          </div>
        </div>
      </div>

      <div className="mt-6 flex flex-col justify-center lg:mt-0 lg:pl-10">
        <motion.button whileTap={{ scale: 0.98 }} disabled={sending} className="cursor-pointer rounded-2xl bg-[#F0C33F] px-7 py-5 text-left font-gmarket text-ink transition hover:brightness-95 disabled:opacity-70">
          <span className="text-[1.75rem] font-bold leading-[1.3] font-gmarket">
            {status === "sending" ? "전송 중..." : status === "done" ? <>신청이<br />접수되었습니다</> : <>무료<br />창업상담<br />신청하기 <span aria-hidden className="ml-1 inline-grid size-7 -translate-y-0.5 place-items-center rounded-full bg-ink align-middle text-[#F0C33F]"><svg viewBox="0 0 24 24" className="size-[1rem]" fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 5l7 7-7 7" /></svg></span></>}
          </span>
        </motion.button>
        {status === "error" && <p className="mt-2 text-center text-[0.75rem] text-red-600">전송에 실패했습니다. 잠시 후 다시 시도해주세요</p>}
        <p className="mx-auto mt-5 w-full border-t border-[#2d2d2d] pt-4 text-center text-[0.875rem] leading-relaxed text-[#2d2d2d]">신청 후 영업일 기준 1일 내<br />담당 컨설턴트가 연락드립니다</p>
      </div>
    </form>
  );

  return (
      <form onSubmit={onSubmit} className="rounded-xl bg-white p-7 text-ink shadow-2xl">
        <h3 className="text-[1.1875rem] font-black">{title}</h3>
        <p className="mt-1.5 text-[0.6875rem] text-neutral-400">신청 내용 확인 후 1영업일 내 연락드립니다</p>

        <label className="mt-5 block text-[0.75rem] font-bold">이름 *</label>
        <NameInput className={`${field} mt-1.5`} />

        <label className="mt-4 block text-[0.75rem] font-bold">연락처 *</label>
        <PhoneInput className={`${field} mt-1.5`} />

        <p className="mt-4 text-[0.75rem] font-bold">관심 창업 유형</p>
        <div className="mt-1.5 flex flex-wrap gap-2">
          {(only ? [only] : types).map((t) => (
            <button type="button" key={t} disabled={!!only} onClick={() => setType(t)} className={`rounded-full border px-3.5 py-1.5 text-[0.7188rem] transition ${type === t ? "border-[#F0C33F] bg-[#F0C33F] font-bold text-ink" : "border-neutral-300 text-neutral-500 hover:border-[#F0C33F]"} disabled:cursor-default`}>{t}</button>
          ))}
        </div>

        <label className="mt-4 block text-[0.75rem] font-bold">상담 내용 (선택)</label>
        <textarea name="message" rows={3} placeholder="예산, 업종, 현재 상황 등 자유롭게 적어주세요" className={`${field} mt-1.5 resize-none`} />

        <label className="mt-4 flex items-center gap-2 text-[0.6875rem] text-neutral-400">
          <input type="checkbox" required className="accent-[#F0C33F]" />개인정보 수집 및 이용에 동의합니다 <a href="/privacy" target="_blank" rel="noopener noreferrer" className="font-bold underline underline-offset-2 hover:text-ink">[보기]</a>
        </label>

        <motion.button whileTap={{ scale: 0.98 }} disabled={status === "sending" || status === "done"} className="mt-5 w-full rounded bg-[#F0C33F] py-3.5 text-[0.875rem] font-bold text-ink transition hover:brightness-95 disabled:opacity-70">
          {status === "sending" ? "전송 중..." : status === "done" ? "신청이 접수되었습니다 ✓" : "무료 창업상담 신청하기"}
        </motion.button>
        {status === "error" && <p className="mt-2 text-center text-[0.75rem] text-red-600">전송에 실패했습니다. 잠시 후 다시 시도해주세요</p>}
        <p className="mt-3 text-center text-[0.625rem] text-neutral-300">신청 후 영업일 기준 1일 내 담당 컨설턴트가 연락드립니다</p>
      </form>
  );
}

export function Consult({ title, only }: { title?: string; only?: string }) {
  return (
    <section id="consult" className="bg-[#2d2d2d] text-white">
      <div className="mx-auto max-w-[80rem] px-6 py-16">
        <Reveal>
          <div className="flex flex-col items-center gap-6 text-center md:flex-row md:justify-center md:gap-10 md:text-left">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo-footer.svg" alt="구해줘창업" className="h-[7.5rem] w-auto md:h-[9.375rem]" />
            <div className="hidden self-stretch border-l-2 border-[#F0C33F] md:my-3 md:block" />
            <div>
              <h2 className="font-gmarket text-[1.625rem] font-bold leading-[1.3] tracking-tight md:text-[2.125rem]">창업, 이제<br /><span style={{ color: "#F0C33F" }}>구해줘창업</span>에 맡기세요.</h2>
              <p className="mt-3 text-[0.9375rem] font-medium leading-relaxed text-white/90 md:text-[0.9375rem]">업종·지역·예산이 아직 미정이라도 괜찮습니다.<br />지금의 고민을 들려주시면 전문 컨설턴트가 함께 방향을 잡아드립니다.</p>
            </div>
          </div>
          <ul className="mx-auto mt-12 grid max-w-[53.75rem] gap-6 md:grid-cols-3 md:gap-10">
            {[["전문 컨설턴트", "1:1 매칭"], ["프랜차이즈·전수창업", "신규창업 전 유형 상담"], ["상담 신청 후", "24시간 내 연락"]].map(([a, b]) => (
              <li key={a} className="border-b-[0.1875rem] border-[#F0C33F] pb-2 text-center text-[1.25rem] font-medium leading-snug">{a}<br />{b}</li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.15} className="mt-10">
          <ConsultCard title={title} only={only} wide />
        </Reveal>
      </div>
    </section>
  );
}
