import { Suspense } from "react";
import type { Metadata } from "next";
import { Header, navLabel } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ListingsView } from "@/components/Listings";
import { YoutubePopup } from "@/components/YoutubePopup";

export const metadata: Metadata = { title: "매물검색 | 구해줘창업" };

export default async function ListingsPage({ searchParams }: { searchParams: Promise<{ type?: string }> }) {
  const { type } = await searchParams;
  return (
    <>
      <Header active={navLabel(type)} />
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
