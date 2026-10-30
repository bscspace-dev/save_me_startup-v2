import { Suspense } from "react";
import type { Metadata } from "next";
import { Header, navLabel } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ListingsView } from "@/components/Listings";
import { YoutubePopup } from "@/components/YoutubePopup";

export const metadata: Metadata = { title: "매물검색 | 구해줘창업" };

type SearchParams = Promise<{ type?: string }>;

// searchParams는 요청 시점 데이터라 Suspense 안에서 읽는다
async function ListingsHeader({ searchParams }: { searchParams: SearchParams }) {
  const { type } = await searchParams;
  return <Header active={navLabel(type)} />;
}

export default function ListingsPage({ searchParams }: { searchParams: SearchParams }) {
  return (
    <>
      <Suspense fallback={<Header />}>
        <ListingsHeader searchParams={searchParams} />
      </Suspense>
      <main className="min-h-[70vh]">
        <Suspense>
          <ListingsView />
        </Suspense>
      </main>
      <Footer />
      <YoutubePopup />
    </>
  );
}
