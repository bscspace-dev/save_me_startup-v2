import type { Listing } from "./data";

export type TransferInfo = {
  master: { name: string; store: string; en: string; field: string; years: number; career: string };
  headline: [string, string];
  desc: string;
  days: number;
  hours: number;
  menus: number;
  menuNames?: string[]; // 교육 대표 메뉴 (관리자에서 입력)
  menuDesc?: string; // 대표 메뉴 한두 줄 설명 (관리자에서 입력)
  timeline: [string, string][];
  curriculum: { title: string; range: string; desc: string }[];
};

// 교육 과정은 어떤 업종에도 쓸 수 있는 공통 문구
const curriculum: [string, string][] = [
  ["기본 이론", "업종 이해, 메뉴·제품 구성과 위생 기본을 배웁니다"],
  ["현장 실습", "핵심 메뉴와 공정을 사부(전수자)와 함께 반복 실습합니다"],
  ["운영 실습", "발주, 재고, 피크타임 응대 등 매장 운영 방법을 익힙니다"],
  ["최종 점검", "영업 전 과정을 실습하고 완성도를 확인합니다"],
];

type Preset = {
  field: string; noun: string; role: string; career: string;
  timeline: [string, string, string, string];
  menuNames: string[]; // 관리자 입력이 없을 때 쓰는 기본 대표 메뉴
};

// 업종별 기본 문구. 사부(전수자) 이름·경력·교육 일수만 바꿔서 매물을 추가한다
const presets: Record<string, Preset> = {
  "한식·분식": {
    field: "한식 다이닝", noun: "한식", role: "사부(전수자)", career: "한식 외식업",
    timeline: ["한식 조리 시작", "한식 다이닝 총괄 셰프", "브랜드 1호점 직접 창업", "외식업 제자(창업자) 교육 시작"],
    menuNames: ["된장찌개", "김치찌개", "제육볶음", "순두부찌개", "비빔밥", "불고기"],
  },
  "카페·음료": {
    field: "스페셜티 카페", noun: "카페", role: "바리스타", career: "카페·음료",
    timeline: ["바리스타 입문", "스페셜티 카페 헤드 바리스타", "개인 카페 창업·운영", "제자(창업자) 교육 시작"],
    menuNames: ["아메리카노", "카페라떼", "바닐라라떼", "에이드", "수제 청", "디저트 케이크"],
  },
  "베이커리·디저트": {
    field: "제과·제빵", noun: "베이커리", role: "파티시에", career: "베이커리",
    timeline: ["제과제빵 입문", "호텔 베이커리 근무", "대로변 베이커리 직접 운영", "제자(창업자) 교육 시작"],
    menuNames: ["소금빵", "크루아상", "식빵", "마들렌", "휘낭시에", "파운드케이크"],
  },
  "치킨·피자": {
    field: "치킨·피자 전문점", noun: "치킨·피자", role: "사부(전수자)", career: "치킨·피자 외식업",
    timeline: ["치킨·피자 조리 입문", "프랜차이즈 매장 점장", "개인 매장 직접 창업", "제자(창업자) 교육 시작"],
    menuNames: ["후라이드 치킨", "양념 치킨", "콤비네이션 피자", "치즈 피자", "치킨 순살", "감자튀김"],
  },
  "주점·호프": {
    field: "주점·호프", noun: "주점", role: "사부(전수자)", career: "주점·호프 운영",
    timeline: ["주점 주방 입문", "호프·이자카야 주방장", "개인 주점 직접 창업", "제자(창업자) 교육 시작"],
    menuNames: ["오징어 튀김", "치즈 감자전", "골뱅이 무침", "어묵탕", "닭똥집", "모둠 안주"],
  },
  "고기·구이": {
    field: "고기·구이 전문점", noun: "고기·구이", role: "사부(전수자)", career: "고기·구이 외식업",
    timeline: ["정육·구이 입문", "고깃집 총괄 주방장", "개인 고깃집 직접 창업", "제자(창업자) 교육 시작"],
    menuNames: ["삼겹살", "목살", "갈비살", "양념 갈비", "된장찌개", "냉면"],
  },
  "일식·중식": {
    field: "일식·중식 전문점", noun: "일식·중식", role: "사부(전수자)", career: "일식·중식 외식업",
    timeline: ["일식·중식 주방 입문", "전문점 수석 조리사", "개인 매장 직접 창업", "제자(창업자) 교육 시작"],
    menuNames: ["돈카츠", "우동", "초밥", "짜장면", "짬뽕", "탕수육"],
  },
  "아이스크림·간식": {
    field: "아이스크림·간식", noun: "간식", role: "사부(전수자)", career: "아이스크림·간식",
    timeline: ["간식 제조 입문", "디저트 전문점 근무", "개인 매장 직접 운영", "제자(창업자) 교육 시작"],
    menuNames: ["수제 아이스크림", "소프트콘", "와플", "호떡", "붕어빵", "츄러스"],
  },
};

const THIS_YEAR = 2026;

// 업종(category)에 맞는 기본 문구로 전수창업 상세 정보를 만든다
export function makeTransfer(
  category: string,
  p: { name: string; store: string; en: string; years: number; teams?: number; days: number; menus: number },
): TransferInfo {
  const pr = presets[category] ?? presets["한식·분식"];
  const { name, years, days } = p;
  const y0 = THIS_YEAR - years;
  const yr = (f: number) => String(y0 + Math.round(years * f));
  const a = 2;
  const b = a + Math.round(days * 0.35);
  const c = b + Math.round(days * 0.3);
  const ends = [a, b, c, days];
  const range = (i: number) => {
    const from = i === 0 ? 1 : ends[i - 1] + 1;
    return from >= ends[i] ? `${ends[i]}일차` : `${from}-${ends[i]}일차`;
  };

  return {
    master: { name, store: p.store, en: p.en, field: pr.field, years, career: `${pr.career} 경력 ${years}년` },
    headline: [`${years}년 경력 ${pr.role}에게`, `배우는 실전 ${pr.noun} 창업`],
    desc: `${name} 사부(전수자)는 ${pr.noun} 조리와 매장 운영을 ${years}년간 경험한 현장 전문가입니다. 실제 창업에 필요한 기술과 운영 방법을 1:1로 교육합니다`,
    days, hours: days * 6, menus: p.menus, menuNames: pr.menuNames.slice(0, Math.max(1, p.menus)),
    timeline: [
      [String(y0), pr.timeline[0]],
      [yr(0.35), pr.timeline[1]],
      [yr(0.65), pr.timeline[2]],
      [String(THIS_YEAR - 3), pr.timeline[3]],
      ["현재", `현장 경력 ${years}년`],
    ],
    curriculum: curriculum.map(([title, desc], i) => ({ title, desc, range: range(i) })),
  };
}

// 정적 샘플(transfers)이 없으면 관리자에서 등록한 전수창업(l.transfer)으로 만든다
export const transferOf = (l: Listing): TransferInfo | undefined => {
  if (transfers[l.id]) return transfers[l.id];
  const r = l.transfer;
  if (!r) return undefined;
  const t = makeTransfer(l.category, { ...r, en: "" });
  // 관리자가 입력한 이력만 보여준다 (비어 있으면 상세에서 "경력없음"으로 나온다)
  t.timeline = r.timeline ?? [];
  if (r.menuNames?.length) t.menuNames = r.menuNames;
  if (r.menuDesc) t.menuDesc = r.menuDesc;
  return t;
};

// 전수창업 매물 id → 상세 (임시 샘플 데이터)
export const transfers: Record<number, TransferInfo> = {
  10036: makeTransfer("카페·음료", { name: "박서연", store: "온기 커피", en: "PARK SEOYEON", years: 9, teams: 24, days: 10, menus: 15 }),
  10035: makeTransfer("카페·음료", { name: "최민준", store: "로스트노트 커피", en: "CHOI MINJUN", years: 7, teams: 18, days: 10, menus: 12 }),
  10033: makeTransfer("베이커리·디저트", { name: "이정훈", store: "온기 베이커리", en: "LEE JUNGHOON", years: 14, teams: 31, days: 14, menus: 10 }),
  10030: makeTransfer("한식·분식", { name: "김도현", store: "단골국밥", en: "KIM DOHYUN", years: 12, teams: 38, days: 14, menus: 12 }),
  10029: makeTransfer("카페·음료", { name: "정하윤", store: "모닝브루", en: "JUNG HAYOON", years: 8, teams: 20, days: 10, menus: 14 }),
  10024: makeTransfer("카페·음료", { name: "한지우", store: "작은 로스터리", en: "HAN JIWOO", years: 6, teams: 15, days: 7, menus: 10 }),
  10023: makeTransfer("베이커리·디저트", { name: "오세린", store: "밀크 베이커리", en: "OH SERIN", years: 11, teams: 27, days: 14, menus: 9 }),
  10020: makeTransfer("베이커리·디저트", { name: "윤태호", store: "대로 베이커리", en: "YOON TAEHO", years: 10, teams: 22, days: 12, menus: 11 }),
};
