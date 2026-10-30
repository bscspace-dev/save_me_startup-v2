export const regions = [
  ["중구", 32], ["동구", 58], ["서구", 41], ["남구", 29], ["북구", 67],
  ["수성구", 84], ["달서구", 93], ["달성군", 36], ["군위군", 32],
] as const;

export const categories = [
  { tag: "프랜차이즈", icon: "store", title: "프랜차이즈 창업", desc: "검증된 브랜드로 빠르게 시작. 본사 지원 시스템과 가맹 조건을 한눈에 비교해보세요.", foot: "대구 지역 가맹 매물 다수", img: "cat-1", tone: "brand" },
  { tag: "상가매물", icon: "pin", title: "상가매물", desc: "대구 전 지역 상가 매물 정보. 위치·면적·보증금·월세 조건을 투명하게 공개합니다.", foot: "대구 9개 구·군 전체", img: "cat-2", tone: "green" },
  { tag: "전수창업", icon: "bag", title: "전수창업", desc: "기존 가게의 레시피·운영 노하우를 배워 내 사업에 적용. 전문 컨설팅으로 함께 준비합니다.", foot: "한식·카페·베이커리 다수", img: "cat-3", tone: "brown" },
  { tag: "신규창업", icon: "spark", title: "신규창업", desc: "처음 창업하는 분들을 위한 단계별 안내. 업종 선택부터 오픈까지 전 과정을 함께합니다.", foot: "초보 창업자 맞춤 안내", img: "cat-4", tone: "blue" },
] as const;

export type Listing = {
  id: number; price: number; title: string; region: string; category: string;
  op: "직접운영" | "반오토" | "풀오토"; cost: number; area: number;
  date?: string; photos?: number; rec?: boolean; isNew?: boolean; sold?: boolean; views: number; kind: string;
};

// 사진: public/listings/<매물번호>/1.jpg, 2.jpg … 에 넣고 photos 에 장수를 적는다
export const photoSrc = (id: number, n: number) => `/listings/${id}/${n}.jpg`;

export const listings: Listing[] = [
  { id: 10036, price: 15000, title: "점주님은 정성껏 운영하셨고 단골이 많습니다", region: "달서구", category: "카페·음료", op: "직접운영", cost: 8000, area: 33, isNew: true, views: 120, kind: "전수창업" },
  { id: 10035, price: 15000, title: "직접 운영으로 월 1,000만원을 목표로 하는 분께", region: "수성구", category: "카페·음료", op: "반오토", cost: 9000, area: 26, isNew: true, views: 98, kind: "전수창업" },
  { id: 10034, price: 7000, title: "주4일, 오후 1시반 퇴근하는 여유로운 운영", region: "수성구", category: "프랜차이즈", op: "반오토", cost: 6000, area: 30, rec: true, views: 210, kind: "프랜차이즈" },
  { id: 10033, price: 19000, title: "월 순수익 약 800만원 이상, 직접 제빵하면 더 높아요", region: "북구", category: "베이커리·디저트", op: "직접운영", cost: 12000, area: 40, rec: true, views: 180, kind: "전수창업" },
  { id: 10032, price: 3000, title: "황금역 역세권 전면 통유리 무권리 신축 상가", region: "수성구", category: "기타 업종", op: "직접운영", cost: 3000, area: 114.94, date: "2026-10-30", photos: 1, isNew: true, views: 0, kind: "상가매물" },
  { id: 10031, price: 2000, title: "북구 태전동 1층 무권리 상가", region: "북구", category: "기타 업종", op: "직접운영", cost: 2000, area: 59.5, date: "2026-10-30", photos: 3, isNew: true, views: 0, kind: "상가매물" },
  { id: 10030, price: 8000, title: "단골 위주 국밥집, 레시피 전수 가능", region: "동구", category: "한식·분식", op: "직접운영", cost: 5000, area: 36, views: 64, kind: "전수창업" },
  { id: 10029, price: 6500, title: "직접 운영·인력 효율화로 순수익 극대화", region: "서구", category: "카페·음료", op: "직접운영", cost: 6500, area: 24, views: 52, kind: "전수창업" },
  { id: 10028, price: 2000, title: "북구 고성동2가 5층 무권리 상가", region: "북구", category: "기타 업종", op: "직접운영", cost: 2000, area: 95.4, date: "2026-10-30", photos: 4, isNew: true, views: 0, kind: "상가매물" },
  { id: 10025, price: 3500, title: "서구 평리동 1층 무권리 상가 (시스템에어컨 포함)", region: "서구", category: "기타 업종", op: "직접운영", cost: 3500, area: 66, date: "2026-10-30", photos: 3, isNew: true, views: 0, kind: "상가매물" },
  { id: 10024, price: 3000, title: "주 5일 · 하루 6시간 근무 가능한 소형 매장", region: "달서구", category: "카페·음료", op: "반오토", cost: 3500, area: 20, views: 71, kind: "전수창업" },
  { id: 10023, price: 15000, title: "매출은 갖췄습니다, 운영을 다듬을 차례", region: "수성구", category: "베이커리·디저트", op: "직접운영", cost: 11000, area: 42, views: 105, kind: "전수창업" },
  { id: 10022, price: 25000, title: "주차 약 10대 확보, 월평균 매출 안정", region: "수성구", category: "프랜차이즈", op: "직접운영", cost: 14000, area: 50, rec: true, views: 230, kind: "프랜차이즈" },
  { id: 10021, price: 5500, title: "북구 동천동 1층 상가 (권리금 문의)", region: "북구", category: "기타 업종", op: "직접운영", cost: 5500, area: 66.11, date: "2026-10-30", photos: 3, isNew: true, views: 0, kind: "상가매물" },
  { id: 10020, price: 18000, title: "대로변 베이커리 매장, 시설 일체 인수", region: "북구", category: "베이커리·디저트", op: "직접운영", cost: 10000, area: 38, sold: true, views: 160, kind: "전수창업" },
  { id: 10018, price: 10000, title: "수성구 코너 상권, 월 매출 안정적", region: "수성구", category: "프랜차이즈", op: "직접운영", cost: 8500, area: 35, sold: true, views: 99, kind: "프랜차이즈" },
  { id: 10040, price: 4000, title: "처음 창업하는 분께 추천, 소자본 소형 카페 자리", region: "중구", category: "카페·음료", op: "직접운영", cost: 4000, area: 20, isNew: true, views: 83, kind: "신규창업" },
  { id: 10039, price: 6000, title: "오픈 전 상권 분석과 인테리어 상담 포함", region: "수성구", category: "한식·분식", op: "반오토", cost: 7000, area: 30, isNew: true, views: 67, kind: "신규창업" },
  { id: 10038, price: 9000, title: "주택가 신규 오픈 베이커리 자리, 장비 일부 보유", region: "북구", category: "베이커리·디저트", op: "직접운영", cost: 9000, area: 36, views: 54, kind: "신규창업" },
];

export type Brand = { name: string; category: string; cost: string; ops: string[]; desc: string; area: string };

export const brands: Brand[] = [
  { name: "단골국밥", category: "한식·분식", cost: "5천만~1억", ops: ["직접운영", "반오토"], desc: "25년 단골 기반 국밥 노하우와 육수 레시피를 그대로 전수합니다.", area: "소형 · 약 33㎡~" },
  { name: "골목분식", category: "한식·분식", cost: "5천만 미만", ops: ["직접운영"], desc: "소자본으로 시작하는 분식 전수창업. 메뉴 구성부터 원가 관리까지 교육합니다.", area: "소형 · 약 20㎡~" },
  { name: "온기 도시락", category: "한식·분식", cost: "5천만 미만", ops: ["직접운영", "반오토"], desc: "배달·포장 중심 도시락 모델. 주방 동선과 운영 매뉴얼을 전수합니다.", area: "소형 · 약 16㎡~" },
  { name: "로스트노트 커피", category: "카페·음료", cost: "5천만~1억", ops: ["직접운영", "반오토", "풀오토"], desc: "원두 선정부터 메뉴 개발, 매장 운영까지 한 번에 배우는 카페 전수창업.", area: "중형 · 약 26㎡~" },
  { name: "담소 카페", category: "카페·음료", cost: "1억~2억", ops: ["반오토", "풀오토"], desc: "인력 효율화에 초점을 맞춘 운영 시스템으로 소수 인원 운영이 가능합니다.", area: "중형 · 약 40㎡~" },
  { name: "온기 베이커리", category: "베이커리·디저트", cost: "1억~2억", ops: ["직접운영"], desc: "인기 제빵 레시피와 오븐 운영 노하우, 단골 관리 방식을 전수합니다.", area: "중형 · 약 40㎡~" },
  { name: "달콤상점", category: "베이커리·디저트", cost: "5천만~1억", ops: ["직접운영", "반오토"], desc: "소규모 디저트 전문점. 시즌 메뉴 개발 가이드와 포장 노하우를 제공합니다.", area: "소형 · 약 23㎡~" },
  { name: "숯불한끼", category: "기타 업종", cost: "2억 이상", ops: ["직접운영", "풀오토"], desc: "점심·저녁 모두 강한 고깃집 모델. 매장 설계와 인력 운영 교육까지 지원합니다.", area: "대형 · 약 66㎡~" },
];

// 유형별 뱃지 색상 (업종별 창업 카드와 동일)
export const kindBadge: Record<string, string> = {
  프랜차이즈: "bg-brand",
  상가매물: "bg-emerald-700",
  전수창업: "bg-[#7a4a2b]",
  신규창업: "bg-blue-700",
};

export const won = (v: number) => {
  const eok = Math.floor(v / 10000);
  const man = v % 10000;
  return [eok ? `${eok}억` : "", man ? `${man.toLocaleString()}만` : ""].filter(Boolean).join(" ");
};
