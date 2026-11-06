import { Suspense } from "react";
import Link from "next/link";
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
          <Link href="/" className="inline-block rounded-lg bg-[#F0C33F] px-4 py-2 text-[0.8125rem] font-bold text-ink transition hover:brightness-95">← 메인으로</Link>
        </div>
        <Suspense>
          <ListingsView />
        </Suspense>
        <div className="mx-auto max-w-[80rem] px-6 pb-12 text-right">
          <Link href="/" className="inline-block rounded-lg bg-[#F0C33F] px-10 py-4 text-[0.875rem] font-bold text-ink transition hover:brightness-95">← 메인으로 돌아가기</Link>
        </div>
      </main>
      <Footer />
      <YoutubePopup />
    </>
  );
}
