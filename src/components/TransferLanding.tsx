import Link from "next/link";
import { Icon } from "./Icons";
import { RevealLi, RevealDiv, GrowBar } from "./ScrollReveal";

// 전수창업 상세 하단의 공통 안내 섹션들 (모든 전수창업 매물에 같은 문구)
export const wrap = "mx-auto max-w-[80rem] px-6";
const YEL = "text-[#A97C0A]";

function L({ k, className = "size-6" }: { k: string; className?: string }) {
  const d: Record<string, React.ReactNode> = {
    store: <><path d="M3 9l1.5-5h15L21 9" /><path d="M3 9c0 1.7 1.3 3 3 3s3-1.3 3-3c0 1.7 1.3 3 3 3s3-1.3 3-3c0 1.7 1.3 3 3 3s3-1.3 3-3" /><path d="M5 12v8h14v-8" /></>,
    pin: <><path d="M12 21s-7-6.2-7-11.2A7 7 0 0 1 19 9.8C19 14.8 12 21 12 21z" /><circle cx="12" cy="10" r="2.5" /></>,
    fork: <><path d="M7 3v7a2 2 0 0 0 2 2v9M5 3v6M9 3v6M16 3c-2 1-3 4-3 8h3v10" /></>,
    bulb: <><path d="M9 18h6M10 21h4" /><path d="M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2.1h5c0-.9.4-1.6 1-2.1A6 6 0 0 0 12 3z" /></>,
    refresh: <><path d="M20 11a8 8 0 0 0-14-4L4 9M4 4v5h5M4 13a8 8 0 0 0 14 4l2-2M20 20v-5h-5" /></>,
    flag: <><path d="M5 21V4M5 4h12l-2 4 2 4H5" /></>,
    office: <><path d="M5 21V4h9v17M14 9h5v12M3 21h18M8 8h3M8 12h3M8 16h3" /></>,
    home: <><path d="M4 11l8-7 8 7M6 10v10h12V10M10 20v-5h4v5" /></>,
    bike: <><circle cx="6" cy="17" r="3" /><circle cx="18" cy="17" r="3" /><path d="M6 17l4-8h5l3 8M10 9l-1-3h-2M13 13h-4" /></>,
    palette: <><path d="M12 3a9 9 0 1 0 0 18c1.5 0 2-1 1.5-2s0-2 1.5-2h2a3 3 0 0 0 3-3c0-5-4-11-8-11z" /><circle cx="8" cy="11" r="1" /><circle cx="12" cy="7.5" r="1" /><circle cx="16" cy="10" r="1" /></>,
    layout: <><rect x="4" y="4" width="16" height="16" rx="2" /><path d="M4 10h16M10 10v10" /></>,
    clip: <><rect x="6" y="4" width="12" height="17" rx="2" /><path d="M9 4h6v3H9zM9 12h6M9 16h4" /></>,
    mega: <><path d="M4 10v4h3l8 4V6L7 10H4zM18 9a4 4 0 0 1 0 6" /></>,
    book: <><path d="M3 5h7a2 2 0 0 1 2 2v13a2 2 0 0 0-2-2H3zM21 5h-7a2 2 0 0 0-2 2v13a2 2 0 0 1 2-2h7z" /></>,
    shield: <><path d="M12 3l8 3v6c0 4.5-3.2 8-8 9-4.8-1-8-4.5-8-9V6z" /><path d="M8.5 12l2.5 2.5 4.5-5" /></>,
    users: <><circle cx="9" cy="8" r="3.5" /><path d="M2.5 20c0-3.6 2.9-6 6.5-6s6.5 2.4 6.5 6M17 4.5a3.5 3.5 0 010 7M18.5 14.3c1.8.7 3 2.5 3 5.2" /></>,
  };
  return <svg viewBox="0 0 24 24" aria-hidden className={className} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">{d[k]}</svg>;
}

const Arrow = () => <span aria-hidden className="text-[0.875rem]">↗</span>;

// 섹션 머리: 노란 점 + 영문 라벨, 큰 제목, 오른쪽 설명
function SecHead({ eyebrow, title, side, dark, center }: { eyebrow: string; title: React.ReactNode; side?: React.ReactNode; dark?: boolean; center?: boolean }) {
  return (
    <div className={`flex flex-wrap items-end justify-between gap-6 ${center ? "flex-col !items-center text-center" : ""}`}>
      <div className={center ? "flex flex-col items-center" : ""}>
        <p className={`text-[0.6875rem] font-bold tracking-[0.14em] text-[#A97C0A]`}>
          {eyebrow}
        </p>
        <h2 className={`mt-3 text-[1.625rem] font-black leading-[1.3] tracking-tight font-gmarket text-ink`}>{title}</h2>
      </div>
      {side && <p className={`max-w-[22rem] text-[0.75rem] leading-relaxed text-neutral-600`}>{side}</p>}
    </div>
  );
}

export function MasterSection({ name, photo, quote, bio, sales, peakNote, middle, stats }: { name: string; stats?: [string, string][]; photo: string | null; middle?: React.ReactNode; quote?: string; bio?: string; sales?: [number, number, number]; peakNote?: string }) {
  const checks = ["손에 익을 때까지, 조리 실습", "매장에 맞춘 주방 동선과 준비 과정", "오픈 후에도 지킬 수 있는 운영 기준"];
  const phil = [
    ["맛은 감이 아니라, 기준으로.", "계량, 숙성, 화력과 조리 시간을 정리해 누구나 같은 한 접시를 만듭니다."],
    ["바쁜 시간에도 흐름이 끊기지 않게.", "전처리부터 주문, 조리, 서빙까지 매장 규모에 맞는 동선을 설계합니다."],
    ["팔리는 메뉴만큼, 남는 구조도 중요하게.", "식재료 관리와 메뉴 구성을 함께 살피고 원가를 점검하는 습관을 만듭니다."],
  ];
  return (
    <section id="expert" className="scroll-mt-24 rounded-3xl border border-neutral-200 bg-white py-8 text-ink md:py-10">
      <div className="px-8 md:px-10">
        <div className="grid items-center gap-10 lg:grid-cols-[1.25fr_1fr]">
          <div className="relative">
          <span aria-hidden className="absolute -bottom-3 -right-3 size-full rounded-2xl border-2 border-[#F0C33F]" />
          <div className="relative flex aspect-[3/2] items-end overflow-hidden rounded-2xl bg-[#161616]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            {photo && <img src={photo} alt={`${name} 사부(전수자)`} className="absolute inset-0 size-full object-cover object-top" />}
            <span aria-hidden className="absolute left-1/2 top-1/2 grid size-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-[#F0C33F] text-ink"><svg viewBox="0 0 24 24" className="ml-0.5 size-6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"><path d="M8 5l11 7-11 7z" /></svg></span>
            <div className="relative flex w-full items-end justify-between gap-4 bg-gradient-to-t from-black/85 to-transparent p-6 pt-24">
              <div>
                <p className="text-[0.6563rem] tracking-[0.18em] text-[#F0C33F]">MEET YOUR MASTER</p>
                <p className="mt-1 text-[1.0625rem] font-black text-white">한 접시보다, 한 가게를 가르칩니다.</p>
              </div>
              <span className="shrink-0 text-[0.6875rem] text-white/80">인터뷰 보기 ↗</span>
            </div>
          </div>
          </div>
          <div>
            <p className={`text-[0.6875rem] font-bold tracking-[0.14em] ${YEL}`}>THE MASTER</p>
            <h2 className="mt-4 text-[2rem] font-black leading-[1.3] tracking-tight font-gmarket md:text-[2.5rem]">맛의 기준을 나누는<br /><mark className="rounded-md bg-[#F0C33F] px-2 text-ink">{name}</mark> 사부</h2>
            {quote || bio ? (
              <div className="mt-6">
                {quote && <p className="whitespace-pre-line text-[1.0625rem] font-black leading-[1.6] text-ink">&ldquo;{quote}&rdquo;</p>}
                {bio && <p className="mt-4 whitespace-pre-line text-[0.75rem] leading-[1.9] text-neutral-600">{bio}</p>}
              </div>
            ) : (
              <p className="mt-6 text-[0.75rem] leading-[1.9] text-neutral-600">레시피만 따라 하는 창업이 아니라,<br />왜 이 순서로 조리하고 어떻게 손님을 맞는지.<br />매일의 장사에 필요한 기준을 함께 배웁니다.</p>
            )}
            <ul className="mt-6 space-y-3 border-t border-neutral-200 pt-6 text-[0.8125rem] text-neutral-700">
              {checks.map((c) => <li key={c} className="flex items-center gap-3"><Icon name="check" className="size-3.5 text-[#A97C0A]" />{c}</li>)}
            </ul>
          </div>
        </div>

        {stats && (
          <ul className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-4">
            {stats.map(([k, v]) => (
              <li key={k} className="card-soft px-5 py-4">
                <p className="text-[0.6875rem] text-neutral-500">{k}</p>
                <p className="mt-1 text-[1.75rem] font-black tracking-tight text-[#A97C0A] font-gmarket">{v}</p>
              </li>
            ))}
          </ul>
        )}

        {middle && <div className="mt-14 border-t border-neutral-200 pt-12">{middle}</div>}

        <div className="mt-14 border-t border-neutral-200 pt-12 lg:grid lg:grid-cols-[1fr_1.8fr] lg:gap-10">
          <div>
            <p className={`text-[0.6875rem] font-bold tracking-[0.14em] ${YEL}`}>BEYOND THE RECIPE</p>
            <h3 className="mt-4 text-[1.625rem] font-black leading-[1.3] tracking-tight font-gmarket">운영 노하우 /<br />장사 철학</h3>
            <p className="mt-5 text-[0.75rem] leading-[1.9] text-neutral-600">오래 가는 가게의 시작은<br />화려한 비법보다 흔들리지 않는<br />매일의 기본입니다.</p>
          </div>
          <ol className="mt-8 lg:mt-0">
            {phil.map(([t, d], i) => (
              <li key={t} className="flex gap-6 border-b border-neutral-200 py-5 first:border-t lg:first:border-t-0">
                <span className={`pt-1 text-[0.8125rem] ${YEL}`}>{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <p className="text-[1.0625rem] font-black">{t}</p>
                  <p className="mt-2 text-[0.7188rem] text-neutral-600">{d}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-12 border-t border-neutral-200 pt-12">
          <div className="text-center">
            <h3 className="text-[1.625rem] font-black leading-[1.3] tracking-tight font-gmarket">장사 데이터로 증명합니다</h3>
            <p className={`mt-3 text-[0.8125rem] font-bold ${YEL}`}>매출과 관련하여 이만큼 장사가 잘된다는 걸 직접 데이터로 증명합니다.</p>
          </div>
          <div className="mx-auto mt-8 grid max-w-[64rem] gap-5 md:grid-cols-2">
            <div className="card-soft p-6">
              <div className="flex items-center justify-between gap-3">
                <p className={`text-[0.8125rem] font-black ${YEL}`}>전수 매장 월 매출 상승 추이</p>
                <span className="text-[0.6875rem] text-neutral-600">최근 6개월 실적 기준</span>
              </div>
              <ul className="mt-6 space-y-5">
                {[["오픈 1개월차", 0], ["오픈 3개월차", 1], ["오픈 6개월차 (안착)", 2]].map(([label, k]) => {
                  const data = sales ?? [3800, 6200, 8500]; // 관리자 입력이 없으면 예시 수치
                  const v = data[k as number] ?? 0;
                  const max = Math.max(...data, 1);
                  return (
                    <li key={label as string}>
                      <div className="flex items-center justify-between text-[0.75rem]">
                        <span className="font-bold">{label}</span>
                        <b className={k === 2 ? YEL : ""}>월 {v.toLocaleString()}만원{k === 2 ? " 달성!" : ""}</b>
                      </div>
                      <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-neutral-200">
                        <GrowBar i={k as number} pct={Math.round((v / max) * 100)} className={`h-full rounded-full ${k === 2 ? "bg-[#D49F12]" : "bg-[#F0C33F]"}`} />
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="card-soft p-6">
              <p className={`text-[0.8125rem] font-black ${YEL}`}>피크타임 만석 및 대기열 증빙</p>
              <div className="mt-4 grid aspect-[16/9] place-items-center rounded-xl border border-dashed border-neutral-300 bg-white text-[0.75rem] text-neutral-400">피크타임 증빙 사진 영역</div>
              <p className="mt-3 text-[0.6875rem] leading-relaxed text-neutral-600">{peakNote ? `*${peakNote}` : <span className="text-neutral-400">*증빙 설명을 입력해 주세요</span>}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const badges = ["SIGNATURE", "BEST", "STEADY"];
const learn = ["레시피 전수", "조리 실습", "원가 관리"];

export function MenuSection({ name, names, srcs, desc, embedded }: { name: string; names: string[]; srcs: string[]; desc?: string; embedded?: boolean }) {
  const n = Math.min(3, Math.max(names.length, srcs.length));
  if (n === 0) return null;
  const content = (<>
        <div className="text-center">
          <p className={`text-[0.6875rem] font-bold tracking-[0.14em] ${YEL}`}>SIGNATURE MENU</p>
          <h2 className="mt-3 text-[1.625rem] font-black leading-[1.3] tracking-tight font-gmarket">손님이 줄 서는 이유, {name} 사부의 대표메뉴</h2>
          <p className="mt-3 text-[0.8125rem] leading-relaxed text-neutral-600">가게의 중심이 되는 메뉴를 사부가 직접 1:1로 전수합니다.<br />레시피부터 조리 기준, 원가 관리까지 한 번에 배웁니다.</p>
        </div>
        <ul className={`mx-auto mt-10 grid gap-5 ${n === 1 ? "max-w-[21rem]" : n === 2 ? "max-w-[42rem] md:grid-cols-2" : "max-w-[64rem] md:grid-cols-3"}`}>
          {Array.from({ length: n }, (_, k) => (
            <RevealLi i={k} key={k} className="group card-soft overflow-hidden">
              <div className="relative aspect-[4/3] bg-neutral-100">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                {srcs[k] && <img src={srcs[k]} alt={names[k] ?? `대표 메뉴 ${k + 1}`} className="absolute inset-0 size-full object-cover transition duration-500 group-hover:scale-105" />}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />
                <span className="absolute left-3 top-3 rounded-full bg-[#F0C33F] px-2.5 py-1 text-[0.6563rem] font-bold tracking-wider text-ink">{badges[k] ?? `MENU`}</span>
                <span className="absolute right-4 top-3 text-[2rem] font-black leading-none text-white/30 font-gmarket">{String(k + 1).padStart(2, "0")}</span>
                <p className="absolute inset-x-5 bottom-4 text-white text-[1.375rem] font-black leading-tight tracking-tight">{names[k] ?? `대표 메뉴 ${k + 1}`}</p>
              </div>
              <div className="p-5">
                <p className="min-h-[3.6rem] text-[0.75rem] leading-[1.8] text-neutral-600">{k === 0 && desc ? desc : <span className="text-neutral-400">메뉴 설명을 입력해 주세요 (관리자 등록 예정)</span>}</p>
                <ul className="mt-4 flex flex-wrap gap-2 border-t border-neutral-200 pt-4">
                  {learn.map((x) => <li key={x} className="flex items-center gap-1 rounded-full bg-[#faf9f7] px-2.5 py-1 text-[0.6563rem] font-bold text-neutral-700"><Icon name="check" className={`size-3 ${YEL}`} />{x}</li>)}
                </ul>
              </div>
            </RevealLi>
          ))}
        </ul>
</>);
  if (embedded) return <div id="menus" className="scroll-mt-24">{content}</div>;
  return (
    <section id="menus" className="scroll-mt-24 rounded-3xl border border-neutral-200 bg-white py-8 text-ink md:py-10">
      <div className="px-8 md:px-10">{content}</div>
    </section>
  );
}

const costOld = [
  ["가맹비 (브랜드 사용)", "1,000만원~"],
  ["교육비", "500만원~"],
  ["월 로열티", "매월 매출 3~5%"],
  ["인테리어/집기 감리 마진", "평당 200만+ 알파"],
  ["마케팅/광고비", "점주 개별 부담"],
];
const costNew = [
  ["가맹비 / 로열티", "0원 (전혀 없음)"],
  ["사부님 레시피 완전 전수", "100% 노하우 이전"],
  ["로고, BI/CI 디자인", "무상 브랜드 기획"],
  ["플레이스 & 오픈 마케팅", "무상 대행 지원"],
  ["인테리어 도면/3D 설계", "직영가 도급 시공 연계"],
];

export function CostComparison() {
  return (
    <section className="rounded-3xl border border-neutral-200 bg-white py-8 text-ink md:py-10">
      <div className="px-8 md:px-10">
        <div className="text-center">
          <p className={`text-[0.6875rem] font-bold tracking-[0.14em] ${YEL}`}>COST COMPARISON</p>
          <h2 className="mt-3 text-[1.625rem] font-black leading-[1.3] tracking-tight font-gmarket">왜 프랜차이즈가 아닌 &apos;전수창업&apos; 인가?</h2>
          <p className="mt-3 text-[0.8125rem] text-neutral-600">가맹비, 로열티, 인테리어 중간 마진 등 불필요한 거품을 싹 <b className={YEL}>빼</b>고 전수비 하나로 해결하세요.</p>
        </div>
        <div className="mx-auto mt-10 grid max-w-[56rem] gap-5 md:grid-cols-2">
          <div className="card-soft p-7">
            <p className="text-center text-[0.6875rem] font-bold text-neutral-500">일반 프랜차이즈 가맹</p>
            <p className="mt-1 text-center text-[1.25rem] font-black text-neutral-600">부담스러운 거품 창업비</p>
            <ul className="mt-6 divide-y-0 border-t border-neutral-200 pt-4 text-[0.75rem]">
              {costOld.map(([k, v]) => <li key={k} className="flex items-center justify-between py-2.5"><span className="text-neutral-500">{k}</span><b className="text-[#c0463c]">{v}</b></li>)}
            </ul>
            <p className="mt-3 border-t border-neutral-200 pt-4 text-center text-[0.6875rem] text-neutral-500">지속적인 본사 통제 및 높은 매일 고정비 발생</p>
          </div>
          <div className="relative rounded-2xl border border-[#F0C33F] bg-[#0f0a07] p-7 text-white">
            <span className="absolute -top-3 right-5 rounded-full bg-[#F0C33F] px-3 py-1 text-[0.6563rem] font-bold text-ink">추천: 합리적인 선택</span>
            <p className="text-center text-[0.6875rem] font-bold text-[#F0C33F]">구해줘창업 전수창업</p>
            <p className="mt-1 text-center text-[1.25rem] font-black">단 1회 전수창업비로 완결!</p>
            <ul className="mt-6 border-t border-white/10 pt-4 text-[0.75rem]">
              {costNew.map(([k, v]) => <li key={k} className="flex items-center justify-between py-2.5"><span className="text-white/80">{k}</span><b className="text-[#F0C33F]">{v}</b></li>)}
            </ul>
            <p className="mt-3 border-t border-white/10 pt-4 text-center text-[0.6875rem] font-bold">&quot;사장님은 레시피 숙지에만 집중하세요!&quot;</p>
          </div>
        </div>
      </div>
    </section>
  );
}

const areas = [
  ["01", "office", "오피스 / 직장인 상권", "점심에는 든든한 식사, 저녁에는 모임.", "요일과 시간대별 식사 수요를 살펴봅니다."],
  ["02", "home", "주택가 / 복합 상권", "가족 외식과 동네 단골이 만나는 곳.", "생활 동선과 재방문 수요를 확인합니다."],
  ["03", "bike", "배달 겸용 B급 상권", "홀과 포장·배달을 함께 고려하는 곳.", "임대 조건과 배달 반영을 함께 검토합니다."],
] as const;

const faqs = [
  ["요리 경험이 없어도 전수창업이 가능한가요?", "가능 여부는 상담을 통해 함께 확인합니다. 조리 경험과 준비 기간을 살피고, 기본 손질부터 메뉴 실습까지 필요한 교육 범위를 안내합니다."],
  ["창업 비용과 전수 범위는 어떻게 정해지나요?", "점포 상태, 면적, 설비와 교육 범위에 따라 달라집니다. 상담 후 필요한 항목을 구분해 안내하며, 계약 전 포함·별도 비용을 확인합니다."],
  ["이미 운영 중인 매장도 메뉴를 도입할 수 있나요?", "현재 업종과 주방 설비, 기존 메뉴와의 조합을 먼저 살펴봅니다. 업종 전환 또는 메뉴 추가 중 적합한 방향을 함께 검토합니다."],
  ["상권을 아직 정하지 못했는데 상담할 수 있나요?", "네. 희망 지역, 예산, 운영 방식부터 이야기해 주세요. 점포를 계약하기 전에 확인해야 할 조건을 함께 정리해 드립니다."],
];

export function NeighborhoodSection() {
  return (
    <section className="rounded-3xl border border-neutral-200 bg-white py-8 text-ink md:py-10">
      <div className="px-8 md:px-10">
        <SecHead dark eyebrow="FIND YOUR NEIGHBORHOOD" title="이런 상권과 잘 맞아요!" side={<>입지가 곧 정답은 아닙니다.<br />현장 조건과 운영 계획을 함께 살펴봅니다.</>} />
        <ul className="mt-10 grid gap-4 md:grid-cols-3">
          {areas.map(([no, ic, t, a, b], i) => (
            <RevealLi i={i} key={no} className="group card-soft relative overflow-hidden p-6">
              <span aria-hidden className="pointer-events-none absolute -right-1 -top-3 select-none text-[4rem] font-black leading-none text-white/[0.04] font-gmarket">{no}</span>
              <span className="relative grid size-12 place-items-center rounded-xl bg-[#F0C33F] text-[#1b1b1b]"><L k={ic} className="size-6" /></span>
              <p className="relative mt-7 text-[1.1875rem] font-black">{t}</p>
              <span aria-hidden className="relative mt-3 block h-0.5 w-8 rounded-full bg-[#F0C33F]" />
              <p className="relative mt-4 text-[0.75rem] leading-[1.9] text-neutral-600">{a}<br />{b}</p>
            </RevealLi>
          ))}
        </ul>
      </div>
    </section>
  );
}

const traps = [
  ["첫 번째 함정", "임기응변 운영의 함정", "조리 순서, 서빙 타이밍, 역할 분담이 명문화되지 않으면 피크타임에 각자 다른 판단으로 움직이게 됩니다. 준비한 대로 되지 않는 첫날이 반복됩니다."],
  ["두 번째 함정", "조리 속도 · 타이밍 불일치", "혼자 연습할 때의 조리 속도와 실제 주문이 쏟아지는 순간의 타이밍은 전혀 다릅니다. 불 조절, 메뉴별 완성 순서, 대기 시간 관리가 함께 훈련되어야 합니다."],
  ["세 번째 함정", "고객 & 돌발 상황 대응", "주문 실수, 재료 소진, 예상치 못한 단체 손님. 연습으로 준비되지 않은 상황은 반드시 옵니다. 경험 있는 매니저가 옆에 있어야 흔들리지 않고 대응할 수 있습니다."],
];

export function PreResults() {
  return (
    <>
      <section className="rounded-3xl border border-neutral-200 bg-white py-8 text-ink md:py-10">
        <div className="px-8 md:px-10">
          <SecHead dark center eyebrow="PRE-RESULTS" title="이론상 완벽했던 매장, 오픈 당일 왜 마비될까요?" />
          <p className="mt-5 text-center text-[0.75rem] leading-[1.9] text-neutral-600">준비를 충분히 했다고 생각했는데, 막상 첫날이 되면 달라집니다.<br />구해줘창업은 그 순간을 먼저 겪어봤기 때문에 미리 대비합니다.</p>
          <ul className="mt-12 grid gap-4 md:grid-cols-3">
            {traps.map(([tag, t, d], i) => (
              <RevealLi i={i} key={t} className="card-soft p-6">
                <p className="flex items-center gap-2"><span className="grid size-7 place-items-center rounded-full bg-[#F0C33F] text-[0.6875rem] font-black text-ink">{String(i + 1).padStart(2, "0")}</span><span className={`text-[0.6875rem] font-bold ${YEL}`}>{tag}</span></p>
                <p className="mt-5 text-[1.0625rem] font-black">{t}</p>
                <p className="mt-3 text-[0.75rem] leading-[1.9] text-neutral-600">{d}</p>
              </RevealLi>
            ))}
          </ul>
          <div className="mt-8 rounded-2xl bg-[#F0C33F] px-8 py-5 text-ink">
            <p className="text-[1rem] font-black">구해줘창업이 이 세 가지를 오픈 전에 미리 막습니다.</p>
          </div>
        <div className="mt-12 border-t border-neutral-200 pt-12 lg:grid lg:grid-cols-[1fr_2.2fr] lg:gap-10">
          <div>
            <p className="text-[0.6875rem] font-bold tracking-[0.14em] text-[#A97C0A]">WE OPEN TOGETHER</p>
            <h3 className="mt-4 text-[1.625rem] font-black leading-[1.3] tracking-tight font-gmarket">오픈매니저<br />3일 현장<br />상주 시스템</h3>
            <p className="mt-5 text-[0.75rem] leading-[1.9] text-neutral-600">첫 주문의 긴장부터 마감의 정리까지.<br />가장 필요한 순간,<br />곁에서 함께 움직입니다.</p>
          </div>
          <ol className="mt-8 lg:mt-0">
            {days.map(([day, when, t, d, items]) => (
              <li key={day} className="grid gap-4 border-t border-neutral-200 py-6 sm:grid-cols-[6rem_1fr_auto]">
                <div><p className="text-[1.125rem] font-black">{day}</p><p className="mt-1 text-[0.6875rem] text-neutral-600">{when}</p></div>
                <div>
                  <p className="text-[1.0625rem] font-black">{t}</p>
                  <p className="mt-3 text-[0.75rem] text-neutral-600">{d}</p>
                  <ul className="mt-4 space-y-2 text-[0.75rem]">
                    {items.map((it) => <li key={it} className="flex items-center gap-2"><span className="size-1 rounded-full bg-[#F0C33F]" />{it}</li>)}
                  </ul>
                </div>
                <Arrow />
              </li>
            ))}
          </ol>
        </div>
        </div>
      </section>
    </>
  );
}

const cal = [
  ["D-30 ~ D-24", "방향을 정하는 주", ["창업 상담과 운영 목표 정리", "상권·점포 조건 검토", "예산 및 준비 항목 확인"]],
  ["D-23 ~ D-17", "가게를 만드는 주", ["점포 계약 전 조건 확인", "공간·주방 동선 협의", "설비와 발주 일정 점검"]],
  ["D-16 ~ D-10", "맛을 익히는 주", ["메뉴 레시피와 조리 실습", "식재료 관리·전처리 교육", "메뉴 구성과 판매가 검토"]],
  ["D-9 ~ D-1", "문 열기 전 마지막 주", ["기물·초도 식자재 체크", "모의 영업과 역할 분담", "홍보물·위생·오픈 준비"]],
  ["D-DAY", "드디어, 우리 가게", ["오픈 매니저 현장 동행", "주문부터 서빙까지 점검", "운영 피드백과 보완"]],
] as const;

const sop = [
  ["book", "메뉴별 조리 SOP", "재료 계량, 조리 순서, 화력·시간 기준을 단계별로 정리해 누구나 같은 품질을 유지합니다."],
  ["clip", "일일 운영 체크리스트", "오픈 전·영업 중·마감 시 확인해야 할 항목을 체계적으로 정리한 Daily Checklist입니다."],
  ["shield", "위생·식자재 관리 기준", "식재료 보관 온도·기한, 교차 오염 방지, 위생 점검 주기를 현장 기준에 맞게 작성합니다."],
  ["users", "직원 역할 분담표", "홀·주방·카운터 역할을 명확히 나누고, 피크타임에 흔들리지 않는 팀 운영 체계를 갖춥니다."],
] as const;

const days = [
  ["DAY 1", "D-03", "가오픈 준비 리허설", "주방 세팅과 식자재를 점검하고, 실제 주문을 가정해 조리·서빙 동선을 맞춥니다.", ["초도 식자재 보관 상태 및 수량 전수 점검", "주방 동선·기물 위치 최종 세팅 및 조정", "메뉴별 조리 타이밍·서빙 순서 역할 시뮬레이션", "홀 응대 멘트·클레임 대응 시나리오 연습"]],
  ["DAY 2", "D-DAY", "그랜드 오픈 현장 지원", "주문 흐름과 조리 속도를 함께 살피며, 피크타임 역할 분담과 현장 대응을 돕습니다.", ["오픈 전 최종 체크 & 개점 준비 현장 동행", "피크타임 주문·조리·서빙 흐름 실시간 조율", "돌발 상황 즉시 판단 및 처리 지원", "마감 후 당일 운영 현황 브리핑"]],
  ["DAY 3", "D+01", "다시 점검 & 운영 피드백", "첫 영업에서 확인된 보완점을 정리하고, 일상 운영에 필요한 체크리스트를 남깁니다.", ["전날 운영 보완점 현장 적용 및 재점검", "메뉴별 원가·폐기율 초기 데이터 정리", "일상 운영 체크리스트 및 SOP 최종 전달", "이후 운영 방향 및 추가 지원 일정 협의"]],
] as const;

export function CalendarSection() {
  return (
    <section className="rounded-3xl border border-neutral-200 bg-white py-8 text-ink md:py-10">
      <div className="px-8 md:px-10">
        <div className="text-center">
          <p className={`text-[0.6875rem] font-bold tracking-[0.14em] ${YEL}`}>FROM PLAN TO OPEN</p>
          <h2 className="mt-3 text-[1.625rem] font-black leading-[1.3] tracking-tight font-gmarket">D-30 ~ D-Day 당신의 오픈을 위한 30일 캘린더</h2>
          <p className="mt-3 text-[0.8125rem] text-neutral-600">핵심 1단계 과정을 공개합니다. 이후 단계의 상세 일정은 1:1 창업 상담 시 자세히 안내해 드립니다.</p>
        </div>
        <div className="mx-auto mt-10 max-w-[64rem] space-y-4">
          <div className="rounded-2xl border border-[#F0C33F] bg-[#faf9f7] p-6">
            <div className="flex items-center justify-between gap-3 border-b border-neutral-200 pb-4">
              <p className="flex flex-wrap items-center gap-3"><span className="rounded-md bg-[#F0C33F] px-2.5 py-1 text-[0.75rem] font-black text-ink">{cal[0][0]}</span><span className="text-[1rem] font-black">{cal[0][1]}</span></p>
              <span className={`shrink-0 rounded-full border border-neutral-200 bg-[#fff8dc] px-3 py-1 text-[0.625rem] font-bold ${YEL}`}>공개 가이드</span>
            </div>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {cal[0][2].map((it, i) => (
                <li key={it} className="rounded-xl border border-neutral-200 bg-[#faf9f7] px-4 py-3">
                  <p className="text-[0.75rem] font-black">{String(i + 1).padStart(2, "0")}. {it}</p>
                  <p className="mt-1 text-[0.6875rem] text-neutral-500">&nbsp;</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {cal.slice(1).map(([d, t, items], ci) => (
            <RevealDiv i={ci} key={d} className="card-soft relative overflow-hidden px-5 py-8 text-center">
              <div aria-hidden className="pointer-events-none absolute inset-0 select-none space-y-3 p-6 text-left text-[0.75rem] text-neutral-400 blur-[3px]">
                {items.map((it) => <p key={it}>{it}</p>)}
              </div>
              <div className="relative">
                <svg viewBox="0 0 24 24" aria-hidden className={`mx-auto size-7 ${YEL}`} fill="currentColor"><path d="M7 10V8a5 5 0 0110 0v2h1a1 1 0 011 1v9a1 1 0 01-1 1H6a1 1 0 01-1-1v-9a1 1 0 011-1h1zm2 0h6V8a3 3 0 00-6 0v2z" /></svg>
                <p className="mt-3 text-[1rem] font-black">{d} · {t}</p>
                <p className="mt-1 text-[0.6875rem] text-neutral-600">{d === "D-DAY" ? "오픈 매니저 현장 동행과 운영 피드백이 포함됩니다." : "해당 단계의 상세 일정과 체크 항목이 포함되어 있습니다."}</p>
                <span className={`mt-4 inline-block rounded-full border border-neutral-200 bg-[#fff8dc] px-4 py-1.5 text-[0.6875rem] font-bold ${YEL}`}>상담 신청 시 커리큘럼 열람</span>
              </div>
            </RevealDiv>
          ))}
          </div>
        </div>
        <p className="mt-6 text-center text-[0.6563rem] text-neutral-500">* 위 일정은 준비 흐름을 안내하는 예시입니다. 점포 상황, 공사 및 인허가 일정에 따라 조정되며, 구체적인 범위는 상담 시 안내합니다.</p>
      </div>
    </section>
  );
}

export function SopSection() {
  return (
    <section className="rounded-3xl border border-neutral-200 bg-white py-8 text-ink md:py-10">
      <div className="px-8 md:px-10">
        <div className="">
          <SecHead dark eyebrow="OPERATIONS MANUAL" title={<>대표 프랜차이즈도 본사 없이는<br />운영한 적 없는<br />매장 전용 맞춤형 SOP 북</>} side={<>우리 가게만의 조리 기준, 서비스 절차,<br />위생 체크리스트를 한 권에 정리합니다.<br />혼자서도 흔들리지 않고 운영하는<br />기준이 됩니다.</>} />
          <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {sop.map(([ic, t, d], sopI) => (
              <RevealLi i={sopI} key={t} className="card-soft p-6">
                <L k={ic} className="size-6 text-[#A97C0A]" />
                <p className="mt-5 text-[1rem] font-black">{t}</p>
                <p className="mt-3 text-[0.7188rem] leading-[1.9] text-neutral-600">{d}</p>
              </RevealLi>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

const steps = [
  ["STEP 01", "오픈 2주 전", "사전 버즈 · 기대감 조성", "SNS 채널 개설, 오픈 예고 콘텐츠 제작, 지역 커뮤니티 사전 홍보. 아직 문을 열기 전부터 가게를 알립니다.", ["SNS 계정 세팅", "오픈 예고 포스팅"]],
  ["STEP 02", "오픈 당일 ~ 1주", "오픈 집중 홍보 · 현장 콘텐츠", "오픈 당일 현장 사진·영상 콘텐츠 제작, 지역 맘카페·커뮤니티 홍보, 오픈 이벤트 진행. 첫 주의 방문 고객을 최대한 늘립니다.", ["현장 콘텐츠 제작", "지역 커뮤니티 홍보"]],
  ["STEP 03", "오픈 2 ~ 3주", "리뷰 확산 · 단골 유입 전략", "방문 고객 리뷰 유도, 네이버 플레이스 최적화, 재방문 쿠폰 운용. 한 번 온 손님이 다시 찾게 만드는 흐름을 만듭니다.", ["리뷰 관리", "플레이스 최적화"]],
  ["STEP 04", "첫 달 마감", "첫 달 성과 분석 · 2개월 차 전략 수립", "매출 데이터와 SNS 반응을 함께 살피고 잘 된 부분과 보완할 점을 정리합니다. 2개월 차 운영 방향과 마케팅 전략을 새롭게 세웁니다.", ["성과 리포트", "2개월 전략 수립"]],
] as const;

export function MarketingPackage() {
  return (
    <section className="rounded-3xl border border-neutral-200 bg-white py-8 text-ink md:py-10">
      <div className="px-8 md:px-10">
        <SecHead dark eyebrow="FIRST MONTH MARKETING" title={<>오픈 첫 달 300% 목표를 위한<br />구해줘창업 전속 마케팅 · PR 패키지</>} side={<>첫 달은 단순한 운영이 아닌,<br />브랜드를 알리는 가장 중요한 시간입니다.<br />4단계 흐름으로 체계적으로 준비합니다.</>} />
        <p className="mt-4 text-[0.6563rem] text-neutral-500">* 300%는 마케팅 목표 수치이며, 개별 매장의 실제 성과는 입지·업종·운영 방식에 따라 다를 수 있습니다.</p>
        <ol className="relative mt-12 space-y-4">
          <span aria-hidden className="absolute bottom-6 left-[1.6875rem] top-6 hidden w-0.5 rounded-full bg-neutral-200 md:block" />
          {steps.map(([s, when, t, d, tags], idx) => (
            <RevealLi i={idx} key={s} className="relative md:pl-[4.5rem]">
              <span className="absolute left-0 top-6 z-10 hidden size-14 place-items-center rounded-full border-4 border-white bg-[#F0C33F] text-[0.9375rem] font-black text-[#1b1b1b] font-gmarket md:grid">{String(idx + 1).padStart(2, "0")}</span>
              <div className="grid items-center gap-4 rounded-2xl border border-neutral-200 bg-[#faf9f7] p-6 md:grid-cols-[10rem_1fr_auto]">
                <div><p className={`text-[0.625rem] font-bold tracking-[0.18em] ${YEL}`}>{s}</p><p className="mt-2 text-[0.9375rem] font-black">{when}</p></div>
                <div><p className="text-[1.0625rem] font-black">{t}</p><p className="mt-3 text-[0.75rem] leading-[1.8] text-neutral-600">{d}</p></div>
                <div className="flex flex-wrap gap-2">
                  {tags.map((tg, i) => <span key={tg} className={`whitespace-nowrap rounded-full border px-3 py-1.5 text-[0.6563rem] font-bold ${i === 0 ? "border-[#F0C33F]/60 bg-[#fff8dc] text-[#A97C0A]" : "border-neutral-200 bg-white text-neutral-700"}`}>{tg}</span>)}
                </div>
              </div>
            </RevealLi>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function Faq() {
  return (
    <section className="rounded-3xl border border-neutral-200 bg-white py-8 text-ink md:py-10">
      <div className="px-8 md:px-10">
        <div className="grid gap-8 lg:grid-cols-[1fr_2fr]">
          <div>
            <p className={`text-[0.6875rem] font-bold tracking-[0.14em] ${YEL}`}>BEFORE YOU START</p>
            <h3 className="mt-4 text-[1.625rem] font-black leading-[1.3] tracking-tight font-gmarket">창업자가<br />궁금해하는 Q&amp;A</h3>
            <p className="mt-5 text-[0.75rem] leading-[1.9] text-neutral-600">막연했던 궁금증부터<br />하나씩 분명하게.</p>
          </div>
          <div>
            {faqs.map(([q, a]) => (
              <details key={q} open className="group card-soft mb-3 px-6 py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[0.9375rem] font-black">
                  <span><span className={`mr-3 ${YEL}`}>Q.</span>{q}</span>
                  <span className="text-neutral-500 group-open:hidden">+</span><span className="hidden text-neutral-500 group-open:inline">–</span>
                </summary>
                <p className="mt-3 text-[0.75rem] leading-[1.9] text-neutral-600">{a}</p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
