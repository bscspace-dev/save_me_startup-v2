import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header, navLabel } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ListingConsultButton } from "@/components/ListingConsultButton";
import { Reveal } from "@/components/Reveal";
import { YoutubePopup } from "@/components/YoutubePopup";
import { kindBadge, listings, won } from "@/lib/data";
import { FranchiseDetail } from "@/components/FranchiseDetail";
import { franchises } from "@/lib/franchise";
import { ShopDetail } from "@/components/ShopDetail";
import { shops } from "@/lib/shop";
import { TransferDetail } from "@/components/TransferDetail";
import { transfers } from "@/lib/transfer";

type Props = { params: Promise<{ id: string }> };

export function generateStaticParams() {
  return listings.map((l) => ({ id: String(l.id) }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const l = listings.find((x) => String(x.id) === id);
  return { title: l ? `${l.title} | 구해줘창업` : "매물 상세 | 구해줘창업" };
}

export default async function ListingDetail({ params }: Props) {
  const { id } = await params;
  const l = listings.find((x) => String(x.id) === id);
  if (!l) notFound();

  const franchise = l.kind === "프랜차이즈" ? franchises[l.id] : undefined;
  if (franchise) {
    return (
      <>
        <Header active={navLabel(l.kind)} />
        <FranchiseDetail l={l} f={franchise} />
        <Footer />
        <YoutubePopup />
      </>
    );
  }

  const shop = l.kind === "상가매물" ? shops[l.id] : undefined;
  if (shop) {
    return (
      <>
        <Header active={navLabel(l.kind)} />
        <ShopDetail l={l} s={shop} />
        <Footer />
        <YoutubePopup />
      </>
    );
  }

  const transfer = l.kind === "전수창업" ? transfers[l.id] : undefined;
  if (transfer) {
    return (
      <>
        <Header active={navLabel(l.kind)} />
        <TransferDetail l={l} t={transfer} />
        <Footer />
        <YoutubePopup />
      </>
    );
  }

  const rows = [
    ["매물번호", String(l.id)],
    ["지역", `대구 ${l.region}`],
    ["업종", l.category],
    ["운영방식", l.op],
    ["창업비용", `약 ${won(l.cost)}원`],
    ["면적", `약 ${l.area}㎡`],
  ];
  const related = listings.filter((x) => x.kind === l.kind && x.id !== l.id && !x.sold).slice(0, 3);

  return (
    <>
      <Header active={navLabel(l.kind)} />
      <main className="mx-auto max-w-[1100px] px-6 py-10">
        <Link href="/listings" className="text-[12px] text-neutral-500 transition hover:text-brand">← 매물 목록으로</Link>

        <div className="mt-5 grid gap-8 lg:grid-cols-[1.2fr_1fr]">
          <Reveal>
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-neutral-100">
              <div className="absolute left-3 top-3 flex gap-1.5 text-[11px] font-bold text-white">
                {l.rec && <span className="rounded bg-brand px-2 py-0.5">추천</span>}
                {l.isNew && <span className="rounded bg-blue-800 px-2 py-0.5">NEW</span>}
                <span className={`rounded px-2 py-0.5 ${kindBadge[l.kind]}`}>{l.kind}</span>
              </div>
              {l.sold && <div className="absolute inset-0 grid place-items-center bg-black/55 text-[20px] font-bold text-white">계약완료</div>}
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="text-[12px] text-neutral-400">[{l.id}] 대구 {l.region} | {l.category}</p>
            <h1 className="mt-2 text-[26px] font-black leading-snug">{l.title}</h1>
            <p className="mt-5 text-[28px] font-black text-brand">{won(l.price)}원</p>

            <dl className="mt-6 divide-y divide-neutral-100 border-y border-neutral-200 text-[13px]">
              {rows.map(([k, v]) => (
                <div key={k} className="flex py-3"><dt className="w-[96px] text-neutral-400">{k}</dt><dd className="font-bold">{v}</dd></div>
              ))}
            </dl>

            {l.sold ? (
              <p className="mt-6 rounded bg-neutral-100 py-3.5 text-center text-[13px] font-bold text-neutral-500">계약이 완료된 매물입니다</p>
            ) : (
              <ListingConsultButton id={l.id} title={l.title} />
            )}
          </Reveal>
        </div>

        <Reveal>
          <section className="mt-12">
            <h2 className="text-[18px] font-black">매물 소개</h2>
            <p className="mt-3 text-[13.5px] leading-relaxed text-neutral-600">
              대구 {l.region}에 위치한 {l.category} {l.kind} 매물입니다. 약 {l.area}㎡ 규모이며 {l.op} 방식으로 운영할 수 있습니다.
              자세한 현장 상황과 조건은 상담을 통해 안내해 드립니다.
            </p>
          </section>
        </Reveal>

        {related.length > 0 && (
          <section className="mt-12">
            <h2 className="text-[18px] font-black">같은 유형의 다른 매물</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-3">
              {related.map((r) => (
                <Link key={r.id} href={`/listings/${r.id}`} className="block rounded-lg border border-neutral-200 bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
                  <p className="text-[16px] font-black">{won(r.price)}원</p>
                  <h3 className="mt-2 line-clamp-2 text-[12.5px] text-neutral-700">{r.title}</h3>
                  <p className="mt-2 text-[10.5px] text-neutral-400">[{r.id}] 대구 {r.region} | {r.category}</p>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>
      <div className="mt-16" />
      <Footer />
      <YoutubePopup />
    </>
  );
}
