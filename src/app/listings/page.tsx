import { Suspense } from "react";
import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ListingsView } from "@/components/Listings";
import { YoutubePopup } from "@/components/YoutubePopup";

export const metadata: Metadata = { title: "매물검색 | 구해줘창업" };

export default function ListingsPage() {
  return (
    <>
      <Header active="매물탐색" />
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
