import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { YoutubePopup } from "@/components/YoutubePopup";

export const metadata: Metadata = {
  title: "개인정보처리방침 | 구해줘창업",
  description: "구해줘창업의 개인정보 수집·이용·보관·파기 및 이용자 권리에 관한 안내입니다",
};

const UPDATED = "2026년 11월 6일";

const sections: { title: string; body: React.ReactNode }[] = [
  {
    title: "1. 수집하는 개인정보 항목과 방법",
    body: (
      <>
        <p>구해줘창업(이하 &quot;회사&quot;)은 상담 신청과 매물 문의를 처리하기 위해 아래 정보를 수집합니다.</p>
        <table className="mt-3 w-full border-collapse text-left text-[0.8125rem]">
          <thead>
            <tr className="bg-neutral-100"><th className="border border-neutral-200 px-3 py-2">구분</th><th className="border border-neutral-200 px-3 py-2">수집 항목</th><th className="border border-neutral-200 px-3 py-2">수집 방법</th></tr>
          </thead>
          <tbody>
            <tr><td className="border border-neutral-200 px-3 py-2">필수</td><td className="border border-neutral-200 px-3 py-2">이름, 연락처(휴대전화번호)</td><td className="border border-neutral-200 px-3 py-2">상담 신청·매물 문의 양식 입력</td></tr>
            <tr><td className="border border-neutral-200 px-3 py-2">선택</td><td className="border border-neutral-200 px-3 py-2">관심 창업 유형, 상담 내용(예산·업종·현재 상황 등 이용자가 직접 적은 내용)</td><td className="border border-neutral-200 px-3 py-2">상담 신청·매물 문의 양식 입력</td></tr>
          </tbody>
        </table>
        <p className="mt-3">서비스 이용 과정에서 접속 기록(IP 주소, 접속 일시, 브라우저 정보)이 호스팅·보안 목적으로 자동 생성될 수 있습니다.</p>
      </>
    ),
  },
  {
    title: "2. 개인정보의 수집·이용 목적",
    body: (
      <ul className="list-disc space-y-1 pl-5">
        <li>창업 상담 및 매물·프랜차이즈 문의에 대한 연락과 안내</li>
        <li>문의 내용에 맞는 매물·브랜드·컨설팅 정보 제공</li>
        <li>상담 이력 관리 및 서비스 품질 개선</li>
        <li>분쟁 대응 및 부정 이용 방지</li>
      </ul>
    ),
  },
  {
    title: "3. 보유 및 이용 기간",
    body: (
      <>
        <p>수집한 개인정보는 상담 처리가 끝난 뒤 <b>1년간</b> 보관하고 지체 없이 파기합니다. 이용자가 삭제를 요청하면 즉시 파기합니다.</p>
        <p className="mt-2">다만 관계 법령에 따라 보관해야 하는 정보는 해당 기간 동안 보관합니다.</p>
        <ul className="mt-2 list-disc space-y-1 pl-5">
          <li>소비자의 불만 또는 분쟁 처리에 관한 기록: 3년 (전자상거래 등에서의 소비자보호에 관한 법률)</li>
          <li>접속 기록: 3개월 (통신비밀보호법)</li>
        </ul>
      </>
    ),
  },
  {
    title: "4. 개인정보의 제3자 제공",
    body: (
      <p>회사는 이용자의 개인정보를 원칙적으로 외부에 제공하지 않습니다. 다만 이용자가 사전에 동의한 경우, 또는 법령에 근거하여 수사기관 등이 적법한 절차로 요청하는 경우에는 예외로 합니다. 이용자가 문의한 매물·가맹본부와의 상담 연결이 필요한 경우에는 제공받는 자, 목적, 항목을 따로 알리고 동의를 받습니다.</p>
    ),
  },
  {
    title: "5. 개인정보 처리의 위탁",
    body: (
      <>
        <p>회사는 안정적인 서비스 제공을 위해 아래와 같이 개인정보 처리를 위탁합니다.</p>
        <ul className="mt-2 list-disc space-y-1 pl-5">
          <li>Supabase, Inc.: 상담 신청 정보를 저장하는 데이터베이스 운영</li>
          <li>Vercel Inc.: 웹사이트 호스팅 및 전송</li>
        </ul>
        <p className="mt-2">위탁받은 업체가 개인정보를 안전하게 처리하도록 관리·감독합니다. 위탁 업체나 내용이 바뀌면 이 방침을 통해 알립니다.</p>
      </>
    ),
  },
  {
    title: "6. 개인정보의 파기 절차와 방법",
    body: (
      <ul className="list-disc space-y-1 pl-5">
        <li>보유 기간이 끝났거나 처리 목적을 달성한 개인정보는 지체 없이 파기합니다.</li>
        <li>전자 파일 형태의 정보는 복구할 수 없는 방법으로 영구 삭제합니다.</li>
        <li>종이 문서에 기록된 정보는 분쇄하거나 소각합니다.</li>
      </ul>
    ),
  },
  {
    title: "7. 이용자의 권리와 행사 방법",
    body: (
      <>
        <p>이용자는 언제든지 자신의 개인정보에 대해 열람, 정정, 삭제, 처리 정지를 요구할 수 있고 동의를 철회할 수 있습니다. 아래 개인정보 보호책임자에게 이메일 또는 전화로 요청하면 지체 없이 조치합니다.</p>
        <p className="mt-2">필수 항목(이름, 연락처)의 수집·이용에 동의하지 않을 수 있으나, 이 경우 상담 신청이 제한됩니다.</p>
      </>
    ),
  },
  {
    title: "8. 개인정보의 안전성 확보 조치",
    body: (
      <ul className="list-disc space-y-1 pl-5">
        <li>전송 구간 암호화(HTTPS)</li>
        <li>데이터베이스 접근 권한 통제 및 관리자 인증</li>
        <li>개인정보를 취급하는 관리자 최소화</li>
      </ul>
    ),
  },
  {
    title: "9. 쿠키 및 자동 수집 장치",
    body: (
      <p>회사는 이용자 맞춤 광고를 위한 쿠키를 사용하지 않습니다. 관리자 로그인 유지 등 서비스 운영에 필요한 최소한의 브라우저 저장소를 사용할 수 있으며, 브라우저 설정에서 삭제하거나 차단할 수 있습니다.</p>
    ),
  },
  {
    title: "10. 개인정보 보호책임자",
    body: (
      <>
        <dl className="grid grid-cols-[6rem_1fr] gap-y-1.5">
          <dt className="text-neutral-400">책임자</dt><dd>[입력 예정]</dd>
          <dt className="text-neutral-400">이메일</dt><dd>[입력 예정]</dd>
          <dt className="text-neutral-400">연락처</dt><dd>[입력 예정]</dd>
        </dl>
        <p className="mt-3">개인정보 침해에 대한 신고나 상담이 필요하면 아래 기관에 문의할 수 있습니다.</p>
        <ul className="mt-2 list-disc space-y-1 pl-5">
          <li>개인정보침해신고센터: privacy.kisa.or.kr / 국번 없이 118</li>
          <li>개인정보분쟁조정위원회: www.kopico.go.kr / 1833-6972</li>
          <li>대검찰청 사이버수사과: www.spo.go.kr / 국번 없이 1301</li>
          <li>경찰청 사이버수사국: ecrm.police.go.kr / 국번 없이 182</li>
        </ul>
      </>
    ),
  },
  {
    title: "11. 방침의 변경",
    body: <p>이 방침의 내용이 바뀌면 시행 7일 전부터 웹사이트를 통해 알립니다. 이용자의 권리에 중대한 변경이 있으면 30일 전에 알립니다.</p>,
  },
];

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-[53.75rem] px-6 py-14">
        <p className="text-[0.6875rem] font-bold tracking-[0.14em] text-[#D49F12]">PRIVACY POLICY</p>
        <h1 className="mt-2 font-gmarket text-[1.875rem] font-black tracking-tight md:text-[2.25rem]">개인정보처리방침</h1>
        <p className="mt-4 text-[0.875rem] leading-relaxed text-neutral-600">
          구해줘창업은 이용자의 개인정보를 소중하게 다루며, 「개인정보 보호법」 등 관련 법령을 지키고 있습니다.
          이 방침은 어떤 정보를 어떤 목적으로 얼마나 보관하는지, 이용자가 어떤 권리를 가지는지 안내합니다.
        </p>

        <div className="mt-10 space-y-9">
          {sections.map((s) => (
            <section key={s.title}>
              <h2 className="text-[1.0625rem] font-black">{s.title}</h2>
              <div className="mt-3 text-[0.8125rem] leading-relaxed text-neutral-600">{s.body}</div>
            </section>
          ))}
        </div>

        <div className="mt-12 border-t border-neutral-200 pt-5 text-[0.75rem] text-neutral-400">
          <p>공고일자: {UPDATED}</p>
          <p>시행일자: {UPDATED}</p>
        </div>
      </main>
      <Footer />
      <YoutubePopup />
    </>
  );
}
