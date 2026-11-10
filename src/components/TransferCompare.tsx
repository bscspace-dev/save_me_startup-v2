import { RevealLi, DrawX } from "./ScrollReveal";

// 전수창업 상세 하단: 왜 전수창업인가 · 왜 구해줘창업인가 · 비용/항목 비교
// 프랜차이즈·기존 전수창업 수치는 업종 평균 예시값이고, 구해줘창업 금액은 매물의 전수 비용을 쓴다
const FR_AVG = 1593, OLD_AVG = 1840, FR_TOTAL = 18193;

const pills = [
  ["낮은 초기비용", "불필요한 가맹비·인테리어\n마진 없이 시작 가능"],
  ["로열티 0%", "매월 납부하는\n고정 비용이 없어\n수익을 그대로 확보"],
  ["검증된 노하우 전수", "오랜 운영으로 검증된\n레시피와 매장 운영 노하우를\n그대로 전수"],
  ["유연한 운영", "브랜드 제약 없이\n내 상권과 스타일에 맞춰\n자유롭게 운영 가능"],
];
const costOld = [["가맹비 (브랜드 사용)", "1,000만원~"], ["교육비", "500만원~"], ["월 로열티", "매월 매출 3~5%"], ["인테리어/집기 감리 마진", "평당 200만+ 알파"], ["마케팅/광고비", "점주 개별 부담"]];
const costNew = [["가맹비 / 로열티", "0원 (전혀 없음)"], ["사부님 레시피 완전 전수", "100% 노하우 이전"], ["로고, BI/CI 디자인", "무상 브랜드 기획"], ["플레이스 & 오픈 마케팅", "무상 대행 지원"], ["인테리어 도면/3D 설계", "직영가 도급 시공 연계"]];
const brandRows = [["멘야하나비 / 루센스", "1,500"], ["돈카츠 / 돈까스잔치", "880 / 1,000"], ["온센 / 도톰카츠", "2,200"], ["우규 / 미가도시야 / 백소정", "1,760 / 1,650 / 1,650"]];
const matrix = [
  ["상권분석·점포선정", "△", "X"], ["브랜드 기획 및 BI 개발", "X", "X"], ["인테리어·3D 설계", "△", "X"],
  ["마케팅·홍보 세팅", "△", "X"], ["내 매장 전용 SOP북", "X", "X"], ["사부님 직접 전수·평가", "△", "△"],
];
// 분야별 전문가 카드 [직함, 담당, 주요경력]
const experts: [string, string, string[]][] = [
  ["사부님", "레시피 기술전수", ["시그니처 메뉴 개발·운영 경험", "현장 중심 1:1 직접 전수", "사부 운영매장 실전 교육"]],
  ["상가분석 전문가", "상권·계약·현장", ["매장 입지·상권 분석", "임대 계약 조건 검토", "현장 동선 점검"]],
  ["브랜드 기획", "브랜드 디자인", ["네이밍·BI·CI 로고 기획", "메뉴판·패키지 디자인", "브랜드 가이드 제작"]],
  ["인테리어 전문가", "설계·시공", ["3D 도면·동선 설계", "주방·홀 시공 관리", "시공 사양서 제공"]],
  ["전수매니저", "SOP 교육·오픈 지원", ["SOP 교육 진행", "오픈 준비 점검", "개점 후 운영 지원"]],
];
const ticks = [20000, 18000, 16000, 14000, 12000, 10000, 8000, 6000, 4000, 2000, 0];
const n = (v: number) => v.toLocaleString();
const bar = (v: number) => `${Math.max((v / 20000) * 100, 2)}%`;

export function TransferCompare({ price }: { price: number }) {
  const p = price > 0 ? price : 1000;
  const save = p < OLD_AVG ? Math.round(((OLD_AVG - p) / OLD_AVG) * 100) : 0;
  const lower = FR_AVG - p;
  const bars: [string, string, number, string][] = [
    ["프랜차이즈", "(평균)", FR_TOTAL, "bg-gradient-to-b from-neutral-200 to-neutral-500"],
    ["기존 전수창업", "(평균)", OLD_AVG, "bg-gradient-to-b from-neutral-200 to-neutral-500"],
    ["구해줘창업", "(전수창업)", p, "bg-[#FFD21F]"],
  ];
  const rows = [
    ["초기비용", "(가맹비+교육비 등)", `약 ${n(FR_AVG)}만원`, `약 ${n(OLD_AVG)}만원`, `${n(p)}만원`],
    ["로열티", "", "월 매출 0~3%", "0%", "0%"],
    ["5년간 로열티", "(월매출 3,000만원 기준)", "약 3,600만원", "0원", "0원"],
    ["차액가맹금", "(유통마진)", "브랜드별 상이\n(연간 수백만원)", "없음", "없음"],
    ["5년 총비용", "", `약 ${n(FR_TOTAL)}만원`, `약 ${n(OLD_AVG)}만원`, `${n(p)}만원`],
  ];
  return (
    <section className="bg-[#222] px-6 py-14 text-white md:px-10">
      {/* 왜 전수창업인가 */}
      <div className="text-center">
        <h2 className="font-gmarket font-black tracking-tight text-[1.75rem] md:text-[2.125rem]">왜 프랜차이즈가 아닌 &lsquo;전수창업&rsquo;인가?</h2>
        <p className="mt-3 text-[0.8125rem] text-white/80 md:text-[1rem]">가맹비, 로열티, 인테리어 중간 마진 등 불필요한 거품을 싹 빼고 전수비 하나로 해결하세요.</p>
      </div>
      <ul className="mx-auto mt-8 grid max-w-[60rem] grid-cols-2 gap-x-3 gap-y-6 md:grid-cols-4">
        {pills.map(([t, d]) => (
          <li key={t} className="text-center">
            <p className="rounded-full bg-[#4a3d12] px-3 py-2.5 font-gmarket text-[0.9375rem] font-black text-[#F0C33F] md:text-[1.125rem]">{t}</p>
            <p className="mt-3 whitespace-pre-line text-[0.75rem] leading-[1.6] md:text-[0.875rem]">{d}</p>
          </li>
        ))}
      </ul>
      <p className="mt-12 text-center text-[1.125rem] font-medium leading-[1.6] md:text-[1.375rem]">불필요한 비용은 줄이고, 성공 노하우만 가져가는<br />가장 현실적인 창업 방법, 바로 <span className="text-[#F0C33F]">전수창업</span>입니다.</p>
      <hr className="mx-auto mt-12 max-w-[60rem] border-white/60" />

      {/* 왜 구해줘창업인가 */}
      <div className="mt-12 text-center">
        <h2 className="font-gmarket font-black tracking-tight text-[1.75rem] md:text-[2.125rem]">왜 &lsquo;구해줘 창업&rsquo;인가?</h2>
        <p className="mt-4 text-[0.875rem] leading-[1.7] md:text-[1rem]">레시피만 배우는 창업은 이제 그만하세요!<br />상권분석 · BI · 인테리어 · 마케팅 · SOP까지 전문가 팀이 함께합니다.</p>
      </div>
      <div className="mx-auto mt-8 grid max-w-[60rem] gap-5 md:grid-cols-2">
        <div className="relative rounded-2xl border border-white/10 bg-white/[0.06] p-6">
          <DrawX className="pointer-events-none absolute inset-4 z-10 size-[calc(100%-2rem)] text-[#c0392b]/80" />
          <p className="text-center text-[0.6875rem] text-white/60">일반 프랜차이즈 가맹</p>
          <p className="mt-1 text-center text-[1.125rem] font-black text-white/80">부담스러운 거품 창업비</p>
          <ul className="mt-5 border-t border-white/10 pt-3 text-[0.75rem]">
            {costOld.map(([k, v]) => <li key={k} className="flex justify-between py-2"><span className="text-white/55">{k}</span><b className="text-[#d9534f]">{v}</b></li>)}
          </ul>
          <p className="mt-2 border-t border-white/10 pt-3 text-center text-[0.6875rem] text-white/45">지속적인 본사 통제 및 높은 매일 고정비 발생</p>
        </div>
        <div className="relative rounded-2xl border border-[#F0C33F] bg-white/[0.06] p-6">
          <span className="absolute -top-3 right-5 rounded-full bg-[#F0C33F] px-3 py-1 text-[0.625rem] font-bold text-ink">추천: 합리적인 선택</span>
          <p className="text-center text-[0.6875rem] font-bold text-[#F0C33F]">구해줘창업 전수창업</p>
          <p className="mt-1 text-center text-[1.125rem] font-black">단 1회 전수창업비로 완결!</p>
          <ul className="mt-5 border-t border-white/10 pt-3 text-[0.75rem]">
            {costNew.map(([k, v]) => <li key={k} className="flex justify-between py-2"><span className="text-white/80">{k}</span><b className="text-[#F0C33F]">{v}</b></li>)}
          </ul>
          <p className="mt-2 border-t border-white/10 pt-3 text-center text-[0.6875rem] font-bold">&quot;사장님은 레시피 숙지에만 집중하세요!&quot;</p>
        </div>
      </div>

      {/* 업종 사례 */}
      <div className="mx-auto mt-14 max-w-[60rem]">
        <h3 className="inline-block border-b-[5px] border-[#F0C33F] pb-1 font-gmarket text-[1.25rem] font-black md:text-[1.25rem]">일식 한 업종만 봐도 시작 비용이 다릅니다</h3>
        <p className="mt-3 text-[0.8125rem] text-white/80">사례 ) 일식 프랜차이즈 9개 브랜드</p>
        <div className="mt-3 grid gap-4 md:grid-cols-[1.9fr_1fr]">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[30rem] border-collapse text-center text-[0.8125rem]">
              <thead><tr className="border-y border-white/50 text-[0.9375rem] font-black"><th className="py-2.5 pl-3 text-left">브랜드</th><th>초기비용</th><th>로열티</th><th>연 로열티</th></tr></thead>
              <tbody>
                {brandRows.map(([b, c]) => (
                  <tr key={b} className="border-b border-white/35"><td className="py-2.5 pl-3 text-left font-bold text-[#F0C33F]">{b}</td><td>{c}</td><td>2%</td><td>720</td></tr>
                ))}
                <tr className="border-b border-white/35 bg-[#4a3d12] font-black"><td className="py-2.5 pl-3 text-left text-[#F0C33F]">구해줘창업</td><td>{n(p)}</td><td>0%</td><td>0</td></tr>
              </tbody>
            </table>
          </div>
          <div className="space-y-3">
            <div className="rounded-xl border border-[#F0C33F] border-t-4 bg-black/30 p-3 text-[0.75rem]">
              <p className="font-bold text-[#F0C33F]">초기비용 (9개 브랜드 평균)</p>
              <p className="mt-1 font-gmarket text-[1.5rem] font-black">{n(FR_AVG)} → {n(p)}</p>
              {lower > 0 && <p className="mt-1 text-white/80">{n(lower)}만원 낮게 시작</p>}
            </div>
            <div className="rounded-xl border border-[#F0C33F] border-t-4 bg-black/30 p-3 text-[0.75rem]">
              <p className="font-bold text-[#F0C33F]">연간 로열티</p>
              <p className="mt-1 font-gmarket text-[1.5rem] font-black">720 → 0</p>
              <p className="mt-1 text-white/80">매년 720만원이 사장님 몫으로</p>
            </div>
          </div>
        </div>
      </div>

      {/* 경쟁력 */}
      <h2 className="mt-16 text-center font-gmarket font-black tracking-tight text-[1.75rem] md:text-[2.125rem]">구해줘 창업만의 경쟁력</h2>
      <div className="mx-auto mt-8 grid max-w-[60rem] gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-white/15 bg-black/30 p-4">
          <p className="flex flex-wrap items-center gap-2"><span className="rounded-full border border-white/70 px-4 py-1.5 text-[1rem] font-black">5년 총 창업비용 비교</span><span className="text-[0.75rem] text-white/70">(일식 업종 평균 기준)</span></p>
          <div className="mt-4 flex gap-2">
            <div className="flex h-[16rem] shrink-0 flex-col justify-between text-right text-[0.625rem] text-white/80"><span>(만원)</span>{ticks.map((t) => <span key={t}>{n(t)}</span>)}</div>
            <div className="relative grid h-[16rem] flex-1 grid-cols-3 items-end gap-3 border-b border-l border-white/40 px-2">
              {bars.map(([a, b, v, c]) => (
                <div key={a} className="relative flex h-full flex-col justify-end">
                  <p className="mb-1 text-center text-[0.75rem] font-black md:text-[0.875rem]">{n(v)}만원</p>
                  <div className={`${c} w-full`} style={{ height: bar(v) }} />
                  <p className="absolute inset-x-0 -bottom-10 text-center text-[0.6875rem] font-bold leading-tight">{a}<br />{b}</p>
                </div>
              ))}
              {save > 0 && (
                <div className="absolute right-[2%] top-[18%] grid size-[7rem] place-items-center rounded-full border border-[#F0C33F] bg-[#222]/80 text-center text-[0.6875rem] leading-tight">
                  <span>기존 전수창업 대비<br /><b className="font-gmarket text-[1.5rem] text-[#F0C33F]">약 {save}%</b><br /><b className="text-[0.8125rem] text-[#F0C33F]">비용 절감</b></span>
                </div>
              )}
            </div>
          </div>
          <div className="h-10" />
        </div>
        <div className="rounded-2xl border border-white/15 bg-black/30 p-4">
          <p className="inline-block rounded-full border border-white/70 px-4 py-1.5 text-[1rem] font-black">항목별 비교</p>
          <div className="mt-3 overflow-x-auto">
            <table className="w-full min-w-[26rem] border-collapse text-center text-[0.75rem]">
              <thead><tr className="bg-white/10 text-[0.75rem] font-bold"><th className="p-2">구분</th><th className="p-2">프랜차이즈<br />(평균)</th><th className="p-2">기존 전수창업<br />(평균)</th><th className="bg-[#FFD21F] p-2 text-ink">구해줘창업<br />(전수창업)</th></tr></thead>
              <tbody>
                {rows.map(([k, sub, a, b, c], i) => (
                  <tr key={k} className={`border-t border-white/25 ${i === rows.length - 1 ? "text-[0.875rem] font-black" : ""}`}>
                    <td className="p-2 font-bold">{k}{sub && <span className="mt-0.5 block text-[0.5625rem] font-normal text-white/60">{sub}</span>}</td><td className="whitespace-pre-line p-2">{a}</td><td className="whitespace-pre-line p-2">{b}</td><td className="whitespace-pre-line bg-[#FFD21F] p-2 font-black text-ink">{c}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-2 text-[0.625rem] text-white/50">※ 5년간 로열티는 월 매출 3,000만원 가정 기준</p>
        </div>
      </div>

      <ul className="mx-auto mt-8 grid max-w-[60rem] gap-4 md:grid-cols-3">
        {[[`${n(p)}만원`, "가맹비 없이\n창업 준비부터 오픈까지"], ["로열티 0%", "매달 본사에 내는 돈이 없습니다"], ["SOP북 제공", "레시피부터 매장 운영까지\n실전 매뉴얼 제공"]].map(([t, d]) => (
          <li key={t} className="rounded-2xl border border-[#F0C33F]/70 px-4 py-7 text-center">
            <p className="font-gmarket text-[1.75rem] font-black text-[#FFD21F] md:text-[2.25rem]">{t}</p>
            <p className="mt-3 whitespace-pre-line text-[0.8125rem] leading-[1.6]">{d}</p>
          </li>
        ))}
      </ul>

      {/* ●△X 비교표 */}
      <h2 className="mt-16 text-center font-gmarket font-black tracking-tight text-[1.75rem] md:text-[2.125rem]">같은 돈을 쓰더라도 남는 건 다릅니다</h2>
      <div className="mx-auto mt-8 max-w-[56rem] overflow-x-auto">
        <table className="w-full min-w-[28rem] border-collapse text-center text-[0.875rem] md:text-[1rem]">
          <thead><tr className="bg-white/25 text-white/90"><th className="border border-white/70 p-3" /><th className="border border-white/70 p-3 font-medium">프랜차이즈</th><th className="border border-white/70 p-3 font-medium">기존 전수창업</th><th className="border border-white/70 p-3 font-black text-[#a3321a]">구해줘창업</th></tr></thead>
          <tbody>
            {matrix.map(([k, a, b]) => (
              <tr key={k}><td className="border border-white/70 p-3 text-white/90">{k}</td><td className="border border-white/70 font-black">{a}</td><td className="border border-white/70 font-black">{b}</td><td className="border border-white/70 bg-[#d3917f] text-[#8a2a10]">●</td></tr>
            ))}
          </tbody>
        </table>
        <p className="mt-2 flex flex-wrap items-center justify-between gap-x-6 gap-y-1 text-[0.75rem] md:text-[0.8125rem]">
          <span className="flex gap-5"><span>● <b>포함</b></span><span>△ 일부·본사 방식</span><span>X 별도 또는 없음</span></span>
          <span className="text-white/80">기존 전수창업은 레시피 중심 전수 방식 기준입니다.</span>
        </p>
      </div>

      {/* 분야별 전문가 */}
      <h2 className="mt-16 text-center font-gmarket font-black tracking-tight text-[1.75rem] md:text-[2.125rem]">분야별 전문가가 단계마다 책임집니다</h2>
      <ul className="mx-auto mt-8 grid max-w-[64rem] grid-cols-2 gap-3 md:grid-cols-5">
        {experts.map(([role, title, lines], i) => (
          <RevealLi i={i} key={title} className="flex flex-col items-center rounded-3xl border border-[#F0C33F]/70 px-3 pb-6 pt-6 text-center">
            <span aria-hidden className="size-[5.5rem] rounded-full bg-[#FFD21F]" />
            <p className="mt-4 text-[0.6875rem] text-white/60">{role}</p>
            <p className="mt-1 font-gmarket text-[1rem] font-black leading-snug">{title}</p>
            <p className="mt-4 self-start text-[0.6875rem] font-bold text-[#F0C33F]">주요경력</p>
            <ul className="mt-1.5 w-full space-y-1 text-left text-[0.6875rem] leading-[1.6] text-white/75">
              {lines.map((x) => <li key={x}>{x}</li>)}
            </ul>
          </RevealLi>
        ))}
      </ul>
    </section>
  );
}
