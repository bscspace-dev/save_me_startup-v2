import Link from "next/link";
import { HomeLogo } from "./HomeLogo";

// 매물 유형 → 상단 메뉴 이름
export const navLabel = (kind?: string) => (kind === "프랜차이즈" ? "프랜차이즈창업" : kind);

// 로고: 홈으로 (이미 홈이면 맨 위로)
const Wordmark = HomeLogo;

const cta = "rounded bg-[#F0C33F] px-4 py-1.5 text-[0.875rem] font-bold text-ink transition hover:brightness-95";

// active: 호출하는 쪽 호환용 (데스크톱 메뉴를 없애서 지금은 쓰지 않는다)
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function Header(_props: { active?: string }) {
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

      <header className="sticky top-0 z-50 border-b border-black/5 bg-white/95 font-header backdrop-blur md:hidden">
        {/* 모바일: 로고 + 상담 버튼 */}
        <div className="mx-auto flex h-[3.75rem] max-w-[80rem] items-center justify-between px-6 md:hidden">
          <Wordmark className="h-[2.75rem] w-auto" />
          <Link href="/#consult" className={cta}>무료 창업상담</Link>
        </div>
      </header>
    </>
  );
}
