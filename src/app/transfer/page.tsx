import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ConsultCard } from "@/components/ConsultForm";
import { BackCrumb } from "@/components/BackNav";
import { Reveal } from "@/components/Reveal";
import { YoutubePopup } from "@/components/YoutubePopup";
import { MainPopups } from "@/components/MainPopups";

export const metadata: Metadata = {
  title: "전수창업 | 구해줘창업",
  description: "검증된 사부의 기술과 운영 노하우를 직접 배워 내 가게로 시작하는 실전형 창업 방식입니다",
};

const wrap = "mx-auto max-w-[80rem] px-6";
const h2 = "font-gmarket font-black tracking-tight text-[1.75rem] leading-[1.3] md:text-[2.375rem]";
const hl = "inline bg-[linear-gradient(transparent_62%,#fdd981_62%)]";

const reasons = [
  ["낮은 초기비용", "불필요한 가맹비·인테리어\n마진 없이 시작 가능"],
  ["로열티 0%", "매월 납부하는\n고정 비용이 없어\n수익을 그대로 확보"],
  ["검증된 노하우 전수", "14년 운영으로 검증된\n레시피와 매장 운영 노하우를\n그대로 전수"],
  ["유연한 운영", "브랜드 제약 없이\n내 상권과 스타일에 맞춰\n자유롭게 운영 가능"],
];

const items = [
  ["초기비용", "(가맹비·교육비 등)", "약 1,593만원", "약 1,840만원", "1,000만원"],
  ["로열티", "", "월 매출 0~3%", "0%", "0%"],
  ["5년간 로열티", "(월매출 3,000만원 가정)", "약 3,600만원", "0원", "0원"],
  ["차액가맹금", "(유통마진)", "브랜드별 상이\n(연간 수백만원)", "없음", "없음"],
];

const rows = [
  ["상권분석·점포선정", "△", "X"],
  ["브랜드 기획 및 BI 개발", "X", "X"],
  ["인테리어·3D 설계", "△", "X"],
  ["마케팅·홍보 세팅", "△", "X"],
  ["내 매장 전용 SOP북", "X", "X"],
  ["사부님 직접 전수·평가", "△", "△"],
];

const worries = [
  ["01", "요리 경험이 없어도 창업할 수 있을까요?", "레시피 교육부터 조리 실습, 재료 관리까지. 초보자도 단계별로 익힐 수 있도록 전수 과정을 설계합니다.", "레시피·조리 교육"],
  ["02", "맛은 배워도 매장 운영은 처음인데요?", "식재료 발주, 원가 관리, 고객 응대, 매장 운영까지. 실무에 필요한 운영 노하우를 SOP북과 함께 전달합니다.", "실전 운영 시스템"],
  ["03", "좋은 상권을 어떻게 선택해야 하죠?", "희망 지역과 예산, 업종 특성을 종합적으로 검토해 매장에 적합한 입지와 상권을 함께 분석합니다.", "상권 분석·입지 컨설팅"],
  ["04", "인테리어와 브랜딩도 따로 준비해야 하나요?", "브랜드 기획부터 공간 디자인, 간판, 메뉴판까지. 오픈에 필요한 디자인 요소를 통합적으로 지원합니다.", "원스톱 브랜딩"],
  ["05", "오픈하고 손님이 없으면 어떡하죠?", "오픈 전 홍보 전략부터 플레이스 관리, 지역 마케팅까지. 초기 고객 유입을 위한 실행 계획을 함께 수립합니다.", "오픈 마케팅 지원"],
];

const steps = [
  ["STEP 01", "상담 신청", "희망 업종·지역·예산 등\n창업 상담"],
  ["STEP 02", "사부 매칭", "조건에 맞는 전수 가능\n매장 연결"],
  ["STEP 03", "현장답사", "실제 매장 방문\n운영 방식 확인"],
  ["STEP 04", "계약 및 준비", "전수 조건 협의 후\n계약 진행"],
  ["STEP 05", "전수·오픈지원", "레시피 교육, 매장 세팅\n오픈 및 초기 운영 지원"],
];

const oneStep: [string, string, string[]][] = [
  ["01", "레시피 전수", ["시그니처 메뉴", "1:1 조리 실습", "원가·조리 노하우 전수"]],
  ["02", "브랜드 기획", ["상호·로고 개발", "매장 컨셉 기획", "패키지·메뉴 디자인"]],
  ["03", "인테리어·가구", ["3D설계", "주방·집기 세팅", "비용 최적화"]],
  ["04", "내·외부 홍보", ["플레이스 최적화", "리뷰·콘텐츠 제작", "오픈 마케팅 지원"]],
  ["05", "운영 컨설팅", ["오픈 지원", "초기 운영", "지속 사후관리"]],
];

const experts: [string, string, string[]][] = [
  ["사부님", "레시피 기술전수", ["시그니처 메뉴 개발·운영 경험", "현장 중심 1:1 직접 전수", "사부님 운영매장 실전 교육", "맛·식감·공정 최종 검증"]],
  ["상가분석 전문가", "상권·계약·현장", ["외식업 상권·입지 분석", "점포 실측·임차 계약 지원", "후보 상권 비교·점포 선정", "계약부터 공사 현장 점검까지"]],
  ["브랜드 기획", "브랜드 디자인", ["네이밍 / BI / CI / 로고 기획", "업종별 브랜드 포지셔닝", "간판·홍보물 디자인 연계", "로고 최종 확정까지 총괄"]],
  ["인테리어 전문가", "설계·시공", ["경력 15년", "1,000건 이상 공사 수주", "프랜차이즈 전문 인테리어 기업", "자체 120평 공장 운영"]],
  ["전수매니저", "SOP 교육·오픈 지원", ["5차 SOP 교육 진행", "블로그·플레이스 운영 지도", "전 직원 레시피 복습 지도", "가오픈~그랜드 오픈 밀착 지원"]],
];

const qna = [
  ["전수창업 비용 1,000만 원이면 전부 가능한가요?", "1,000만 원은 기본 전수창업 프로그램 기준입니다. 점포 임대료, 보증금, 시설 및 인테리어 등 실제 창업 비용은 매장 조건에 따라 달라지므로 별도 견적을 안내합니다."],
  ["레시피만 배우고 나면 혼자 운영해야 하나요?", "레시피 전수뿐 아니라 발주, 원가 관리, 메뉴 구성, 고객 응대 등 매장 운영에 필요한 실무 시스템까지 함께 준비합니다."],
  ["전수받은 메뉴를 제 스타일로 변경해도 되나요?", "전수 계약의 허용 범위 내에서 지역 상권과 고객 특성에 맞춘 메뉴 구성 및 운영 방향을 검토할 수 있습니다."],
  ["상권이나 점포를 아직 정하지 않았는데 신청할 수 있나요?", "네. 희망 업종, 지역, 예산을 바탕으로 상권 분석과 입지 검토부터 시작할 수 있습니다."],
  ["오픈한 뒤에도 운영 지원을 받을 수 있나요?", "오픈 이후 운영에 필요한 지원 항목과 기간은 프로그램별로 안내합니다. 마케팅, 운영 점검 등 필요한 서비스를 사전에 확인할 수 있습니다."],
  ["프랜차이즈처럼 로열티를 계속 내야 하나요?", "구해줘창업의 기본 전수 프로그램은 월 로열티 0%를 기준으로 안내합니다. 단, 별도 계약이나 추가 서비스에 따른 비용은 상담 시 확인해야 합니다."],
];


const P: Record<string, React.ReactNode> = {
  calendar: <><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M3 10h18M8 3v4M16 3v4M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01M16 18h.01" /></>,
  utensils: <><path d="M6 3v5a2 2 0 004 0V3M8 3v18" /><ellipse cx="16.5" cy="7.5" rx="2.5" ry="4.5" /><path d="M16.5 12v9" /></>,
  clipboard: <><rect x="5" y="4" width="14" height="17" rx="2" /><path d="M9 4h6v3H9zM8.5 12l1.5 1.5 2.5-3M14 12h2M8.5 17l1.5 1.5 2.5-3M14 17h2" /></>,
  chef: <><path d="M7 14a4 4 0 01-1-7.8A5 5 0 0112 3a5 5 0 016 3.2A4 4 0 0117 14v6H7zM7 17h10" /></>,
  cap: <><path d="M2 9l10-5 10 5-10 5zM6 11.5V16c0 1.5 3 3 6 3s6-1.5 6-3v-4.5M22 9v6" /></>,
  handshake: <><path d="m11 17 2 2a1 1 0 1 0 3-3" /><path d="m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4" /><path d="m21 3 1 11h-2" /><path d="M3 3 2 14l6.5 6.5a1 1 0 1 0 3-3" /><path d="M3 4h8" /></>,
};
function Pict({ k, className = "size-8" }: { k: string; className?: string }) {
  return <svg viewBox="0 0 24 24" aria-hidden className={className} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">{P[k]}</svg>;
}

const mark = (v: string) => v === "●" ? <span className="inline-block size-3 rounded-full bg-[#8a2a0c]" /> : v;

export default function TransferPage() {
  return (
    <>
      <Header active="전수창업" />
      <main className="bg-[#222] text-white">
        <div className="border-b border-white/10 bg-[#222]">
          <div className="mx-auto max-w-[80rem] px-6">
            <BackCrumb href="/" label="메인" current="전수창업 안내" dark className="py-4" />
          </div>
        </div>
        {/* 1. 전수창업이란? */}
        <section className="bg-[#F0C33F] text-[#222]">
          <div className={`${wrap} pb-14 pt-12 text-center`}>
            <Reveal>
              <p className="font-gmarket text-[1.25rem] font-bold md:text-[1.375rem]">구해줘 창업 <span className="mx-2 font-light">|</span> <span className="font-medium">전수창업</span></p>
              <h1 className="mt-4 font-gmarket text-[3rem] font-black leading-none tracking-tight md:text-[3.5rem]">전수창업<span className="font-light">이란?</span></h1>
              <p className="mt-6 text-[0.9375rem] md:text-[1.125rem]">검증된 사부의 기술과 운영 노하우를 직접 배워 내 가게로 시작하는 실전형 창업 방식입니다.</p>
            </Reveal>

            {/* 상승 곡선 */}
            <Reveal delay={0.1}>
              <div className="relative mx-auto mt-10">
                <svg viewBox="-10 -50 1120 410" overflow="visible" className="w-full" aria-hidden>
                  <defs>
                    <linearGradient id="gr" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#fff" stopOpacity=".95" /><stop offset="1" stopColor="#fff" stopOpacity="0.05" /></linearGradient>
                  </defs>
                  <path d="M0 330 C150 250 300 215 480 190 C640 165 800 120 1000 40 L1000 360 L0 360 Z" fill="url(#gr)" opacity=".75" />
                  <path d="M0 330 C150 250 300 215 480 190 C640 165 800 120 1000 40" fill="none" stroke="#222" strokeWidth="5" />
                  <path d="M1006 30 l-34 6 l16 24 z" fill="#222" transform="rotate(-12 1000 40)" />
                  {[[165, 262, "기술"], [480, 190, "노하우"], [795, 133, "운영방식"]].map(([x, y, t]) => (
                    <g key={t as string}>
                      <circle cx={x as number} cy={y as number} r="18" fill="#222" stroke="#b98a1c" strokeWidth="6" />
                      <rect x={(x as number) - 52} y={(y as number) - 72} width="104" height="46" rx="23" fill="#fff" stroke="#b98a1c" strokeWidth="3" />
                      <text x={x as number} y={(y as number) - 40} textAnchor="middle" fontSize="28" fontWeight="800" fill="#222">{t}</text>
                    </g>
                  ))}
                  <rect x="900" y="-14" width="170" height="46" rx="23" fill="none" stroke="#d6281c" strokeWidth="3" />
                  <text x="985" y="19" textAnchor="middle" fontSize="28" fontWeight="800" fill="#d6281c">내 가게 오픈</text>
                </svg>
                <div className="grid grid-cols-3 gap-2 text-center">
                  {[["실무 기술 전수", "조리법과 서비스 방식 등\n매장운영에 필요한\n실무 기술을 배웁니다."], ["운영 노하우 전수", "상품 구성, 거래처, 마케팅 등\n실제 매장에서 쌓인\n운영 노하우를 전수받습니다."], ["매장 운영 방식 습득", "메뉴얼과 교육을 통해\n안정적으로 매장을\n운영하는 방법을 익힙니다."]].map(([t, d]) => (
                    <div key={t} className="px-2">
                      <h3 className="text-[0.9375rem] font-black md:text-[1.375rem]">{t}</h3>
                      <p className="mt-4 md:whitespace-pre-line text-[0.75rem] leading-[1.7] md:text-[0.9375rem]">{d}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
            <div className="mx-auto mt-10 rounded-full border border-[#222] px-6 py-3 text-[0.8125rem] font-bold md:text-[0.9375rem]">구해줘창업은 창업자의 경험, 자본, 상권을 종합적으로 고려한 맞춤형 전수창업을 설계합니다.</div>
          </div>
        </section>

        {/* 2. 왜 프랜차이즈가 아닌 전수창업인가 */}
        <section className={`${wrap} pb-16 pt-20 text-center`}>
          <Reveal>
            <h2 className={`${h2} text-white`}>왜 프랜차이즈가 아닌 &lsquo;전수창업&rsquo;인가?</h2>
            <p className="mt-5 text-[0.8125rem] text-white/70 md:text-[0.9375rem]">가맹비, 로열티, 인테리어 중간 마진 등 불필요한 거품을 싹 빼고 전수비 하나로 해결하세요.</p>
          </Reveal>
          <ul className="mx-auto mt-12 grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-4">
            {reasons.map(([t, d]) => (
              <li key={t}>
                <p className="rounded-2xl bg-[#3a3118] py-3 text-[1.0625rem] font-bold text-[#F0C33F] md:text-[1.25rem]">{t}</p>
                <p className="mt-5 md:whitespace-pre-line text-[0.75rem] leading-[1.6] text-white/85 md:text-[0.9375rem]">{d}</p>
              </li>
            ))}
          </ul>
          <div className="mx-auto mt-10 border-y border-white/40 py-8">
            <p className="font-gmarket text-[1.125rem] font-medium leading-[1.6] md:text-[1.625rem]">불필요한 비용은 줄이고, 성공 노하우만 가져가는<br />가장 현실적인 창업 방법, 바로 <span className="text-[#F0C33F]">전수창업</span>입니다.</p>
          </div>
        </section>

        {/* 3. 경쟁력 */}
        <section className={`${wrap} pb-20 text-center`}>
          <Reveal>
            <h2 className={`${h2} text-white`}>&lsquo;구해줘 창업&rsquo;<span className="font-light">만의</span> 경쟁력</h2>
          </Reveal>
          <div className="mt-10 grid gap-3 lg:grid-cols-2">
            {/* 5년 총 창업비용 비교 */}
            <div className="rounded-[1.75rem] border border-white/15 bg-[#161616] p-5 text-left">
              <p className="flex flex-wrap items-center gap-3"><span className="rounded-full border border-[#F0C33F] px-5 py-1.5 text-[1.125rem] font-black text-[#F0C33F]">5년 총 창업비용 비교</span><span className="text-[0.75rem] text-white/80">(일식 업종 평균 기준)</span></p>
              <div className="relative mt-6 flex h-[19rem] items-end gap-6 pb-14 pl-14 pr-2">
                <span className="absolute left-0 top-0 text-[0.75rem] text-white/70">(만원)</span>
                <div className="absolute bottom-14 left-12 top-6 w-px bg-white/60" />
                <div className="absolute bottom-14 left-12 right-0 h-px bg-white/60" />
                <div className="absolute bottom-14 left-0 top-6 flex w-11 flex-col justify-between text-right text-[0.6875rem] text-white/80">
                  {[20000, 18000, 16000, 14000, 12000, 10000, 8000, 6000, 4000, 2000, 0].map((n) => <span key={n}>{n.toLocaleString()}</span>)}
                </div>
                {[["18,193만원", 90, "bg-[#9a9a9a]", "프랜차이즈", "(평균)"], ["1,840만원", 9, "bg-[#9a9a9a]", "기존 전수창업", "(평균)"], ["1,000만원", 5, "bg-[#F0C33F]", "구해줘창업", "(전수창업)"]].map(([v, h, c, a, b]) => (
                  <div key={a as string} className="relative flex-1 text-center">
                    <p className="absolute inset-x-0 text-[0.8125rem] font-bold" style={{ bottom: `calc(${h}% * 1.0 + 0.25rem)` }}>{v}</p>
                    <div className={`${c} mx-auto w-full`} style={{ height: `${(h as number) * 2.3}%` , maxHeight: "13rem" }} />
                    <p className="absolute inset-x-0 top-full pt-2 text-[0.75rem] font-bold leading-snug">{a}<br /><span className="font-normal">{b}</span></p>
                  </div>
                ))}
                <div className="absolute right-4 top-2 grid size-36 place-items-center rounded-full border-2 border-[#F0C33F] bg-black/60 text-center">
                  <div><p className="text-[0.6875rem]">기존 전수창업 대비</p><p className="text-[0.875rem] font-bold text-[#F0C33F]">약 <b className="text-[1.75rem]">46%</b></p><p className="text-[0.8125rem] font-bold text-[#F0C33F]">비용 절감</p></div>
                </div>
              </div>
            </div>

            {/* 항목별 비교 */}
            <div className="rounded-[1.75rem] border border-white/15 bg-[#161616] p-5 text-left">
              <p className="inline-block rounded-full border border-[#F0C33F] px-5 py-1.5 text-[1.125rem] font-black text-[#F0C33F]">항목별 비교</p>
              <table className="mt-4 w-full border-collapse text-center text-[0.75rem] md:text-[0.875rem]">
                <thead>
                  <tr className="bg-[#3c3c3c] text-[0.75rem]">
                    <th className="py-2">구분</th>
                    <th className="border-l border-white/20 py-2">프랜차이즈<br /><span className="font-normal">(평균)</span></th>
                    <th className="border-l border-white/20 py-2">기존 전수창업<br /><span className="font-normal">(평균)</span></th>
                    <th className="bg-[#F0C33F] py-2 text-[#222]">구해줘창업<br /><span className="font-normal">(전수창업)</span></th>
                  </tr>
                </thead>
                <tbody>
                  {items.map(([k, s, a, b, c]) => (
                    <tr key={k} className="border-t border-white/20 bg-[#262626]">
                      <th className="px-2 py-3 text-[0.8125rem] font-bold">{k}{s && <><br /><span className="text-[0.6875rem] font-normal">{s}</span></>}</th>
                      <td className="whitespace-pre-line border-l border-white/20 py-3">{a}</td>
                      <td className="border-l border-white/20 py-3">{b}</td>
                      <td className="border-l border-white/20 py-3 font-black text-[#F0C33F]">{c}</td>
                    </tr>
                  ))}
                  <tr className="border-t border-white/20 bg-[#3c3c3c]">
                    <th className="py-4 text-[1rem] font-black">5년 총비용</th>
                    <td className="border-l border-white/20 py-4 font-bold">약 18,193만원</td>
                    <td className="border-l border-white/20 py-4 font-bold">약 1,840만원</td>
                    <td className="bg-[#F0C33F] py-4 text-[1.125rem] font-black text-[#222]">1,000만원</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <ul className="mx-auto mt-10 grid gap-4 md:grid-cols-3">
            {[["1,000만원", "가맹비 없이\n창업 준비부터 오픈까지"], ["로열티 0%", "매달 본사에 내는 돈이 없습니다"], ["SOP북 제공", "레시피부터 매장 운영까지\n실전 매뉴얼 제공"]].map(([t, d]) => (
              <li key={t} className="rounded-2xl border border-[#F0C33F]/70 px-4 py-9">
                <p className="font-gmarket text-[1.75rem] font-black text-[#F0C33F] md:text-[2rem]">{t}</p>
                <p className="mt-4 md:whitespace-pre-line text-[0.8125rem] leading-[1.6] md:text-[0.9375rem]">{d}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* 4. 같은 돈을 쓰더라도 */}
        <section className={`${wrap} pb-20 text-center`}>
          <h2 className={`${h2} text-white`}>같은 돈을 쓰더라도 남는 건 다릅니다</h2>
          <div className="mx-auto mt-10 overflow-x-auto">
            <table className="w-full min-w-[32rem] border-collapse text-[0.875rem] md:text-[1rem]">
              <thead>
                <tr className="bg-[#9a9a9a] text-[#222]">
                  <th className="w-[30%] border border-white/70 py-4" />
                  <th className="border border-white/70 py-4 font-medium">프랜차이즈</th>
                  <th className="border border-white/70 py-4 font-medium">기존 전수창업</th>
                  <th className="border border-white/70 py-4 font-medium text-[#8a2a0c]">구해줘창업</th>
                </tr>
              </thead>
              <tbody>
                {rows.map(([k, a, b]) => (
                  <tr key={k}>
                    <th className="border border-white/70 py-5 font-medium">{k}</th>
                    <td className="border border-white/70 py-5">{a}</td>
                    <td className="border border-white/70 py-5">{b}</td>
                    <td className="border border-white/70 bg-[#d39583] py-5">{mark("●")}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="mt-3 flex flex-wrap items-center gap-x-6 gap-y-1 text-left text-[0.75rem] md:text-[0.875rem]">
              <span><span className="mr-2 inline-block size-3.5 rounded-full bg-white align-middle" />포함</span>
              <span>△ 일부·본사 방식</span>
              <span>X 별도 또는 없음</span>
              <span className="ml-auto">기존 전수창업은 레시피 중심 전수 방식 기준입니다.</span>
            </p>
          </div>
        </section>

        {/* 5. 걱정되시나요 */}
        <section className={`${wrap} pb-20`}>
          <h2 className="text-center font-gmarket text-[1.75rem] font-black leading-[1.3] tracking-tight text-[#F0C33F] md:text-[2.375rem]">전수창업, 이런 부분이 걱정되시나요?</h2>
          <ul className="mx-auto mt-10 space-y-3">
            {worries.map(([n, q, a, tag]) => (
              <Reveal key={n}>
                <li className="rounded-2xl bg-[#333] px-5 py-5 md:px-6">
                  <p className="flex items-baseline gap-3 text-[1rem] font-bold md:text-[1rem]"><span className="text-[0.9375rem] text-[#F0C33F]">{n}</span>{q}</p>
                  <p className="mt-3 text-[0.8125rem] text-white/75 md:text-[0.9375rem]">{a}</p>
                  <span className="mt-3 inline-block rounded-md bg-[#4a3f1e] px-3 py-1 text-[0.75rem] font-bold text-[#F0C33F]">{tag}</span>
                </li>
              </Reveal>
            ))}
          </ul>
          <p className="mt-20 text-center font-gmarket text-[1.5rem] font-bold leading-[1.45] md:text-[2.375rem]">
            <span className="font-light">창업</span>의 고민<span className="font-light">은</span> 줄이고,<br />
            <span className="font-light">준비</span>의 완성도<span className="font-light">는</span> 높이고 !<br />
            구해줘창업<span className="font-light">이</span> 시작<span className="font-light">부터</span> 오픈<span className="font-light">까지</span> 함께합니다.
          </p>
        </section>

        {/* 6. 진행과정 (노랑) */}
        <section className="bg-[#F0C33F] text-[#222]">
          <div className={`${wrap} py-16 text-center`}>
            <h2 className={`${h2}`}><span className={hl}>구해줘창업 진행과정</span></h2>
            <p className="mt-5 text-[1rem] font-medium md:text-[1.125rem]">상담부터 오픈까지, 체계적인 절차로 함께합니다.</p>
            <ol className="mt-10 flex flex-col items-stretch gap-3 md:flex-row md:items-center md:gap-0">
              {steps.map(([s, t, d], i) => (
                <li key={s} className="flex flex-1 items-center">
                  <div className="flex-1 rounded-3xl bg-[#222] px-3 py-5 text-white">
                    <p className="text-[1.25rem] text-[#F0C33F] md:text-[1.25rem]">{s}</p>
                    <p className="mt-3 text-[1rem] font-bold md:text-[1rem]">{t}</p>
                    <p className="mt-3 md:whitespace-pre-line text-[0.75rem] leading-[1.5]">{d}</p>
                  </div>
                  {i < steps.length - 1 && <span aria-hidden className="mx-1 hidden text-[1.125rem] md:block">▶</span>}
                </li>
              ))}
            </ol>

            <h2 className={`${h2} mt-20`}><span className={hl}>창업은 처음이어도 준비는 전문가 답게</span></h2>
            <p className="mt-5 text-[1rem] font-medium md:text-[1.125rem]">구해줘창업이 전수창업의 전 과정을 ONE-STEP으로 도와드립니다.</p>
            <ol className="mt-14 grid grid-cols-2 gap-x-6 gap-y-10 text-left md:grid-cols-5">
              {oneStep.map(([n, t, ds]) => (
                <li key={n}>
                  <p className="text-[1.125rem] font-bold text-[#222]/60">{n}</p>
                  <p className="mt-1 border-b border-[#222] pb-2 text-[1.375rem] font-black">{t}</p>
                  <ul className="mt-3 space-y-1.5 text-center text-[0.9375rem]">{ds.map((d) => <li key={d}>{d}</li>)}</ul>
                </li>
              ))}
            </ol>

            <h2 className={`${h2} mt-20`}><span className={hl}>분야별 전문가가 단계마다 책임집니다</span></h2>
            <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
              {experts.map(([role, t, ds]) => (
                <li key={role} className="rounded-3xl border border-[#222] px-4 pb-6 pt-5 text-center">
                  <div className="mx-auto size-40 rounded-full bg-[#222]" />
                  <p className="mt-6 text-[0.9375rem]">{role}</p>
                  <p className="mt-2 text-[1.125rem] font-bold">{t}</p>
                  <p className="mt-6 text-left text-[0.8125rem] font-bold">주요경력</p>
                  <ul className="mt-2 space-y-1 text-left text-[0.8125rem] leading-[1.5]">{ds.map((d) => <li key={d}>·{d}</li>)}</ul>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* 7. 실제 전수 사례 */}
        <section className={`${wrap} py-20 text-center`}>
          <h2 className="font-gmarket text-[2rem] font-black leading-[1.3] tracking-tight md:text-[2.375rem]">구해줘 창업의<br /><span className="text-[#F0C33F]">실제 전수 사례</span></h2>
          <p className="mt-8 text-[0.9375rem] leading-[1.7] text-white/90 md:text-[1.0625rem]">구해줘 창업의 전수창업은 레시피 전수로 끝나지 않습니다.<br />실제 매장에서 검증된 노하우와 운영 시스템을 그대로 전수해<br />오픈 이후에도 안정적인 성과로 이어집니다.</p>

          <div className="mt-10 rounded-xl bg-black p-4 text-left md:p-6">
            <div className="grid gap-4 lg:grid-cols-[1.55fr_1fr]">
              <div className="rounded-3xl border border-[#F0C33F]/70 p-5">
                <p className="rounded-2xl bg-[#F0C33F] py-3 text-center font-gmarket text-[1.25rem] font-black text-[#222] md:text-[1.625rem]">합천식 주물럭 전문점 A사례</p>
                <dl className="mt-5 grid grid-cols-[6rem_1fr] items-center gap-x-4 gap-y-3 text-[1rem] md:text-[1.0625rem]">
                  {[["업종", "주물럭·삼겹살 전문점"], ["지역", "경남 합천"], ["경력", "외식업 경험 없는 초보 창업자"], ["전수 내용", "주물럭, 된장찌개, 반찬, 매장 운영"]].map(([k, v]) => (
                    <div key={k} className="contents">
                      <dt className="rounded-lg border border-[#F0C33F] py-1 text-center text-[0.9375rem] font-bold text-[#F0C33F] md:text-[1rem]">{k}</dt>
                      <dd className="border-b border-white/40 pb-1">{v}</dd>
                    </div>
                  ))}
                </dl>
                <p className="mt-5 flex gap-4 rounded-xl bg-[#3a3118] px-5 py-5 text-[1.125rem] font-bold leading-[1.5] md:text-[1.375rem]">
                  <span aria-hidden className="w-1.5 shrink-0 rounded bg-[#F0C33F]" />
                  <span>요리 경험이 없어도, 검증된 레시피와 운영 시스템을 전수받아 <span className="text-[#F0C33F]">안정적으로 오픈할 수 있었습니다.</span></span>
                </p>
              </div>
              <div className="rounded-3xl border border-[#F0C33F]/70 p-5">
                <p className="border-b-4 border-[#F0C33F] pb-3 text-center text-[1.375rem] font-black md:text-[1.5rem]">오픈 후 운영 포인트</p>
                <ul className="divide-y divide-white/20 text-[1.0625rem] font-bold md:text-[1.125rem]">
                  {[["calendar", "점심·저녁 운영 가능"], ["utensils", "메뉴 구성 빠른 정착"], ["clipboard", "SOP 기반\n운영 안정화"]].map(([ic, t]) => (
                    <li key={t} className="flex items-center gap-5 py-8"><span className="grid size-14 shrink-0 place-items-center text-[#F0C33F]"><Pict k={ic} className="size-12" /></span><span className="whitespace-pre-line">{t}</span></li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="mt-4 grid gap-3 md:grid-cols-3">
              {["레시피 전수", "실전 조리 실습", "오픈 전 메뉴 점검"].map((t, i) => (
                <div key={t} className="overflow-hidden rounded-2xl border border-[#F0C33F]/70">
                  <div className="relative aspect-[16/10] bg-[#333]">{/* eslint-disable-next-line @next/next/no-img-element */}<img src={`/identity/case-${i + 1}.jpg`} alt={t} loading="lazy" className={`absolute inset-0 size-full object-cover`} /></div>
                  <p className="bg-[#F0C33F] py-3 text-center text-[1.125rem] font-black text-[#222] md:text-[1.125rem]">{t}</p>
                </div>
              ))}
            </div>
            <div className="relative mx-auto mt-6 rounded-3xl border border-[#F0C33F]/70 px-14 pb-10 pt-6 text-center">
              <span aria-hidden className="absolute left-8 top-2 font-serif text-[4.5rem] leading-none text-[#F0C33F]">&ldquo;</span>
              <span aria-hidden className="absolute bottom-4 right-8 font-serif text-[4.5rem] leading-none text-[#F0C33F]">&rdquo;</span>
              <p className="font-gmarket text-[1.125rem] font-bold italic leading-[1.55] md:text-[1.375rem]">처음에는 걱정이 많았지만, 조리부터 운영까지<br />단계별로 배울 수 있어 훨씬 수월했습니다.<br />지금은 <span className="text-[#F0C33F]">점심·저녁 모두 안정적으로 운영</span> 중입니다.</p>
              <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-[#F0C33F] px-8 py-2 text-[0.9375rem] font-bold text-[#222]">전수창업 참여자 후기</span>
            </div>
            <div className="mt-8 grid gap-3 md:grid-cols-3">
              {[["chef", "검증된 레시피"], ["cap", "실무 중심 교육"], ["handshake", "운영까지 연결"]].map(([ic, t]) => (
                <p key={t} className="rounded-2xl border border-[#F0C33F]/70 py-5 text-center text-[1.125rem] font-black md:text-[1.125rem]"><Pict k={ic} className="mr-4 inline size-10 align-middle text-[#F0C33F]" />{t}</p>
              ))}
            </div>
          </div>
        </section>

        {/* 8. Q&A */}
        <section className={`${wrap} pb-20`}>
          <h2 className={`${h2} text-center`}>창업자가 궁금해하는 <span className="text-[#F0C33F]">Q&amp;A</span></h2>
          <ul className="mx-auto mt-10 space-y-3">
            {qna.map(([q, a]) => (
              <li key={q} className="rounded-2xl bg-[#333] px-5 py-4">
                <p className="flex gap-3 text-[0.9375rem] font-bold md:text-[1rem]"><span className="text-[#F0C33F]">Q.</span>{q}</p>
                <p className="mt-2 flex gap-3 text-[0.8125rem] leading-[1.6] text-white/75 md:text-[0.875rem]"><span className="font-bold text-white/60">A.</span>{a}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* 9. 마무리 + 상담 */}
        <section id="consult" className={`${wrap} pb-24 text-center`}>
          <p className="font-gmarket text-[1.375rem] font-bold italic md:text-[1.75rem]">창업에 대한 고민, 혼자 해결하지 마세요!</p>
          <p className="mt-10 text-[1rem] leading-[1.7] md:text-[1.25rem]"><span className="font-light">희망 업종부터 예산, 상권, 오픈 준비까지</span><br /><b>구해줘창업</b><span className="font-light">이</span> <b>맞춤형 창업 방향을 제안</b><span className="font-light">합니다.</span></p>
          <Reveal delay={0.1} className="mt-12 text-left">
            <ConsultCard wide />
          </Reveal>
        </section>
      </main>
      <Footer />
      <YoutubePopup />
      <MainPopups />
    </>
  );
}
