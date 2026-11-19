import { Suspense } from "react";
import { BackCrumb, HomeButton } from "@/components/BackNav";
import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ListingsHeader } from "@/components/ListingsHeader";
import { ListingsView } from "@/components/Listings";
import { YoutubePopup } from "@/components/YoutubePopup";

export const metadata: Metadata = { title: "매물검색 | 구해줘창업" };

export default function ListingsPage() {
  return (
    <>
      <Suspense fallback={<Header />}>
        <ListingsHeader />
      </Suspense>
      <main className="min-h-[70vh] bg-[#f5f2f2]">
        <div className="mx-auto max-w-[80rem] px-6 pt-8">
          <BackCrumb href="/" label="메인" current="어떤 창업을 찾고 계신가요?" />
        </div>
        <Suspense>
          <ListingsView />
        </Suspense>
        <div className="mx-auto max-w-[80rem] px-6 pb-12 text-right">
          <HomeButton />
        </div>
      </main>
      <Footer />
      <YoutubePopup />
    </>
  );
}
