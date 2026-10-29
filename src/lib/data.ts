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

export const newListings = [
  { img: "new-1", tag: "전수창업", meta: "수성구 · 한식", title: "골목 안 작은 국밥집", info: "약 33㎡ · 단골 고객 보유 · 레시피 전수", price: "전수비 협의" },
  { img: "new-2", tag: "상가매물", meta: "달서구 · 카페 · 음료", title: "대로변 1층 테이크아웃 자리", info: "약 26㎡ · 즉시 입점 가능 · 인테리어 협의", price: "보증금·월세 협의" },
  { img: "new-3", tag: "전수창업", meta: "북구 · 베이커리", title: "주택가 소형 베이커리", info: "약 40㎡ · 오븐·장비 일부 포함 · 레시피 전수", price: "전수비 협의" },
] as const;

export type Listing = {
  id: number; price: number; title: string; region: string; category: string;
  op: "직접운영" | "반오토" | "풀오토"; cost: number; area: number;
  rec?: boolean; isNew?: boolean; sold?: boolean; views: number; kind: string;
};

export const listings: Listing[] = [
  { id: 10036, price: 15000, title: "점주님은 정성껏 운영하셨고 단골이 많습니다", region: "달서구", category: "카페·음료", op: "직접운영", cost: 8000, area: 33, isNew: true, views: 120, kind: "전수창업" },
  { id: 10035, price: 15000, title: "직접 운영으로 월 1,000만원을 목표로 하는 분께", region: "수성구", category: "카페·음료", op: "반오토", cost: 9000, area: 26, isNew: true, views: 98, kind: "전수창업" },
  { id: 10034, price: 7000, title: "주4일, 오후 1시반 퇴근하는 여유로운 운영", region: "수성구", category: "프랜차이즈", op: "반오토", cost: 6000, area: 30, rec: true, views: 210, kind: "프랜차이즈" },
  { id: 10033, price: 19000, title: "월 순수익 약 800만원 이상, 직접 제빵하면 더 높아요", region: "북구", category: "베이커리·디저트", op: "직접운영", cost: 12000, area: 40, rec: true, views: 180, kind: "전수창업" },
  { id: 10032, price: 7000, title: "역세권 1층 코너, 월 순수익 약 600만원", region: "중구", category: "카페·음료", op: "직접운영", cost: 7000, area: 28, views: 75, kind: "상가매물" },
  { id: 10031, price: 30000, title: "고매출 매장 찾으셨다면, 대로변 대형 매장", region: "달서구", category: "카페·음료", op: "풀오토", cost: 15000, area: 66, views: 260, kind: "상가매물" },
  { id: 10030, price: 8000, title: "단골 위주 국밥집, 레시피 전수 가능", region: "동구", category: "한식·분식", op: "직접운영", cost: 5000, area: 36, views: 64, kind: "전수창업" },
  { id: 10029, price: 6500, title: "직접 운영·인력 효율화로 순수익 극대화", region: "서구", category: "카페·음료", op: "직접운영", cost: 6500, area: 24, views: 52, kind: "전수창업" },
  { id: 10028, price: 6000, title: "월평균 매출 5,000만원, 점심 장사 위주", region: "남구", category: "한식·분식", op: "직접운영", cost: 4500, area: 33, views: 88, kind: "상가매물" },
  { id: 10025, price: 15500, title: "월세 120만원대, 즉시 인수 가능한 코너 매장", region: "달성군", category: "카페·음료", op: "풀오토", cost: 9500, area: 45, views: 140, kind: "상가매물" },
  { id: 10024, price: 3000, title: "주 5일 · 하루 6시간 근무 가능한 소형 매장", region: "달서구", category: "카페·음료", op: "반오토", cost: 3500, area: 20, views: 71, kind: "전수창업" },
  { id: 10023, price: 15000, title: "매출은 갖췄습니다, 운영을 다듬을 차례", region: "수성구", category: "베이커리·디저트", op: "직접운영", cost: 11000, area: 42, views: 105, kind: "전수창업" },
  { id: 10022, price: 25000, title: "주차 약 10대 확보, 월평균 매출 안정", region: "수성구", category: "프랜차이즈", op: "직접운영", cost: 14000, area: 50, rec: true, views: 230, kind: "프랜차이즈" },
  { id: 10021, price: 5000, title: "입지 좋은 소형 매장, 시설 상태 양호", region: "중구", category: "카페·음료", op: "풀오토", cost: 5500, area: 22, views: 59, kind: "상가매물" },
  { id: 10020, price: 18000, title: "대로변 베이커리 매장, 시설 일체 인수", region: "북구", category: "베이커리·디저트", op: "직접운영", cost: 10000, area: 38, sold: true, views: 160, kind: "전수창업" },
  { id: 10018, price: 10000, title: "수성구 코너 상권, 월 매출 안정적", region: "수성구", category: "프랜차이즈", op: "직접운영", cost: 8500, area: 35, sold: true, views: 99, kind: "프랜차이즈" },
];
