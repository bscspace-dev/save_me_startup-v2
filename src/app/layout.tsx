import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import "./globals.css";
// import { TestNoticePopup } from "@/components/TestNoticePopup"; // 테스트 안내 팝업: 다시 켜려면 이 줄과 아래 <TestNoticePopup /> 주석 해제

const noto = Noto_Sans_KR({ subsets: ["latin"], weight: ["400", "500", "700", "900"], variable: "--font-noto" });

export const metadata: Metadata = {
  title: "구해줘창업 | 상가창업 전문 컨설팅 플랫폼",
  description: "매물 탐색부터 전수창업·신규창업까지, 구해줘창업이 함께합니다",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" className={noto.variable}>
      <body>
        {children}
        {/* <TestNoticePopup /> */}
      </body>
    </html>
  );
}
