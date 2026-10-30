import type { Costs } from "@/components/DetailParts";

export type ShopInfo = {
  address: string;
  buildingType: string;
  floor: string;
  shortType: string;
  headline: [string, string];
  desc: string;
  direction: string;
  parking: string;
  approved: string;
  moveIn: string;
  point: string;
  deposit: number;
  rent: number;
  maintenance: number;
  premium: number;
  features: string[];
  operation: string;
  hours: string;
  closed: string;
  years: string;
  sales: number[];
  revenue: number;
  costs: Costs;
  operatorNote: string;
};

export const GALLERY = [
  { label: "매장 전경", caption: "매장 전경", sub: "대로변에서 바로 보이는 전면" },
  { label: "내부", caption: "내부", sub: "깔끔하게 유지된 매장 내부" },
  { label: "전면 도로", caption: "전면 도로", sub: "유동 인구가 많은 대로변" },
  { label: "주변 상권", caption: "주변 상권", sub: "도보 이용객이 많은 상권" },
  { label: "내부 구조", caption: "내부 구조", sub: "효율적인 동선의 평면" },
];

const salesMonths = ["5월", "6월", "7월", "8월", "9월", "10월"];
export { salesMonths };

// 상가매물 id → 상세 정보 (임시 샘플 데이터)
export const shops: Record<number, ShopInfo> = {
  10032: {
    address: "대구 중구 남산동", buildingType: "제2종 근린생활시설", floor: "1층 / 총 5층", shortType: "1층 근린상가",
    headline: ["역세권에서 바로 보이는", "1층 코너 상가"],
    desc: "역세권 주거·오피스 복합 상권에 위치해 평일과 주말 유동이 안정적입니다. 코너라 노출이 좋고 간판 활용이 쉽습니다.",
    direction: "주 출입구 기준 남동향", parking: "건물 공용 8대", approved: "2016년 3월 4일", moveIn: "협의 후 즉시 가능",
    point: "지하철역 도보 3분 · 대단지 아파트 1,800세대 배후 · 코너 전면 약 7m · 평일 점심 유동 풍부",
    deposit: 3000, rent: 220, maintenance: 25, premium: 4000,
    features: ["천장형 냉난방기 2대", "도시가스 인입", "전기 20kW", "전용 화장실", "급배수 시설"],
    operation: "1인 운영 + 파트 1명", hours: "10:00 – 21:00", closed: "매주 일요일", years: "2년 4개월",
    sales: [5000, 5200, 5400, 5500, 5700, 5800], revenue: 5800,
    costs: { material: 1740, labor: 580, rent: 245, etc: 1160 },
    operatorNote: "1인 운영 + 파트 1명 기준",
  },
  10031: {
    address: "대구 달서구 상인동", buildingType: "제2종 근린생활시설", floor: "1층 / 총 4층", shortType: "대로변 대형 상가",
    headline: ["대로변에 크게 보이는", "대형 1층 상가"],
    desc: "대로변 전면이 넓고 주차 공간이 넉넉한 대형 상가입니다. 고매출 업종을 운영하기에 적합한 입지입니다.",
    direction: "주 출입구 기준 남향", parking: "전용 12대", approved: "2014년 9월 22일", moveIn: "협의 후 가능",
    point: "대로변 전면 약 14m · 인근 학원가 · 주차 12대 확보 · 주말 가족 단위 방문 많음",
    deposit: 10000, rent: 650, maintenance: 70, premium: 20000,
    features: ["시스템 냉난방기 4대", "도시가스 인입", "전기 40kW", "전용 화장실 2개", "급배수 시설", "외부 간판 자리"],
    operation: "점주 + 직원 3명", hours: "09:00 – 22:00", closed: "연중무휴", years: "4년 1개월",
    sales: [12800, 13200, 13600, 14000, 14300, 14800], revenue: 14800,
    costs: { material: 4440, labor: 3330, rent: 720, etc: 2220 },
    operatorNote: "점주 + 직원 3명 기준",
  },
  10028: {
    address: "대구 남구 대명동", buildingType: "제1종 근린생활시설", floor: "1층 / 총 3층", shortType: "주택가 1층 상가",
    headline: ["단골이 이어지는", "주택가 1층 상가"],
    desc: "주택가 중심 상권으로 점심 장사 위주의 안정적인 매출이 나오는 매장입니다.",
    direction: "주 출입구 기준 서향", parking: "건물 공용 3대", approved: "2010년 5월 12일", moveIn: "협의 후 가능",
    point: "인근 오피스 점심 수요 · 주택가 배후 · 도보 5분 이내 지하철 · 단골 비중 높음",
    deposit: 3000, rent: 180, maintenance: 20, premium: 3000,
    features: ["천장형 냉난방기 1대", "도시가스 인입", "전기 15kW", "전용 화장실", "덕트 시설"],
    operation: "부부 운영", hours: "10:30 – 20:00", closed: "매주 일요일", years: "5년 2개월",
    sales: [4600, 4800, 5000, 5000, 5100, 5200], revenue: 5200,
    costs: { material: 1820, labor: 0, rent: 200, etc: 1040 },
    operatorNote: "부부 직접 운영 기준",
  },
  10025: {
    address: "대구 달성군 다사읍", buildingType: "제2종 근린생활시설", floor: "1층 / 총 3층", shortType: "코너 상가",
    headline: ["월세 부담을 낮춘", "즉시 인수 코너 상가"],
    desc: "월세 부담이 낮고 시설 상태가 좋아 바로 영업을 시작하기 좋은 코너 상가입니다.",
    direction: "주 출입구 기준 동향", parking: "건물 공용 6대", approved: "2018년 11월 2일", moveIn: "즉시 가능",
    point: "신축 아파트 단지 인접 · 코너 입지 · 자동차 접근성 우수 · 주변 경쟁 점포 적음",
    deposit: 5000, rent: 120, maintenance: 15, premium: 10500,
    features: ["시스템 냉난방기 2대", "도시가스 인입", "전기 25kW", "전용 화장실", "급배수 시설", "외부 간판 자리"],
    operation: "점주 운영 + 파트 2명", hours: "10:00 – 22:00", closed: "매주 월요일", years: "2년 8개월",
    sales: [6200, 6400, 6500, 6700, 6800, 7000], revenue: 7000,
    costs: { material: 2100, labor: 840, rent: 135, etc: 1400 },
    operatorNote: "점주 운영 + 파트 2명 기준",
  },
  10021: {
    address: "대구 중구 동성로", buildingType: "제2종 근린생활시설", floor: "1층 / 총 6층", shortType: "소형 1층 상가",
    headline: ["입지 좋은", "소형 1층 상가"],
    desc: "도심 보행자 통행이 많은 입지의 소형 매장입니다. 시설 상태가 양호해 추가 공사 부담이 적습니다.",
    direction: "주 출입구 기준 북향", parking: "인근 공영주차장", approved: "2012년 7월 30일", moveIn: "협의 후 가능",
    point: "도심 보행 상권 · 지하철역 도보 4분 · 주말 유동 풍부 · 소형 평수로 운영 부담 낮음",
    deposit: 2000, rent: 150, maintenance: 15, premium: 3000,
    features: ["천장형 냉난방기 1대", "도시가스 인입", "전기 12kW", "급배수 시설"],
    operation: "1인 운영", hours: "11:00 – 21:00", closed: "연중무휴", years: "1년 11개월",
    sales: [3400, 3500, 3700, 3800, 3900, 4000], revenue: 4000,
    costs: { material: 1400, labor: 0, rent: 165, etc: 800 },
    operatorNote: "1인 직접 운영 기준",
  },
};
