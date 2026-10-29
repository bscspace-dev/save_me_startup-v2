import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Consult } from "@/components/ConsultForm";
import { Faq } from "@/components/Faq";
import { Icon } from "@/components/Icons";
import { Reveal } from "@/components/Reveal";
import { YoutubePopup } from "@/components/YoutubePopup";
import { TransferVideoPopup } from "@/components/TransferVideoPopup";

export const metadata: Metadata = {
  title: "전수창업 | 구해줘창업",
  description: "검증된 브랜드의 기술과 운영 노하우를 전수받아 시작하는 창업. 구해줘창업이 함께합니다.",
};

const concepts = [
  { no: "01", title: "기술", desc: "조리법과 서비스 방식 등 매장 운영에 필요한 실무 기술을 배웁니다." },
  { no: "02", title: "노하우", desc: "상품 구성, 거래처, 마케팅 등 운영하며 쌓인 노하우를 전수받습니다." },
  { no: "03", title: "운영 방식", desc: "메뉴얼과 교육을 통해 매장을 운영하는 방식을 익힙니다." },
];

const fits = [
  { tag: "자영업자 사장님", title: "지금 가게를 하고 있는데, 성장하고 싶다면", points: ["검증된 시스템으로 2호점·업종 확장 검토", "현재 매장 운영과 병행 가능한 브랜드 선별", "기존 상권·자금 상황에 맞는 조건 비교"], cta: "스승님 상담" },
  { tag: "전수창업을 알아보는 분", title: "처음이라 도움이 필요하다면", points: ["경험이 없어도 따라 할 수 있는 교육·매뉴얼 확인", "내 자본에 맞는 브랜드와 업종 좁히기", "계약 전 위험 요소 점검과 오픈 지원"], cta: "제자 상담" },
];

const worries = [
  { title: "어떤 브랜드가 나에게 맞는지 모르겠어요", desc: "업종·예산·상권을 함께 보고 내 상황에 맞는 브랜드를 함께 찾습니다." },
  { title: "비용과 계약이 불안해요", desc: "전수비와 계약 조건에서 위험 요소가 없는지, 믿을 수 있는 브랜드인지 먼저 점검합니다." },
  { title: "노하우를 어디까지 전수받나요?", desc: "레시피, 운영 방식, 거래처, 마케팅 등 브랜드별 전수 범위를 비교해 안내합니다." },
];

const steps = [
  { title: "설문", desc: "메뉴 및 전수조건 확인" },
  { title: "현장답사", desc: "조건확인 사부검증" },
  { title: "지원사업", desc: "홍보형상 영업대행(홈페이지 게시)\n광고대행(유료)" },
  { title: "제자 계약", desc: "전수 기간 협의 후 계약" },
  { title: "레시피 전수", desc: "메뉴 및 조리 노하우 교육" },
];

const faqs = [
  { q: "상담은 정말 무료인가요?", a: "초기 상담과 업종 진단은 무료입니다. 이후 심화 검증이 필요한 경우 범위와 비용을 사전에 안내드립니다." },
  { q: "특정 브랜드를 추천해주시나요?", a: "특정 브랜드를 앞세우지 않고, 고객님의 업종·예산·상권에 맞춰 여러 브랜드를 비교해 안내합니다." },
  { q: "자금이 5천만원 이하여도 가능한가요?", a: "가능합니다. 소자본으로 시작할 수 있는 업종과 브랜드를 중심으로 조건을 맞춰 안내드립니다." },
  { q: "상담 후 반드시 창업해야 하나요?", a: "아닙니다. 상담은 정보를 얻기 위한 과정이며, 창업 여부는 충분히 비교한 뒤 직접 결정하시면 됩니다." },
];

function Head({ eyebrow, title, center = false }: { eyebrow?: string; title: string; center?: boolean }) {
  return (
    <div className={center ? "text-center" : ""}>
      {eyebrow && <p className="text-[11px] font-bold tracking-wide text-brand">{eyebrow}</p>}
      <h2 className="mt-2 text-[30px] font-black tracking-tight">{title}</h2>
    </div>
  );
}

export default function TransferPage() {
  return (
    <>
      <Header active="전수창업" />
      <main>
        {/* 전수창업이란 */}
        <section id="concept" className="mx-auto max-w-[1280px] scroll-mt-20 px-6 py-20">
          <Reveal>
            <Head eyebrow="CONCEPT" title="전수창업이란?" />
            <p className="mt-5 max-w-[620px] text-[14px] leading-relaxed text-neutral-600">
              검증된 스승(전수자)의 <b className="text-brand">기술과 운영 노하우를 직접 배워</b> 내가게로 시작하는 창업 방식입니다. 혼자 시행착오를 겪는 대신, 이미 검증된 방법을 전수받아 출발합니다.
            </p>
          </Reveal>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {concepts.map((c, i) => (
              <Reveal key={c.no} delay={i * 0.08}>
                <div className="h-full rounded-lg border border-neutral-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
                  <p className="text-[11px] font-bold text-brand">{c.no}</p>
                  <h3 className="mt-3 text-[18px] font-black">{c.title}</h3>
                  <p className="mt-2 text-[12.5px] leading-relaxed text-neutral-500">{c.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <p className="mt-6 text-[12px] text-neutral-400">구해줘창업은 나에게 맞는 전수창업을 찾도록 돕습니다.</p>
        </section>

        {/* 이런 분께 맞습니다 */}
        <section className="bg-sand">
          <div className="mx-auto max-w-[1280px] px-6 py-20">
            <Reveal><Head title="이런 분께 맞습니다" /></Reveal>
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {fits.map((f, i) => (
                <Reveal key={f.title} delay={i * 0.1}>
                  <div className="h-full rounded-lg bg-white p-7 shadow-sm">
                    <span className="inline-block rounded bg-orange-50 px-2.5 py-1 text-[10.5px] font-bold text-brand">{f.tag}</span>
                    <h3 className="mt-4 text-[19px] font-black leading-snug">{f.title}</h3>
                    <ul className="mt-5 space-y-2.5 text-[13px] text-neutral-600">
                      {f.points.map((p) => (
                        <li key={p} className="flex items-start gap-2"><Icon name="check" className="mt-0.5 size-4 shrink-0 text-brand" />{p}</li>
                      ))}
                    </ul>
                    <a href="#consult" className="mt-6 inline-block text-[13px] font-bold text-brand">{f.cta} →</a>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* 걱정 */}
        <section className="mx-auto max-w-[1280px] px-6 py-20">
          <Reveal><Head title="전수창업, 이런 점이 걱정되시나요?" /></Reveal>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {worries.map((w, i) => (
              <Reveal key={w.title} delay={i * 0.08}>
                <div className="h-full rounded-lg border border-neutral-200 bg-white p-6 shadow-sm transition hover:border-brand hover:shadow-lg">
                  <h3 className="text-[15px] font-black leading-snug">{w.title}</h3>
                  <p className="mt-3 text-[12.5px] leading-relaxed text-neutral-500">{w.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* 진행 과정 */}
        <section className="bg-sand">
          <div className="mx-auto max-w-[1280px] px-6 py-20">
            <Reveal><Head eyebrow="PROCESS" title="진행 과정" /></Reveal>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {steps.map((s, i) => (
                <Reveal key={s.title} delay={i * 0.08}>
                  <div className="h-full rounded-lg bg-white p-6 shadow-sm">
                    <p className="text-[11px] font-bold text-brand">STEP {i + 1}</p>
                    <h3 className="mt-3 text-[17px] font-black">{s.title}</h3>
                    <p className="mt-2 whitespace-pre-line text-[12.5px] leading-relaxed text-neutral-500">{s.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="mx-auto max-w-[1280px] px-6 py-20">
          <Reveal><Head title="자주 묻는 질문" center /></Reveal>
          <Faq items={faqs} />
        </section>

        <Consult />
      </main>
      <Footer />
      <YoutubePopup />
      <TransferVideoPopup />
    </>
  );
}
