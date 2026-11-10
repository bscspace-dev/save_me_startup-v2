import Link from "next/link";
import { Icon } from "./Icons";
import { RevealLi, RevealDiv, GrowBar, DrawX, Highlight } from "./ScrollReveal";

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
    <section id="expert" className="scroll-mt-24 overflow-hidden rounded-3xl border border-neutral-200 bg-white py-8 text-ink md:py-10">
      <div className="px-8 md:px-10">
        <div className="grid items-center gap-10 lg:grid-cols-[1.25fr_1fr]">
          <div className="relative">
          <span aria-hidden className="absolute -bottom-3 -right-3 size-full rounded-2xl border-2 border-[#F0C33F]" />
          <div className="relative flex aspect-[3/2] items-end overflow-hidden rounded-2xl bg-[#1c1c1c]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            {photo && <img src={photo} alt={`${name} 사부(전수자)`} loading="lazy" decoding="async" className="absolute inset-0 size-full object-cover object-top" />}
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
            <h2 className="mt-4 font-black leading-[1.35] tracking-tight font-gmarket text-[1.75rem] md:text-[2.125rem]">맛의 기준을 나누는<br /><Highlight>{name} 사부</Highlight></h2>
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

        {middle && <div className="-mx-8 mt-12 md:-mx-10">{middle}</div>}

        <div className="mt-12 lg:grid lg:grid-cols-[1fr_1.8fr] lg:gap-10">
          <div>
            <p className={`text-[0.6875rem] font-bold tracking-[0.14em] ${YEL}`}>BEYOND THE RECIPE</p>
            <h3 className="mt-4 font-black leading-[1.35] tracking-tight font-gmarket text-[1.75rem] md:text-[2.125rem]">운영 노하우 /<br /><Highlight>장사 철학</Highlight></h3>
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

        <div className="tone-dark -mx-8 -mb-8 mt-12 px-8 py-10 md:-mx-10 md:-mb-10 md:px-10">
          <div className="text-center">
            <h3 className="font-black leading-[1.35] tracking-tight font-gmarket text-[1.75rem] md:text-[2.125rem]">장사 <Highlight>데이터</Highlight>로 증명합니다</h3>
            <p className={`mt-3 text-[0.8125rem] font-bold ${YEL}`}>매출과 관련하여 이만큼 장사가 잘된다는 걸 직접 데이터로 증명합니다.</p>
          </div>
          <div className="mx-auto mt-8 grid max-w-[64rem] gap-5 md:grid-cols-2">
            <div className="card-soft flex flex-col p-6">
              <div className="flex items-center justify-between gap-3">
                <p className={`text-[0.8125rem] font-black ${YEL}`}>전수 매장 월 매출 상승 추이</p>
                <span className="text-[0.6875rem] text-neutral-600">최근 6개월 실적 기준</span>
              </div>
              <ul className="mt-6 flex flex-1 flex-col justify-around gap-5">
                {[["오픈 1개월차", 0], ["오픈 3개월차", 1], ["오픈 6개월차 (안착)", 2]].map(([label, k]) => {
                  const data = sales ?? [3800, 6200, 8500]; // 관리자 입력이 없으면 예시 수치
                  const v = data[k as number] ?? 0;
                  const max = Math.max(...data, 1);
                  return (
                    <li key={label as string}>
                      <div className="flex items-center justify-between text-[0.75rem]">
                        <span className="font-bold">{label}</span>
                        <b className={k === 2 ? "text-[#ff5a48]" : ""}>월 {v.toLocaleString()}만원{k === 2 ? " 달성!" : ""}</b>
                      </div>
                      <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-neutral-200">
                        <GrowBar i={k as number} pct={Math.round((v / max) * 100)} className={`h-full rounded-full ${k === 2 ? "bg-[#e5301f]" : "bg-[#F0C33F]"}`} />
                      </div>
                    </li>
                  );
                })}
              </ul>
              {(() => { const d = sales ?? [3800, 6200, 8500]; return d[0] > 0 && d[2] > d[0] ? (
                <div className="mt-5 flex items-baseline justify-center gap-2 rounded-xl border border-[#e5301f]/40 bg-[#e5301f]/10 px-4 py-4">
                  <span className="text-[0.75rem] font-bold text-neutral-700">오픈 1개월차 대비</span>
                  <span className="text-[2.75rem] font-black leading-none tracking-tight text-[#ff5a48] font-gmarket">{(d[2] / d[0]).toFixed(1)}배</span>
                  <span className="text-[1rem] font-black">성장</span>
                </div>
              ) : null; })()}
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
          <h2 className="mt-3 text-[1.75rem] font-black leading-[1.35] tracking-tight font-gmarket md:text-[2.125rem]">손님이 줄 서는 이유,<br /><Highlight>{name} 사부</Highlight>의 대표메뉴</h2>
          <p className="mt-3 text-[0.8125rem] leading-relaxed text-neutral-600">가게의 중심이 되는 메뉴를 <b className="text-ink">사부가 직접 1:1로 전수</b>합니다.<br /><b className="text-ink">레시피부터 조리 기준, 원가 관리까지</b> 한 번에 배웁니다.</p>
        </div>
        <ul className={`mx-auto mt-10 grid gap-5 ${n === 1 ? "max-w-[21rem]" : n === 2 ? "max-w-[42rem] md:grid-cols-2" : "max-w-[64rem] md:grid-cols-3"}`}>
          {Array.from({ length: n }, (_, k) => (
            <RevealLi i={k} key={k} className="group card-soft overflow-hidden">
              <div className="relative aspect-[4/3] bg-neutral-100">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                {srcs[k] && <img src={srcs[k]} alt={names[k] ?? `대표 메뉴 ${k + 1}`} loading="lazy" decoding="async" className="absolute inset-0 size-full object-cover transition duration-500 group-hover:scale-105" />}
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
  if (embedded) return <div id="menus" className="tone-dark scroll-mt-24 px-8 py-10 md:px-10">{content}</div>;
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
          <div className="card-soft relative p-7">
            <DrawX className="pointer-events-none absolute inset-4 z-10 size-[calc(100%-2rem)] text-[#c0463c]/70" />
            <p className="text-center text-[0.6875rem] font-bold text-neutral-500">일반 프랜차이즈 가맹</p>
            <p className="mt-1 text-center text-[1.25rem] font-black text-neutral-600">부담스러운 거품 창업비</p>
            <ul className="mt-6 divide-y-0 border-t border-neutral-200 pt-4 text-[0.75rem]">
              {costOld.map(([k, v]) => <li key={k} className="flex items-center justify-between py-2.5"><span className="text-neutral-500">{k}</span><b className="text-[#c0463c]">{v}</b></li>)}
            </ul>
            <p className="mt-3 border-t border-neutral-200 pt-4 text-center text-[0.6875rem] text-neutral-500">지속적인 본사 통제 및 높은 매일 고정비 발생</p>
          </div>
          <div className="relative rounded-2xl border border-[#F0C33F] bg-white/[0.07] p-7 text-white">
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

export const aio = [
  ["01", "palette", "브랜드 CI / BI & 패키징 디자인", "매장의 정체성을 규정하는 로고, 시그니처 캐릭터, 전용 컬러 팔레트, 슬로건부터 테이크아웃 컵/패키지, 유니폼까지 시각적 호감도를 극대화합니다.", "전담 브랜드 디자이너 1:1 배치", [
    ["CI/BI 심볼 & 로고 타입", "간판, POS, SNS 프로필 등 온·오프라인에 모두 입체적으로 최적화된 심볼 디자인"],
    ["패키지 & 굿즈 가이드라인", "포장용기, 봉투, 컵홀더, 냅킨, 유니폼, 앞치마 등 통일된 브랜드 룩앤필 구축"],
    ["시그니처 캐릭터 & 스토리", "고객 기억에 남는 스토리텔링 카피라이팅과 브랜드 캐릭터 IP 개발"],
    ["브랜드 스타일 가이드북", "서체, RGB/CMYK 컬러 코드, 그래픽 모티브 매뉴얼집 제공"],
  ]],
  ["02", "layout", "공간 인테리어 & 3D 도면 설계", "예쁜 디자인에 그치지 않고 회전율과 노동 강도를 낮추는 상업 인테리어 전용 동선 도면과 3D 가상 시뮬레이션을 제공합니다.", "상업 공간 전담 건축사 & 디자이너", [
    ["3D 렌더링 시뮬레이션", "시공 전 마감재, 조명, 동선 배치를 눈으로 직접 확인하는 고화질 3D 모델링"],
    ["인테리어 표준 규격 매뉴얼", "시공업체가 바뀌어도 동일 퀄리티를 유지하는 자재 사양서 및 상세 도면"],
    ["주방 & 홀 초밀착 도면", "전기 배선, 가스, 배수, 환기 덕트 용량 사전 계산으로 재시공 리스크 차단"],
    ["파사드 & 간판 가시성 설계", "거리 유동인구의 시선을 단번에 사로잡는 파사드 디자인 및 야간 조명 룩"],
  ]],
  ["03", "clip", "메뉴 엔지니어링 & 레시피 표준화", "누가 조리해도 균일한 맛이 나오도록 조리법을 계량화하고, 마진율 35% 이상을 보장하는 식자재 원가율 분석을 실행합니다.", "메뉴 개발 전문 셰프 팀", [
    ["시그니처 메뉴 개발", "SNS 바이럴을 유도하는 비주얼 특화 시그니처 메뉴 및 미끼 메뉴 구성"],
    ["그램(g) 단위 레시피 북", "숙련도 상관없이 3분 조리가 가능하도록 양념 및 재료 계량 수치화"],
    ["식자재 원가율 & 마진 매핑", "메뉴별 원가 분석표 제공으로 식자재 로스율을 최소화하고 수익률 극대화"],
    ["사전 준비(Mise en place) 가이드", "피크타임 전 식자재 1차 가공 수량 및 파트별 냉장 보관 가이드라인"],
  ]],
  ["04", "mega", "마케팅 전략 & SNS / PR 마케팅", "오픈과 동시에 매장 앞 줄을 서게 만드는 퍼포먼스 마케팅. 네이버 스마트플레이스, 인스타그램 숏폼, 지역 블로그 체험단, 보도자료 PR을 동시 가동합니다.", "바이럴 & PR 퍼포먼스 전문가", [
    ["네이버 플레이스 상위 노출", "지역 키워드 최적화, 대표 키워드 세팅, 영수증 리뷰 이벤트 세팅"],
    ["인스타그램 릴스 / 숏폼 콘텐츠", "메뉴 조리 과정 및 매장 매력을 담은 고화질 숏폼 3~5편 제작 및 타겟팅 광고"],
    ["지역 특화 체험단 릴레이", "오픈 전후 영향력 있는 지역 인플루언서 및 블로거 20~50팀 릴레이 방문 마케팅"],
    ["언론 보도자료 PR 배포", "브랜드 창업 스토리 및 시그니처 메뉴 출시 공식 뉴스 기사 송출로 신뢰도 향상"],
  ]],
  ["05", "flag", "HQ 오픈매니저 현장 실전 세팅", "기획한 브랜딩과 인테리어, 메뉴를 현장에서 구동시키는 마지막 핵심! 3일간 밀착 상주하여 피크타임 오퍼레이션을 완벽히 이관합니다.", "HQ Field Controller 3일 상주", [
    ["가오픈 리허설 & 시뮬레이션", "주문 폭주 상황 재현 및 동선 병목 즉시 해결"],
    ["오픈 당일 현장 밀착 상주", "기계 고장, 재료 소진, 돌발 컴플레인 100% 현장 방어"],
    ["알바 OJT & 롤바인딩", "포지션별 매뉴얼 교육 및 고객 응대 모션 훈련"],
    ["우리 매장 전용 SOP 북 제공", "조닝 라벨링표 + 개점/마감 일일 점검표 최종 이관"],
  ]],
] as const;

export function AllInOne() {
  return (
    <section className="py-8 md:py-10">
      <div className="px-8 md:px-10">
        <div className="text-center">
          <p className={`text-[0.6875rem] font-bold tracking-[0.14em] ${YEL}`}>ALL-IN-ONE BRAND LAUNCH</p>
          <h2 className="mt-3 text-[1.75rem] font-black leading-[1.35] tracking-tight font-gmarket md:text-[2.125rem]">외주 전달용 겉치레가 아닙니다.<br /><Highlight>분야별 실전 전문가 집단</Highlight>이 만드는 원스톱 브랜딩</h2>
          <p className="mt-4 text-[0.8125rem] leading-[1.9] text-neutral-600">각기 다른 외주업체를 찾느라 시간을 낭비하지 마세요.<br />구해줘창업의 분야별 전담 전문가 팀이 기획부터 마케팅까지 하나로 유기적으로 연결합니다.</p>
        </div>
        <ul className="mx-auto mt-10 max-w-[68rem] space-y-4">
          {aio.map(([no, ic, t, d, tag, subs], i) => (
            <RevealLi i={i} key={no} className="card-soft grid gap-6 p-6 lg:grid-cols-[1fr_1.35fr] lg:p-7">
              <div>
                <span className="grid size-11 place-items-center rounded-xl bg-[#F0C33F] text-[0.9375rem] font-black text-ink font-gmarket">{no}</span>
                <p className="mt-5 text-[1.25rem] font-black leading-snug">{t}</p>
                <p className="mt-3 text-[0.75rem] leading-[1.9] text-neutral-600">{d}</p>
                <span className={`mt-4 inline-flex items-center gap-1.5 rounded-full border border-[#F0C33F]/60 bg-[#fff8dc] px-3 py-1.5 text-[0.6875rem] font-bold ${YEL}`}><L k={ic} className="size-3.5" />{tag}</span>
              </div>
              <ul className="grid gap-3 sm:grid-cols-2">
                {subs.map(([st, sd]) => (
                  <li key={st} className="rounded-xl border border-neutral-200 bg-white px-4 py-3.5">
                    <p className="text-[0.8125rem] font-black">{st}</p>
                    <p className="mt-1.5 text-[0.6875rem] leading-[1.7] text-neutral-600">{sd}</p>
                  </li>
                ))}
              </ul>
            </RevealLi>
          ))}
        </ul>
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
  ["현실 01", "엉킨 주방·홀 동선", "배달 기사와 홀 알바, 퇴식 동선이 한곳에서 꼬여 병목 현상 발생. 뚝배기나 뜨거운 음식을 들고 동선이 부딪히는 아찔한 상황 지속."],
  ["현실 02", "조리 지연 & 식기 부족", "주문은 몰리는데 미장플라(사전 재료 준비) 부재로 조리대에서 양념통 찾다가 15분 경과. 식기가 부족해 주방 세척이 멈추는 대혼란."],
  ["현실 03", "알바 멘붕 & 첫 컴플레인", "알바생은 무엇을 해야 할지 몰라 서성이고, 기계 조작 실수와 재료 소진으로 오픈 당일부터 고객 컴플레인이 폭주하며 브랜드 이미지 실추."],
];

export function PreResults() {
  return (
    <>
      <section className="rounded-3xl border border-neutral-200 bg-white py-8 text-ink md:py-10">
        <div className="px-8 md:px-10">
          <SecHead dark center eyebrow="PRE-RESULTS" title="이론상 완벽했던 매장, 오픈 당일 왜 마비될까요?" />
          <p className="mt-5 text-center text-[1rem] font-black leading-[1.7] text-[#ff7468] md:text-[1.125rem]">점주 혼자 감당하는 준비 없는 오픈은<br className="sm:hidden" /> 연습이 아니라 &lsquo;소문난 악재&rsquo;가 됩니다.</p>
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
            <p className="text-[1rem] font-black">구해줘창업 HQ 오픈매니저가 함께하면 현장이 완전히 달라집니다.</p>
            <p className="mt-1 text-[0.75rem]">사전 가오픈 시뮬레이션부터 3일 현장 직접 지휘까지 체계적으로 세팅합니다.</p>
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
  ["운영 흐름", "하루를 같은 순서로", [
    ["flag", "오픈·마감 절차서", "오픈 전 점검부터 마감 정산까지 단계별 정리"],
    ["clip", "일일 운영 체크리스트", "시간대별 점검 항목과 이상 발생 기록"],
    ["users", "직원 역할 분담표", "포지션별 업무 범위와 피크타임 동선"],
  ]],
  ["맛과 서비스", "누가 해도 같은 품질", [
    ["book", "메뉴별 조리 SOP", "g 단위 계량, 조리 순서·화력·시간, 플레이팅"],
    ["mega", "서비스 응대 매뉴얼", "주문 응대 멘트와 클레임 대응 스크립트"],
  ]],
  ["관리 기준", "숫자로 지키는 운영", [
    ["layout", "원가·재고 관리표", "메뉴별 원가율, 발주 주기, 폐기율 기록"],
    ["shield", "위생·식자재 관리 기준", "보관 온도·유통기한, 교차 오염 방지"],
    ["refresh", "장비 사용·점검 가이드", "사용법, 정기 점검, 고장 시 연락망"],
  ]],
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
            <ul className="mt-5 grid gap-3 sm:grid-cols-3">
              {cal[0][2].map((it, i) => (
                <li key={it} className="rounded-xl border border-neutral-200 bg-[#faf9f7] px-4 py-3">
                  <p className="text-[0.75rem] font-black">{String(i + 1).padStart(2, "0")}. {it}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {cal.slice(1).map(([d, t, items], ci) => (
            <RevealDiv i={ci} key={d} className="card-soft relative overflow-hidden px-5 py-8 text-center">
              <div className="relative">
                <svg viewBox="0 0 24 24" aria-hidden className={`mx-auto size-7 ${YEL}`} fill="currentColor"><path d="M7 10V8a5 5 0 0110 0v2h1a1 1 0 011 1v9a1 1 0 01-1 1H6a1 1 0 01-1-1v-9a1 1 0 011-1h1zm2 0h6V8a3 3 0 00-6 0v2z" /></svg>
                <p className={`mt-3 text-[0.6875rem] font-bold tracking-wide ${YEL}`}>{d}</p>
                <p className="mt-1 text-[1rem] font-black">{t}</p>
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
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {sop.map(([group, sub, items], gi) => (
              <RevealDiv i={gi} key={group} className="card-soft p-6">
                <p className={`text-[0.6875rem] font-bold tracking-[0.14em] ${YEL}`}>0{gi + 1} · {group}</p>
                <p className="mt-2 text-[1.1875rem] font-black">{sub}</p>
                <ul className="mt-5 divide-y divide-neutral-200 border-t border-neutral-200">
                  {items.map(([ic, t, d]) => (
                    <li key={t} className="flex gap-3 py-4">
                      <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-[#fff8dc]"><L k={ic} className="size-[1.125rem] text-[#A97C0A]" /></span>
                      <div>
                        <p className="text-[0.875rem] font-black">{t}</p>
                        <p className="mt-1 text-[0.7188rem] leading-[1.7] text-neutral-600">{d}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </RevealDiv>
            ))}
          </div>
          <p className="mt-5 rounded-xl border border-[#F0C33F]/60 bg-[#fff8dc] px-5 py-4 text-[0.75rem] font-bold leading-[1.8] text-ink">사부의 레시피와 우리 매장 조건에 맞춰 작성한 뒤, 오픈매니저 3일 현장 상주 때 현장에 적용하며 최종 이관합니다.</p>
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
