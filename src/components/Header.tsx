import Link from "next/link";
import { HomeLogo } from "./HomeLogo";

const nav = [
  { label: "프랜차이즈창업", href: "/listings?type=프랜차이즈" },
  { label: "상가매물", href: "/listings?type=상가매물" },
  { label: "전수창업", href: "/transfer" },
  { label: "신규창업", href: "/identity" },
];

// 매물 유형 → 상단 메뉴 이름
export const navLabel = (kind?: string) => (kind === "프랜차이즈" ? "프랜차이즈창업" : kind);

// 로고: 홈으로 (이미 홈이면 맨 위로)
const Wordmark = HomeLogo;

const cta = "rounded bg-[#F0C33F] px-4 py-1.5 text-[0.875rem] font-bold text-ink transition hover:brightness-95";

export function Header({ active }: { active?: string }) {
  return (
    <>
      {/* 데스크톱 윗줄: 양옆 문구 + 가운데 로고 (스크롤하면 올라가 사라진다) */}
      <div className="hidden border-b border-black/5 bg-white font-header md:block">
        <div className="mx-auto grid h-[4.5rem] max-w-[80rem] grid-cols-[1fr_auto_1fr] items-center px-6">
          <span className="font-gmarket text-[0.75rem] font-medium tracking-[0.14em] text-[#2d2d2d]">ALL-IN-ONE STARTUP PLATFORM</span>
          <Wordmark className="h-[3.5rem] w-auto" />
          <span className="justify-self-end font-gmarket text-[0.875rem] font-medium text-[#2d2d2d]">상가창업 전문 컨설팅 플랫폼</span>
        </div>
      </div>

      <header className="sticky top-0 z-50 border-b border-black/5 bg-white/95 font-header backdrop-blur">
        {/* 모바일: 로고 + 상담 버튼 */}
        <div className="mx-auto flex h-[3.75rem] max-w-[80rem] items-center justify-between px-6 md:hidden">
          <Wordmark className="h-[2.75rem] w-auto" />
          <Link href="/#consult" className={cta}>무료 창업상담</Link>
        </div>
        {/* 데스크톱: 가운데 메뉴 (스크롤해도 위에 붙어 있다) */}
        <div className="relative mx-auto hidden h-[3.25rem] max-w-[80rem] items-center justify-center px-6 md:flex">
          <nav className="flex gap-12 text-[0.9375rem] font-medium text-[#2d2d2d]">
            {nav.map((n) => (
              <a key={n.label} href={n.href} className={n.label === active ? "font-bold text-[#F0C33F]" : "transition hover:text-[#F0C33F]"}>{n.label}</a>
            ))}
          </nav>
        </div>
      </header>
    </>
  );
}
