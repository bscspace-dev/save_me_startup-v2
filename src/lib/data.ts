import type { ShopInfo } from "./shop";

export const regions = [
  ["중구", 32], ["동구", 58], ["서구", 41], ["남구", 29], ["북구", 67],
  ["수성구", 84], ["달서구", 93], ["달성군", 36], ["군위군", 32],
] as const;

// 업종 목록 (관리자 등록 화면과 매물 목록 필터에서 함께 쓴다). 마지막 "기타 업종"은 목록에 없는 업종을 모두 묶는다
export const businessCategories = ["한식·분식", "카페·음료", "베이커리·디저트", "치킨·피자", "주점·호프", "고기·구이", "일식·중식", "아이스크림·간식", "기타 업종"];

// 메인 "어떤 창업을 찾고 계신가요?" 카드. tag 는 눌렀을 때 열리는 매물 목록 유형, img 는 public/categories/ 의 3D 아이콘
export const categories = [
  { tag: "프랜차이즈", en: "FRANCHISE", title: "프랜차이즈 창업", desc: "검증된 브랜드와 가맹 시스템을 비교하고 빠르게 시작해보세요", foot: "가맹 매물 다수", img: "/categories/franchise-2.png" },
  { tag: "상가매물", en: "STORE", title: "점포 찾기", desc: "지역 · 보증금 · 월세 · 면적 등 원하는 조건의 점포를 확인해보세요", foot: "전 지역 매물 확인", img: "/categories/store-2.png" },
  { tag: "전수창업", en: "TRANSFER", title: "전수창업", desc: "기존 매장의 운영 노하우와 시설을 이어받아 안정적으로 준비하세요", foot: "한식·카페·베이커리 다수", img: "/categories/transfer-2.png" },
  { tag: "신규창업", en: "NEW BUSINESS", title: "신규창업", desc: "업종 선택부터 브랜딩, 공간설계까지 처음부터 확실하게 준비합니다", foot: "초보 창업자 맞춤 안내", img: "/categories/newbiz-2.png" },
] as const;

export type Listing = {
  id: number; price: number; title: string; region: string; category: string;
  op: "직접운영" | "반오토" | "풀오토"; cost: number; area: number;
  date?: string; photos?: number; rec?: boolean; isNew?: boolean; sold?: boolean; hidden?: boolean; needsReview?: boolean; views: number; kind: string;
  // 관리자에서 등록한 매물(Supabase)만 가진다: 목록용 작은 이미지와 상세 정보
  thumb?: string; shop?: ShopInfo; promo?: Promo; startup?: Startup; transfer?: TransferData;
};

// 신규창업(창업컨설팅 상가): 소개 글과, 구해줘창업이 진행한 컨설팅 항목 (관리자에서 등록)
export type Startup = { story: string; done: string[]; address?: string };

// 전수창업: 사부(전수자) 정보. 나머지 상세 문구는 업종별 기본 문구로 만든다 (관리자에서 등록)
export type TransferData = { name: string; store: string; years: number; days: number; menus: number; address?: string; career?: string; timeline?: [string, string][]; menuNames?: string[]; menuPhotos?: number; detailPhotos?: number; menuDesc?: string };

// 프랜차이즈 홍보 매물: 가맹본부가 준 홍보 이미지를 상세에 그대로 보여준다 (관리자에서 등록)
export type Promo = { brand: string; desc: string; area?: string; sponsored?: boolean };

// 사진: public/listings/<매물번호>/1.jpg, 2.jpg … 에 넣고 photos 에 장수를 적는다
// 최근 등록순: 등록일(date)이 늦은 순, 같은 날이면 매물번호가 큰 순 (등록일이 없으면 가장 뒤)
export const byNewest = (a: { date?: string; id: number }, b: { date?: string; id: number }) => (b.date ?? "").localeCompare(a.date ?? "") || b.id - a.id;

export const photoSrc = (id: number, n: number) => `/listings/${id}/${n}.jpg`;

export const listings: Listing[] = []; // 매물은 관리자에서 등록한 것만 표시한다 (DB)

export type Brand = { name: string; category: string; cost: string; ops: string[]; desc: string; area: string };

export const brands: Brand[] = [
  { name: "단골국밥", category: "한식·분식", cost: "5천만~1억", ops: ["직접운영", "반오토"], desc: "25년 단골 기반 국밥 노하우와 육수 레시피를 그대로 전수합니다", area: "소형 · 약 33㎡~" },
  { name: "골목분식", category: "한식·분식", cost: "5천만 미만", ops: ["직접운영"], desc: "소자본으로 시작하는 분식 전수창업. 메뉴 구성부터 원가 관리까지 교육합니다", area: "소형 · 약 20㎡~" },
  { name: "온기 도시락", category: "한식·분식", cost: "5천만 미만", ops: ["직접운영", "반오토"], desc: "배달·포장 중심 도시락 모델. 주방 동선과 운영 매뉴얼을 전수합니다", area: "소형 · 약 16㎡~" },
  { name: "로스트노트 커피", category: "카페·음료", cost: "5천만~1억", ops: ["직접운영", "반오토", "풀오토"], desc: "원두 선정부터 메뉴 개발, 매장 운영까지 한 번에 배우는 카페 전수창업", area: "중형 · 약 26㎡~" },
  { name: "담소 카페", category: "카페·음료", cost: "1억~2억", ops: ["반오토", "풀오토"], desc: "인력 효율화에 초점을 맞춘 운영 시스템으로 소수 인원 운영이 가능합니다", area: "중형 · 약 40㎡~" },
  { name: "온기 베이커리", category: "베이커리·디저트", cost: "1억~2억", ops: ["직접운영"], desc: "인기 제빵 레시피와 오븐 운영 노하우, 단골 관리 방식을 전수합니다", area: "중형 · 약 40㎡~" },
  { name: "달콤상점", category: "베이커리·디저트", cost: "5천만~1억", ops: ["직접운영", "반오토"], desc: "소규모 디저트 전문점. 시즌 메뉴 개발 가이드와 포장 노하우를 제공합니다", area: "소형 · 약 23㎡~" },
  { name: "숯불한끼", category: "기타 업종", cost: "2억 이상", ops: ["직접운영", "풀오토"], desc: "점심·저녁 모두 강한 고깃집 모델. 매장 설계와 인력 운영 교육까지 지원합니다", area: "대형 · 약 66㎡~" },
];

// 유형별 뱃지 색상 (업종별 창업 카드와 동일)
export const kindBadge: Record<string, string> = {
  프랜차이즈: "bg-brand",
  상가매물: "bg-emerald-700",
  전수창업: "bg-[#7a4a2b]",
  신규창업: "bg-blue-700",
};

// NEW 표시는 매물번호가 가장 큰(최근 등록) 3건에만 붙인다
export const withNew = (list: Listing[]): Listing[] => {
  const top = new Set([...list].sort((a, b) => b.id - a.id).slice(0, 3).map((l) => l.id));
  return list.map((l) => ({ ...l, isNew: top.has(l.id) }));
};

export const won = (v: number) => {
  const eok = Math.floor(v / 10000);
  const man = v % 10000;
  return [eok ? `${eok}억` : "", man ? `${man.toLocaleString()}만` : ""].filter(Boolean).join(" ");
};

// 창업비용 표기: 금액을 알 수 없어 0으로 등록한 경우 "본사와 협의"
export const costText = (v: number) => (v > 0 ? `약 ${won(v)}원` : "본사와 협의");
