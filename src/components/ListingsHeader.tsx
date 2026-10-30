"use client";
import { useSearchParams } from "next/navigation";
import { Header, navLabel } from "./Header";

// 정적 내보내기에서는 서버가 searchParams를 알 수 없어 클라이언트에서 읽는다
export function ListingsHeader() {
  const params = useSearchParams();
  return <Header active={navLabel(params.get("type") ?? undefined)} />;
}
