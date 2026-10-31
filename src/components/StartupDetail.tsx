import Link from "next/link";
import { Reveal } from "./Reveal";
import { FranchiseGallery } from "./FranchiseGallery";
import { StartupConsultButton } from "./StartupConsultButton";
import { won, type Listing } from "@/lib/data";
import { consultItems, type StartupCase } from "@/lib/startup";

// 신규창업 상세: 매물이 아니라 창업컨설팅을 진행한 상가를 소개한다 (매물번호·금액·상담 버튼 없음)
// 사진이 없을 때 보여줄 자리표시 칸 (사진은 public/listings/<번호>/1.jpg … 에 넣고 data.ts 의 photos 에 장수를 적는다)
const placeholder = ["외관", "내부", "주방·카운터", "좌석", "주변 전경"].map((label) => ({ label, caption: "", sub: "" }));

export function StartupDetail({ l, c, srcs }: { l: Listing; c: StartupCase; srcs?: string[] }) {
  const rows = [
    ["지역", l.startup?.address ?? `대구 ${l.region}`],
    ["업종", l.category],
    ["운영방식", l.op],
    ["면적", `전용 ${l.area}㎡ (약 ${Math.round(l.area / 3.3058)}평)`],
    ["컨설팅 비용", `약 ${won(l.cost)}원`],
  ];

  return (
    <main className="mx-auto max-w-[1100px] px-6 py-10">
      <Link href="/listings?type=신규창업" className="text-[12px] text-neutral-500 transition hover:text-brand">← 목록으로</Link>

      <h1 className="mt-4 text-[28px] font-black leading-snug md:text-[34px]">{c.title}</h1>

      <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_340px]">
        <Reveal>
          <div className="overflow-hidden rounded-lg border border-neutral-200 bg-white shadow-sm">
            <FranchiseGallery slides={placeholder} badges={["신규창업"]} hideLabels ratio="aspect-[16/10]" photos={{ id: l.id, count: srcs?.length ?? l.photos ?? 0, srcs }} />
          </div>

          <dl className="mt-6 grid rounded-lg border border-neutral-200 bg-white px-5 text-[13px] shadow-sm sm:grid-cols-2 sm:gap-x-10">
            {rows.map(([k, v]) => (
              <div key={k} className="flex border-b border-neutral-100 py-3.5 last:border-b-0"><dt className="w-[88px] text-neutral-400">{k}</dt><dd className="font-bold">{v}</dd></div>
            ))}
          </dl>
        </Reveal>

        <Reveal delay={0.1}>

          <h2 className="text-[17px] font-black">컨설팅 리스트</h2>
          <ul className="mt-3 divide-y divide-neutral-100 overflow-hidden rounded-lg border border-neutral-200 bg-white shadow-sm">
            {consultItems.map((label) => {
              const s = c.steps.find((x) => x.label === label);
              return (
                <li key={label} className={`flex items-center gap-4 px-4 py-3.5 ${s ? "bg-orange-50" : ""}`}>
                  <span className={`grid size-6 shrink-0 place-items-center rounded-full text-[13px] font-black ${s ? "bg-brand text-white" : "border border-neutral-300 text-transparent"}`}>✓</span>
                  <h3 className={`text-[14px] font-black ${s ? "text-brand" : "text-neutral-400"}`}>{label}</h3>
                </li>
              );
            })}
          </ul>
          <StartupConsultButton className="mt-4 block w-full rounded bg-brand py-3.5 text-center text-[14px] font-bold text-white transition hover:bg-brand-dark" />
        </Reveal>
      </div>

      <Reveal>
        <div className="mt-10 rounded-lg border border-neutral-200 bg-white p-6 shadow-sm">
          <h2 className="text-[20px] font-black">창업 상가 소개</h2>
          <p className="mt-3 text-[14px] leading-relaxed text-neutral-600">{c.story}</p>
        </div>
      </Reveal>

      <div className="mt-16" />
    </main>
  );
}
