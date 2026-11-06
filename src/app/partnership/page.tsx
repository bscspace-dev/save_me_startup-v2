import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { YoutubePopup } from "@/components/YoutubePopup";
import { PartnershipForm } from "@/components/PartnershipForm";

export const metadata: Metadata = {
  title: "광고·제휴 문의 | 구해줘창업",
  description: "구해줘창업과 함께할 프랜차이즈 본사, 상가·창업 관련 업체의 광고·제휴 문의를 받습니다",
};

const items = [
  { t: "프랜차이즈 브랜드 홍보", d: "가맹 모집 중인 브랜드를 상세 페이지와 목록에서 소개합니다" },
  { t: "상가·매물 제휴", d: "중개사, 건물주, 시행사의 매물을 함께 소개합니다" },
  { t: "창업 서비스 제휴", d: "인테리어, 시설, 마케팅, 세무 등 창업에 필요한 서비스를 연결합니다" },
];

export default function PartnershipPage() {
  return (
    <>
      <Header />
      <main className="bg-[#f7f6f4]">
        <div className="mx-auto max-w-[53.75rem] px-6 py-14">
          <p className="text-[0.6875rem] font-bold tracking-[0.14em] text-[#D49F12]">PARTNERSHIP</p>
          <h1 className="mt-2 font-gmarket text-[1.875rem] font-black tracking-tight md:text-[2.25rem]">광고·제휴 문의</h1>
          <p className="mt-4 text-[0.875rem] leading-relaxed text-neutral-600">
            구해줘창업과 함께 창업 시장의 신뢰를 만들어갈 파트너를 기다립니다. 아래 양식으로 문의를 남겨주시면 검토 후 연락드립니다.
          </p>

          <ul className="mt-8 grid gap-3 sm:grid-cols-3">
            {items.map((x) => (
              <li key={x.t} className="rounded-xl border border-neutral-200 bg-white p-5">
                <p className="border-b-2 border-[#F0C33F] pb-2 text-[0.9375rem] font-black">{x.t}</p>
                <p className="mt-3 text-[0.8125rem] leading-relaxed text-neutral-600">{x.d}</p>
              </li>
            ))}
          </ul>

          <div className="mt-10"><PartnershipForm /></div>
        </div>
      </main>
      <Footer />
      <YoutubePopup />
    </>
  );
}
