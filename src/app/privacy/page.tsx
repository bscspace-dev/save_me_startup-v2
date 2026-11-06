import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { YoutubePopup } from "@/components/YoutubePopup";

export const metadata: Metadata = {
  title: "개인정보처리방침 | 구해줘창업",
  description: "구해줘창업의 개인정보 처리 목적, 수집 항목, 보유 기간, 안전성 확보조치와 정보주체의 권리에 관한 안내입니다",
};

const SITE = "https://guhaejwo.vercel.app/";
const EFFECTIVE = "2026-11-06";

const th = "border border-neutral-200 bg-neutral-100 px-3 py-2 font-bold";
const td = "border border-neutral-200 px-3 py-2 align-top";
const ul = "list-disc space-y-1 pl-5";

function Section({ no, title, children }: { no: string; title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="font-gmarket text-[1.25rem] font-bold">{no}. {title}</h2>
      <div className="mt-3 space-y-4 text-[0.8125rem] leading-relaxed text-neutral-600">{children}</div>
    </section>
  );
}

function Sub({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="text-[0.9375rem] font-black text-ink">{title}</h3>
      <div className="mt-1.5">{children}</div>
    </div>
  );
}

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-[53.75rem] px-6 py-14">
        <p className="text-[0.6875rem] font-bold tracking-[0.14em] text-[#D49F12]">PRIVACY POLICY</p>
        <h1 className="mt-2 font-gmarket text-[1.875rem] font-black tracking-tight md:text-[2.25rem]">개인정보 처리방침</h1>
        <div className="mt-5 space-y-3 text-[0.875rem] leading-relaxed text-neutral-600">
          <p>구해줘창업({SITE})은(는) 정보주체의 자유와 권리 보호를 위해 「개인정보 보호법」 및 관계 법령이 정한 바를 준수하여, 적법하게 개인정보를 처리하고 안전하게 관리하고 있습니다.</p>
          <p>이에 「개인정보 보호법」 제30조에 따라 정보주체에게 개인정보의 처리와 보호에 관한 절차 및 기준을 안내하고, 이와 관련한 고충을 신속하고 원활하게 처리할 수 있도록 하기 위하여 다음과 같이 개인정보 처리방침을 수립·공개합니다.</p>
        </div>

        <div className="mt-12 space-y-12">
          <Section no="1" title="개인정보의 처리 목적 및 수집 항목">
            <Sub title="1) 개인정보의 처리 목적">
              <p>구해줘창업은(는) 다음의 목적을 위하여 개인정보를 처리합니다.</p>
              <ul className={`mt-2 ${ul}`}>
                <li>고객 상담: 창업 상담 신청과 매물·프랜차이즈 문의에 대한 연락과 안내</li>
                <li>콘텐츠 제공: 문의 내용에 맞는 매물·브랜드·컨설팅 정보 제공</li>
                <li>마케팅 활용: 컨설팅 서비스에 대한 상담 및 안내</li>
                <li>고지사항 전달: 상담 진행과 관련한 안내 및 공지</li>
                <li>안전 및 보안, 부정이용 방지: 부정한 상담 신청과 서비스 악용 방지</li>
                <li>법적 의무 이행: 관계 법령에 따른 기록의 보관</li>
              </ul>
            </Sub>
            <Sub title="2) 수집하는 개인정보 항목">
              <table className="w-full border-collapse text-left text-[0.8125rem]">
                <thead><tr><th className={th}>구분</th><th className={th}>수집 항목</th></tr></thead>
                <tbody>
                  <tr><td className={td}>필수 항목</td><td className={td}>성명, 휴대전화번호</td></tr>
                  <tr><td className={td}>선택 항목</td><td className={td}>관심 창업 유형, 상담 내용(예산·업종·현재 상황 등 정보주체가 직접 적은 내용)</td></tr>
                  <tr><td className={td}>자동 생성 정보</td><td className={td}>접속 IP 정보, 접속 일시, 브라우저 정보 (호스팅 서비스의 접속 기록)</td></tr>
                </tbody>
              </table>
            </Sub>
            <Sub title="3) 수집 방법">
              <p>홈페이지의 상담 신청·매물 문의 양식, 고객센터 문의, 전화 상담</p>
            </Sub>
          </Section>

          <Section no="2" title="개인정보의 보유 기간 및 파기">
            <Sub title="1) 보유 기간">
              <p>기본 보유기간: <b>1년</b> (상담 처리 후 보관하며, 정보주체가 삭제를 요청하면 지체 없이 파기합니다)</p>
              <p className="mt-2 font-bold text-ink">법정 보유기간</p>
              <ul className={`mt-1 ${ul}`}>
                <li>소비자의 불만 또는 분쟁처리에 관한 기록: 3년 (전자상거래 등에서의 소비자보호에 관한 법률 제6조)</li>
                <li>표시·광고에 관한 기록: 6개월 (전자상거래 등에서의 소비자보호에 관한 법률 제6조)</li>
                <li>서비스 이용기록, 접속 로그, 접속 IP 정보: 3개월 (통신비밀보호법 제15조의2)</li>
              </ul>
              <p className="mt-2 text-[0.75rem] text-neutral-400">계약·청약철회, 대금결제, 세법상 장부·증빙, 전자금융거래, 신용정보, 본인확인, 위치정보 관련 기록은 현재 해당 서비스를 제공하지 않아 수집·보관하지 않습니다. 해당 서비스를 시작하면 관계 법령이 정한 기간(예: 계약·청약철회 및 대금결제 기록 5년, 세법 장부·증빙 5년)에 따라 보관하며, 이 방침을 먼저 개정합니다.</p>
            </Sub>
            <Sub title="2) 파기 절차 및 방법">
              <ul className={ul}>
                <li>파기 절차: 파기 사유가 발생한 개인정보를 선정하고, 개인정보 보호책임자의 승인을 받아 개인정보를 파기합니다.</li>
                <li>전자파일: 완전삭제 (덮어쓰기)</li>
                <li>종이문서: 분쇄기로 분쇄</li>
              </ul>
            </Sub>
          </Section>

          <Section no="3" title="개인정보의 처리 위탁 및 제3자 제공">
            <p>구해줘창업은(는) 정보주체의 개인정보를 원칙적으로 외부에 제공하지 않습니다. 다만 정보주체의 동의가 있거나 법령에 근거한 적법한 요청이 있는 경우는 예외로 하며, 이용자가 문의한 매물·가맹본부와 상담 연결이 필요하면 제공받는 자, 목적, 항목을 따로 알리고 동의를 받습니다.</p>
            <table className="w-full border-collapse text-left text-[0.8125rem]">
              <thead><tr><th className={th}>수탁자</th><th className={th}>위탁 업무</th></tr></thead>
              <tbody>
                <tr><td className={td}>Supabase, Inc.</td><td className={td}>상담 신청 정보를 저장하는 데이터베이스 운영</td></tr>
                <tr><td className={td}>Vercel Inc.</td><td className={td}>웹사이트 호스팅 및 전송</td></tr>
              </tbody>
            </table>
            <p>위탁받은 업체가 개인정보를 안전하게 처리하도록 관리·감독합니다. 위탁 업체나 내용이 바뀌면 이 방침을 통해 알립니다.</p>
          </Section>

          <Section no="4" title="자동으로 수집되는 정보와 브라우저 저장소">
            <ul className={ul}>
              <li>구해줘창업은(는) 방문 분석 도구, 광고 식별자, 위치정보, 기기정보 수집 장치를 사용하지 않습니다.</li>
              <li>웹사이트에 접속하면 호스팅·보안을 위해 IP 주소, 접속 일시, 브라우저 정보가 접속 기록으로 남을 수 있습니다. 이 정보는 개인을 식별하기 위한 용도로 쓰지 않으며, 법정 보유기간(3개월) 후 삭제됩니다.</li>
              <li>사이트가 직접 설정하는 쿠키는 없습니다. 팝업의 &quot;24시간 보지 않기&quot; 선택은 정보주체의 브라우저 저장소(localStorage)에만 저장되고 서버로 전송되지 않습니다.</li>
              <li>글꼴을 불러오는 외부 CDN(jsDelivr)과 브랜드 영상 재생을 위한 YouTube(youtube-nocookie.com)에 접속하면 해당 서비스에서 접속 정보가 처리될 수 있습니다.</li>
            </ul>
          </Section>

          <Section no="5" title="개인정보의 안전성 확보조치">
            <ul className={ul}>
              <li><b className="text-ink">관리적 조치:</b> 정기적인 교육 실시, 접근권한 기록 보관, 내부관리계획 수립·시행, 접근권한 관리</li>
              <li><b className="text-ink">기술적 조치:</b> 접근통제시스템 설치·운영, 개인정보 암호화, 보안프로그램 설치·갱신, 접속기록 보관·점검, 고유 계정 사용</li>
              <li><b className="text-ink">물리적 조치:</b> 문서보안, 출입통제</li>
            </ul>
          </Section>

          <Section no="6" title="정보주체의 권리·의무 및 행사방법">
            <p>정보주체는 언제든지 자신의 개인정보에 대한 열람, 정정, 삭제, 처리정지를 요구하고 동의를 철회할 수 있습니다. 필수 항목(성명, 휴대전화번호)의 수집·이용에 동의하지 않을 수 있으나, 이 경우 상담 신청이 제한됩니다.</p>
            <p><b className="text-ink">권리 행사 방법:</b> 서면, 전화, 이메일로 요청하면 지체 없이 조치합니다.</p>
          </Section>

          <Section no="7" title="개인정보 보호책임자 및 권익침해 구제방법">
            <Sub title="1) 개인정보 보호책임자">
              <dl className="grid grid-cols-[6rem_1fr] gap-y-1.5">
                <dt className="text-neutral-400">성명</dt><dd>[입력 예정]</dd>
                <dt className="text-neutral-400">이메일</dt><dd>[입력 예정]</dd>
                <dt className="text-neutral-400">연락처</dt><dd>[입력 예정]</dd>
              </dl>
            </Sub>
            <Sub title="2) 권익침해 구제기관">
              <ul className={ul}>
                <li>개인정보분쟁조정위원회 (1833-6972)</li>
                <li>개인정보침해신고센터 (118)</li>
                <li>대검찰청 사이버수사과 (1301)</li>
                <li>경찰청 사이버안전국 (182)</li>
                <li>개인정보보호위원회 (02-2100-3000)</li>
                <li>한국인터넷진흥원(KISA) (118)</li>
              </ul>
            </Sub>
          </Section>

          <Section no="8" title="개인정보 처리방침의 변경">
            <p>이 개인정보 처리방침은 <b className="text-ink">{EFFECTIVE}</b>부터 적용됩니다.</p>
            <p>변경 고지 방법: 홈페이지 공지사항 게시</p>
          </Section>
        </div>
      </main>
      <Footer />
      <YoutubePopup />
    </>
  );
}
