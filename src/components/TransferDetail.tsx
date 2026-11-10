import Link from "next/link";
import { photoSrc, type Listing } from "@/lib/data";
import type { TransferInfo } from "@/lib/transfer";
import { ListingConsultButton } from "./ListingConsultButton";
import { youtubeId } from "@/lib/youtube";
import { wrap } from "./TransferLanding";
import { TransferCompare } from "./TransferCompare";
import { ShowcaseIntro, ShowcaseDarkA, ShowcaseHard, ShowcaseNightmare, ShowcaseProcess, ShowcaseProven } from "./TransferShowcase";

// "[밑줄]" 표기를 밑줄 스타일로 바꾼다
const UL = "underline decoration-[#e5301f] decoration-[0.12em] underline-offset-[0.12em]";
function underlined(line: string) {
  return line.split(/(\[[^\]]+\])/).map((s, i) => (/^\[[^\]]+\]$/.test(s) ? <span key={i} className={UL}>{s.slice(1, -1)}</span> : s));
}

export function TransferDetail({ l, t, srcs }: { l: Listing; t: TransferInfo; srcs?: string[] }) {
  const m = t.master;
  // 관리자 등록분은 사부 사진 뒤에 대표 메뉴 사진, 그 뒤에 하단 상세 이미지가 이어 붙어 있다
  const total = srcs?.length ?? 0;
  const nDetail = Math.min(l.transfer?.detailPhotos ?? 0, total);
  const nMenu = Math.min(l.transfer?.menuPhotos ?? 0, total - nDetail);
  const ownerSrcs = srcs?.slice(0, total - nDetail - nMenu);
  const menuSrcs = nMenu ? srcs!.slice(total - nDetail - nMenu, total - nDetail) : [];
  const detailSrcs = nDetail ? srcs!.slice(total - nDetail) : [];
  const names = t.menuNames ?? [];
  const menuText = names.slice(0, 3).join(", ") + (names.length > 3 ? " 등" : "");
  // 사부 사진 (없으면 샘플 사진)
  const photo = ownerSrcs?.[0] ?? (l.photos && !srcs ? photoSrc(l.id, 1) : null);
  const heroPhoto = menuSrcs[0] ?? photo;
  const dish = names[0] || menuText || "우리 가게 대표 메뉴";
  const titleLines = t.heroTitle?.split(/\r?\n/).map((x) => x.trim()).filter(Boolean);
  const videoId = youtubeId(t.videoUrl);
  const consultTitle = `${m.name} 사부(전수자) ${l.title} (전수창업 상담)`;

  return (
    <main className="bg-[#f7f6f4] pb-24">
      <div className={`${wrap} space-y-5 pt-8`}>
      <Link href="/listings?type=전수창업" className="inline-block self-start rounded-lg bg-[#F0C33F] px-4 py-2 text-[0.8125rem] font-bold text-ink transition hover:brightness-95">← 목록으로</Link>

      {/* 히어로: 좌 노랑 문구 / 우 대표 메뉴 사진 */}
      <section className="grid overflow-hidden rounded-3xl lg:min-h-[26rem] lg:grid-cols-2">
        <div className="flex flex-col justify-center bg-[#F0C33F] px-6 py-12 text-ink md:p-9 lg:px-10">
          <p className="self-start rounded-full bg-ink/10 px-4 py-1.5 text-[0.8125rem] font-medium">{t.topTitle || (m.years > 0 ? `${m.years}년간 검증된 ${dish} 맛집의 노하우` : `검증된 ${dish} 맛집의 노하우`)}</p>
          <h1 className="mt-6 font-gmarket text-[1.5rem] font-semibold leading-[1.25] tracking-tight md:text-[1.875rem]">
            {titleLines ? (
              <>
                {titleLines[0]}<br />
                {titleLines.length > 1 && (
                  <span className="mt-1 inline-block text-[2.25rem] font-black leading-[1.2] md:text-[2.875rem]">
                    {titleLines.slice(1).map((ln, i) => <span key={i}>{i > 0 && <br />}{underlined(ln)}</span>)}
                  </span>
                )}
              </>
            ) : (
              <>
                왜 맨땅에서 시작하세요?<br />
                <span className="mt-1 inline-block text-[2.25rem] font-black leading-[1.2] md:text-[2.875rem]">
                  <span className={UL}>{m.years > 0 ? `${m.years}년의 맛집` : "검증된 맛집"}</span><br />
                  <span className={UL}>노하우</span>가 있는데 !
                </span>
              </>
            )}
          </h1>
          <p className="mt-6 text-[0.8125rem] leading-[1.8] text-ink/85">동네를 넘어 전국에서 찾아오는 {dish} 맛집의 비결.<br />레시피 전수부터 창업 컨설팅까지 <b className="text-ink">구해줘창업</b>이 함께합니다.</p>
          <div className="mt-7 flex flex-wrap items-center gap-5">
            <ListingConsultButton id={l.id} title={consultTitle} label="내 가게 창업 상담하기  ↗" className="block rounded-lg bg-ink px-7 py-3.5 text-center text-[0.8125rem] font-bold text-white transition hover:opacity-90" />
          </div>
          <p className="mt-5 text-[0.6875rem]">업종이 정해지지 않았어도, 편하게 시작하세요.</p>
        </div>
        <div className="relative min-h-[18rem] bg-gradient-to-b from-[#3a3a3a] via-[#2d2d2d] to-[#1f1f1f]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          {heroPhoto && <img src={heroPhoto} alt={menuText} fetchPriority="high" decoding="async" className="absolute inset-0 size-full object-cover" />}
        </div>
      </section>

      {/* 시안 구성: 흰색 → 어두움 → 밝음 → 어두움 → 밝음 → 어두움 */}
      <div className="overflow-hidden rounded-3xl border border-neutral-200">
        <ShowcaseIntro name={m.name} photo={photo} videoId={videoId} philosophy={t.philosophy} bio={t.masterBio} dish={dish} names={names} years={m.years} stats={[["사부 현장 경력", `${m.years}년`], ["교육 기간", `${t.days}일`], ["교육 방식", t.method || "1:1 실습"], ["전수 메뉴", `${t.menus}종`]]} />
        <ShowcaseDarkA dish={dish} names={names} years={m.years} srcs={menuSrcs} descs={t.menuDescs ?? (t.menuDesc ? [t.menuDesc] : undefined)} tags={t.menuTags} sales={t.sales} revisit={t.revisit} satisfy={t.satisfy} reviews={t.reviews} detailSrcs={detailSrcs} />
        <ShowcaseHard dish={dish} />
        <ShowcaseNightmare />
        <ShowcaseProcess />
        <ShowcaseProven sales={t.sales} peakNote={t.peakNote} price={l.price} startCosts={t.startCosts} simSales={t.simSales} simMargin={t.simMargin} />
        <TransferCompare price={l.price} />
      </div>

      <div className="pt-5 text-right">
        <Link href="/listings?type=전수창업" className="inline-block rounded-lg bg-[#F0C33F] px-10 py-4 text-[0.875rem] font-bold text-ink transition hover:brightness-95">← 목록으로 돌아가기</Link>
      </div>
      </div>
    </main>
  );
}
