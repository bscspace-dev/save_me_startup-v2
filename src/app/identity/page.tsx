import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Consult } from "@/components/ConsultForm";
import { Faq } from "@/components/Faq";
import { Reveal } from "@/components/Reveal";
import { YoutubePopup } from "@/components/YoutubePopup";

export const metadata: Metadata = {
  title: "신규창업 | 구해줘창업",
  description: "입지 분석부터 인테리어, 마케팅까지. 나다운 가게의 아이덴티티를 만들어 드립니다.",
};

const services = [
  { no: "01", title: "상가 매물·입지 분석", desc: "희망 지역과 업종에 맞는 상가 매물을 찾고, 유동인구·배후 수요·경쟁 점포를 근거로 후보지를 비교합니다." },
  { no: "02", title: "브랜드 아이덴티티", desc: "가게의 콘셉트, 네이밍, 로고, 톤앤매너를 정리해 처음부터 '나다운 가게'의 방향을 만듭니다." },
  { no: "03", title: "인테리어·공간 설계", desc: "브랜드 콘셉트에 맞는 공간 방향과 동선을 설계하고, 업체 선정·견적 검토·진행을 컨설팅합니다." },
  { no: "04", title: "마케팅·오픈 준비", desc: "온라인 플레이스, SNS, 오픈 이벤트까지 오픈 전부터 고객을 만날 준비를 함께합니다." },
];

const identity = [
  { title: "네이밍", desc: "가게의 이야기가 담긴 이름을 짓습니다. 부르기 쉽고 기억에 남는 이름을 함께 고릅니다." },
  { title: "로고", desc: "콘셉트를 한눈에 보여주는 심볼과 로고타입을 만듭니다." },
  { title: "컬러·서체", desc: "가게의 분위기를 만드는 대표 색상과 서체를 정합니다." },
  { title: "슬로건", desc: "가게가 전하고 싶은 한마디를 쉽고 선명한 문장으로 정리합니다." },
  { title: "간판", desc: "입지의 눈에 띄고 가게의 첫인상을 결정하는 간판을 디자인합니다." },
  { title: "메뉴판·패키지", desc: "메뉴판과 포장, 영수증까지 같은 톤으로 맞춰 통일감을 만듭니다." },
  { title: "온라인 프로필", desc: "플레이스와 SNS 프로필 이미지와 소개 문구를 가게다운 모습으로 채웁니다." },
];

const faqs = [
  { q: "어떤 분야까지 컨설팅해 주시나요?", a: "상가 입지 분석, 브랜드 아이덴티티 방향, 인테리어 방향, 오픈 마케팅까지 창업의 전 과정을 다룹니다. 필요한 부분만 선택해서 진행할 수도 있습니다." },
  { q: "어떤 지역을 다루나요?", a: "대구 전 지역(9개 구·군)을 중심으로 진행합니다. 그 외 지역은 상담 시 가능 여부를 안내드립니다." },
  { q: "이미 보고 있는 매물만 분석해 주실 수 있나요?", a: "가능합니다. 이미 후보로 두신 매물의 입지와 상권을 분석해 의견을 드립니다." },
  { q: "비용은 어떻게 되나요?", a: "진행하시는 범위에 따라 달라집니다. 상담 후 범위에 맞춰 견적을 사전에 안내드립니다." },
  { q: "컨설팅을 받으면 매출이 보장되나요?", a: "매출과 수익은 보장하지 않습니다. 컨설팅은 더 나은 판단을 돕는 참고 자료로 제공됩니다." },
];

export default function IdentityPage() {
  return (
    <>
      <Header active="신규창업" />
      <main>
        {/* 서비스 */}
        <section className="mx-auto max-w-[1280px] px-6 py-20">
          <Reveal>
            <p className="text-[11px] font-bold tracking-wide text-brand">SERVICES</p>
            <h2 className="mt-2 text-[30px] font-black tracking-tight">창업의 처음부터 끝까지</h2>
          </Reveal>
          <ul className="mt-10 border-t border-neutral-200">
            {services.map((s, i) => (
              <Reveal key={s.no} delay={i * 0.06}>
                <li className="grid gap-3 border-b border-neutral-200 py-6 md:grid-cols-[80px_320px_1fr] md:items-center">
                  <span className="text-[22px] font-black text-brand">{s.no}</span>
                  <h3 className="text-[17px] font-black">{s.title}</h3>
                  <p className="text-[13px] leading-relaxed text-neutral-500">{s.desc}</p>
                </li>
              </Reveal>
            ))}
          </ul>
        </section>

        {/* 아이덴티티 7가지 */}
        <section className="bg-sand">
          <div className="mx-auto max-w-[1280px] px-6 py-20">
            <Reveal>
              <p className="text-[11px] font-bold tracking-wide text-brand">IDENTITY</p>
              <h2 className="mt-2 text-[30px] font-black tracking-tight">나다운 가게를 만드는 7가지</h2>
              <p className="mt-3 max-w-[520px] text-[13px] leading-relaxed text-neutral-500">이름 하나, 색 하나가 손님이 기억하는 첫인상이 됩니다. 가게의 콘셉트를 정하고 눈에 보이는 모든 곳에 일관되게 담아냅니다.</p>
            </Reveal>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {identity.map((c, i) => (
                <Reveal key={c.title} delay={i * 0.06}>
                  <div className="h-full rounded-lg bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
                    <p className="text-[18px] font-black text-brand">{String(i + 1).padStart(2, "0")}</p>
                    <h3 className="mt-3 text-[16px] font-black">{c.title}</h3>
                    <p className="mt-2 text-[12.5px] leading-relaxed text-neutral-500">{c.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="mx-auto max-w-[1280px] px-6 py-20">
          <Reveal><h2 className="text-center text-[30px] font-black tracking-tight">자주 묻는 질문</h2></Reveal>
          <Faq items={faqs} />
          <p className="mt-6 text-center text-[11px] text-neutral-400">입지분석 결과와 컨설팅 내용은 참고 자료이며 매출과 수익을 보장하지 않습니다.</p>
        </section>

        <Consult />
      </main>
      <Footer />
      <YoutubePopup />
    </>
  );
}
