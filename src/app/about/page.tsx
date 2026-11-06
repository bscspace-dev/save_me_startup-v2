import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Consult } from "@/components/ConsultForm";
import { YoutubePopup } from "@/components/YoutubePopup";

export const metadata: Metadata = {
  title: "회사소개 | 구해줘창업",
  description: "상가매물, 프랜차이즈, 전수창업, 신규창업까지. 창업의 처음부터 끝까지 함께하는 구해줘창업을 소개합니다",
};

const services = [
  { t: "상가매물", d: "권리금, 보증금, 월세 조건을 확인하고 현장 정보를 바탕으로 매물을 소개합니다" },
  { t: "프랜차이즈", d: "가맹 조건과 예상 비용을 비교해 보고, 브랜드에 맞는 상담을 연결합니다" },
  { t: "전수창업", d: "검증된 사부님의 노하우를 배우고 안정적으로 시작하는 방법을 안내합니다" },
  { t: "신규창업", d: "상권분석부터 시설, 마케팅, 사후관리까지 올인원으로 준비합니다" },
];

const points = [
  ["전문 컨설턴트", "1:1 매칭"],
  ["프랜차이즈·전수창업", "신규창업 전 유형 상담"],
  ["상담 신청 후", "24시간 내 연락"],
];

const info: [string, string][] = [
  ["상호", "구해줘창업"],
  ["대표자", "[입력 예정]"],
  ["사업자등록번호", "[입력 예정]"],
  ["통신판매업 신고", "[입력 예정]"],
  ["사업장 주소", "[입력 예정]"],
  ["대표 전화", "[입력 예정]"],
  ["이메일", "[입력 예정]"],
];

export default function AboutPage() {
  return (
    <>
      <Header />
      <main>
        <section className="bg-[#f7f6f4]">
          <div className="mx-auto max-w-[53.75rem] px-6 py-16">
            <p className="text-[0.6875rem] font-bold tracking-[0.14em] text-[#D49F12]">ABOUT US</p>
            <h1 className="mt-2 font-gmarket text-[1.875rem] font-bold leading-[1.3] tracking-tight md:text-[2.375rem]">
              창업, 이제 <span className="text-[#D49F12]">구해줘창업</span>에 맡기세요.
            </h1>
            <p className="mt-5 text-[0.9375rem] leading-relaxed text-neutral-600">
              구해줘창업은 상가매물 탐색부터 프랜차이즈, 전수창업, 신규창업까지 창업의 모든 과정을 한곳에서 상담받을 수 있는 창업 컨설팅 플랫폼입니다.
              업종, 지역, 예산이 아직 정해지지 않았더라도 괜찮습니다. 지금의 고민을 들려주시면 전문 컨설턴트가 함께 방향을 잡아드립니다.
            </p>

            <ul className="mt-10 grid gap-6 md:grid-cols-3">
              {points.map(([a, b]) => (
                <li key={a} className="border-b-[0.1875rem] border-[#F0C33F] pb-2 text-center text-[1.0625rem] font-medium leading-snug">{a}<br />{b}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className="mx-auto max-w-[53.75rem] px-6 py-16">
          <h2 className="font-gmarket text-[1.5rem] font-bold">우리가 하는 일</h2>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2">
            {services.map((x) => (
              <li key={x.t} className="rounded-xl border border-neutral-200 bg-white p-6">
                <p className="font-gmarket text-[1.0625rem] font-bold">{x.t}</p>
                <p className="mt-2 text-[0.8125rem] leading-relaxed text-neutral-600">{x.d}</p>
              </li>
            ))}
          </ul>

          <h2 className="mt-14 font-gmarket text-[1.5rem] font-bold">일하는 방식</h2>
          <ul className="mt-5 list-disc space-y-2 pl-5 text-[0.875rem] leading-relaxed text-neutral-600">
            <li>정보는 있는 그대로 보여드리고, 계약 전에 꼭 확인해야 할 점을 함께 안내합니다.</li>
            <li>상담은 무료이며, 신청해 주신 정보는 상담 목적으로만 사용합니다.</li>
            <li>유형별로 나뉜 상담으로 필요한 정보만 빠르게 전달합니다.</li>
          </ul>

          <h2 className="mt-14 font-gmarket text-[1.5rem] font-bold">사업자 정보</h2>
          <dl className="mt-5 divide-y divide-neutral-100 border-y border-neutral-200 text-[0.8125rem]">
            {info.map(([k, v]) => (
              <div key={k} className="flex py-3"><dt className="w-[9rem] shrink-0 text-neutral-400">{k}</dt><dd className="font-bold">{v}</dd></div>
            ))}
          </dl>
        </section>

        <Consult />
      </main>
      <Footer />
      <YoutubePopup />
    </>
  );
}
