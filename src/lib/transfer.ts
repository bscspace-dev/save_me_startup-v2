export type TransferInfo = {
  master: { name: string; store: string; en: string; field: string; years: number; teams: number; career: string };
  headline: [string, string];
  desc: string;
  days: number;
  hours: number;
  menus: number;
  timeline: [string, string][];
  curriculum: { title: string; range: string; desc: string }[];
};

// 교육 과정은 어떤 업종에도 쓸 수 있는 공통 문구
const curriculum: [string, string][] = [
  ["기본 이론", "업종 이해, 메뉴·제품 구성과 위생 기본을 배웁니다."],
  ["현장 실습", "핵심 메뉴와 공정을 스승(전수자)와 함께 반복 실습합니다."],
  ["운영 실습", "발주, 재고, 피크타임 응대 등 매장 운영 방법을 익힙니다."],
  ["최종 점검", "영업 전 과정을 실습하고 완성도를 확인합니다."],
];

type Preset = {
  field: string; noun: string; role: string; career: string;
  timeline: [string, string, string, string];
};

// 업종별 기본 문구. 스승(전수자) 이름·경력·교육 일수만 바꿔서 매물을 추가한다
const presets: Record<string, Preset> = {
  "한식·분식": {
    field: "한식 다이닝", noun: "한식", role: "스승(전수자)", career: "한식 외식업",
    timeline: ["한식 조리 시작", "한식 다이닝 총괄 셰프", "브랜드 1호점 직접 창업", "외식업 제자(창업자) 교육 시작"],
  },
  "카페·음료": {
    field: "스페셜티 카페", noun: "카페", role: "바리스타", career: "카페·음료",
    timeline: ["바리스타 입문", "스페셜티 카페 헤드 바리스타", "개인 카페 창업·운영", "제자(창업자) 교육 시작"],
  },
  "베이커리·디저트": {
    field: "제과·제빵", noun: "베이커리", role: "파티시에", career: "베이커리",
    timeline: ["제과제빵 입문", "호텔 베이커리 근무", "대로변 베이커리 직접 운영", "제자(창업자) 교육 시작"],
  },
};

const THIS_YEAR = 2026;

// 업종(category)에 맞는 기본 문구로 전수창업 상세 정보를 만든다
export function makeTransfer(
  category: string,
  p: { name: string; store: string; en: string; years: number; teams: number; days: number; menus: number },
): TransferInfo {
  const pr = presets[category] ?? presets["한식·분식"];
  const { name, years, teams, days } = p;
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
    master: { name, store: p.store, en: p.en, field: pr.field, years, teams, career: `${pr.career} 경력 ${years}년` },
    headline: [`${years}년 경력 ${pr.role}에게`, `배우는 실전 ${pr.noun} 창업`],
    desc: `${name} 스승(전수자)는 ${pr.noun} 조리와 매장 운영을 ${years}년간 경험한 현장 전문가입니다. 실제 창업에 필요한 기술과 운영 방법을 1:1로 교육합니다.`,
    days, hours: days * 6, menus: p.menus,
    timeline: [
      [String(y0), pr.timeline[0]],
      [yr(0.35), pr.timeline[1]],
      [yr(0.65), pr.timeline[2]],
      [String(THIS_YEAR - 3), pr.timeline[3]],
      ["현재", `누적 교육 ${teams}팀 · 현장 경력 ${years}년`],
    ],
    curriculum: curriculum.map(([title, desc], i) => ({ title, desc, range: range(i) })),
  };
}

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
