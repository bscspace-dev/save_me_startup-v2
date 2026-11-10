import { Icon } from "./Icons";
import { RevealLi, RevealDiv, GrowBar, Highlight } from "./ScrollReveal";

// 전수창업 상세 (시안 버전) 섹션들. 사부 이름·경력·메뉴·매출은 매물 데이터로 채우고 나머지는 공통 문구
const eyebrow = "text-[0.6875rem] font-bold tracking-[0.14em]";

type Common = { dish: string; names: string[]; years: number };
const yrs = (y: number) => (y > 0 ? `${y}년` : "오랜 시간");

/* ───────── 사부 소개 + 수치 + 장사 철학 (흰 배경) ───────── */
export function ShowcaseIntro({ name, photo, bio, stats, dish, names, years }: Common & { name: string; photo: string | null; bio?: string; stats: [string, string][] }) {
  const chips = [
    `${dish} 레시피 전수`,
    names.length > 1 ? `${names.slice(1, 3).join("·")} 노하우` : "조리 기준·운영 노하우",
    years > 0 ? `${years}년 운영 경험` : "현장 운영 경험",
    "손님 응대 기준",
  ];
  const phil = [
    ["맛은 감이 아니라, 기준으로", `${dish}의 양념 비율, 불조절, 조리 순서를 정리해 누구나 같은 맛을 낼 수 있도록 전수합니다.`],
    ["손님이 다시 찾는 흐름까지", "조리만이 아니라 상차림, 밑반찬, 손님 응대까지 실제 매장에서 통하는 흐름을 함께 익힙니다."],
    ["오래 가는 장사의 기본까지", `${yrs(years)} 쌓아온 운영 경험을 바탕으로 메뉴 구성, 현장 운영, 꾸준히 사랑받는 가게의 기준을 전합니다.`],
  ];
  return (
    <section id="expert" className="scroll-mt-24 bg-white px-6 py-10 text-ink md:px-10 md:py-12">
      <div className="grid items-center gap-10 lg:grid-cols-[1.15fr_1fr]">
        <div className="relative">
          <span aria-hidden className="absolute -bottom-3 -right-3 size-full rounded-2xl border-2 border-[#F0C33F]" />
          <div className="relative aspect-[3/2] overflow-hidden rounded-2xl bg-[#1c1c1c]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            {photo && <img src={photo} alt={`${name} 사부(전수자)`} loading="lazy" decoding="async" className="absolute inset-0 size-full object-cover object-top" />}
            <span className="absolute left-3 top-3 rounded-md bg-[#F0C33F] px-3 py-1 text-[0.8125rem] font-bold text-ink">사부 인터뷰 영상</span>
            <span aria-hidden className="absolute left-1/2 top-1/2 grid size-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-black/55 text-white"><svg viewBox="0 0 24 24" className="ml-0.5 size-6" fill="currentColor"><path d="M8 5l11 7-11 7z" /></svg></span>
          </div>
        </div>
        <div>
          <p className={`${eyebrow} text-[#A97C0A]`}>THE MASTER</p>
          <h2 className="mt-3 font-gmarket font-black leading-[1.4] tracking-tight text-[1.75rem] md:text-[2.125rem]">
            {years > 0 ? `${years}년의 맛과` : "검증된 맛과"}<br />노하우를 전하는<br /><Highlight>{name} 사부</Highlight>
          </h2>
          <p className="mt-5 whitespace-pre-line text-[0.8125rem] leading-[1.9] text-neutral-700">
            {bio ?? `${yrs(years)} 한자리에서 식당을 운영하며 쌓아온 경험.\n전국에서 손님들이 찾아오는 ${dish}의 맛부터\n손님이 다시 찾는 밥상을 만드는 비결까지 전수합니다.`}
          </p>
          <ul className="mt-5 flex flex-wrap gap-2.5 border-t border-ink pt-5">
            {chips.map((c) => (
              <li key={c} className="flex items-center gap-1.5 rounded-full border border-neutral-200 bg-white px-3.5 py-2 text-[0.75rem] font-medium shadow-sm">
                <Icon name="check" className="size-3 text-[#A97C0A]" />{c}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <ul className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-4">
        {stats.map(([k, v]) => (
          <li key={k} className="card-soft px-5 py-4">
            <p className="text-[0.6875rem] text-neutral-500">{k}</p>
            <p className="mt-1 font-gmarket text-[1.75rem] font-black tracking-tight text-ink">{v}</p>
          </li>
        ))}
      </ul>

      <div className="mt-14 lg:grid lg:grid-cols-[1fr_2.2fr] lg:gap-10">
        <div>
          <p className={`${eyebrow} text-[#A97C0A]`}>BEYOND THE RECIPE</p>
          <h3 className="mt-4 font-gmarket text-[1.75rem] font-black leading-[1.35] tracking-tight md:text-[2.125rem]">운영 노하우<br /><Highlight>장사 철학</Highlight></h3>
          <p className="mt-5 text-[0.8125rem] leading-[1.8] text-neutral-700">오래 가는 가게의 시작은<br />화려한 비법보다 흔들리지 않는<br />매일의 기준입니다.</p>
        </div>
        <ol className="mt-8 lg:mt-0">
          {phil.map(([t, d], i) => (
            <li key={t} className="flex gap-5 border-b border-neutral-200 py-5 last:border-0">
              <span className="pt-1 text-[0.875rem] font-bold text-[#A97C0A]">{String(i + 1).padStart(2, "0")}</span>
              <div>
                <p className="text-[1.1875rem] font-black">{t}</p>
                <p className="mt-2 text-[0.8125rem] leading-[1.7] text-neutral-600">{d}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ───────── 어두운 구간 A: 대표 메뉴, WHY, 운영 구조, 판매 기회 ───────── */
const learn = ["레시피 전수", "조리 실습", "원가 관리"];

export function ShowcaseDarkA({ dish, names, years, srcs, descs, bgSrc, sales, revisit, satisfy, reviews, detailSrcs }: Common & { srcs: string[]; descs?: string[]; bgSrc?: string | null; sales?: [number, number, number]; revisit?: number; satisfy?: number; reviews?: [string, string][]; detailSrcs?: string[] }) {
  const n = Math.min(3, Math.max(names.length, srcs.length));
  const s = sales ?? [3800, 6200, 8500];
  const second = names[1];
  const why = [
    ["유행을 타지 않는 대중적인 메뉴", "남녀노소 친숙한 메뉴로, 점심 식사부터 저녁 외식까지\n폭넓은 고객층을 공략할 수 있습니다."],
    ["한 번의 방문을 단골로 만드는 맛", `${years > 0 ? `${years - 1 > 0 ? years - 1 : years}년간` : "오랜 시간"} 다듬어 온 특제 양념과 푸짐한 한 상\n단순한 한 끼를 넘어 다시 생각나는 맛을 전수합니다.`],
    ["점심부터 저녁까지, 폭넓은 판매 기회", `점심에는 든든한 ${dish} 정식\n저녁에는 여럿이 즐기는 술안주 메뉴로 다양한 수요에 대응합니다.`],
    [`${dish} 하나로 완성되는 한 상의 경쟁력`, `${dish}에 ${second ? `${second}와 ` : ""}개성 있는 반찬을 더해\n다른 식당과 차별화되는 식사 경험을 제공합니다.`],
    [`${yrs(years)}의 시행착오를 줄이는 전수창업`, "레시피뿐 아니라 조리 기준과 식재료 관리\n실제 매장 운영 경험까지 배워 창업을 준비할 수 있습니다."],
  ];
  const t1: [string, string[]][] = [
    ["운영 형태", ["식사·정식형", "외식·모임형", "세트·도시락형"]],
    ["주요 고객", ["직장인, 지역 주민", "가족, 직장인, 모임 고객", "1인 가구, 직장인, 가정"]],
    ["메뉴 구성", [`${dish} 정식 +\n${second ?? "밑반찬"}`, `${dish} + 추가 사리 + 주류`, "1인·2인 세트 + 공기밥"]],
    ["운영 방식", ["빠른 조리와\n테이블 회전 중심", "추가 주문과\n객단가 중심", "배달·포장을 통한\n판매 채널 확장"]],
  ];
  const effect = ["점심 고정 수요 및\n회전율 확보", "객단가 상승 및\n저녁 매출 확대", "홀 외 추가 매출 및\n고객층 확대"];
  const t2 = [
    ["매출 채널 다각화", "점심·저녁·배달로 판매 기회 확대", "M3 20h4V12H3zM10 20h4V7h-4zM17 20h4V3h-4z"],
    ["폭넓은 고객층", "혼밥부터 가족 외식, 단체 고객까지 대응", "M9 11a3 3 0 100-6 3 3 0 000 6zM2.5 20c0-3.3 2.9-5.5 6.5-5.5S15.5 16.7 15.5 20M17 5.5a3 3 0 010 5.6M18.5 14.8c1.8.6 3 2.3 3 5.2"],
    ["높은 메뉴 활용도", `하나의 ${dish}을(를) 정식·세트·배달 메뉴로 확장`, "M3 18h18M5 18a7 7 0 0114 0M12 8V6M10 6h4"],
    ["운영 효율성", "공통 식자재와 조리 기준을 활용해 운영 효율 개선", "M12 15a3 3 0 100-6 3 3 0 000 6zM12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1"],
    ["재방문 경쟁력", "익숙한 메뉴와 차별화된 맛으로 단골 형성 기대", "M20 11a8 8 0 00-14-4L4 9M4 4v5h5M4 13a8 8 0 0014 4l2-2M20 20v-5h-5"],
  ];

  return (
    <div className="bg-[#1c1c1c] text-white">
      {/* 대표 메뉴 */}
      {n > 0 && (
        <section id="menus" className="scroll-mt-24 px-6 pb-4 pt-12 md:px-10">
          <div className="text-center">
            <p className={`${eyebrow} text-[#F0C33F]`}>SIGNATURE MENU</p>
            <h2 className="mt-3 font-gmarket font-black leading-[1.35] tracking-tight text-[1.75rem] md:text-[2.125rem]">손님이 줄 서는 이유,<br /><Highlight>사부의 대표 메뉴</Highlight></h2>
            <p className="mt-4 text-[0.875rem] leading-[1.8] text-white/85">가게의 중심이 되는 메뉴를 1:1 전수합니다.<br />레시피부터 조리 기준, 상차림 포인트, 운영 노하우까지 함께 배웁니다.</p>
          </div>
          <ul className={`mx-auto mt-10 grid gap-4 ${n === 1 ? "max-w-[21rem]" : n === 2 ? "max-w-[44rem] md:grid-cols-2" : "max-w-[64rem] md:grid-cols-3"}`}>
            {Array.from({ length: n }, (_, k) => (
              <RevealLi i={k} key={k} className="overflow-hidden rounded-2xl bg-[#2b2b2b]">
                <div className="relative aspect-[4/2.5] bg-neutral-700">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  {srcs[k] && <img src={srcs[k]} alt={names[k] ?? `대표 메뉴 ${k + 1}`} loading="lazy" decoding="async" className="absolute inset-0 size-full object-cover" />}
                  <span className="absolute right-4 top-2 font-gmarket text-[2rem] font-black leading-none text-white/40">{String(k + 1).padStart(2, "0")}</span>
                </div>
                <div className="p-5">
                  <p className="font-gmarket text-[1.25rem] font-black leading-tight">{names[k] ?? `대표 메뉴 ${k + 1}`}</p>
                  <p className="mt-3 min-h-[3.6rem] text-[0.75rem] leading-[1.8] text-white/70">
                    {descs?.[k] || "가게의 중심이 되는 메뉴를 사부가 직접 1:1로 전수합니다. 레시피부터 조리 기준, 운영 노하우까지 함께 배웁니다."}
                  </p>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {learn.map((x) => <li key={x} className="rounded-full bg-[#1c1c1c] px-3 py-1 text-[0.6875rem] font-bold text-[#F0C33F]">{x}</li>)}
                  </ul>
                </div>
              </RevealLi>
            ))}
          </ul>
          {!!detailSrcs?.length && (
            <div className="mx-auto mt-8 max-w-[48rem] space-y-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              {detailSrcs.map((src, i) => <img key={i} src={src} alt="" loading="lazy" decoding="async" className="w-full rounded-xl" />)}
            </div>
          )}
        </section>
      )}

      {/* WHY */}
      <section className="px-6 py-14 md:px-10">
        <div className="text-center">
          <h2 className="font-gmarket font-black leading-tight tracking-tight text-[#FFD21F] text-[2rem] md:text-[2.375rem]">WHY {dish}?</h2>
          <p className="mt-5 text-[0.9375rem] font-light leading-[1.7] text-white/85 md:text-[1rem]">맛있는 메뉴는 많습니다. 하지만 장사가 되는 메뉴는 다릅니다.<br /><b className="font-bold">{years > 0 ? `${years - 1 > 0 ? years - 1 : years}년간` : "오랜 시간"} 실제 매장에서 판매해 온 {dish}의 경쟁력</b></p>
        </div>
        <ol className="mx-auto mt-10 max-w-[48rem] space-y-9 rounded-[2rem] border border-white/70 px-6 py-10 text-center md:px-12">
          {why.map(([t, d], i) => (
            <li key={t}>
              <p className="font-gmarket text-[1.1875rem] font-black leading-snug text-[#FFD21F] md:text-[1.25rem]">{String(i + 1).padStart(2, "0")}. {t}</p>
              <p className="mt-2 whitespace-pre-line text-[0.875rem] font-light leading-[1.7] text-white/85 md:text-[1rem]">{d}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* 운영 구조 */}
      <section className="px-6 pb-14 md:px-10">
        <h2 className="text-center font-gmarket font-black leading-tight tracking-tight text-[#FFD21F] text-[1.75rem] md:text-[2.125rem]">매출로 연결되는 운영 구조</h2>
        <div className="mx-auto mt-8 max-w-[56rem] space-y-5 text-ink">
          <div className="overflow-x-auto rounded-3xl">
            <div className="min-w-[34rem] overflow-hidden rounded-3xl bg-white text-center text-[0.8125rem]">
              <div className="grid grid-cols-[0.8fr_1fr_1fr_1fr] bg-[#F7C416] py-2.5 font-black">
                <span className="self-center">구분</span><span>점심 장사</span><span>저녁 장사</span><span>배달·포장</span>
              </div>
              {t1.map(([k, v]) => (
                <div key={k} className="grid grid-cols-[0.8fr_1fr_1fr_1fr] border-t border-neutral-300">
                  <span className="grid place-items-center bg-[#fbeaa6] px-2 py-3 font-black">{k}</span>
                  {v.map((c, ci) => <span key={ci} className="grid place-items-center whitespace-pre-line px-2 py-3 leading-snug">{c}</span>)}
                </div>
              ))}
              <div className="grid grid-cols-[0.8fr_1fr_1fr_1fr] border-t border-neutral-300 bg-[#fbeaa6] font-black">
                <span className="grid place-items-center px-2 py-3">기대효과</span>
                {effect.map((c) => <span key={c} className="grid place-items-center whitespace-pre-line px-2 py-3 leading-snug">{c}</span>)}
              </div>
            </div>
          </div>
          <div className="overflow-x-auto rounded-3xl">
            <div className="min-w-[30rem] overflow-hidden rounded-3xl bg-white text-[0.8125rem]">
              <div className="grid grid-cols-[1fr_1.6fr] bg-[#F7C416] py-2 text-center font-black"><span>핵심 경쟁력</span><span>기대효과</span></div>
              {t2.map(([k, v, ic]) => (
                <div key={k} className="grid grid-cols-[1fr_1.6fr] items-center border-t border-neutral-300">
                  <span className="flex items-center gap-3 bg-[#fbeaa6]/50 px-4 py-3 font-black"><svg viewBox="0 0 24 24" aria-hidden className="size-5 shrink-0 text-[#F2B600]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d={ic} /></svg>{k}</span>
                  <span className="px-4 py-3">{v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 판매 기회 + 실적 수치 */}
      <section className="relative overflow-hidden px-6 pb-12 pt-6 md:px-10">
        <h2 className="relative text-center font-gmarket font-black leading-[1.35] tracking-tight text-[1.75rem] md:text-[2.125rem]">
          <span className="text-[#FFD21F]">점심</span>에는 <span className="text-[#FFD21F]">회전율</span><br />
          <span className="text-[#FFD21F]">저녁</span>에는 <span className="text-[#FFD21F]">객단가</span><br />
          <span className="text-[#FFD21F]">배달</span>로는 <span className="text-[#FFD21F]">추가매출</span>까지 !
        </h2>
        <div className="relative mx-auto mt-8 grid aspect-[4/3] max-w-[48rem] place-items-center overflow-hidden rounded-2xl bg-gradient-to-b from-[#2a2118] to-[#120e0a] md:aspect-[16/11]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          {bgSrc && <img src={bgSrc} alt="" aria-hidden loading="lazy" decoding="async" className="absolute inset-0 size-full object-cover opacity-60" />}
          <div className="absolute inset-0 bg-gradient-to-b from-[#1c1c1c] via-black/30 to-[#1c1c1c]" />
          <p className="relative px-6 text-center text-[0.9375rem] leading-[1.7] md:text-[1rem]">다년간 쌓아온 {dish}의 맛과<br />운영 노하우를 바탕으로<br />다양한 판매 기회를 만들어갑니다.</p>
        </div>
        <div className="mx-auto mt-8 max-w-[56rem]">
          <p className="text-[0.6875rem] text-white/60">※실제 사부의 매장 운영 현황</p>
          <ul className="mt-2 grid grid-flow-col auto-cols-fr gap-2 border-y border-white/25 py-5 text-center">
            {([sales ? ["월 평균 매출", `약${s[1].toLocaleString()}`, "만원"] : null, revisit ? ["재방문율", String(revisit), "%"] : null, satisfy ? ["고객 만족도", String(satisfy), "%"] : null].filter(Boolean) as string[][]).map(([k, v, u]) => (
              <li key={k}>
                <p className="font-gmarket text-[0.8125rem] font-black md:text-[1.125rem]">{k}</p>
                <p className="mt-1 font-gmarket font-black"><span className="text-[#ff1a1a] text-[1.75rem] md:text-[2.25rem]">{v}</span><span className="text-[1rem] md:text-[1.125rem]">{u}</span></p>
              </li>
            ))}
          </ul>
          {!!reviews?.length && (
            <div className="mt-6 grid gap-3 md:grid-cols-[auto_repeat(3,1fr)] md:items-center">
              <p className="font-gmarket text-[1.125rem] font-black leading-snug md:max-w-[8rem]">실제 손님들이<br />직접 남겨주신<br /><span className="text-[#F0C33F]">리얼 후기</span></p>
              {reviews.slice(0, 3).map(([text, from], i) => (
                <div key={i} className="rounded-xl bg-white p-4 text-ink">
                  <p aria-hidden className="text-[1rem] tracking-wider text-[#F7B500]">★★★★★</p>
                  <p className="mt-1 text-[0.75rem] leading-[1.6]">{text}</p>
                  {from && <p className="mt-2 text-[0.6875rem] text-neutral-500">-{from}</p>}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

/* ───────── 밝은 구간 B: 하지만 장사는 망합니다 ───────── */
const hard = [
  ["누구나 아는 맛", "흔한 양념 배합으로 경쟁 매장과 ", "차별화하기 어렵습니다."],
  ["일정하지 않은 맛", "재료 상태, 숙성, 화력, 조리량에 따라 ", "맛이 달라집니다."],
  ["계산되지 않은 원가", "양념과 재료 사용량을 표준화하지 못하면 ", "수익 관리가 어려워집니다."],
  ["느려지는 조리 속도", "주문이 몰리면 조리 동선이 꼬이고 ", "음식 제공이 늦어집니다."],
  ["부족한 운영 노하우", "맛은 있어도 ", "식재료 관리, 회전율, 재방문 전략이 부족", "할 수 있습니다."],
] as const;

const stories = [
  ["인터넷 레시피대로 했는데,\n근처 다른 가게랑 맛이 거의 비슷하더라고요.", "차별화가 안 되니까\n손님이 금방 줄었어요!", "외식업 운영 8개월 차 (경남 창원)"],
  ["처음엔 맛만 보고 양념을 아낌없이\n썼는데, 막상 계산해보니", "원가가 너무 높아서\n수익이 거의 안 남더라고요.", "외식업 운영 1년 6개월 차 (부산 해운대)"],
  ["레시피만 보고 창업했더니\n식재료 관리나 재고, 회전율까지\n전부 시행착오였어요.", "가게를 운영하는 건\n전혀 다른 문제더라고요!", "식당 운영 1년 차 (경기 성남시)"],
];

export function ShowcaseHard({ dish }: { dish: string }) {
  return (
    <section className="bg-[#f7f6f4] px-6 py-14 text-ink md:px-10">
      <div className="text-center">
        <p className="text-[0.9375rem] md:text-[1rem]">인터넷 레시피로도 맛있는 {dish} 한 접시, 충분히 가능합니다!</p>
        <h2 className="mt-3 font-gmarket font-black leading-tight tracking-tight text-[2rem] md:text-[2.375rem]">하지만,<span className="text-[#c0262c]">장사는 망합니다.</span></h2>
        <p className="mt-10 text-[1.0625rem] leading-[1.9] md:text-[1.125rem]">맛있는 한 접시로는<br /><b className="font-black">매출도<br />단골도<br />수익도</b><br />지킬 수 없습니다.</p>
        <h3 className="mt-14 font-gmarket text-[1.5rem] font-black md:text-[1.75rem]">왜 장사가 어려울까요?</h3>
      </div>
      <ol className="mx-auto mt-10 max-w-[48rem] space-y-8">
        {hard.map(([t, a, hl, tail], i) => (
          <RevealLi i={i} key={t} className="flex items-start gap-5 md:gap-6">
            <span className="w-[4.25rem] shrink-0 font-gmarket text-[2.25rem] font-black leading-none text-[#F0C33F] md:w-[6rem] md:text-[3rem]">{String(i + 1).padStart(2, "0")}</span>
            <div className="border-l-2 border-[#F0C33F] pl-4 md:pl-6">
              <p className="font-gmarket text-[1.25rem] font-black md:text-[1.375rem]">{t}</p>
              <p className="mt-1.5 text-[0.8125rem] leading-[1.9] md:text-[1rem]">{a}<mark className="bg-[#F0C33F] px-1">{hl}</mark>{tail}</p>
            </div>
          </RevealLi>
        ))}
      </ol>
      <div className="mx-auto mt-14 max-w-[60rem] rounded-3xl bg-[#fbf3de] p-4 md:p-6">
        <p className="inline-block rounded-full bg-[#F7C416] px-4 py-1.5 text-[0.875rem] font-black md:text-[1rem]">실제 사장님들의 이야기</p>
        <ul className="mt-4 grid gap-4 md:grid-cols-3">
          {stories.map(([a, hl, who]) => (
            <li key={who} className="flex flex-col justify-between rounded-2xl bg-white p-5 text-[0.8125rem] leading-[1.7] shadow-sm">
              <div>
                <p aria-hidden className="font-black text-neutral-400">&ldquo;</p>
                <p className="whitespace-pre-line text-center">{a}</p>
                <p className="mt-1 whitespace-pre-line text-center font-black text-[#c0262c]">{hl}</p>
              </div>
              <p className="mt-4 self-center rounded-full bg-neutral-100 px-3 py-1 text-[0.6875rem] font-bold">{who}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ───────── 어두운 구간 C: 소문난 악재 ───────── */
const traps = [
  ["엉킨 주방·홀 동선", "배달 기사와 홀 알바, 퇴식 동선이 한곳에서 꼬여 병목 현상 발생. 뚝배기나 뜨거운 음식을 들고 동선이 부딪히는 아찔한 상황 지속."],
  ["조리 지연 & 식기 부족", "주문은 몰리는데 미장플라(사전 재료 준비) 부재로 조리대에서 양념통 찾다가 15분 경과. 식기가 부족해 주방 세척이 멈추는 대혼란."],
  ["알바 멘붕 & 첫 컴플레인", "알바생은 무엇을 해야 할지 몰라 서성이고, 기계 조작 실수와 재료 소진으로 오픈 당일부터 고객 컴플레인이 폭주하며 브랜드 이미지 실추."],
];

export function ShowcaseNightmare() {
  return (
    <section className="bg-[#232323] px-6 py-12 text-white md:px-10">
      <div className="text-center">
        <p className="text-[1rem] font-bold md:text-[1.0625rem]">점주 혼자 감당하는 준비 없는 오픈은</p>
        <p className="mt-2 font-gmarket text-[1.25rem] font-black text-[#d9262c] md:text-[1.75rem]">연습이 아니라 &lsquo;소문난 악재&rsquo;가 됩니다.</p>
      </div>
      <ul className="mx-auto mt-10 grid max-w-[64rem] gap-4 md:grid-cols-3">
        {traps.map(([t, d], i) => (
          <RevealLi i={i} key={t} className="rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.07] to-white/[0.02] p-5">
            <p className="flex items-center gap-2"><span className="grid size-6 place-items-center rounded-full bg-[#F0C33F] text-[0.6875rem] font-black text-ink">{String(i + 1).padStart(2, "0")}</span><span className="text-[0.6875rem] font-bold text-[#F0C33F]">현실 {String(i + 1).padStart(2, "0")}</span></p>
            <p className="mt-4 text-[1rem] font-black">{t}</p>
            <p className="mt-2 text-[0.75rem] leading-[1.8] text-white/65">{d}</p>
          </RevealLi>
        ))}
      </ul>
      <div className="mx-auto mt-6 max-w-[64rem] rounded-2xl bg-[#F0C33F] px-6 py-5 text-ink">
        <p className="text-[1rem] font-black">구해줘창업 HQ 오픈매니저가 함께하면 현장이 완전히 달라집니다.</p>
        <p className="mt-1 text-[0.75rem]">사전 가오픈 시뮬레이션부터 3일 현장 직접 지휘까지 체계적으로 세팅합니다.</p>
      </div>
    </section>
  );
}

/* ───────── 밝은 구간 D: 추천 대상 + 전수 과정 ───────── */
const picks = ["검증된\n대표 메뉴가\n필요한 분", "안정적인\n매출 구조를\n원하는 분", "혼자서도\n운영 가능한\n메뉴를 찾는 분", "오픈부터 운영까지\n실질적인 지원을\n받고 싶은 분"];
const steps = [
  ["레시피 전수", "대표 메뉴의 핵심 레시피와\n맛의 기준을 그대로 전수"],
  ["실전 조리 실습", "직접 조리하며 익히는\n실무 중심의 현장 교육"],
  ["매장 운영 노하우", "식재료·원가·인력·재방문 등\n실제 운영 시 핵심 노하우"],
  ["오픈 준비 지원", "메뉴 구성부터 오픈진행까지\n실전 밀착 지원"],
];

export function ShowcaseProcess() {
  return (
    <section className="bg-[#f7f6f4] px-6 py-14 text-ink md:px-10">
      <h2 className="text-center font-gmarket font-black tracking-tight text-[1.75rem] md:text-[2.125rem]">이런 분께 추천드립니다 !</h2>
      <ul className="mx-auto mt-10 grid max-w-[60rem] grid-cols-2 gap-y-8 md:grid-cols-4 md:divide-x md:divide-ink">
        {picks.map((p) => (
          <li key={p} className="flex flex-col items-center px-3 text-center">
            <svg viewBox="0 0 24 24" aria-hidden className="size-14 text-[#F0C33F] md:size-16" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 13l5 5L21 5" /></svg>
            <p className="mt-4 whitespace-pre-line text-[0.9375rem] font-medium leading-[1.5] md:text-[1.0625rem]">{p}</p>
          </li>
        ))}
      </ul>
      <div className="mt-16 text-center">
        <p className="inline-block rounded-full bg-[#2b2b2b] px-8 py-2.5 text-[1rem] font-black text-white md:text-[1.0625rem]">사부님의 레시피</p>
        <h2 className="mt-3 font-gmarket font-black tracking-tight text-[1.75rem] md:text-[2.125rem]">전수 과정 안내</h2>
      </div>
      <ol className="mx-auto mt-10 grid max-w-[60rem] gap-6 md:grid-cols-4">
        {steps.map(([t, d], i) => (
          <RevealLi i={i} key={t} className="relative">
            <p className="text-[0.875rem] font-bold text-neutral-500">{String(i + 1).padStart(2, "0")}</p>
            <p className="mt-1 border-b border-ink pb-1 font-gmarket text-[1.375rem] font-black">{t}</p>
            <p className="mt-2 whitespace-pre-line text-[0.8125rem] leading-[1.6] text-neutral-600">{d}</p>
            {i < steps.length - 1 && <span aria-hidden className="absolute -right-4 top-10 hidden text-[0.875rem] md:block">▶</span>}
          </RevealLi>
        ))}
      </ol>
    </section>
  );
}

/* ───────── 어두운 구간 E: 검증된 매출 + 비용 + 시뮬레이션 ───────── */
export function ShowcaseProven({ sales, peakNote, price, startCosts, simSales, simMargin }: { sales?: [number, number, number]; peakNote?: string; price: number; startCosts?: [number, number, number]; simSales?: number; simMargin?: string }) {
  const won = (v: number) => `₩ ${v.toLocaleString()}만원`;
  const costRows: [string, string][] = [["전수 비용", price > 0 ? won(price) : "상담 시 안내"], ...["초도 식자재", "주요 집기·설비", "기타 오픈 준비 비용"].map((c, i): [string, string] => [c, startCosts?.[i] ? won(startCosts[i]) : "상담 시 안내"])];
  const total = startCosts && price > 0 && startCosts.every((v) => v > 0) ? won(price + startCosts[0] + startCosts[1] + startCosts[2]) : "상담 시 안내";
  const d = sales ?? [3800, 6200, 8500];
  const max = Math.max(...d, 1);
  const rows = [["오픈 1개월 차", 0], ["오픈 3개월 차", 1], ["오픈 6개월 차 (안착)", 2]] as const;
  return (
    <section className="bg-[#161616] px-6 py-14 text-white md:px-10">
      <div className="text-center">
        <p className="text-[0.75rem] tracking-[0.3em] text-[#F0C33F] md:text-[0.9375rem]">PROVEN PERFORMANCE &amp; PROFITABILITY</p>
        <h2 className="mt-3 font-gmarket font-black tracking-tight text-[1.75rem] md:text-[2.125rem]">검증된 매출, <span className="text-[#F0C33F]">현실적인 창업 수익</span></h2>
        <p className="mt-3 text-[0.875rem] text-white/80 md:text-[1rem]">실제 운영 성과를 확인하고, 창업에 필요한 비용과 수익 구조를 살펴보세요.</p>
      </div>

      <div className="mx-auto mt-10 grid max-w-[64rem] gap-6 rounded-2xl border border-white/15 bg-white/[0.04] p-5 md:grid-cols-[1.5fr_1fr] md:p-7">
        <div>
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="font-gmarket text-[1.25rem] font-black"><span className="text-[#F0C33F]">01.</span> 기존 매장의 매출 성과</p>
            <span className="rounded-full border border-[#F0C33F] px-3 py-1 text-[0.6875rem] text-[#F0C33F]">실제 운영 데이터</span>
          </div>
          <p className="mt-3 text-[0.8125rem] text-white/80">최근 6개월 매출 추이</p>
          <ul className="mt-4 space-y-4">
            {rows.map(([label, k]) => (
              <li key={label}>
                <div className="flex items-center justify-between text-[0.8125rem]">
                  <span>{label}</span>
                  <b className={k === 2 ? "text-[#ff3b30]" : ""}>월 {d[k].toLocaleString()}만원{k === 2 ? " 달성!" : ""}</b>
                </div>
                <div className="mt-1.5 h-2.5 overflow-hidden rounded-full bg-white/15">
                  <GrowBar i={k} pct={Math.round((d[k] / max) * 100)} className={`h-full rounded-full ${k === 2 ? "bg-[#ff2d20]" : "bg-[#F0C33F]"}`} />
                </div>
              </li>
            ))}
          </ul>
          {d[0] > 0 && d[2] > d[0] && (
            <div className="mt-5 flex items-center justify-center gap-3 rounded-xl border border-white/15 bg-white/[0.05] px-4 py-3 text-[0.8125rem]">
              <span>오픈 1개월 차 대비 6개월 차</span>
              <span aria-hidden className="h-6 w-px bg-white/25" />
              <span>약 <b className="font-gmarket text-[1.75rem] font-black text-[#F0C33F]">{(d[2] / d[0]).toFixed(1)}배</b> 성장</span>
            </div>
          )}
        </div>
        <div className="md:border-l md:border-white/15 md:pl-6">
          <p className="text-[0.875rem] font-black text-[#F0C33F]">피크타임 만석 및 대기열 증빙</p>
          <div className="mt-3 grid aspect-[4/3] place-items-center rounded-xl border border-dashed border-white/25 text-[0.75rem] text-white/40">피크타임 증빙 사진 영역</div>
          <p className="mt-2 text-[0.6875rem] text-white/60">{peakNote ? `*${peakNote}` : "*증빙 설명을 입력해 주세요"}</p>
        </div>
      </div>

      <div className="mt-8 flex items-center justify-center gap-4 text-[1rem] font-bold md:text-[1.125rem]">
        <span aria-hidden className="hidden h-px w-24 bg-[#F0C33F]/60 sm:block" />그렇다면, 창업하려면 얼마가 필요할까요?<span aria-hidden className="hidden h-px w-24 bg-[#F0C33F]/60 sm:block" />
      </div>

      <div className="mx-auto mt-8 grid max-w-[64rem] gap-5 md:grid-cols-2">
        <RevealDiv className="rounded-2xl border border-white/15 bg-white/[0.04] p-5 md:p-6">
          <p className="font-gmarket text-[1.25rem] font-black"><span className="text-[#F0C33F]">02.</span> 예상 초기 창업 비용</p>
          <ul className="mt-4 overflow-hidden rounded-lg border border-white/25 text-[0.875rem]">
            {costRows.map(([c, v]) => <li key={c} className="flex justify-between border-b border-white/25 px-4 py-2.5 last:border-0"><span>{c}</span><b>{v}</b></li>)}
          </ul>
          <div className="mt-3 flex items-center justify-between rounded-lg bg-gradient-to-r from-[#F7C416] to-[#FFD84A] px-4 py-3 font-black text-ink">
            <span>총 예상 초기 비용</span><span className="text-[1.125rem]">{total}</span>
          </div>
        </RevealDiv>
        <RevealDiv i={1} className="rounded-2xl border border-white/15 bg-white/[0.04] p-5 md:p-6">
          <p className="font-gmarket text-[1.25rem] font-black"><span className="text-[#F0C33F]">03.</span> 창업 수익 시뮬레이션</p>
          <div className="mt-4 grid grid-cols-2 gap-3">
            {[["월 매출 가정", `${(simSales || 3000).toLocaleString()}만원`], ["예상 순이익률 가정", `${simMargin || "20~25"}%`]].map(([k, v]) => (
              <div key={k} className="rounded-xl border border-white/15 bg-white/[0.05] px-3 py-4 text-center">
                <p className="text-[0.75rem]">{k}</p>
                <p className="mt-2 font-gmarket text-[1.375rem] font-black text-[#F0C33F] md:text-[1.75rem]">{v}</p>
              </div>
            ))}
          </div>
          <p className="mt-5 text-[0.6875rem] leading-[1.7] text-white/65">※ 예시 시나리오이며, 실제 수익은 입지·임대료·인건비·운영 방식 등에 따라 달라집니다.</p>
        </RevealDiv>
      </div>
    </section>
  );
}
