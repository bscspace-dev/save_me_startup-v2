import type { Metadata } from "next";

export const metadata: Metadata = { title: "매물 코드 만들기", robots: { index: false, follow: false } };

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return children;
}
