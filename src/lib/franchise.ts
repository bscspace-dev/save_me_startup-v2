export type FranchiseInfo = {
  brand: string;
  group: string;
  sector: string;
  eyebrow: string;
  headline: [string, string];
  desc: string;
  area: string;
  place: string;
  opModel: string;
  gallery: { label: string; caption: string; sub: string }[];
  strengths: { title: string; desc: string }[];
  menus: { name: string; desc: string; price: number; badge?: string }[];
  model: { size: string; seats: string; place: string; sales: string; staff: string; hours: string; cook: string };
  revenue: number;
  // 월 예상 순수익 항목은 고정 (표시 이름은 화면에서 통일)
  costs: { material: number; labor: number; rent: number; etc: number };
  profitNote: string;
  basis: string;
  royalty: string;
  startupLeft: { label: string; amount: number }[];
  startupRight: { label: string; amount: number }[];
  startupNote: string;
  // 아래는 가맹본부가 제공한 경우에만 채우는 선택 항목 (없으면 화면에 나오지 않는다)
  sponsored?: boolean; // 유료 홍보 페이지면 true → "광고" 표시
  video?: string; // 브랜드 영상(유튜브 영상 ID)
  facts?: { since: string; stores: number; direct: number; hq: string; opened?: number; closed?: number; disclosure: string }; // 브랜드 현황 (정보공개서 기준)
};

const profitNote = "* 매출과 비용은 가맹점 평균 및 상권 데이터를 바탕으로 한 예상치이며 매장 조건과 운영 방식에 따라 달라질 수 있습니다";
const startupNote = "철거, 전기 증설, 냉난방, 소방, 화장실 공사 등 점포 상태에 따른 공사비와 임대 보증금·월세는 포함되지 않습니다";
const galleryLabels = (caption: string, sub: string) => [
  { label: "매장 전경", caption, sub },
  { label: "홀 좌석", caption: "홀 좌석", sub: "편안한 동선의 좌석 배치" },
  { label: "주방", caption: "주방", sub: "표준화된 조리 동선" },
  { label: "카운터", caption: "카운터", sub: "간편한 주문·결제 시스템" },
  { label: "매장 외관", caption: "매장 외관", sub: "눈에 띄는 간판과 입구" },
];

// 프랜차이즈 매물 id → 브랜드 상세 (임시 샘플 데이터)
export const franchises: Record<number, FranchiseInfo> = {
  10034: {
    brand: "한상담다", group: "외식업", sector: "한식", eyebrow: "KOREAN CASUAL DINING",
    headline: ["한 끼의 기준을 바꾸는", "한상담다"],
    desc: "간편한 조리 시스템과 안정적인 원가율로 초보 점주도 운영하기 쉬운 브랜드입니다",
    area: "전국 주요 상권", place: "주거 · 오피스 복합", opModel: "점주 운영 · 반차동",
    gallery: galleryLabels("매장 전경", "따뜻한 우드톤으로 구성된 메인 홀"),
    strengths: [
      { title: "검증된 회전율", desc: "조리 시간을 7분 이내로 표준화해 피크타임 회전율이 높습니다" },
      { title: "간편한 운영", desc: "핵심 소스를 본사에서 공급해 초보 점주도 일정한 맛을 냅니다" },
      { title: "안정적 원가율", desc: "통합 구매와 계절 메뉴 구성으로 평균 원가율 34%를 유지합니다" },
    ],
    menus: [
      { name: "직화 제육 한상", desc: "불향을 입힌 제육과 5가지 반찬 구성", price: 12000, badge: "BEST" },
      { name: "들기름 막국수", desc: "메밀면과 특제 들기름 소스", price: 10000 },
      { name: "한우 된장 전골", desc: "2인 기준 시그니처 저녁 메뉴", price: 28000, badge: "DINNER" },
    ],
    model: { size: "15~25평", seats: "24~36석", place: "주거·오피스", sales: "5,000~6,500만원", staff: "점주 1명 + 직원 2명", hours: "11:00 – 22:00", cook: "주문 후 약 7분" },
    revenue: 6200,
    costs: { material: 2108, labor: 1116, rent: 310, etc: 806 },
    profitNote, basis: "20평 표준 매장", royalty: "로열티 월 매출의 2%",
    startupLeft: [{ label: "가맹비", amount: 1100 }, { label: "인테리어", amount: 4600 }, { label: "간판·사인물", amount: 900 }, { label: "POS·키오스크", amount: 750 }, { label: "별도 공사 예비비", amount: 1250 }],
    startupRight: [{ label: "교육비", amount: 550 }, { label: "주방·설비", amount: 4200 }, { label: "초도 물품", amount: 650 }, { label: "본사 보증금", amount: 500 }],
    startupNote,
  },
  10022: {
    brand: "로스트노트 커피", group: "외식업", sector: "카페", eyebrow: "SPECIALTY COFFEE",
    headline: ["매일 마시고 싶은 한 잔,", "로스트노트"],
    desc: "자체 로스팅 원두와 간소화된 매장 운영 시스템으로 안정적인 매출을 만드는 카페 브랜드입니다",
    area: "대구·경북 우선 모집", place: "오피스 · 대로변", opModel: "점주 운영 · 반오토",
    gallery: galleryLabels("매장 전경", "자연광이 드는 밝은 카페 홀"),
    strengths: [
      { title: "자체 로스팅 원두", desc: "본사 로스터리에서 매주 신선한 원두를 직접 공급합니다" },
      { title: "소수 인원 운영", desc: "자동화 장비 구성으로 2명 안팎의 인원이 운영 가능합니다" },
      { title: "높은 재방문율", desc: "구독형 멤버십과 시즌 메뉴로 단골 비중이 높습니다" },
    ],
    menus: [
      { name: "시그니처 라떼", desc: "로스트노트 블렌드 에스프레소 베이스", price: 5500, badge: "BEST" },
      { name: "싱글오리진 핸드드립", desc: "매주 바뀌는 산지별 원두", price: 7000 },
      { name: "크루아상 샌드", desc: "브런치 인기 세트 메뉴", price: 9500, badge: "SET" },
    ],
    model: { size: "15~22평", seats: "20~30석", place: "오피스·대로변", sales: "6,500~8,500만원", staff: "점주 1명 + 직원 1명", hours: "08:00 – 21:00", cook: "주문 후 약 3분" },
    revenue: 7800,
    costs: { material: 2340, labor: 1560, rent: 620, etc: 780 },
    profitNote, basis: "18평 표준 매장", royalty: "로열티 월 매출의 3%",
    startupLeft: [{ label: "가맹비", amount: 1500 }, { label: "인테리어", amount: 5200 }, { label: "간판·사인물", amount: 800 }, { label: "POS·키오스크", amount: 600 }, { label: "별도 공사 예비비", amount: 900 }],
    startupRight: [{ label: "교육비", amount: 400 }, { label: "주방·설비", amount: 3600 }, { label: "초도 물품", amount: 500 }, { label: "본사 보증금", amount: 500 }],
    startupNote,
  },
  10018: {
    brand: "온기 도시락", group: "외식업", sector: "한식", eyebrow: "DAILY LUNCHBOX",
    headline: ["집밥처럼 든든한 한 끼,", "온기 도시락"],
    desc: "배달·포장 중심의 소형 매장 모델로 적은 인원과 낮은 임대 부담으로 운영하는 브랜드입니다",
    area: "수도권·대구 주요 상권", place: "주택가 · 오피스", opModel: "점주 운영 · 포장 중심",
    gallery: galleryLabels("매장 전경", "포장 중심의 깔끔한 소형 매장"),
    strengths: [
      { title: "낮은 초기 부담", desc: "소형 평수와 간단한 설비로 창업비를 낮췄습니다" },
      { title: "배달 최적화", desc: "주방 동선과 포장 규격을 표준화해 주문 처리가 빠릅니다" },
      { title: "점심 시간대 집중", desc: "오피스 점심 수요 중심으로 짧은 영업시간에도 매출이 안정적입니다" },
    ],
    menus: [
      { name: "제육 도시락", desc: "매콤 달콤 제육과 3가지 반찬", price: 7500, badge: "BEST" },
      { name: "소불고기 도시락", desc: "국산 채소를 곁들인 불고기 구성", price: 8500 },
      { name: "가족 세트", desc: "3~4인 기준 반찬 구성 세트", price: 24000, badge: "SET" },
    ],
    model: { size: "8~12평", seats: "6~10석", place: "주택가·오피스", sales: "4,500~5,800만원", staff: "점주 1명 + 직원 1명", hours: "10:00 – 20:00", cook: "주문 후 약 5분" },
    revenue: 5400,
    costs: { material: 1890, labor: 1080, rent: 380, etc: 540 },
    profitNote, basis: "10평 표준 매장", royalty: "로열티 월 매출의 2%",
    startupLeft: [{ label: "가맹비", amount: 1000 }, { label: "인테리어", amount: 3200 }, { label: "간판·사인물", amount: 600 }, { label: "POS·키오스크", amount: 500 }, { label: "별도 공사 예비비", amount: 500 }],
    startupRight: [{ label: "교육비", amount: 400 }, { label: "주방·설비", amount: 1500 }, { label: "초도 물품", amount: 300 }, { label: "본사 보증금", amount: 500 }],
    startupNote,
  },
};
