import { Logo } from "./Icons";

export function Footer() {
  return (
    <footer className="bg-[#161616] text-white/50">
      <div className="mx-auto max-w-[1280px] px-6 py-12">
        <div className="flex items-center justify-between">
          <Logo light />
          <nav className="flex gap-6 text-[11px]">
            {["회사소개", "이용약관", "개인정보처리방침", "광고·제휴 문의"].map((n) => (
              <a key={n} href="#" className={n === "개인정보처리방침" ? "font-bold text-white" : "hover:text-white"}>{n}</a>
            ))}
          </nav>
        </div>
        <div className="mt-8 space-y-1 text-[10.5px] leading-relaxed">
          <p className="font-bold text-white/80">구해줘창업</p>
          <p>사업자등록번호 : (등록 예정) &nbsp; 대표자 : [입력 예정] &nbsp; 통신판매업신고 : (등록 예정)</p>
          <p>사업장 주소 : 대구광역시 (입력 예정) &nbsp; 대표 전화 : [입력 예정]</p>
          <p>이메일 : [입력 예정]</p>
        </div>
        <div className="mt-8 flex justify-between border-t border-white/10 pt-5 text-[10px]">
          <p>© 구해줘창업. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
