import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Consult } from "@/components/ConsultForm";
import { Reveal } from "@/components/Reveal";
import { YoutubePopup } from "@/components/YoutubePopup";
import { TransferGuideVideo } from "@/components/TransferGuideVideo";
import { MainPopups } from "@/components/MainPopups";
import { ServiceCircles } from "@/components/ServiceCircles";
import { TransferSlider } from "@/components/TransferSlider";
import { listings } from "@/lib/data";
import { transfers } from "@/lib/transfer";

export const metadata: Metadata = {
  title: "전수창업 | 구해줘창업",
  description: "검증된 브랜드의 기술과 운영 노하우를 전수받아 시작하는 창업. 구해줘창업이 함께합니다",
};

const concepts = [
  { no: "01", title: "기술", desc: "조리법과 서비스 방식 등 매장 운영에 필요한 실무 기술을 배웁니다" },
  { no: "02", title: "노하우", desc: "상품 구성, 거래처, 마케팅 등 운영하며 쌓인 노하우를 전수받습니다" },
  { no: "03", title: "운영 방식", desc: "메뉴얼과 교육을 통해 매장을 운영하는 방식을 익힙니다" },
];

// 진행 중인 전수창업 매물 (슬라이드로 넘겨 본다)
const featured = listings.filter((l) => l.kind === "전수창업" && !l.sold && transfers[l.id]);

const steps = [
  { title: "설문", desc: "메뉴 및 전수조건 확인" },
  { title: "현장답사", desc: "조건확인 사부검증" },
  { title: "지원사업", desc: "홍보형상 영업대행(홈페이지 게시)\n광고대행(유료)" },
  { title: "제자 계약", desc: "전수 기간 협의 후 계약" },
  { title: "레시피 전수", desc: "메뉴 및 조리 노하우 교육" },
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
            <Head title="전수창업이란?" />
            <p className="mt-5 max-w-[620px] text-[14px] leading-relaxed text-neutral-600">
              검증된 사부(전수자)의 <b className="text-brand">기술과 운영 노하우를 직접 배워</b> 내가게로 시작하는 창업 방식입니다<br />혼자 시행착오를 겪는 대신, 이미 검증된 방법을 전수받아 출발합니다
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
          <p className="mt-6 text-[12px] text-neutral-400">구해줘창업은 나에게 맞는 전수창업을 찾도록 돕습니다</p>
        </section>

        {/* 안내 영상 */}
        <section className="mx-auto max-w-[1280px] px-6 pb-20">
          <Reveal><TransferGuideVideo /></Reveal>
        </section>

        {/* 진행 과정 */}
        <section className="bg-sand">
          <div className="mx-auto max-w-[1280px] px-6 py-20">
            <Reveal><Head title="진행 과정" /></Reveal>
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

        {/* 마무리 문구 */}
        <section className="mx-auto max-w-[1280px] px-6 pb-[60px] pt-20 text-center">
          <Reveal>
            <h2 className="text-[30px] font-black leading-snug tracking-tight md:text-[38px]">
              창업은 <span className="text-brand">처음이어도</span><br />준비는 <span className="text-brand">전문가답게</span>
            </h2>
          </Reveal>
          <Reveal><ServiceCircles /></Reveal>
          <Reveal>
            <p className="mt-16 text-[30px] font-black leading-snug tracking-tight md:text-[38px]">
              &ldquo;<span className="text-brand">시작</span>부터 <span className="text-brand">끝</span>까지 <span className="text-brand">책임</span>집니다&rdquo;
            </p>
          </Reveal>
        </section>

        {/* 전수창업 매물 카드 */}
        <section className="bg-sand">
          <div className="mx-auto max-w-[1280px] px-6 pb-20 pt-[60px]">
            <Reveal><h2 className="text-[30px] font-black leading-snug tracking-tight">&ldquo;<span className="text-brand md:text-[38px]">사부님</span> 어디 계십니까?&rdquo;</h2></Reveal>
            <Reveal><div className="mt-8"><TransferSlider items={featured} /></div></Reveal>
          </div>
        </section>

        <Consult title="전수창업 상담신청" only="전수창업" />
      </main>
      <Footer />
      <YoutubePopup />
      <MainPopups />
    </>
  );
}
