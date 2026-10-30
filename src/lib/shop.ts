import type { Costs } from "@/components/DetailParts";

export type ShopInfo = {
  address: string;
  buildingType: string;
  floor: string;
  shortType?: string; // 예전 정적 데이터에만 있고, 문의 제목은 매물번호+매물제목을 쓴다
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
  showZero?: boolean; // 권리금이 0일 때 "무권리" 대신 "없음"으로 표시 (관리자 등록 매물)
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

// 정적 상가매물 id → 상세 정보. 상가매물은 이제 관리자(/admin)에서 등록해 Supabase에 저장되므로 비어 있다
export const shops: Record<number, ShopInfo> = {};
