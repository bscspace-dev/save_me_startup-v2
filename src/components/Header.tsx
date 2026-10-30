import Link from "next/link";
import { Logo } from "./Icons";

const nav = [
  { label: "프랜차이즈창업", href: "/listings?type=프랜차이즈" },
  { label: "상가매물", href: "/listings?type=상가매물" },
  { label: "전수창업", href: "/listings?type=전수창업" },
  { label: "신규창업", href: "/listings?type=신규창업" },
];

// 매물 유형 → 상단 메뉴 이름
export const navLabel = (kind?: string) => (kind === "프랜차이즈" ? "프랜차이즈창업" : kind);

export function Header({ active }: { active?: string }) {
  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-[72px] max-w-[1280px] items-center justify-between px-6">
        <Logo />
        <nav className="hidden gap-9 text-[14px] font-medium text-neutral-600 md:flex">
          {nav.map((n) => (
            <a key={n.label} href={n.href} className={n.label === active ? "font-bold text-brand" : "transition hover:text-brand"}>{n.label}</a>
          ))}
        </nav>
        <div className="flex items-center gap-2 text-[13px] font-bold">
          <Link href="/#consult" className="rounded bg-brand px-4 py-2 text-white transition hover:bg-brand-dark">무료 창업상담</Link>
        </div>
      </div>
    </header>
  );
}
