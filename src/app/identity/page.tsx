import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Consult } from "@/components/ConsultForm";
import { Faq } from "@/components/Faq";
import { Reveal } from "@/components/Reveal";
import { AllInOneDiagram } from "@/components/AllInOneDiagram";
import { YoutubePopup } from "@/components/YoutubePopup";

export const metadata: Metadata = {
  title: "신규창업 | 구해줘창업",
  description: "상권분석부터 시설, 마케팅, 사후관리까지. 올인원 시스템으로 신규창업을 한 번에 준비하세요",
};

const strengths = [
  { tag: "ALL-IN-ONE", title: "올인원 시스템", desc: "상권분석, 시설, 마케팅을 업체마다 따로 알아볼 필요 없이 하나의 흐름으로 이어서 준비합니다" },
  { tag: "AFTER CARE", title: "사후관리", desc: "오픈이 끝이 아닙니다. 오픈 이후에도 운영 상황을 함께 점검하고 필요한 부분을 보완합니다" },
];

const steps = [
  {
    no: "01",
    tag: "How",
    ko: "어떻게?",
    label: "상권분석",
    title: "비싼 상권이 아니라\n좋은 상권을 찾습니다",
    desc: "",
    howTitle: "상권분석은 이렇게 해야 합니다",
    how: ["업종과 주 고객층을 먼저 정합니다", "유동인구의 시간대·연령을 확인합니다", "경쟁 점포와 배후 수요를 비교합니다", "임대료 대비 예상 손익까지 함께 따져 봅니다"],
  },
  {
    no: "02",
    tag: "Why",
    ko: "왜?",
    label: "시설",
    title: "좋은 가게는\n예쁜 가게가 아닙니다",
    desc: "",
    howTitle: "이유가 있습니다",
    how: ["동선과 좌석 구성이 회전율과 인건비를 좌우합니다", "주방·덕트·전기 등 보이지 않는 공사에서 추가 비용이 생깁니다", "업종에 맞지 않는 설계는 오픈 후 다시 고쳐야 합니다"],
  },
  {
    no: "03",
    tag: "What",
    ko: "무엇이?",
    label: "마케팅전략",
    title: "전문가와 함께하면\n이런 점이 좋습니다",
    desc: "",
    howTitle: "리스크를 차단합니다",
    how: ["분석한 고객층에 맞춰 홍보 방향을 잡습니다", "오픈 전부터 준비해 첫날부터 고객을 만납니다", "단계마다 업체를 바꾸지 않아 소통이 한 번에 끝납니다"],
  },
];

const mistakes = [
  { title: "유동인구만 보고 자리를 정했다면?", desc: "임대료와 권리금이 높아 매출이 나와도 남는 게 적은 경우가 있습니다" },
  { title: "인테리어에 예산을 몰아 썼다면?", desc: "정작 주방 설비와 동선에 쓸 비용이 부족해 오픈 후 다시 공사하기도 합니다" },
  { title: "업체를 따로따로 구했다면?", desc: "서로 소통이 안 돼 일정이 밀리고, 책임이 나뉘어 비용만 늘어나기도 합니다" },
  { title: "오픈만 하고 홍보를 미뤘다면?", desc: "손님이 찾아오기까지 시간이 걸려 초기 운영비 부담이 커지기도 합니다" },
];

const compare = [
  { item: "상담", each: "계속해서 시간을 내어 한 곳 한 곳 업체를 따로 찾고 상담", all: "한 곳에서 한 번에 상담" },
  { item: "소통", each: "내용을 직접 만나 따로따로 업체마다 반복으로 전달", all: "다음 단계로 유연하게 연결" },
  { item: "비용", each: "상가분석 인테리어 마케팅 브랜드 로고 등 중복 비용 발생", all: "올인원 패키지로 비용 절감" },
  { item: "책임", each: "문제 생기면 나몰라라 업체 간 떠넘기기", all: "한 곳에서 책임지고 관리" },
  { item: "오픈", each: "갑작스런 문제에 A/S 및 관리해 줄 곳을 직접 찾는 동안 매출 악영향", all: "사후관리 및 A/S 보장" },
];

const faqs = [
  {
    q: "비용이 걱정됩니다",
    a: "그래서 올인원 시스템을 운영합니다. 분야별 전문가 집단을 구성해 패키지로 진행하기 때문에, 따로따로 맡길 때보다 비용을 줄일 수 있습니다. 진행 범위에 따라 달라지므로 상담 후 견적을 사전에 안내드립니다",
  },
  {
    q: "창업이 처음인데 아무것도 몰라도 되나요?",
    a: "괜찮습니다. 업종 선택과 상권분석부터 시설, 마케팅까지 단계별로 함께 진행하기 때문에, 처음이어도 순서대로 따라오시면 됩니다",
  },
  {
    q: "필요한 부분만 따로 진행할 수 있나요?",
    a: "가능합니다. 상권분석만, 또는 시설이나 마케팅만 선택해서 진행할 수 있습니다. 다만 전체를 함께 진행하시면 비용 절감과 소통 면에서 더 유리합니다",
  },
  {
    q: "이미 봐 둔 매장이 있어도 상담받을 수 있나요?",
    a: "물론입니다. 후보로 두신 매장의 입지와 상권을 분석해 의견을 드립니다. 아직 정하지 못하셨다면 조건에 맞는 매물부터 함께 찾아드립니다",
  },
  {
    q: "상담이나 진행 기간은 얼마나 걸리나요?",
    a: "업종과 매장 규모, 진행 범위에 따라 다릅니다. 상담 때 일정을 함께 잡아 단계별 예상 기간을 사전에 안내드립니다",
  },
  {
    q: "오픈 후에도 도움을 받을 수 있나요?",
    a: "네, 사후관리를 함께 진행합니다. 오픈 이후 운영 상황을 점검하고 필요한 부분을 보완할 수 있도록 도와드립니다",
  },
  {
    q: "상담을 받으면 반드시 계약해야 하나요?",
    a: "아닙니다. 상담은 정보를 얻기 위한 과정이며, 진행 여부는 충분히 비교하신 뒤 직접 결정하시면 됩니다",
  },
];

export default function IdentityPage() {
  return (
    <>
      <Header active="신규창업" />
      <main>
        {/* 소개 */}
        <section className="mx-auto max-w-[1280px] px-6 py-20">
          <Reveal>
            <p className="text-[11px] font-bold tracking-wide text-brand">NEW START</p>
            <h2 className="mt-2 text-[30px] font-black leading-snug tracking-tight md:text-[38px]">
              <span className="text-brand">신규창업</span><br />알아보기 힘드시죠?
            </h2>
            <p className="mt-4 max-w-[560px] text-[14px] leading-relaxed text-neutral-600">
              어디서부터 시작해야 할지, 누구에게 맡겨야 할지 막막하셨다면 <b className="text-brand">한 번에 준비하는 올인원 시스템</b>으로 해결하세요
            </p>
          </Reveal>
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {strengths.map((s, i) => (
              <Reveal key={s.tag} delay={i * 0.08}>
                <div className="h-full rounded-lg border border-orange-200 bg-cream p-7">
                  <p className="text-[11px] font-bold tracking-wide text-brand">{s.tag}</p>
                  <h3 className="mt-2 text-[22px] font-black">{s.title}</h3>
                  <p className="mt-3 text-[13px] leading-relaxed text-neutral-600">{s.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* 올인원 시스템 그림 */}
        <section className="mx-auto max-w-[1280px] px-6 pb-20 text-center">
          <Reveal>
            <h2 className="text-[30px] font-black tracking-tight">하나의 흐름으로 이어지는 <span className="text-brand">ALL-IN-ONE</span></h2>
            <p className="mx-auto mt-3 max-w-[760px] text-[13px] leading-relaxed text-neutral-500">혼자서 알아보기 힘든 상가 분석, 인테리어, 브랜드 스토리, 로고, 사후관리, 마케팅이 한곳으로 모여<br className="hidden md:block" /> 하나의 <b className="text-[16px] text-brand">&ldquo;올인원 시스템&rdquo;</b>이 됩니다</p>
          </Reveal>
          <Reveal><div className="mt-10"><AllInOneDiagram /></div></Reveal>
        </section>

        {/* 흔한 실수 */}
        <section className="mx-auto max-w-[1280px] px-6 pb-20">
          <Reveal>
            <p className="text-[11px] font-bold tracking-wide text-brand">CHECK</p>
            <h2 className="mt-2 text-[30px] font-black tracking-tight"><span className="text-brand">신규창업</span> 이런 <span className="text-brand">실수</span>를 많이 합니다</h2>
          </Reveal>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {mistakes.map((m, i) => (
              <Reveal key={m.title} delay={i * 0.06}>
                <div className="h-full rounded-lg border border-neutral-200 bg-white p-6 shadow-sm transition hover:border-brand hover:shadow-lg">
                  <h3 className="text-[15px] font-black leading-snug text-brand">{m.title}</h3>
                  <p className="mt-3 text-[12.5px] leading-relaxed text-neutral-500">{m.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* 3단계 */}
        <section className="bg-sand">
          <div className="mx-auto max-w-[1280px] px-6 py-20">
            <Reveal>
              <p className="text-[11px] font-bold tracking-wide text-brand">PROCESS</p>
              <h2 className="mt-4 flex flex-wrap gap-3">
                {["How?", "Why?", "What?"].map((t) => (
                  <span key={t} className="rounded-full bg-brand px-6 py-2.5 text-[20px] font-black tracking-tight text-white shadow-md md:px-7 md:py-3 md:text-[26px]">{t}</span>
                ))}
              </h2>
            </Reveal>
            <div className="mt-10">
              {steps.map((s, i) => (
                <div key={s.no}>
                  <Reveal>
                    <div className="grid overflow-hidden rounded-lg bg-white shadow-sm md:grid-cols-[1fr_auto_1.1fr]">
                      <div className="flex flex-col items-center justify-center p-7 text-center md:p-9">
                        <p className="text-[11px] font-bold text-brand">STEP {s.no} · {s.label}</p>
                        <p className="mt-3 whitespace-pre-line text-[24px] font-black leading-snug tracking-tight text-brand md:text-[28px]"><span className="bg-gradient-to-t from-orange-200 from-40% to-transparent to-40% px-0.5">{s.title}</span></p>
                        {s.desc && <p className="mt-3 text-[13px] leading-relaxed text-neutral-600">{s.desc}</p>}
                      </div>
                      <div className="grid place-items-center bg-brand px-6 py-3 text-[18px] font-black tracking-wide text-white md:min-w-[100px] md:py-0 md:text-[22px]">
                        <div className="text-center">
                          <p>{s.tag}?</p>
                          <p className="mt-1 text-[12px] font-bold tracking-normal text-white/80">{s.ko}</p>
                        </div>
                      </div>
                      <div className="flex flex-col justify-center p-7 md:p-9">
                        <div className="mx-auto flex w-full max-w-[400px] flex-col gap-3.5 md:translate-x-6">
                          <p className="text-[14px] font-black leading-snug text-brand"><span className="bg-gradient-to-t from-orange-200 from-40% to-transparent to-40% px-0.5">{s.howTitle}</span></p>
                          <ul className="flex flex-col gap-3.5 text-[13px] leading-snug text-neutral-600">
                            {s.how.map((h) => (
                              <li key={h} className="flex items-start gap-2"><span className="mt-[7px] size-1.5 shrink-0 rounded-full bg-brand" />{h}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </Reveal>
                  {i < steps.length - 1 && <div className="h-4" />}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 비교 */}
        <section className="mx-auto max-w-[1280px] px-6 py-20">
          <Reveal>
            <p className="text-[11px] font-bold tracking-wide text-brand">COMPARE</p>
            <h2 className="mt-2 text-[30px] font-black tracking-tight"><span className="text-brand">ALL-IN-ONE</span> 이란?</h2>
          </Reveal>
          <Reveal>
            <div className="mt-8 overflow-hidden rounded-lg border border-neutral-200 text-[13px]">
              <div className="grid grid-cols-[72px_1fr_1fr] bg-sand text-[12px] font-bold md:grid-cols-[120px_1fr_1fr]">
                <span className="p-4" />
                <span className="p-4 text-neutral-500">혼자서 업체를 따로 구할 때</span>
                <span className="bg-brand p-4 text-white">올인원 시스템</span>
              </div>
              {compare.map((c) => (
                <div key={c.item} className="grid grid-cols-[72px_1fr_1fr] border-t border-neutral-200 md:grid-cols-[120px_1fr_1fr]">
                  <span className="p-4 font-black">{c.item}</span>
                  <span className="p-4 text-neutral-500">{c.each}</span>
                  <span className="bg-cream p-4 font-bold text-ink">{c.all}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </section>

        {/* 상담 유도 */}
        <section className="mx-auto max-w-[1280px] px-6 pb-20">
          <Reveal>
            <div className="rounded-3xl bg-gradient-to-br from-[#33231a] to-[#17100b] px-6 py-12 text-center text-white md:py-14">
              <h2 className="text-[26px] font-black leading-snug md:text-[32px]"><span className="text-[#ff7a45]">처음이라</span> 막막하다면<br /><span className="text-[#ff7a45]">전문가와</span> 함께하세요</h2>
              <p className="mt-3 text-[13px] text-white/70">상담은 무료이며 상담 후 편하게 결정하세요</p>

              {/* QnA */}
              <div className="mt-8 border-t border-white/15 pt-8 text-left [&>ul]:mt-0">
                <Faq items={faqs} />
                <p className="mt-6 text-center text-[11px] text-white/50">상권분석 결과와 컨설팅 내용은 참고 자료이며 매출과 수익을 보장하지 않습니다</p>
              </div>
            </div>
          </Reveal>
        </section>

        <Consult title="신규창업 상담신청" only="신규창업" />
      </main>
      <Footer />
      <YoutubePopup />
    </>
  );
}
