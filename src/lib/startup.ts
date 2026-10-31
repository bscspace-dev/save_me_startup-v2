import type { Listing } from "./data";

// 신규창업 창업컨설팅을 진행한 상가 소개. id 는 listings(kind: "신규창업")의 번호와 같다.
// 아래 문구는 임시(샘플)입니다. 실제 상가 내용으로 교체하세요.
export type StartupCase = {
  title: string;
  summary: string;
  story: string;
  steps: { label: string; desc: string }[];
};

// 진행한 항목만 적는다 (화면에서는 전체 항목 중 진행한 것을 체크로 표시)
const steps = (a: string, b: string, c: string, d: string, extra: { label: string; desc: string }[] = []) => [
  { label: "상권분석", desc: a },
  { label: "인테리어", desc: b },
  { label: "마케팅·홍보", desc: c },
  { label: "사후관리", desc: d },
  ...extra,
];

// 컨설팅 리스트 전체 항목 (진행한 항목만 체크로 표시)
export const consultItems = ["상권분석", "인테리어", "BI·CI 제작", "마케팅·홍보", "사후관리"];

// 정적 사례(startups)가 없으면 관리자에서 등록한 신규창업(l.startup)으로 만든다
export const startupOf = (l: Listing): StartupCase | undefined =>
  startups[l.id] ?? (l.startup ? { title: l.title, summary: l.startup.story, story: l.startup.story, steps: l.startup.done.map((label) => ({ label, desc: "" })) } : undefined);

export const startups: Record<number, StartupCase> = {
  10040: {
    title: "카페이름 소형 카페",
    summary: "구해줘창업 컨설팅으로 문을 연 아담한 동네 카페입니다",
    story: "작은 평수에 맞춰 동선을 효율적으로 짠 소형 카페입니다. 밝은 톤의 인테리어와 창가 좌석으로 아늑한 분위기를 살렸고, 임대료 부담이 적은 자리에 문을 열었습니다",
    steps: steps("유동인구와 임대료를 함께 비교해 부담이 적은 자리를 선정했습니다", "작은 매장에 맞는 동선과 설비 중심으로 설계했습니다", "오픈 전부터 온라인 플레이스와 SNS를 준비했습니다", "오픈 후 운영 상황을 점검하며 보완했습니다", []),
  },
  10039: {
    title: "상권 분석과 인테리어를 함께 준비한 한식당",
    summary: "구해줘창업 컨설팅으로 문을 연 한식당입니다",
    story: "넓은 홀과 개방형 주방을 갖춘 한식당입니다. 깔끔한 원목 톤 인테리어로 가족 단위 손님이 편하게 머물 수 있게 꾸몄습니다",
    steps: steps("업종과 주 고객층에 맞는 상권을 비교해 후보지를 좁혔습니다", "주방 설비와 홀 동선을 업종에 맞게 설계했습니다", "분석한 고객층에 맞춰 홍보 방향을 잡았습니다", "오픈 이후 운영 상담을 이어갔습니다"),
  },
  10038: {
    title: "주택가 신규 오픈 베이커리",
    summary: "구해줘창업 컨설팅으로 문을 연 주택가 베이커리입니다",
    story: "주택가 골목에 자리한 동네 베이커리입니다. 통유리 외관으로 매장 안이 보이게 해 지나가는 주민의 발길을 끌고, 보유 장비를 활용해 공간을 알뜰하게 썼습니다",
    steps: steps("배후 세대와 경쟁 매장을 확인해 주택가 수요를 분석했습니다", "보유 장비를 활용하고 꼭 필요한 공사만 진행했습니다", "동네 고객을 대상으로 오픈 이벤트를 준비했습니다", "오픈 후 메뉴와 운영 방식을 함께 점검했습니다", [{ label: "BI·CI 제작", desc: "베이커리 포장과 간판에 쓸 로고를 제작했습니다" }]),
  },
};
