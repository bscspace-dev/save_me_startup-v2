import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BackCrumb } from "@/components/BackNav";
import { ConsultCard } from "@/components/ConsultForm";
import { YoutubePopup } from "@/components/YoutubePopup";

export const metadata: Metadata = {
  title: "신규창업 | 구해줘창업",
  description: "상권분석부터 시설, 마케팅, 사후관리까지. 올인원 시스템으로 신규창업을 한 번에 준비하세요",
};

const wrap = "mx-auto max-w-[80rem] px-6";
const Y = "bg-[#F0C33F]";
const card = "rounded-2xl border border-neutral-200 bg-white";

/* ---------- 작은 부품 ---------- */
function Chev() {
  return (
    <svg viewBox="0 0 64 70" aria-hidden className="mx-auto my-10 h-[3.5rem] w-8 text-[#F0C33F]" fill="none" stroke="currentColor" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 8l26 24L58 8M6 38l26 24 26-24" />
    </svg>
  );
}

function Ico({ k, className = "size-10" }: { k: string; className?: string }) {
  const d: Record<string, React.ReactNode> = {
    pin: <><path d="M12 21s-7-6-7-11a7 7 0 0114 0c0 5-7 11-7 11z" /><circle cx="12" cy="10" r="2.5" /></>,
    store: <><path d="M3 9l1.5-5h15L21 9v1a3 3 0 01-6 0 3 3 0 01-6 0 3 3 0 01-6 0z" /><path d="M5 13v7h14v-7M9 20v-4h6v4" /></>,
    mega: <><path d="M4 10v4h3l8 4V6L7 10H4zM18 9a4 4 0 010 6" /></>,
    coins: <><ellipse cx="9" cy="7" rx="6" ry="3" /><path d="M3 7v5c0 1.7 2.7 3 6 3s6-1.3 6-3V7M15 11c3 0 6 1.3 6 3v4c0 1.7-2.7 3-6 3-3 0-5-.8-6-2" /></>,
    check: <path d="M5 12.5l4.5 4.5L19 7.5" />,
    clip: <><rect x="5" y="4" width="14" height="17" rx="2" /><path d="M9 4h6v3H9zM8.5 12l1.5 1.5 2.5-3M14 12h2M8.5 17l1.5 1.5 2.5-3M14 17h2" /></>,
    ruler: <><path d="M4 16L16 4l4 4L8 20zM8 12l2 2M11 9l2 2M14 6l2 2" /></>,
    cube: <><path d="M12 3l8 4.5v9L12 21l-8-4.5v-9zM12 12l8-4.5M12 12v9M12 12L4 7.5" /></>,
    helmet: <><path d="M4 17a8 8 0 0116 0zM3 17h18v2H3zM12 6v4" /></>,
    shop: <><path d="M3 9l1.5-5h15L21 9v1a3 3 0 01-6 0 3 3 0 01-6 0 3 3 0 01-6 0z" /><path d="M5 13v7h14v-7M8 15h8v3H8z" /></>,
    route: <><circle cx="6" cy="6" r="2.5" /><circle cx="6" cy="18" r="2.5" /><circle cx="18" cy="12" r="2.5" /><path d="M8.5 6h3a3 3 0 013 3v.5M8.5 18h3a3 3 0 003-3v-.5" /></>,
    layers: <><path d="M12 3l9 5-9 5-9-5zM3 13l9 5 9-5M3 17.5l9 5 9-5" /></>,
    monitor: <><rect x="3" y="4" width="18" height="12" rx="2" /><path d="M8 20h8M12 16v4" /></>,
    shield: <><path d="M12 3l8 3v6c0 4.5-3.2 8-8 9-4.8-1-8-4.5-8-9V6z" /><path d="M8.5 12l2.5 2.5 4.5-5" /></>,
    users: <><circle cx="9" cy="8" r="3.5" /><path d="M2.5 20c0-3.6 2.9-6 6.5-6s6.5 2.4 6.5 6M17 4.5a3.5 3.5 0 010 7M18.5 14.3c1.8.7 3 2.5 3 5.2" /></>,
    cursor: <><path d="M5 3l14 7-6 2-2 6z" /></>,
    bars: <><path d="M4 20V10M10 20V4M16 20v-8M22 20H2" /></>,
    gear: <><circle cx="12" cy="12" r="3" /><path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M18.4 5.6l-2.1 2.1M7.7 16.3l-2.1 2.1" /></>,
    clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
  };
  return <svg viewBox="0 0 24 24" aria-hidden className={className} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">{d[k]}</svg>;
}


function Photo({ label, className = "" }: { label: string; className?: string }) {
  return <div className={`grid place-items-center rounded-lg bg-[#e9e6df] text-[0.8125rem] text-neutral-400 ${className}`}>{label}</div>;
}

function CardHead({ no, title, sub, desc, chapter }: { no: string; title: string; sub?: string; desc: string; chapter?: boolean }) {
  return (
    <div className="bg-[#faf9f5] px-4 pb-3 pt-4">
      <p className="flex items-center gap-2.5">
        <span className={`rounded-md ${Y} px-2 py-0.5 text-[0.8125rem] font-black text-ink`}>{chapter ? `CHAPTER ${no}` : no}</span>
        <b className="text-[1rem] font-black">{title}{sub && <span className="text-[0.8125rem] font-bold"> {sub}</span>}</b>
      </p>
      <p className="mt-2 text-[0.8125rem] leading-[1.6] text-[#2d2d2d]">{desc}</p>
    </div>
  );
}

function KV({ rows, w = "5.5rem" }: { rows: [string, React.ReactNode][]; w?: string }) {
  return (
    <dl className="overflow-hidden rounded-md border border-neutral-200 text-[0.8125rem]">
      {rows.map(([k, v]) => (
        <div key={k} className="grid border-t border-neutral-200 first:border-t-0" style={{ gridTemplateColumns: `${w} 1fr` }}>
          <dt className="bg-[#efefef] px-2.5 py-1.5 font-bold">{k}</dt>
          <dd className="px-2.5 py-1.5">{v}</dd>
        </div>
      ))}
    </dl>
  );
}

function Donut({ pct, label, size = "7rem" }: { pct: number; label: string; size?: string }) {
  return (
    <div className="relative grid place-items-center rounded-full" style={{ width: size, height: size, background: `conic-gradient(#F0C33F ${pct * 3.6}deg, #ececec 0)` }}>
      <div className="grid size-[72%] place-items-center rounded-full bg-white text-center">
        <p className="text-[0.8125rem] font-bold leading-none">{label}<br /><b className="font-gmarket text-[1.375rem] font-black">{pct}%</b></p>
      </div>
    </div>
  );
}

function Bars({ data, max, unit, hi }: { data: [string, number, string?][]; max: number; unit?: string; hi: number }) {
  return (
    <div className="flex h-[10rem] items-end justify-around gap-3 border-b border-l border-neutral-300 px-3 pt-6">
      {data.map(([l, v, s], i) => (
        <div key={l} className="relative flex w-full max-w-[3.5rem] flex-col items-center justify-end">
          <b className="mb-1 text-[0.8125rem]">{v.toLocaleString()}{unit}</b>
          <div className={`w-full ${i === hi ? Y : "bg-[#d4d4d4]"}`} style={{ height: `${(v / max) * 6.5}rem` }} />
          <span className="absolute top-full mt-1 whitespace-nowrap text-center text-[0.8125rem] leading-tight">{l}{s && <><br />{s}</>}</span>
        </div>
      ))}
    </div>
  );
}

function Effect({ label, items }: { label: string; items: string[] }) {
  return (
    <div className="mt-4 flex flex-col gap-3 rounded-xl bg-[#fffaea] p-2 md:flex-row md:items-center">
      <b className={`${Y} shrink-0 rounded-lg px-5 py-3 text-center text-[1.0625rem] font-black md:text-[1rem]`}>{label}</b>
      <ul className="grid flex-1 grid-cols-2 gap-x-4 gap-y-2 px-2 text-[0.8125rem] font-medium md:flex md:justify-around">
        {items.map((t) => (
          <li key={t} className="flex items-center gap-2"><span className={`grid size-5 shrink-0 place-items-center rounded-full ${Y}`}><Ico k="check" className="size-3.5 text-ink" /></span>{t}</li>
        ))}
      </ul>
    </div>
  );
}

function Block({ no, title, worry, support, note, children }: { no: string; title: string; worry: string; support: string; note?: string; children: React.ReactNode }) {
  return (
    <section className="mt-20">
      <h3 className="flex items-center gap-3 font-gmarket text-[1.5rem] font-black md:text-[1.5rem]"><span className="grid size-10 place-items-center rounded-full bg-ink text-[1rem] text-[#F0C33F]">{no}</span>{title}</h3>
      <div className="mt-5 hidden grid-cols-2 text-center text-[0.9375rem] md:grid md:text-[1rem]">
        <p className="pr-8 font-medium">사장님의 고민</p>
        <p className="font-black">구해줘 창업의 지원</p>
      </div>
      <div className="relative mt-5 grid grid-cols-1 gap-3 md:mt-3 md:min-h-[6.5rem] md:grid-cols-[1fr_1.2fr] md:items-center md:gap-0">
        <p className="rounded-2xl bg-[#d9d9d9] px-6 py-4 text-center text-[0.9375rem] leading-[1.5] lg:whitespace-pre-line md:rounded-l-full md:rounded-r-none md:py-5 md:pl-8 md:pr-10 md:text-[1rem]"><b className="mb-1 block text-[0.8125rem] font-black md:hidden">사장님의 고민</b>&ldquo;{worry}&rdquo;</p>
        <p className={`rounded-2xl ${Y} px-6 py-4 text-center text-[0.9375rem] leading-[1.5] shadow-[0_6px_14px_-6px_rgba(0,0,0,0.35)] md:-ml-8 lg:whitespace-pre-line md:rounded-full md:px-8 md:py-5 md:text-[1rem]`}><b className="mb-1 block text-[0.8125rem] font-black md:hidden">구해줘 창업의 지원</b>{support}</p>
      </div>
      {note && <p className="mt-4 text-center"><span className="inline-block bg-ink px-2 py-0.5 text-[0.8125rem] text-white">{note}</span></p>}
      <div className="mt-6">{children}</div>
    </section>
  );
}

/* ---------- 데이터 ---------- */
const bubbles = [
  [0, "유동인구가 많으면\n무조건 장사가 잘되겠죠?", "left"],
  [1, "인테리어는 예쁘기만 하면\n되는 거 아닌가요?", "right"],
  [2, "오픈하면 손님들이\n알아서 찾아오겠죠!", "left"],
  [3, "일단 오픈하고 나서\n비용을 맞춰보려구요~", "right"],
] as const;

// 시안 기준(박스 520x395) 퍼센트 위치: bubble(bx,by,bw,bh), avatar(ax,ay,aw)
const BUBBLE_POS = [
  { bx: "4.6%", by: "14.7%", bw: "42.5%", bh: "19%", ax: "0.4%", ay: "0%", aw: "15%" },
  { bx: "52%", by: "19.7%", bw: "42.7%", bh: "19.5%", ax: "86%", ay: "26%", aw: "12.5%" },
  { bx: "2.3%", by: "74%", bw: "42.7%", bh: "19%", ax: "32%", ay: "78%", aw: "14%" },
  { bx: "57%", by: "72%", bw: "42.3%", bh: "19%", ax: "55.5%", ay: "67%", aw: "13%" },
] as const;

const mistakes = [
  ["01", "입지 선택 실수", "pin", "유동인구가 많아도 매출은 다릅니다.\n주 고객층과 소비 패턴을 분석하지 않으면\n높은 임대료만 부담할 수 있습니다."],
  ["02", "공간 기획 부족", "store", "예쁜 매장이 장사하기 좋은 매장은 아닙니다.\n동선과 좌석 배치를 잘못 설계하면\n회전율과 운영 효율이 떨어집니다."],
  ["03", "홍보·마케팅 미흡", "mega", "오픈했다고 손님이 알아서 찾아오진 않습니다.\n오픈 전 홍보와 고객 유입 전략이 없다면\n초기 매출 확보부터 어려워집니다."],
  ["04", "예산 관리 실패", "coins", "오픈 비용보다 무서운 건 오픈 후 운영비입니다.\n예비비와 초기 운영자금이 부족하면\n매출이 자리 잡기도 전에 자금난을 겪을 수 있습니다."],
];

const solutions = [
  ["01", "창업 컨설팅", "아이템 선정 | 업종분석 | 예산 계획 | 수익 구조 설계"],
  ["02", "상권·입지 분석", "상권 데이터 조사 | 점포추천 | 타당성 검토"],
  ["03", "브랜드 구축", "네이밍 | 로고 | BI개발 | 브랜드 스토리 기획"],
  ["04", "인테리어·시공", "공간 기획 | 3D 설계 | 시공 및 감리"],
  ["05", "오픈 준비", "집기,설비 세팅 | 운영 메뉴얼 | 직원교육"],
  ["06", "마케팅·사후관리", "오픈홍보 | 온라인노출 | 매출분석 | 운영 컨설팅"],
];

const invest = [["보증금(권리금 포함)", "30,000,000원", "30%"], ["인테리어", "35,000,000원", "35%"], ["주방 설비 및 집기", "15,000,000원", "15%"], ["간판·사인물·홍보물", "5,000,000원", "5%"], ["초기운영자금(식자재 등)", "15,000,000원", "15%"]];
const profit = [["식자재 원가", "1,968만원 (35%)", "#F0C33F"], ["인건비", "1,294만원 (23%)", "#f7dd8a"], ["임대료", "675만원 (12%)", "#ececec"], ["기타 운영비", "563만원 (10%)", "#bdbdbd"], ["예상 영업이익", "1,125만원 (20%)", "#6b6b6b"]];
const road = [
  ["STEP 01", "사업 방향 설정", "1주", ["목표 및 운영 방향 정리", "예산 범위 설정", "업종 후보 도출"]],
  ["STEP 02", "입지·상권 검토", "1~2주", ["상권 데이터 분석", "입지 현장 검토", "수익성 시뮬레이션"]],
  ["STEP 03", "설계 및 준비", "2~4주", ["매장 설계 및 디자인", "인허가·설비 준비", "메뉴 구성 및 교육"]],
  ["STEP 04", "오픈·안정 운영", "1주 + 운영지원", ["매장 오픈", "초기 운영 매니징", "매출 점검 및 개선"]],
];

const compete = [["한식", "7곳", "점심 수요 안정적"], ["고깃집", "5곳", "저녁 경쟁 높음"], ["분식", "4곳", "회전율 높음"], ["카페", "6곳", "체류형 소비 많음"]];
const items = ["업소용 냉장·냉동고", "작업대(조리/세척)", "가스레인지(화구)", "후드(배기설비)", "식기세척기", "POS(판매관리)", "테이블/로스터", "식기류(그릇·접시)", "조리도구(집게·가위 등)", "수납 선반(물품정리)"];
const checklist = [["clip", "인허가 및 행정", "영업신고, 위생교육, 사업자등록 등"], ["cube", "물품 및 오픈 세팅", "식자재, 집기, 비품, POS 설치 등"], ["users", "인력 및 운영 준비", "인력 채용, 교육, 운영 리허설 등"], ["mega", "오픈 마케팅", "오픈 이벤트, 지역 홍보, 온라인 세팅 등"]];
const sopList = ["조리 매뉴얼", "서비스 응대", "위생·안전관리", "마감 및 정리", "비상 상황 대응"];
const chapters = [
  ["1", "맛집 콘텐츠 제작", "대표 메뉴와 매장 분위기를 담은\n고품질 사진·영상 콘텐츠 촬영", "콘텐츠 촬영 이미지"],
  ["2", "플레이스 최적화", "네이버 플레이스 등록부터\n사진, 메뉴, 키워드까지 최적화 세팅", "플레이스 화면 이미지"],
  ["3", "블로그·지역 커뮤니티", "지역 블로그, 카페, 커뮤니티를 활용한\n실제 방문 리뷰와 입소문 확산", "블로그 화면 이미지"],
  ["4", "SNS·숏폼 영상 홍보", "인스타그램, 릴스, 쇼츠 등 숏폼 콘텐츠로\n브랜드 인지도와 유입 확대", "SNS 화면 이미지"],
];
const views = [["오픈 전", 100], ["1주차", 160], ["2주차", 230], ["3주차", 290], ["4주차", 350]] as const;
const after = [["shop", "업체 노출", "5곳 이상", "1곳 집중 운영으로 효율 극대화"], ["clock", "주간 관리 시간", "18시간", "7시간 (약 60% 절감)"], ["gear", "리뷰 관리", "직접 응대", "전략적 리뷰 운영 + 응대 템플릿 제공"], ["bars", "매출 관리", "변화 파악 어려움", "월별 리포트 제공 + 개선 방향 제안"]];
const interiorSteps = [["clip", "STEP 01", "현장 실측·분석"], ["ruler", "STEP 02", "공간 설계(평면도)"], ["cube", "STEP 03", "3D 시뮬레이션"], ["helmet", "STEP 04", "시공 및 현장 관리"], ["shop", "STEP 05", "오픈 준비·완료"]];
const interiorPoints = [["route", "효율적인\n운영 동선 설계"], ["layers", "공간 활용을 극대화한\n좌석 구성"], ["monitor", "3D 시뮬레이션으로\n사전 확인"], ["helmet", "전문 시공 및\n현장 관리"], ["shield", "오픈까지\n원스톱 지원"]];

const compareRows = [
  ["진행 방식", "업체마다 따로 계약", "한번의 상담으로 통합 진행"],
  ["비 용", "중복 비용 발생 가능", "패키지 운영으로 합리적인 비용"],
  ["일 정", "각 업체 일정이 달라 지연 위험", "전체 일정 통합 관리로 빠른 오픈"],
  ["관 리", "업체별 커뮤니케이션 부담", "전담 컨설턴트가 끝까지 관리"],
  ["오픈 이후", "별도 관리 필요", "운영·마케팅까지 지속 지원"],
];

const principles = [
  ["01", "예산에 맞는 설계", "창업 조건과 우선순위를 먼저 검토해\n현실적인 예산과 운영 구조를 설계합니다"],
  ["02", "투명한 진행 과정", "업무 범위와 주요 결정 사항을\n단계별로 안내하며 함께 진행합니다"],
  ["03", "분야별 전문성", "상권·브랜드·공간·마케팅까지\n각 분야의 전문성을 바탕으로\n실행 가능성을 검토합니다"],
  ["04", "오픈 이후까지", "매장 오픈 이후에도 운영점검과\n개선방향을 함께 살펴\n지속 가능한 성장을 지원합니다"],
];

const faqs = [
  ["창업이 처음인데, 아무것도 몰라도 괜찮을까요?", "물론입니다! 창업 경험이 없어도 괜찮습니다. 희망 업종, 예산, 지역 등 현재 상황을\n함께 확인하고, 창업 방향부터 필요한 준비 과정을 단계별로 안내해 드립니다."],
  ["창업 비용은 어느 정도 준비해야 하나요?", "창업 비용은 업종, 매장 규모, 입지, 인테리어 범위 등에 따라 달라집니다.\n구해줘창업은 희망 예산과 운영 조건을 검토하고, 필요한 투자 항목과 우선순위를 바탕으로\n현실적인 창업 계획 수립을 지원합니다."],
  ["아이템이나 매장이 정해지지 않아도 상담할 수 있나요?", "네. 구체적인 아이템이나 점포가 없어도 상담할 수 있습니다.\n관심 업종과 예산, 희망 지역 등을 바탕으로 창업 방향을 함께 검토합니다.\n이미 점포를 확보한 경우에도 현재 조건에 맞춰 필요한 서비스를 안내해 드립니다."],
  ["창업이 처음인데, 아무것도 몰라도 괜찮을까요?", "물론입니다. 창업 경험이 없어도 괜찮습니다.\n희망 업종, 예산, 지역 등 현재 상황을 함께 확인하고\n창업 방향부터 필요한 준비 과정을 단계별로 안내해 드립니다."],
  ["필요한 서비스만 선택해서 진행할 수 있나요?", "창업 준비 상황에 따라 상권분석, 브랜딩, 인테리어, 마케팅 등\n필요한 분야를 중심으로 상담할 수 있습니다.\n실제 개별 진행 가능 여부와 비용은 업무 범위 확인 후 안내합니다."],
  ["상담부터 오픈까지 얼마나 걸리나요?", "진행 기간은 업종, 점포 계약 여부, 인테리어 규모 및\n인허가 절차에 따라 달라집니다. 초기 상담을 통해 현재 준비 단계를 확인하고,\n예상 일정과 단계별 진행 계획을 안내합니다."],
  ["상담을 받으면 반드시 계약해야 하나요?", "아니요. 초기 상담은 창업 방향과 지원 범위를 확인하는 과정입니다.\n상담 내용을 검토한 후 진행 여부를 결정할 수 있으며,\n계약 조건과 비용은 별도로 안내합니다."],
  ["매장 오픈 이후에도 도움을 받을 수 있나요?", "오픈 이후에도 마케팅, 매장 운영 점검, 개선 방향 등에 대한 지원을 상담할 수 있습니다.\n구체적인 사후관리 항목과 기간은 선택한 서비스 및 계약 조건에 따라 달라집니다."],
];

export default function IdentityPage() {
  return (
    <>
      <Header active="신규창업" />
      <main className="overflow-x-clip bg-white">
        <div className="border-b border-white/10 bg-[#222]">
          <div className="mx-auto max-w-[80rem] px-6">
            <BackCrumb href="/" label="메인" current="신규창업 안내" dark className="py-4" />
          </div>
        </div>
        {/* 히어로 */}
        <section className="relative overflow-hidden bg-[#222] text-center text-white">
          <div className={`${wrap} pt-10 md:pt-12`}>
            <h1 className="font-gmarket text-[2rem] font-black leading-none tracking-tight text-[#F0C33F] md:text-[4rem]">신규창업</h1>
            <p className="mt-8 font-gmarket text-[1.75rem] font-light leading-[1.35] md:mt-10 md:text-[2.75rem]">어디서부터 시작해야 할지<br />막막하시죠?</p>
          </div>
          <div className="relative mt-10 md:mt-14">
            <svg aria-hidden viewBox="0 0 1440 240" preserveAspectRatio="none" className="absolute inset-x-0 top-0 h-[10rem] w-full md:h-[15rem]">
              <defs><linearGradient id="arcfade" x1="0" x2="1" y1="0" y2="0"><stop offset="0" stopColor="#F0C33F" stopOpacity="0" /><stop offset="0.35" stopColor="#F0C33F" stopOpacity="0.55" /><stop offset="0.5" stopColor="#F0C33F" stopOpacity="1" /><stop offset="0.65" stopColor="#F0C33F" stopOpacity="0.55" /><stop offset="1" stopColor="#F0C33F" stopOpacity="0" /></linearGradient></defs>
              <path d="M-40 236 C 300 20, 1140 20, 1480 236" fill="none" stroke="url(#arcfade)" strokeWidth="2" vectorEffect="non-scaling-stroke" />
            </svg>
            <div className={`${wrap} relative pb-12 pt-14 md:pt-24`}>
              <p className="font-gmarket text-[1.125rem] font-bold italic text-[#F0C33F] md:text-[1.25rem]">창업에 필요한 모든 전문성을 하나로</p>
              <p className="mt-5 text-[0.875rem] font-light leading-[1.4] md:text-[1.0625rem]">
                <b className="font-bold text-[#F0C33F]">구해줘 창업</b>은 아이디어 탐색 / 상권 분석 / 공간 디자인 / 마케팅 세팅까지<br />
                전문가 그룹의 <span className="text-[#F0C33F]">1:1 올인원 전수 프로세스</span>로 <span className="text-[#F0C33F]">실패 리스크 없는 성공 창업을 완성</span>합니다.
              </p>
              <a href="#consult" className={`mt-9 inline-block rounded-full ${Y} px-10 py-3 font-gmarket text-[1.125rem] font-bold text-ink transition hover:brightness-95 md:px-14 md:text-[1.25rem]`}>무료 창업 상담 신청하기</a>
            </div>
          </div>
        </section>

        {/* 말풍선 + 실수 */}
        <section className={`${wrap} pt-14 text-center md:pt-16`}>
          {/* 데스크톱: 시안 위치 그대로 / 모바일: 세로 나열 */}
          <div className="relative mx-auto hidden aspect-[520/395] w-full max-w-[44rem] md:block">
            {BUBBLE_POS.map((p, i) => (
              <div key={i}>
                <p className="absolute flex items-center justify-center lg:whitespace-pre-line rounded-[1.25rem] border border-neutral-200 bg-white text-center text-[0.875rem] leading-[1.55] shadow-[0_3px_8px_rgba(0,0,0,0.18)]" style={{ left: p.bx, top: p.by, width: p.bw, height: p.bh }}>&ldquo;{bubbles[i][1]}&rdquo;</p>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`/identity/memoji-${i + 1}.png`} alt="" className="absolute object-contain" style={{ left: p.ax, top: p.ay, width: p.aw }} />
              </div>
            ))}
            <h2 className="absolute left-1/2 top-[44%] -translate-x-1/2 whitespace-nowrap text-center font-gmarket text-[1.625rem] font-black md:text-[2rem] leading-[1.3] tracking-tight lg:text-[2.375rem]">
              사장님, 혹시 이런 실수<br /><span className="bg-[linear-gradient(transparent_62%,#F0C33F_62%)]">놓치고 계시진 않나요?</span>
            </h2>
          </div>
          <div className="mx-auto max-w-[28rem] space-y-4 md:hidden">
            {bubbles.map(([face, t], i) => (
              <div key={i} className="flex items-center gap-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`/identity/memoji-${face + 1}.png`} alt="" className="size-20 shrink-0 object-contain" />
                <p className="flex-1 lg:whitespace-pre-line rounded-2xl border border-neutral-200 bg-white px-5 py-5 text-[0.875rem] leading-[1.55] shadow-[0_3px_8px_rgba(0,0,0,0.15)]">&ldquo;{t}&rdquo;</p>
              </div>
            ))}
            <h2 className="pt-4 text-center font-gmarket text-[1.5rem] md:text-[1.75rem] font-black leading-[1.3] tracking-tight">사장님, 혹시 이런 실수<br /><span className="bg-[linear-gradient(transparent_62%,#F0C33F_62%)]">놓치고 계시진 않나요?</span></h2>
          </div>
          <Chev />

          <p className={`inline-block rounded-full ${Y} px-8 py-3 font-gmarket text-[1.25rem] font-black md:px-16 md:text-[1.5rem]`}>창업 전, 가장 많이 놓치는 4가지 실수</p>
          <ul className="mx-auto mt-12 grid max-w-[77rem] gap-4 text-left md:grid-cols-2">
            {mistakes.map(([n, t, , d]) => (
              <li key={n} className="rounded-[1.5rem] border border-ink bg-white px-7 pb-4 pt-4">
                <p className="flex items-baseline gap-4 font-gmarket text-[1.375rem] font-black md:text-[1.5rem]"><span className="text-[#F0C33F]">{n}</span><span className="mr-6 flex-1 border-b border-ink pb-3">{t}</span></p>
                <div className="mt-4 flex items-center gap-6">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={`/identity/mistake-${Number(n)}.png`} alt="" className="-my-3 size-[5.5rem] shrink-0 object-contain md:size-24" />
                  <p className="lg:whitespace-pre-line text-[0.8125rem] leading-[1.6] md:text-[0.875rem]">{d}</p>
                </div>
              </li>
            ))}
          </ul>
          <Chev />

          <h2 className="font-gmarket text-[1.5rem] font-black leading-[1.3] tracking-tight md:text-[2.375rem]">이 모든 준비를<br />사장님 혼자 감당할 필요 없습니다!</h2>
          <p className="mt-6"><span className="inline-block bg-ink px-3 py-1 font-gmarket text-[1.125rem] text-white md:text-[1.5rem]"><b className="font-black">구해줘창업</b><span className="font-light">이</span> <b className="font-black">함께 준비</b><span className="font-light">합니다</span></span></p>
          <Chev />

          <h2 className="font-gmarket text-[1.375rem] font-black tracking-tight md:text-[2.125rem]">구해줘창업의 <span className="inline-block bg-[#fdc928] px-3">ALL-IN-ONE 창업 솔루션</span></h2>
          <p className="mt-4 text-[0.875rem] md:text-[1rem]">기획부터 오픈, 운영까지 하나의 흐름으로 완성하는 토탈 창업 시스템</p>
          <ul className="mx-auto mt-10 grid max-w-[77rem] gap-x-10 gap-y-4 md:grid-cols-2">
            {solutions.map(([n, t, d]) => (
              <li key={n} className="relative rounded-2xl border border-ink bg-white pb-3 pt-2">
                <span className={`absolute left-3 -top-2 grid h-[3.25rem] w-[3rem] place-items-start rounded-b-[1.5rem] rounded-t-sm ${Y} pl-1.5 pt-1 font-gmarket text-[1.5rem] font-black leading-none`}>{n}</span>
                <div className="ml-[4.5rem] mr-5"><p className="font-gmarket text-[1.5rem] font-black leading-tight md:text-[1.75rem]">{t}</p>
                <p className="mt-1.5 border-t border-ink pt-1.5 text-[0.8125rem] font-medium md:text-[0.9375rem]">{d}</p></div>
              </li>
            ))}
          </ul>
          <Chev />

          <h2 className="font-gmarket text-[1.5rem] font-black tracking-tight md:text-[2.375rem]">HOW WE MAKE IT HAPPEN</h2>
          <p className="mt-3 text-[0.9375rem] md:text-[1.0625rem]">상담부터 오픈 이후 관리까지, 구해줘창업의 실전 프로세스</p>
          <p className={`mt-10 inline-block rounded-full ${Y} px-5 py-1 text-[0.875rem] font-bold`}>서비스 설명</p>
        </section>

        {/* 서비스 상세 */}
        <div className={`${wrap} pb-24 text-left`}>
          {/* 01 */}
          <Block no="01" title="창업 컨설팅" worry={"창업은 하고싶은데, 어떤 업종이 저에게\n맞을 지 모르겠어요"} support={"예산, 업종 방향, 목표 운영 형태를 기준으로\n현실적인 창업 구조를 설계해드립니다."} note="본 자료는 구해줘창업의 컨설팅 과정을 이해하기 위한 예시이며, 실제 분석 결과는 창업 조건에 따라 달라질 수 있습니다.">
            <div className="grid gap-3 lg:grid-cols-[1fr_1fr_1fr]">
              <div className={`${card} overflow-hidden`}>
                <CardHead no="01" title="창업자 조건 분석" desc={"창업자의 상황과 목표를 진단하여\n가장 적합한 창업 방향을 도출합니다."} />
                <div className="flex items-center gap-3 p-4">
                  <div className="flex-1"><KV rows={[["가용 예산", "약 1억원"], ["희망 업종", "한식(주물럭 전문점)"], ["운영 형태", "직접 운영(오너 1인)"], ["운영 목표", "월 순이익 800만원 이상"]]} w="4.5rem" /></div>
                  <div className="shrink-0 rounded-xl bg-[#fff6d8] p-2 text-center"><p className="text-[0.8125rem] font-bold">종합 적합도</p><Donut pct={86} label="적합" size="6rem" /></div>
                </div>
              </div>
              <div className={`${card} overflow-hidden`}>
                <CardHead no="02" title="초기 투자비용 계획" desc={"업종과 매장 규모에 맞춰\n실제 필요한 초기 투자비용을 설계합니다."} />
                <div className="p-4">
                  <table className="w-full text-[0.8125rem]">
                    <thead><tr className="bg-[#efefef]"><th className="py-1.5 text-left pl-2">항목</th><th>예상 비용</th><th>비중</th></tr></thead>
                    <tbody>{invest.map(([a, b, c]) => <tr key={a} className="border-t border-neutral-200"><td className="py-1.5 pl-2">{a}</td><td className="text-right">{b}</td><td className="text-right">{c}</td></tr>)}</tbody>
                  </table>
                  <p className="mt-2 flex justify-between bg-[#fde58f] px-2.5 py-2 text-[0.8125rem] font-black"><span>총 초기 투자비용</span><span className="text-[1rem]">약 1억 원</span></p>
                </div>
              </div>
              <div className={`${card} overflow-hidden`}>
                <CardHead no="03" title="예상 매출 시뮬레이션" desc={"운영 형태(점심·저녁·배달)를 기준으로\n월 매출을 예측합니다."} />
                <div className="p-4 pb-10">
                  <p className="mb-2 ml-auto w-fit rounded-lg border border-[#F0C33F] px-3 py-1 text-[0.8125rem] font-bold">월 예상 매출 <b className="text-[1rem]">약 5,625만원</b></p>
                  <Bars data={[["점심", 1485, "(11:00~15:00)"], ["저녁", 3240, "(17:00~22:00)"], ["배달/포장", 900, "(전체 시간)"]]} max={3240} unit="만원" hi={1} />
                </div>
              </div>
            </div>
            <div className="mt-3 grid gap-3 lg:grid-cols-[1fr_1.15fr]">
              <div className={`${card} overflow-hidden`}>
                <CardHead no="04" title="예상 수익구조" sub="(월 기준)" desc={"매출 대비 고정비와 변동비를 분석하고,\n예상 영업이익을 산출합니다."} />
                <div className="flex flex-wrap items-center gap-4 p-4">
                  <div className="relative grid size-36 shrink-0 place-items-center rounded-full" style={{ background: "conic-gradient(#F0C33F 0 126deg, #f7dd8a 0 209deg, #ececec 0 252deg, #bdbdbd 0 288deg, #6b6b6b 0 360deg)" }}>
                    <div className="grid size-[58%] place-items-center rounded-full bg-white text-center text-[0.8125rem] font-bold leading-tight">매출<br /><b className="text-[1rem]">5,625만원</b><br />기준</div>
                  </div>
                  <ul className="min-w-[14rem] flex-1 space-y-1.5 text-[0.8125rem]">
                    {profit.map(([a, b, c]) => <li key={a} className="flex items-center justify-between gap-3 border-b border-neutral-100 pb-1"><span className="flex items-center gap-2"><i className="inline-block size-3" style={{ background: c }} />{a}</span><span>{b}</span></li>)}
                  </ul>
                </div>
                <p className="m-3 flex flex-wrap items-center justify-between gap-2 rounded-lg bg-[#fde58f] px-4 py-2 text-[0.8125rem] font-black"><span>예상 영업이익</span><span>월 약 <b className="text-[1.125rem]">1,125만원</b></span><span>수익률 약 <b className="font-gmarket text-[1.125rem]">20%</b></span></p>
              </div>
              <div className={`${card} overflow-hidden`}>
                <CardHead no="05" title="창업 운영 로드맵" desc="준비부터 오픈, 안정 운영까지 단계별로 체계적으로 지원합니다." />
                <div className="grid grid-cols-2 gap-px p-4 text-center text-[0.8125rem] md:grid-cols-4">
                  {road.map(([s, t, w, bs], i) => (
                    <div key={s as string}>
                      <p className={`py-2 font-bold ${i === 3 ? Y : "bg-[#e3e3e3]"}`}>{s}<br />{t}</p>
                      <p className="border-b border-neutral-200 py-1.5 font-bold">{w}</p>
                      <ul className="mt-2 space-y-1 px-1 text-left">{(bs as string[]).map((b) => <li key={b}>·{b}</li>)}</ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Block>

          {/* 02 */}
          <Block no="02" title="상권·입지 분석" worry={"이 위치가 정말 장사가 잘되는 곳인지\n확신이 안 서요"} support={"상권 데이터, 유동인구, 경쟁 점포, 임대 조건을\n종합 검토하여 업종 적합성과 수익 가능성을 분석합니다"} note="본 자료는 상권 분석 과정의 이해를 돕기 위한 예시이며, 실제 분석 결과는 지역 조건에 따라 달라질 수 있습니다.">
            <div className="grid gap-3 lg:grid-cols-3">
              <div className={`${card} overflow-hidden`}>
                <CardHead no="01" title="상권 핵심 데이터" desc="지역의 기본 상권 현황을 수치로 파악합니다." />
                <div className="flex items-center gap-3 p-4">
                  <div className="flex-1"><KV rows={[["분석 지역", "도심 상권 인근"], ["일 평균\n유동인구", "19,200명"], ["주요 방문층", "20~40대"], ["주 이용\n시간대", "점심·저녁 중심"]]} w="5rem" /></div>
                  <div className="shrink-0 text-center"><Donut pct={84} label="적합도" size="6rem" /><p className="mt-2 rounded bg-[#fde58f] px-2 py-0.5 text-[0.8125rem] font-bold">상권 적합</p></div>
                </div>
              </div>
              <div className={`${card} overflow-hidden`}>
                <CardHead no="02" title="유동인구 분석" desc="시간대별 유입 흐름과 소비 가능성을 분석합니다." />
                <div className="p-4 pb-10">
                  <p className="mb-2 ml-auto w-fit rounded-lg border border-[#F0C33F] px-3 py-1 text-[0.8125rem] font-bold">피크 시간 저녁</p>
                  <Bars data={[["오전", 120], ["점심", 280], ["오후", 190], ["저녁", 310]]} max={310} hi={3} />
                </div>
              </div>
              <div className={`${card} overflow-hidden`}>
                <CardHead no="03" title="경쟁 점포 분석" desc="인근 경쟁 업종과 포화도를 검토합니다." />
                <div className="flex items-center gap-3 p-4">
                  <table className="flex-1 text-center text-[0.8125rem]">
                    <thead><tr className="bg-[#efefef]"><th className="py-1.5">업종</th><th>점포 수</th><th>특징</th></tr></thead>
                    <tbody>{compete.map(([a, b, c]) => <tr key={a} className="border-t border-neutral-200"><td className="py-1.5 font-bold">{a}</td><td>{b}</td><td>{c}</td></tr>)}</tbody>
                  </table>
                  <div className="shrink-0 rounded-xl bg-[#fff6d8] p-3 text-center text-[0.8125rem] font-bold">경쟁 강도<span className="mx-auto mt-2 grid size-14 place-items-center rounded-full border-4 border-[#F0C33F] bg-white text-[0.9375rem] font-black">보통</span></div>
                </div>
              </div>
            </div>
            <div className="mt-3 grid gap-3 lg:grid-cols-[1fr_1.4fr]">
              <div className={`${card} overflow-hidden`}>
                <CardHead no="04" title="임대 조건 검토" desc="고정비 구조와 입지 조건을 함께 확인합니다." />
                <div className="p-4">
                  <KV rows={[["보증금", "3,000만원"], ["월세", "230만원"], ["관리비", "35만원"], ["전용면적", "28평"], ["주차", "가능"]]} w="50%" />
                  <p className="mt-2 rounded bg-[#fde58f] py-2 text-center text-[0.9375rem] font-black">초기 고정비 부담 보통</p>
                </div>
              </div>
              <div className={`${card} overflow-hidden`}>
                <CardHead no="05" title="종합 분석 결과" desc="업종 적합성과 수익 가능성을 종합 판단합니다." />
                <div className="grid gap-3 p-4 md:grid-cols-[1fr_1fr]">
                  <ul className="space-y-2.5 text-[0.9375rem] font-bold">
                    {[["업종 적합성", "높음"], ["수익 가능성", "양호"], ["운영 안정성", "보통 이상"]].map(([a, b]) => <li key={a} className="grid grid-cols-[1fr_auto] items-center gap-2"><span className="rounded-lg bg-[#efefef] px-3 py-2">{a}</span><span className="rounded-lg bg-[#fde58f] px-4 py-2">{b}</span></li>)}
                  </ul>
                  <div className={`${Y} rounded-2xl p-4 text-center`}>
                    <p className="mx-auto w-fit rounded-full bg-white px-5 py-1 text-[0.9375rem] font-black">추천 업종</p>
                    <p className="mt-3 font-gmarket text-[1.5rem] font-black">한식·소형 외식업</p>
                    <p className="mt-3 border-t border-ink/50 pt-2 text-[0.8125rem]">점심·저녁 복합 운영에 유리한 상권입니다.</p>
                  </div>
                </div>
              </div>
            </div>
          </Block>

          {/* 03 */}
          <Block no="03" title="브랜드 구축" worry={"우리 가게만의 특별한 컨셉과\n브랜드가 필요해요!"} support={"창업자의 아이디어를 바탕으로 네이밍부터 로고,\n브랜드 콘셉트까지 차별화된 브랜드 아이덴티티를 구축합니다."}>
            <div className="grid gap-3 lg:grid-cols-[1fr_1.35fr_1.2fr]">
              <div className={`${card} overflow-hidden`}>
                <CardHead no="01" title="브랜드 전략 수립" desc={"업종 특성과 타깃에 맞는\n브랜드 방향성과 콘셉트를 설계합니다."} />
                <div className="p-4"><KV rows={[["업종", "돼지고기 전문점"], ["타깃 고객", "가족, 직장인, 지역주민"], ["브랜드 키워드", <span key="kw" className="flex flex-wrap gap-1.5">{["정겨움", "푸근함", "활기찬"].map((t) => <span key={t} className="rounded-full bg-[#fde58f] px-2.5 py-0.5 text-[0.8125rem] font-bold">#{t}</span>)}</span>], ["디자인 방향", "전통적 감성 + 현대적 실용성"]]} w="5.5rem" /></div>
              </div>
              <div className={`${card} overflow-hidden`}>
                <CardHead no="02" title="네이밍 & 로고 개발" desc={"브랜드 콘셉트에 맞는 상호명과\n차별화된 로고를 개발합니다."} />
                <div className="grid grid-cols-3 gap-5 p-4 text-center text-[0.8125rem]">
                  {["초안 스케치", "시안 보완", "최종 로고"].map((t, i) => (
                    <div key={t}><div className="relative"><div className="relative aspect-square overflow-hidden rounded-lg bg-white">{/* eslint-disable-next-line @next/next/no-img-element */}<img src={["/identity/logo-1.jpg", "/identity/logo-2.png", "/identity/logo-3.png"][i]} alt={t} className="absolute inset-0 size-full object-contain p-1.5" /></div>{i < 2 && <svg aria-hidden viewBox="0 0 24 24" className="absolute -right-[1.0625rem] top-1/2 z-10 size-4 -translate-y-1/2 text-[#F0C33F]" fill="currentColor"><path d="M8 3l11 9-11 9z" /></svg>}</div><p className="mt-2 rounded-full bg-[#efefef] px-2 py-0.5 font-bold">{t}</p></div>
                  ))}
                </div>
              </div>
              <div className={`${card} overflow-hidden`}>
                <CardHead no="03" title="브랜드 아이덴티티(BI·CI)" desc={"로고를 기반으로 매장에서 사용하는\n모든 브랜드 요소를 일관되게 제작합니다."} />
                <div className="grid grid-cols-[1fr_1fr] gap-3 p-4 text-[0.8125rem]">
                  <div><p className="rounded bg-[#efefef] px-2 py-1 font-bold">브랜드 컬러</p><div className="mt-2 flex gap-1.5">{["#1A1A1A", "#D62828", "#FFF4E6"].map((c) => <span key={c} className="size-9 rounded-full border border-neutral-200" style={{ background: c }} />)}</div><p className="mt-1.5">#1A1A1A #D62828 #FFF4E6</p></div>
                  <div><p className="rounded bg-[#efefef] px-2 py-1 font-bold">지정 폰트</p><p className="mt-1 font-gmarket text-[1.5rem] font-black">가나다Aa</p><p>제목 : 프리텐다드 Bold<br />본문 : 프리텐다드 Regular</p></div>
                </div>
              </div>
            </div>
            <div className="mt-3 grid gap-3 lg:grid-cols-3">
              {[["04", "공간 브랜딩", "(인테리어)", "브랜드 콘셉트를 공간에 반영하여\n매장의 분위기와 경험 가치를 높입니다.", "매장 인테리어 이미지"], ["05", "매장 사인물 & 메뉴 디자인", "", "매장 운영에 필요한 사인물과 메뉴판을\n통일감 있게 디자인합니다.", "사인물·메뉴판 이미지"], ["06", "브랜드 적용 확장", "", "포장, 유니폼, 집기 등 매장 운영 전반에\n브랜드를 일관되게 적용합니다.", "포장·유니폼 이미지"]].map(([n, t, s, d, p]) => (
                <div key={n} className={`${card} overflow-hidden`}>
                  <CardHead no={n} title={t} sub={s} desc={d} />
                  <div className="p-3"><div className={`relative mx-auto aspect-[16/10] max-w-[20rem] overflow-hidden md:aspect-[4/3] md:max-w-none rounded-lg ${n === "06" ? "bg-[#1c1510]" : "bg-[#e9e6df]"}`}>{/* eslint-disable-next-line @next/next/no-img-element */}<img src={`/identity/brand-${Number(n)}.jpg`} alt={p} loading="lazy" className={`absolute inset-0 size-full ${n === "06" ? "object-contain" : "object-cover"}`} /></div></div>
                </div>
              ))}
            </div>
            <Effect label="브랜딩 구축 효과" items={["브랜드 인지도 상승", "매장 경쟁력 강화", "고객 신뢰도 및 재방문율 증가", "장기적인 브랜드 자산 확보"]} />
          </Block>

          {/* 04 */}
          <Block no="04" title="인테리어·시공" worry={"예쁘기만 한 게 아니라\n운영하기 편한 매장을 만들고 싶은데.."} support={"업종별 운영 동선과 공간 효율을 고려해 설계부터\n3D 시뮬레이션, 시공 및 현장 관리까지 지원합니다."}>
            <div className="flex flex-col gap-2 rounded-xl bg-[#fffaea] p-2 lg:flex-row lg:items-center">
              <b className="shrink-0 rounded-lg bg-[#fde58f] px-4 py-3 text-[0.9375rem] font-black">인테리어 시공<br />진행 과정</b>
              <ol className="grid flex-1 gap-2 sm:grid-cols-2 lg:grid-cols-5">
                {interiorSteps.map(([ic, s, t]) => (
                  <li key={s} className="flex items-center gap-2 rounded-lg bg-white px-3 py-2 text-[0.8125rem] font-bold shadow-sm"><span className="grid size-9 shrink-0 place-items-center rounded-full bg-[#fff1bd]"><Ico k={ic} className="size-5" /></span><span><span className="block text-[0.8125rem] font-black">{s}</span>{t}</span></li>
                ))}
              </ol>
            </div>
            <div className="mt-3 grid gap-3 lg:grid-cols-3">
              {[["공간 설계", "(평면도)", "운영 동선과 좌석 효율을 고려한 최적의 공간 구성을 설계합니다.", "평면도 이미지"], ["3D 시뮬레이션", "", "실제 시공 전, 3D로 매장의 전체 분위기와 공간 구성을 미리 확인할 수 있습니다.", "3D 도면 이미지"], ["시공 및 현장 관리", "", "설계한 플랜을 바탕으로 시공부터 현장 관리까지 체계적으로 진행합니다.", "시공 현장 이미지"]].map(([t, s, d, p], i) => (
                <div key={t} className={`${card} overflow-hidden p-4`}>
                  <p className="flex items-center gap-2 text-[1.125rem] font-black"><span className={`h-5 w-1.5 ${Y}`} />{t}{s && <span className="text-[0.8125rem]">{s}</span>}</p>
                  <p className="mt-2 min-h-[2.6rem] text-[0.8125rem] leading-[1.6]">{d}</p>
                  {i < 2 ? (
                    <div className="relative mx-auto mt-3 aspect-[16/10] max-w-[20rem] overflow-hidden md:aspect-[4/3] md:max-w-none rounded-lg border border-neutral-200 bg-white">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={i === 0 ? "/identity/interior-plan.jpg" : "/identity/interior-3d.jpg"} alt={p} loading="lazy" className="absolute inset-0 size-full scale-110 object-contain" />
                    </div>
                  ) : (
                    <div className="mx-auto mt-3 grid aspect-[16/10] max-w-[20rem] grid-rows-[3fr_2fr] md:aspect-[4/3] md:max-w-none gap-1.5 rounded-lg border border-neutral-200 bg-white p-1.5">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src="/identity/interior-site-1.jpg" alt={p} loading="lazy" className="size-full min-h-0 rounded-lg object-cover" />
                      <div className="grid min-h-0 grid-cols-2 gap-1.5">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src="/identity/interior-site-2.jpg" alt={p} loading="lazy" className="size-full min-h-0 rounded-lg object-cover" />
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src="/identity/interior-site-3.jpg" alt={p} loading="lazy" className="size-full min-h-0 rounded-lg object-cover" />
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="mt-4 flex flex-col gap-3 rounded-xl bg-[#fffaea] p-2 lg:flex-row lg:items-center">
              <b className={`${Y} shrink-0 rounded-lg px-5 py-3 text-center text-[1.125rem] font-black`}>인테리어 시공 지원 포인트</b>
              <ul className="grid flex-1 grid-cols-2 gap-3 px-2 text-[0.8125rem] md:grid-cols-5">
                {interiorPoints.map(([ic, t]) => <li key={t} className="flex items-center gap-2"><span className="grid size-9 shrink-0 place-items-center rounded-full bg-[#fff1bd]"><Ico k={ic} className="size-5" /></span><span className="lg:whitespace-pre-line">{t}</span></li>)}
              </ul>
            </div>
          </Block>

          {/* 05 */}
          <Block no="05" title="오픈 준비" worry={"오픈 전에 챙겨야 할 게 너무 많은데\n빠뜨릴까 걱정돼요"} support={"매장 운영에 필요한 집기·설비 선정부터\n운영 매뉴얼과 오픈 준비 사항까지 체계적으로 점검합니다."}>
            <div className="grid gap-3 lg:grid-cols-[1fr_1.2fr_1fr]">
              <div className={`${card} overflow-hidden`}>
                <CardHead no="01" title="집기·설비 선정 및 세팅" desc="업종과 매장 규모에 맞는 핵심 집기와 설비를 선정하고, 배치와 세팅까지 지원합니다." />
                <div className="p-3"><div className="relative mx-auto aspect-[16/10] max-w-[20rem] overflow-hidden md:aspect-[4/3] md:max-w-none rounded-lg bg-[#e9e6df]">{/* eslint-disable-next-line @next/next/no-img-element */}<img src="/identity/open-kitchen.jpg" alt="주방 설비 세팅" loading="lazy" className="absolute inset-0 size-full object-cover" /></div></div>
              </div>
              <div className={`${card} overflow-hidden`}>
                <CardHead no="02" title="운영 매뉴얼(SOP) 제작·제공" desc="매장 운영, 조리, 서비스, 위생, 고객응대 등 실무에 바로 적용 가능한 표준 운영 절차(SOP)를 제공합니다." />
                <div className="p-3">{/* eslint-disable-next-line @next/next/no-img-element */}<img src="/identity/open-sop.jpg" alt="매장 운영 SOP와 운영 SOP 목차" loading="lazy" className="mx-auto h-auto w-full max-w-[20rem] rounded-lg md:max-w-none" /></div>
              </div>
              <div className={`${card} overflow-hidden`}>
                <CardHead no="03" title="오픈 준비 체크리스트" desc="오픈 일정에 맞춰 인허가, 물품준비, 인력세팅, 마케팅까지 모든 준비사항을 단계별로 점검합니다." />
                <ul className="space-y-1.5 p-3">
                  {checklist.map(([ic, t, d]) => (
                    <li key={t} className="flex items-center gap-3 rounded-lg bg-[#fffaea] px-3 py-2"><Ico k={ic} className="size-7 shrink-0" /><span className="flex-1"><b className="block text-[0.8125rem]">{t}</b><span className="text-[0.8125rem]">{d}</span></span><span className={`grid size-6 place-items-center rounded-full ${Y}`}><Ico k="check" className="size-4" /></span></li>
                  ))}
                </ul>
              </div>
            </div>
            <div className={`${card} mt-3 p-4`}>
              <p className="flex flex-wrap items-center gap-3"><b className={`${Y} rounded-lg px-4 py-1.5 text-[1.0625rem] font-black`}>주요 집기·설비 예시</b><span className="text-[0.8125rem]">*업종(한식, 고깃집, 주점 등)과 매장 규모에 따라 실제 구성은 달라집니다.</span></p>
              <ul className="mt-4 grid grid-cols-3 gap-x-2 gap-y-3 text-center text-[0.75rem] font-medium sm:grid-cols-5 sm:gap-3 sm:text-[0.8125rem] lg:grid-cols-10">
                {items.map((t, i) => <li key={t}><div className="relative aspect-[260/248] bg-white">{/* eslint-disable-next-line @next/next/no-img-element */}<img src={`/identity/open-item-${i + 1}.jpg`} alt={t} loading="lazy" className="absolute inset-0 size-full object-contain" /></div><p className="mt-1.5 leading-tight">{t}</p></li>)}
              </ul>
            </div>
            <Effect label="오픈 준비 지원 효과" items={["빠짐없는 오픈 준비", "표준화된 매장 운영(SOP)", "효율적인 인력 관리", "안정적인 초기 운영", "오픈 후 지속 지원"]} />
          </Block>

          {/* 06 */}
          <Block no="06" title="마케팅·사후관리" worry={"오픈하고 나서도 꾸준히 손님이 올까요?\n홍보를 도대체 어떻게 해야할지…"} support={"상권과 고객층에 맞춘 오픈 마케팅을 기획하고,\n운영 현황에 따른 홍보 전략과 개선 방향을 제안합니다."}>
            <p className="flex flex-wrap items-center gap-3"><span className={`h-6 w-1.5 ${Y}`} /><b className="text-[1.25rem] font-black">오픈 마케팅 실행 프로세스</b><span className="text-neutral-400">|</span><span className="text-[0.8125rem]">매장 특성과 상권에 맞는 채널을 선정해, 오픈 전부터 안정적인 고객 유입을 만듭니다.</span></p>
            <div className="mt-3 grid gap-3 md:grid-cols-2 lg:grid-cols-4">
              {chapters.map(([n, t, d, p]) => (
                <div key={n} className={`${card} overflow-hidden`}>
                  <div className="bg-[#faf9f5] px-4 pb-3 pt-4">
                    <p className="flex items-center gap-2"><span className={`rounded-md ${Y} px-2 py-0.5 text-[0.8125rem] font-black`}>CHAPTER {n}</span><b className="text-[1rem] font-black">{t}</b></p>
                    <p className="mt-2 lg:whitespace-pre-line text-[0.8125rem] leading-[1.6]">{d}</p>
                  </div>
                  <div className="p-3"><div className="relative mx-auto aspect-[16/10] max-w-[20rem] overflow-hidden md:aspect-[4/3] md:max-w-none rounded-lg bg-white">{/* eslint-disable-next-line @next/next/no-img-element */}<img src={`/identity/marketing-${Number(n)}.jpg`} alt={p} loading="lazy" className={`absolute inset-0 size-full ${n === "1" ? "object-cover object-left" : "object-contain"}`} /></div></div>
                </div>
              ))}
            </div>
            <div className="mt-3 grid gap-3 lg:grid-cols-2">
              <div className={`${card} min-w-0 p-5`}>
                <p className="flex items-center gap-2"><span className={`h-5 w-1.5 ${Y}`} /><b className="text-[1.125rem] font-black">운영 모니터링 &amp; 성과 분석</b></p>
                <p className="mt-2 text-[0.8125rem] leading-[1.6]">오픈 이후에도 매출, 유입, 리뷰 등 주요 지표를 분석해<br />지속적인 개선 방향을 제안합니다.</p>
                <div className="mt-4 grid gap-4 md:grid-cols-[1.4fr_1fr]">
                  <div>
                    <p className="flex items-center gap-1.5 text-[0.8125rem] font-bold"><i className={`inline-block size-2.5 rounded-full ${Y}`} />플레이스 조회수</p>
                    <div className="relative mt-2 flex h-36 items-end justify-between border-b border-l border-neutral-300 px-3 pb-0">
                      {views.map(([l, v]) => (
                        <div key={l} className="relative flex-1">
                          <div className="mx-auto w-px bg-[#F0C33F]/60" style={{ height: `${(v / 350) * 7}rem` }} />
                          <span className="absolute left-1/2 -translate-x-1/2 text-[0.8125rem] font-bold" style={{ bottom: `${(v / 350) * 7 + 0.3}rem` }}>{v}<i className={`mx-auto mt-0.5 block size-2.5 rounded-full ${Y}`} /></span>
                          <span className="absolute left-1/2 top-full mt-1 -translate-x-1/2 whitespace-nowrap text-[0.8125rem]">{l}</span>
                        </div>
                      ))}
                    </div>
                    <div className="h-5" />
                  </div>
                  <ul className="space-y-2">
                    {[["users", "전화 문의", "6건", "19건"], ["cursor", "플레이스 클릭", "18건", "72건"], ["bars", "리뷰 · 후기 수", "42건", "148건"]].map(([ic, t, a, b]) => (
                      <li key={t} className="flex items-center gap-3 rounded-xl bg-[#fff6d8] px-3 py-2"><Ico k={ic} className="size-7 shrink-0" /><span className="text-[0.8125rem]">{t}<b className="block text-[0.9375rem]">{a} <span className="text-[#F0A800]">→</span> {b}</b></span></li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className={`${card} min-w-0 p-5`}>
                <p className="flex items-center gap-2"><span className={`h-5 w-1.5 ${Y}`} /><b className="text-[1.125rem] font-black">사후관리 &amp; 운영 개선 제안</b></p>
                <p className="mt-2 text-[0.8125rem] leading-[1.6]">운영 데이터를 기반으로 매출 유지와 효율적인 매장 운영을 위한<br />지속적인 케어를 제공합니다.</p>
                <div className="mt-4 overflow-x-auto">
                  <table className="w-full min-w-[26rem] border-separate border-spacing-y-1.5 text-[0.8125rem]">
                    <thead><tr><th className="rounded bg-[#efefef] py-1.5">운영 항목</th><th className="rounded bg-[#efefef] py-1.5">기존 운영</th><th /><th className={`rounded ${Y} py-1.5`}>개선 제안</th></tr></thead>
                    <tbody>
                      {after.map(([ic, a, b, c]) => (
                        <tr key={a}>
                          <td className="rounded bg-[#efefef] px-2 py-2 font-bold"><span className="flex items-center gap-1.5"><Ico k={ic} className="size-5 shrink-0" />{a}</span></td>
                          <td className="bg-[#f5f5f5] px-2 text-center">{b}</td>
                          <td className="px-1 text-center font-black text-[#F0A800]">→</td>
                          <td className="rounded bg-[#fff1bd] px-2 text-center font-medium">{c}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <Effect label="마케팅 & 사후관리 기대효과" items={["신규 고객 유입 확대", "브랜드 인지도 상승", "꾸준한 매출 유지", "운영 부담 최소화"]} />
          </Block>
        </div>

        {/* 차별점 · 원칙 · Q&A · 상담 */}
        <section className="bg-[#222] text-center text-white">
          <div className={`${wrap} pb-24 pt-14 md:pt-16`}>
            <h2 className="font-gmarket text-[1.5rem] font-light leading-[1.35] md:text-[2.375rem]">
              창업의 <b className="font-black text-[#F0C33F]">차이</b>는,<br />
              <b className="font-black text-[#F0C33F]">준비</b>의 <b className="font-black">디테일</b>에서 <b className="font-black text-[#F0C33F]">시작됩니다.</b>
            </h2>
            <p className="mt-8 text-[0.875rem] leading-[1.7] text-white/90 md:text-[1.0625rem]">
              <b>구해줘창업</b>은 개별 서비스의 제공을 넘어,<br />창업 전 과정을 <b>하나의 전략으로 연결</b>합니다.
            </p>

            <div className="mx-auto mt-10 max-w-[77rem] overflow-x-auto">
              <table className="w-full min-w-[32rem] border-collapse text-[0.875rem] text-ink md:text-[1rem]">
                <thead>
                  <tr>
                    <th className="w-[5.5rem] bg-[#b9b9b9] py-3" />
                    <th className="border border-[#222] bg-[#e3e3e3] py-3 font-medium">개별 업체 진행</th>
                    <th className={`border border-[#222] ${Y} py-3 font-black`}>구해줘창업 올인원 시스템</th>
                  </tr>
                </thead>
                <tbody>
                  {compareRows.map(([k, a, b]) => (
                    <tr key={k}>
                      <th className="border border-[#222] bg-[#f1f1f1] py-3 font-black">{k}</th>
                      <td className="border border-[#222] bg-white py-3">{a}</td>
                      <td className="border border-[#222] bg-[#fff3cf] py-3 font-medium">{b}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* TRUST */}
            <p className="mt-20 font-gmarket text-[1.125rem] font-bold tracking-wide text-[#F0C33F]">TRUST</p>
            <h2 className="mt-5 font-gmarket text-[1.5rem] font-black leading-[1.4] md:text-[2.375rem]">
              구해줘 창업이<br />
              <span className="mt-2 inline-flex items-center gap-3 md:gap-4">지키는 <b className="text-[5rem] font-black leading-none text-[#F0C33F] md:text-[6.5rem]">4</b> 가지 원칙</span>
            </h2>
            <ul className="relative mx-auto mt-10 grid max-w-[77rem] md:grid-cols-2">
              <span aria-hidden className="absolute inset-y-0 left-1/2 hidden w-px bg-white/30 md:block" />
              <span aria-hidden className="absolute inset-x-0 top-1/2 hidden h-px bg-white/30 md:block" />
              {principles.map(([n, t, d]) => (
                <li key={n} className="px-6 py-8 md:py-10">
                  <p className="text-[1rem] font-bold text-[#F0C33F]">{n}</p>
                  <p className="mt-3 font-gmarket text-[1.375rem] font-black md:text-[1.5rem]">{t}</p>
                  <p className="mt-6 lg:whitespace-pre-line text-[0.875rem] leading-[1.7] text-white/80 md:text-[0.9375rem]">{d}</p>
                </li>
              ))}
            </ul>

            {/* Q&A */}
            <h2 className="mt-20 font-gmarket text-[2rem] font-black leading-none text-[#F0C33F] md:text-[3.75rem]">Q&amp;A</h2>
            <p className="mt-6 text-[1.125rem] font-bold md:text-[1.25rem]">창업 전에 가장 많이 궁금해하는 질문</p>
            <p className="mt-1 text-[0.875rem] text-white/80">예비창업자가 자주 묻는 질문을 모았습니다!</p>
            <ul className="mx-auto mt-8 max-w-[77rem] space-y-3 text-left">
              {faqs.map(([q, a]) => (
                <li key={q} className="overflow-hidden rounded-2xl bg-white text-ink">
                  <p className="flex items-center gap-3 bg-[#fdecb0] px-4 py-3 text-[0.9375rem] font-black md:text-[1.0625rem]"><span className="font-gmarket text-[1.5rem] font-black text-[#F0C33F]">Q.</span>{q}</p>
                  <p className="flex items-center gap-3 px-4 py-4 text-[0.875rem] leading-[1.65] md:text-[0.9375rem] text-[#2d2d2d]"><span className="font-gmarket text-[2rem] font-black leading-none">A.</span><span className="lg:whitespace-pre-line">{a}</span></p>
                </li>
              ))}
            </ul>

            {/* 상담 */}
            <div id="consult" className="scroll-mt-24">
              <p className="mt-20 font-gmarket text-[1.125rem] font-bold tracking-wide text-[#F0C33F]">FREE CONSULTAITON</p>
              <h2 className="mt-3 font-gmarket text-[1.5rem] font-black md:text-[2.375rem]">무료 상담으로 창업의 방향을 구체화하세요!</h2>
              <div className="mx-auto mt-10 max-w-[77rem] text-left">
                <ConsultCard title="간편 상담 신청" only="신규창업" wide />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <YoutubePopup />
    </>
  );
}
