import Link from "next/link";

const chev = (
  <svg viewBox="0 0 24 24" aria-hidden className="size-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 5l-7 7 7 7" /></svg>
);

// 상세 페이지 상단: ‹ 목록 / 매물 상세 (밝은 바탕용)
export function BackCrumb({ href, label, current = "매물 상세", className = "", dark = false }: { href: string; label: string; current?: string; className?: string; dark?: boolean }) {
  return (
    <nav aria-label="breadcrumb" className={`flex items-center gap-2 text-[0.8125rem] ${dark ? "text-white/60" : "text-neutral-500"} ${className}`}>
      <Link href={href} className={`inline-flex items-center gap-1.5 transition ${dark ? "hover:text-white" : "hover:text-ink"}`}>{chev}{label}</Link>
      <span aria-hidden className={dark ? "text-white/30" : "text-neutral-300"}>/</span>
      <span className={dark ? "text-white/90" : "text-ink"}>{current}</span>
    </nav>
  );
}

// 상세 페이지 하단: 목록 / 메인 이동 테두리 버튼
export function BackButton({ href, dark = false }: { href: string; dark?: boolean }) {
  const cls = `inline-block rounded-lg border px-10 py-4 text-[0.875rem] font-bold transition ${dark ? "border-white/30 text-white hover:border-white hover:bg-white/10" : "border-neutral-300 text-ink hover:border-ink hover:bg-white"}`;
  return (
    <div className="inline-flex flex-wrap justify-end gap-3">
      <Link href={href} className={cls}>← 목록으로 돌아가기</Link>
      <Link href="/" className={cls}>메인으로 이동</Link>
    </div>
  );
}

// 안내 페이지 하단: 메인으로 이동 버튼만
export function HomeButton({ dark = false }: { dark?: boolean }) {
  return <Link href="/" className={`inline-block rounded-lg border px-10 py-4 text-[0.875rem] font-bold transition ${dark ? "border-white/30 text-white hover:border-white hover:bg-white/10" : "border-neutral-300 text-ink hover:border-ink hover:bg-white"}`}>메인으로 이동</Link>;
}
