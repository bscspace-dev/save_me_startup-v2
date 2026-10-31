import Link from "next/link";
import { won, type Listing } from "@/lib/data";
import { ListingConsultButton } from "./ListingConsultButton";

const FTC = "https://franchise.ftc.go.kr"; // 공정거래위원회 가맹사업정보제공시스템
const cta = "block w-full rounded-xl bg-brand py-4 text-center text-[14.5px] font-bold text-white transition hover:bg-brand-dark";

// 관리자에서 올린 프랜차이즈 홍보 이미지를 가맹본부가 만든 그대로 세로로 이어서 보여준다
export function PromoDetail({ l, srcs }: { l: Listing; srcs: string[] }) {
  const p = l.promo!;
  const consultTitle = `${p.brand} (${l.title})`;
  const rows = [
    ["업종", l.category],
    ["운영모델", l.op],
    ...(p.area ? [["모집지역", p.area]] : []),
    ["등록번호", String(l.id)],
  ];

  return (
    <main className="bg-[#f7f6f4] pb-32 md:pb-24">
      {/* 위 요약과 아래 이미지의 폭을 같은 열(960px)에 맞춘다 */}
      <div className="mx-auto max-w-[960px] px-4 pt-8 sm:px-6">
        <p className="text-[11.5px] text-neutral-500">
          <Link href="/listings?type=프랜차이즈" className="transition hover:text-brand">← 목록으로</Link>
        </p>

        <section className="mt-4 grid overflow-hidden rounded-3xl border border-neutral-200 bg-white md:grid-cols-[0.8fr_1fr]">
          {/* 대표 사진: 목록 카드에 쓴 이미지를 크게 보여준다 */}
          <div className="relative aspect-[16/10] bg-gradient-to-br from-[#6b4a2e] via-[#3f2a18] to-[#24170d] md:aspect-auto md:min-h-[340px]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            {l.thumb && <img src={l.thumb} alt={p.brand} className="absolute inset-0 size-full object-cover" />}
            <div className="absolute left-4 top-4 flex flex-wrap gap-1.5 text-[11px] font-bold text-white">
              <span className="rounded bg-brand px-2.5 py-1">{l.rec ? "추천 브랜드" : "프랜차이즈"}</span>
              <span className="rounded bg-black/60 px-2.5 py-1">신규 가맹 모집</span>
              {p.sponsored && <span className="rounded bg-black/60 px-2.5 py-1">광고</span>}
            </div>
          </div>

          <div className="flex flex-col p-6 sm:p-8">
            {/* 카드와 같은 순서: 브랜드 → 제목·설명 → 창업비용 */}
            <h1 className="break-keep text-[32px] font-black leading-[1.2] tracking-tight sm:text-[36px]">{p.brand}</h1>
            <p className="mt-3 break-keep text-[16px] font-bold leading-snug text-neutral-800">{l.title}</p>
            <p className="mt-2 break-keep text-[13px] leading-relaxed text-neutral-500">{p.desc}</p>

            <div className="mt-5 flex items-baseline justify-between gap-3 rounded-xl bg-[#fff4ea] px-5 py-3">
              <p className="text-[11px] font-bold text-neutral-500">창업비용</p>
              <p className="text-[17px] font-black tracking-tight text-brand">약 {won(l.price)}원</p>
            </div>
            <dl className="mt-3 divide-y divide-neutral-100 text-[12.5px]">
              {rows.map(([k, v]) => (
                <div key={k} className="flex items-baseline justify-between gap-4 py-3">
                  <dt className="shrink-0 text-neutral-400">{k}</dt>
                  <dd className="text-right font-bold">{v}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-auto pt-5">
              {l.sold ? (
                <p className="rounded-xl bg-neutral-100 py-4 text-center text-[13.5px] font-bold text-neutral-500">모집이 마감된 브랜드입니다</p>
              ) : (
                <ListingConsultButton id={l.id} kind="가맹상담" title={consultTitle} label="가맹 상담 신청하기  →" className={cta} />
              )}
            </div>
          </div>
        </section>

        {/* 가맹본부 홍보 이미지: 조각을 틈 없이 이어 붙여 한 장처럼 보이게 한다 */}
        <p className="mt-10 text-center text-[11px] font-bold tracking-[0.14em] text-neutral-400">BRAND STORY · 가맹본부 제공 자료</p>
        <section className="mt-3 overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-sm">
          {srcs.map((s, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img key={i} src={s} alt={`${p.brand} 홍보 ${i + 1}`} loading={i < 2 ? "eager" : "lazy"} className="block h-auto w-full" />
          ))}
        </section>

        {!l.sold && (
          <div className="mt-6 hidden md:block">
            <ListingConsultButton id={l.id} kind="가맹상담" title={consultTitle} label={`${p.brand} 가맹 상담 신청하기  →`} className={cta} />
          </div>
        )}

        <aside className="mt-6 rounded-2xl border border-neutral-200 bg-white px-6 py-5 text-[11px] leading-relaxed text-neutral-400">
          {p.sponsored && <p className="mb-1.5 font-bold text-neutral-600">이 페이지는 가맹본부의 의뢰로 제작된 광고입니다</p>}
          <p>표시된 예상 수익·비용 등 수치는 가맹본부가 제공한 자료와 예상치이며 실제와 다를 수 있습니다. 가맹계약 전 반드시 가맹본부의 정보공개서를 확인하세요. (<a href={FTC} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-brand">가맹사업정보제공시스템 franchise.ftc.go.kr</a>)</p>
        </aside>
      </div>

      {/* 모바일: 긴 페이지를 내려가도 상담 버튼이 항상 보이도록 하단에 고정 */}
      {!l.sold && (
        <div className="fixed inset-x-0 bottom-0 z-40 border-t border-neutral-200 bg-white/95 p-3 backdrop-blur md:hidden">
          <ListingConsultButton id={l.id} kind="가맹상담" title={consultTitle} label="가맹 상담 신청하기  →" className={cta} />
        </div>
      )}
    </main>
  );
}
