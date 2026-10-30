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
  // 공실 매물: 운영·매출 항목을 숨기고 아래 항목을 보여준다
  premiumLabel?: string; // 권리금 금액 대신 보여줄 문구 (예: "문의")
  rentNote?: string;
  maintenanceLabel?: string; // 관리비가 0원일 때 표시할 문구 (없으면 "매월 변동")
  vacant?: boolean;
  currentUse?: string;
  recommended?: string;
  maintenanceNote?: string;
  extraInfo?: [string, string][];
  gallery?: { label: string; caption: string; sub: string }[];
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
    address: "대구 수성구 두산동", buildingType: "소매점 (1·2종 근린생활시설 구분 없음)", floor: "지상 4층 / 총 지상 4층", shortType: "4층 전면 통유리 상가",
    headline: ["황금역 역세권", "전면 통유리 무권리 상가"],
    desc: "황금역 역세권에 위치한 2024년 준공 신축 건물 4층 상가입니다. 전면 통유리로 채광과 전망이 좋고 권리금 없이 즉시 입주할 수 있습니다.",
    direction: "동향 (주출입구 기준)", parking: "건물 전체 공동주차 5대 가능", approved: "2024년 5월 30일", moveIn: "즉시 입주",
    point: "황금역 역세권 · 2024년 준공 신축 · 전면 통유리 · 무권리 · 화장실 2개",
    deposit: 3000, rent: 180, maintenance: 15, premium: 0,
    features: ["전면 통유리", "신축(2024년 준공)", "화장실 2개", "공동주차 5대"],
    operation: "", hours: "", closed: "", years: "", sales: [], revenue: 0,
    costs: { material: 0, labor: 0, rent: 0, etc: 0 }, operatorNote: "",
    vacant: true, currentUse: "공실", recommended: "다용도",
    maintenanceNote: "일반관리비 약 15만원 (전기세·수도세는 실사용량에 따라 별도 부과)",
    extraInfo: [["거래 형태", "상가임대"], ["지목", "대"], ["방 · 화장실", "방 0개 · 화장실 2개"], ["공급면적", "전용면적과 동일"]],
    gallery: [{ label: "전경", caption: "", sub: "" }],
  },
  10031: {
    address: "대구 북구 태전동", buildingType: "제2종 근린생활시설", floor: "1층 / 총 3층", shortType: "1층 상가",
    headline: ["북구 태전동", "1층 무권리 상가"],
    desc: "대구 북구 태전동에 위치한 1층 상가로 권리금 없이 즉시 입주할 수 있습니다. 2017년 준공 건물이며 주차는 협의가 가능합니다.",
    direction: "서향 (주출입구 기준)", parking: "총 2대 중 협의", approved: "2017년 7월 3일", moveIn: "즉시 입주",
    point: "무권리 · 즉시 입주 · 2017년 준공 · 1층 상가",
    deposit: 2000, rent: 100, maintenance: 0, premium: 0, rentNote: "부가세 별도",
    features: [],
    operation: "", hours: "", closed: "", years: "", sales: [], revenue: 0,
    costs: { material: 0, labor: 0, rent: 0, etc: 0 }, operatorNote: "",
    vacant: true, currentUse: "", recommended: "", maintenanceNote: "매월 변동",
    extraInfo: [["거래 형태", "임대"], ["지목", ""], ["방 · 화장실", ""], ["공급면적", "전용면적과 동일"]],
    gallery: [{ label: "전경", caption: "", sub: "" }],
  },
  10028: {
    address: "대구 북구 고성동2가", buildingType: "제2종 근린생활시설", floor: "5층 / 총 5층", shortType: "5층 상가",
    headline: ["북구 고성동2가", "5층 무권리 상가"],
    desc: "대구 북구 고성동2가 총 5층 건물의 5층(옥상 포함) 상가로 권리금 없이 즉시 입주할 수 있습니다. 2021년 사용승인 건물이며 주차는 협의가 가능합니다.",
    direction: "북향 (1층 주출입구 기준)", parking: "총 4대 중 협의", approved: "2021년 5월 26일", moveIn: "즉시 입주",
    point: "무권리 · 즉시 입주 · 2021년 사용승인 · 5층(옥상 포함)",
    deposit: 2000, rent: 110, maintenance: 7, premium: 0, rentNote: "부가세 별도",
    features: [],
    operation: "", hours: "", closed: "", years: "", sales: [], revenue: 0,
    costs: { material: 0, labor: 0, rent: 0, etc: 0 }, operatorNote: "",
    vacant: true, currentUse: "", recommended: "", maintenanceNote: "기본관리비 약 7만원 (전기·수도는 쓴 만큼 별도)",
    extraInfo: [["거래 형태", "임대"], ["지목", ""], ["방 · 화장실", "화장실 실외 1개"], ["공급면적", "전용면적과 동일"]],
    gallery: [{ label: "전경", caption: "", sub: "" }],
  },
  10025: {
    address: "대구 서구 평리동", buildingType: "제2종 근린생활시설", floor: "1층 / 총 1층", shortType: "1층 상가",
    headline: ["서구 평리동", "1층 무권리 상가"],
    desc: "대구 서구 평리동 1층 상가로 권리금 없이 즉시 입주할 수 있으며 시스템 에어컨이 포함되어 있습니다. 2019년 사용승인 건물이며 주차는 협의가 가능합니다.",
    direction: "서향 (1층 주출입구 기준)", parking: "총 1대 중 협의", approved: "2019년 2월 15일", moveIn: "즉시 입주",
    point: "무권리 · 즉시 입주 · 시스템 에어컨 포함 · 2019년 사용승인",
    deposit: 3500, rent: 185, maintenance: 0, premium: 0, rentNote: "부가세 별도", maintenanceLabel: "없음",
    features: [],
    operation: "", hours: "", closed: "", years: "", sales: [], revenue: 0,
    costs: { material: 0, labor: 0, rent: 0, etc: 0 }, operatorNote: "",
    vacant: true, currentUse: "", recommended: "", maintenanceNote: "기본관리비 없음 (전기·수도는 쓴 만큼 별도)",
    extraInfo: [["거래 형태", "임대"], ["지목", ""], ["방 · 화장실", "화장실 실외 1개"], ["공급면적", "전용면적과 동일"]],
    gallery: [{ label: "전경", caption: "", sub: "" }],
  },
  10021: {
    address: "대구 북구 동천동", buildingType: "제2종 근린생활시설", floor: "1층 / 지상 6층·지하 1층", shortType: "1층 상가",
    headline: ["북구 동천동", "1층 상가"],
    desc: "대구 북구 동천동 1층 상가로 즉시 입주할 수 있습니다. 2002년 사용승인 건물이며 주차는 협의가 가능합니다. 권리금은 문의 바랍니다.",
    direction: "남향 (1층 주출입구 기준)", parking: "총 16대 협의", approved: "2002년 12월 3일", moveIn: "즉시 입주",
    point: "즉시 입주 · 1층 상가 · 남향 · 화장실 2개",
    deposit: 5500, rent: 260, maintenance: 0, premium: 0, premiumLabel: "문의", rentNote: "부가세 별도",
    features: [],
    operation: "", hours: "", closed: "", years: "", sales: [], revenue: 0,
    costs: { material: 0, labor: 0, rent: 0, etc: 0 }, operatorNote: "",
    vacant: true, currentUse: "", recommended: "", maintenanceNote: "기본관리비·공동관리비는 매월 변동 (전기·수도는 쓴 만큼 별도)",
    extraInfo: [["거래 형태", "임대"], ["지목", ""], ["방 · 화장실", "화장실 실외 2개"], ["공급면적", "전용면적과 동일"]],
    gallery: [{ label: "전경", caption: "", sub: "" }],
  },
};
