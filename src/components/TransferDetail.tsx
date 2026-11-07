import Link from "next/link";
import { photoSrc, type Listing } from "@/lib/data";
import type { TransferInfo } from "@/lib/transfer";
import { ListingConsultButton } from "./ListingConsultButton";
import {
  wrap, MasterSection, MenuSection, CostComparison, AllInOne, NeighborhoodSection,
  PreResults, CalendarSection, SopSection, MarketingPackage, Faq,
} from "./TransferLanding";

export function TransferDetail({ l, t, srcs }: { l: Listing; t: TransferInfo; srcs?: string[] }) {
  const m = t.master;
  // 관리자 등록분은 사부 사진 뒤에 대표 메뉴 사진, 그 뒤에 하단 상세 이미지가 이어 붙어 있다
  const total = srcs?.length ?? 0;
  const nDetail = Math.min(l.transfer?.detailPhotos ?? 0, total);
  const nMenu = Math.min(l.transfer?.menuPhotos ?? 0, total - nDetail);
  const ownerSrcs = srcs?.slice(0, total - nDetail - nMenu);
  const menuSrcs = nMenu ? srcs!.slice(total - nDetail - nMenu, total - nDetail) : [];
  const names = t.menuNames ?? [];
  const menuText = names.slice(0, 3).join(", ") + (names.length > 3 ? " 등" : "");
  // 사부 사진 (없으면 샘플 사진)
  const photo = ownerSrcs?.[0] ?? (l.photos && !srcs ? photoSrc(l.id, 1) : null);
  const heroPhoto = menuSrcs[0] ?? photo;
  const dish = names[0] || menuText || "우리 가게 대표 메뉴";
  const consultTitle = `${m.name} 사부(전수자) ${l.title} (전수창업 상담)`;

  return (
    <main className="bg-[#f7f6f4] pb-24">
      <div className={`${wrap} space-y-5 pt-8`}>
      <Link href="/listings?type=전수창업" className="inline-block self-start rounded-lg bg-[#F0C33F] px-4 py-2 text-[0.8125rem] font-bold text-ink transition hover:brightness-95">← 목록으로</Link>

      {/* 히어로: 좌 노랑 문구 / 우 대표 메뉴 사진 */}
      <section className="grid overflow-hidden rounded-3xl lg:min-h-[32rem] lg:grid-cols-2">
        <div className="flex flex-col justify-center bg-[#F0C33F] px-6 py-12 text-ink md:p-9 lg:px-10">
          <p className="inline-flex items-center gap-2 self-start rounded-full bg-ink/10 px-4 py-1.5 text-[0.75rem] font-bold">
            <svg viewBox="0 0 24 24" aria-hidden className="size-3.5" fill="currentColor"><path d="M12 2c1 3.5-1 4.5-2.5 6.5C8 10.5 7 12 7 14.5A5 5 0 0 0 17 15c0-2-1-3.5-2-4.5.3 2-.7 3-1.5 3 1-3-.5-5.5-1.5-11.5zM12 21a3 3 0 0 1-3-3c0-1.5 1.5-2.5 3-4 1.5 1.5 3 2.5 3 4a3 3 0 0 1-3 3z" /></svg>
            줄 서 먹는 전설의 시그니처 메뉴 완전 전수
          </p>
          <h1 className="mt-8 text-[2.25rem] font-semibold leading-[1.15] tracking-tight font-gmarket md:text-[2.875rem]">줄 서 먹는<br />{dish},<br /><span className="underline decoration-[#e5301f] decoration-[0.2em] underline-offset-[0.2em]">당신의 가게가</span><br />될 수 있습니다.</h1>
          <p className="mt-8 text-[0.8125rem] leading-[1.9] text-ink/80">사부의 비법 레시피 전수부터 나만의 브랜드 완성,<br />HQ의 30일 창업 매니지먼트까지 <b className="text-ink">구해줘창업</b>이 함께합니다.</p>
          <div className="mt-8 flex flex-wrap items-center gap-5">
            <ListingConsultButton id={l.id} title={consultTitle} label="내 가게 창업 상담하기  ↗" className="block rounded-lg bg-ink px-7 py-4 text-center text-[0.8125rem] font-bold text-white transition hover:opacity-90" />
          </div>
          <p className="mt-6 text-[0.6875rem]">업종이 정해지지 않았어도, 편하게 시작하세요.</p>
        </div>
        <div className="relative min-h-[22rem] bg-gradient-to-b from-[#3a3a3a] via-[#2d2d2d] to-[#1f1f1f]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          {heroPhoto && <img src={heroPhoto} alt={menuText} fetchPriority="high" decoding="async" className="absolute inset-0 size-full object-cover" />}
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
          <span aria-hidden className="absolute left-1/2 top-1/2 grid size-20 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-[#F0C33F] text-ink shadow-xl"><svg viewBox="0 0 24 24" className="ml-1 size-8" fill="currentColor"><path d="M8 5l11 7-11 7z" /></svg></span>
          <p className="absolute inset-x-6 bottom-5 flex items-center gap-2 text-[0.8125rem] font-bold text-white md:text-[0.9375rem]">
            <span aria-hidden className="text-[1.25rem] leading-none text-[#F0C33F]">&ldquo;</span>
            {m.years > 0 ? `${m.years}년 손맛 내공 그대로! ` : "사부의 손맛 그대로! "}초보 점주도 g단위 레시피로 똑같이 구현합니다.
          </p>
        </div>
      </section>

      {/* 사부 소개부터 Q&A까지 한 카드로 묶고 섹션 사이는 구분선 */}
      <div className="divide-y divide-neutral-200 overflow-hidden rounded-3xl border border-neutral-200 bg-white [&_section]:!rounded-none [&_section]:!border-0 [&_section]:!bg-transparent">
        <div><MasterSection stats={[["사부 현장 경력", `${m.years}년`], ["교육 기간", `${t.days}일`], ["교육 방식", "1:1 실습"], ["전수 메뉴", `${t.menus}종`]]} middle={<MenuSection embedded name={m.name} names={names} srcs={menuSrcs} desc={t.menuDesc} />} name={m.name} photo={photo} quote={t.masterQuote} bio={t.masterBio} sales={t.sales} peakNote={t.peakNote} /></div>
        <div><NeighborhoodSection /></div>
        <div className="tone-dark"><CostComparison /></div>
        <div><AllInOne /></div>
        <div className="tone-dark"><CalendarSection /></div>
        <div><SopSection /></div>
        <div className="tone-dark"><PreResults /></div>
        <div><MarketingPackage /></div>
        <div className="tone-dark"><Faq /></div>
      </div>

      <div className="pt-5 text-right">
        <Link href="/listings?type=전수창업" className="inline-block rounded-lg bg-[#F0C33F] px-10 py-4 text-[0.875rem] font-bold text-ink transition hover:brightness-95">← 목록으로 돌아가기</Link>
      </div>
      </div>
    </main>
  );
}
