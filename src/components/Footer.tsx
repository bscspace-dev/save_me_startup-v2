import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-[#161616] text-white/50">
      <div className="mx-auto max-w-[80rem] px-6 py-10 md:py-12">
        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <Link href="/">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo-footer.svg" alt="구해줘창업" className="h-12 w-auto md:h-16" />
          </Link>
          <nav className="flex flex-wrap gap-x-5 gap-y-2 text-[0.8125rem] md:gap-6 md:text-[0.875rem]">
            {([["회사소개", "/about"], ["이용약관", "/terms"], ["개인정보처리방침", "/privacy"], ["광고·제휴 문의", "/partnership"]] as const).map(([n, href]) => (
              <Link key={n} href={href} className="whitespace-nowrap hover:text-white">{n}</Link>
            ))}
          </nav>
        </div>
        <div className="mt-6 space-y-1 text-[0.8125rem] md:mt-8 md:text-[0.875rem] leading-relaxed">
          <p className="font-bold text-white/80">구해줘창업</p>
          <p>사업자등록번호 : (등록 예정) &nbsp; 대표자 : [입력 예정] &nbsp; 통신판매업신고 : (등록 예정)</p>
          <p>사업장 주소 : 대구광역시 (입력 예정) &nbsp; 대표 전화 : [입력 예정]</p>
          <p>이메일 : [입력 예정]</p>
        </div>
        <div className="mt-6 flex justify-between border-t border-white/10 pt-5 text-[0.8125rem] md:mt-8 md:text-[0.875rem]">
          <p>© 구해줘창업. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
