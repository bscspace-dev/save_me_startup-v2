import Link from "next/link";
import { Logo } from "./Icons";

const nav = [
  { label: "매물탐색", href: "/listings" },
  { label: "전수창업", href: "/transfer" },
  { label: "신규창업", href: "/identity" },
  { label: "창업상담", href: "/#consult" },
];

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
