import Link from "next/link";
import { photoSrc, type Listing } from "@/lib/data";
import type { TransferInfo } from "@/lib/transfer";
import { ListingConsultButton } from "./ListingConsultButton";
import { Icon } from "./Icons";
import { Head, card, man } from "./DetailParts";

const tabs = [
  ["진행 프로세스", "#process"],
  ["전수자 소개", "#expert"],
  ["교육 과정", "#curriculum"],
  ["비용·제공자료", "#fee"],
  ["창업 홍보 서비스", "#package"],
] as const;

const steps = (days: number) => [
  ["01", "업종 탐색", "배우고 싶은 업종 확인", "창업하려는 업종과 필요한 기술, 희망 지역과 준비 예산을 정합니다."],
  ["02", "전수자 비교", "전수자 선택", "경력, 전문 분야와 교육 내용을 비교해 나에게 맞는 전수자를 선택합니다."],
  ["03", "교육 신청", "상담 및 교육 신청", "궁금한 점을 확인하고 교육 범위, 비용과 가능한 일정을 결정합니다."],
  ["04", "기술 습득", "1:1 기술 교육 수강", `조리 기술, 메뉴 구성과 운영 방법을 ${days}일간 현장에서 직접 배웁니다.`],
  ["05", "매장 준비", "내 매장 창업 준비", "배운 기술을 기준으로 점포, 인테리어, 장비와 인허가를 준비합니다."],
  ["06", "창업 실행", "오픈 홍보 실행", "구해줘창업과 영업, 광고, 콘텐츠와 홍보영상 제작을 진행합니다."],
];

const provided = (menus: number) => [
  ["교육 교재", `대표 메뉴 ${menus}종 레시피 교재`],
  ["실습 체크표", "핵심 공정별 숙련도를 확인하는 점검표"],
  ["원가 계산표", "메뉴별 재료비와 판매가를 산정하는 양식"],
  ["운영 매뉴얼", "오픈·마감·위생·재고 관리 체크리스트"],
  ["메뉴 구성", "가격표와 메뉴판 구성 컨설팅"],
  ["수료 자료", "교육 완료 시 조리·운영 체크리스트 제공"],
];

const services = [
  ["01", "영업 실행", "상권과 업종에 맞는 고객 유치 전략을 세우고 제휴처 발굴과 초기 영업을 실행합니다.", ["영업 전략 수립", "지역 제휴처 제안", "초기 고객 유치"]],
  ["02", "홍보·광고 실행", "네이버 플레이스, SNS, 지역 타깃 광고를 매장 상황에 맞게 기획하고 집행합니다.", ["광고 채널 설계", "콘텐츠 운영", "광고 성과 리포트"]],
  ["03", "홍보영상 제작", "전수받은 기술과 대표 메뉴가 잘 보이도록 매장 소개 영상과 숏폼 콘텐츠를 제작합니다.", ["기획·촬영", "편집·자막", "숏폼 제공"]],
] as const;

const btn = "block rounded-lg bg-brand px-6 py-3.5 text-center text-[13px] font-bold text-white transition hover:bg-brand-dark";

export function TransferDetail({ l, t }: { l: Listing; t: TransferInfo }) {
  const m = t.master;
  const photo = l.photos ? photoSrc(l.id, 1) : null;
  const stats = [
    ["전수자 경력", `${m.years}년`],
    ["교육 기간", `${t.days}일`],
    ["교육 방식", "1:1 실습"],
    ["전수 메뉴", `${t.menus}종`],
  ];

  return (
    <main className="bg-[#f7f6f4] pb-24">
      <div className="mx-auto max-w-[1100px] px-6 pt-8">
        <p className="text-[11.5px] text-neutral-500">
          <Link href="/listings?type=전수창업" className="transition hover:text-brand">← 목록으로</Link>
        </p>

        {/* 상단 소개 */}
        <section className="mt-4 overflow-hidden rounded-3xl bg-gradient-to-br from-[#33231a] to-[#17100b] p-6 text-white md:p-9">
          <div className="grid gap-6 lg:grid-cols-[1.45fr_0.8fr_0.7fr]">
            <div className="flex flex-col">
              <div className="flex flex-wrap gap-1.5 text-[10.5px] font-bold">
                <span className="rounded-full bg-brand px-3 py-1">{m.name} 전수자의 기술전수</span>
                <span className="rounded-full bg-white/15 px-3 py-1">1:1 현장 교육</span>
                <span className="rounded-full bg-white/15 px-3 py-1">영업·홍보 실행 연계</span>
              </div>
              <p className="mt-6 text-[10.5px] font-bold tracking-[0.14em] text-[#ff7a45]">MASTER {m.en}</p>
              <h1 className="mt-3 text-[34px] font-black leading-[1.2] tracking-tight">{t.headline[0]}<br /><span className="text-[#ff5a1f]">{t.headline[1]}</span></h1>
              <p className="mt-4 max-w-[420px] text-[12.5px] leading-relaxed text-white/70">{t.desc}</p>
              <div className="mt-6 flex flex-wrap gap-2.5">
                {l.sold ? (
                  <span className="rounded-lg bg-white/15 px-6 py-3.5 text-[13px] font-bold text-white/80">계약이 완료된 매물입니다</span>
                ) : (
                  <ListingConsultButton id={l.id} title={`${m.name} 전수자 ${l.title} (교육 일정 + 실행 패키지 통합 상담)`} label="교육 일정·실행 패키지 통합 상담  →" className={btn} />
                )}
                <a href="#curriculum" className="block rounded-lg border border-white/30 px-6 py-3.5 text-center text-[13px] font-bold transition hover:bg-white/10">커리큘럼 먼저 보기</a>
              </div>
              <dl className="mt-auto grid grid-cols-3 gap-3 border-t border-white/10 pt-5 text-[12px] max-lg:mt-8">
                {[["전문 분야", m.field], ["현장 경력", `${m.years}년`], ["교육 이력", `누적 ${m.teams}팀`]].map(([k, v]) => (
                  <div key={k}><dt className="text-[10px] text-white/50">{k}</dt><dd className="mt-1 font-black">{v}</dd></div>
                ))}
              </dl>
            </div>

            <div className="relative min-h-[300px] overflow-hidden rounded-2xl bg-gradient-to-b from-[#6b4a2e] via-[#3f2a18] to-[#1b120b]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              {photo && <img src={photo} alt={`${m.name} 전수자`} className="absolute inset-0 size-full object-cover" />}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-4 pt-14">
                <p className="text-[13px] font-black">{m.name} 전수자</p>
                <p className="mt-0.5 text-[10.5px] text-white/70">{m.career}</p>
              </div>
            </div>

            <div className="grid gap-4 lg:grid-rows-[1fr_1.4fr]">
              <div className="flex flex-col justify-between rounded-2xl bg-white/10 p-5">
                <Icon name="user" className="size-6 text-[#ff7a45]" />
                <div>
                  <p className="text-[10px] text-white/50">교육 방식</p>
                  <p className="mt-1 text-[16px] font-black">전수자 1:1 실습</p>
                </div>
              </div>
              <div className="flex flex-col justify-between rounded-2xl bg-brand p-5">
                <div>
                  <p className="text-[10px] text-white/70">기술 전수비</p>
                  <p className="mt-2 text-[28px] font-black leading-none tracking-tight">{man(l.price)}</p>
                </div>
                <div className="mt-6 text-[10px] text-white/80">
                  <p>{t.days}일 1:1 교육</p>
                  <p className="mt-0.5">교육 교재·운영 자료 포함</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 핵심 수치 */}
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map(([k, v]) => (
            <div key={k} className="rounded-2xl border border-neutral-200 bg-white px-6 py-5">
              <p className="text-[10.5px] text-neutral-400">{k}</p>
              <p className="mt-1.5 text-[24px] font-black tracking-tight">{v}</p>
            </div>
          ))}
        </div>

        {/* 섹션 이동 */}
        <nav className="mt-5 grid grid-cols-2 divide-neutral-200 overflow-hidden rounded-2xl border border-neutral-200 bg-white text-center text-[13px] font-bold sm:grid-cols-5 sm:divide-x">
          {tabs.map(([label, href]) => (
            <a key={href} href={href} className="py-4 transition hover:bg-neutral-50 hover:text-brand">{label}</a>
          ))}
        </nav>

        <div className="mt-5 space-y-5">
          {/* 진행 프로세스 */}
          <section id="process" className={`${card} scroll-mt-24`}>
            <Head eyebrow="PROCESS" title="예비 창업자의 전수창업 과정" />
            <p className="mt-2 text-[12px] text-neutral-500">기술을 배우고 내 매장을 시작하려는 예비 창업자 기준의 진행 순서입니다.</p>
            <div className="mt-7 grid gap-3 md:grid-cols-3">
              {steps(t.days).map(([no, tag, title, desc], i) => (
                <div key={no} className={`rounded-xl border p-5 ${i === 5 ? "border-orange-200 bg-[#fff4ea]" : "border-neutral-200 bg-[#faf9f7]"}`}>
                  <div className="flex items-center justify-between">
                    <span className={`grid size-7 place-items-center rounded-full text-[10.5px] font-black text-white ${i === 5 ? "bg-brand" : "bg-ink"}`}>{no}</span>
                    <span className="rounded bg-white px-2 py-0.5 text-[9.5px] text-neutral-400">{tag}</span>
                  </div>
                  <p className="mt-4 text-[14px] font-black">{title}</p>
                  <p className="mt-2 text-[11.5px] leading-relaxed text-neutral-500">{desc}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              <p className="rounded-lg bg-neutral-100 px-5 py-3.5 text-[11px] leading-relaxed text-neutral-600">기술 전수 계약은 4단계 교육과 자료 전달까지이며, 교육을 마치면 직접 창업 준비를 시작합니다.</p>
              <p className="rounded-lg bg-[#fff4ea] px-5 py-3.5 text-[11px] leading-relaxed font-bold text-brand">6단계 영업·홍보·광고 실행은 구해줘창업과 별도 비용으로 진행합니다.</p>
            </div>
          </section>

          {/* 전수자 소개 */}
          <section id="expert" className={`${card} scroll-mt-24`}>
            <Head eyebrow="EXPERT" title="기술 전수자 소개" />
            <div className="mt-7 grid gap-4 lg:grid-cols-[1.2fr_1fr]">
              <div className="relative flex min-h-[260px] items-end overflow-hidden rounded-2xl bg-gradient-to-br from-[#33231a] to-[#0f0a07] text-white">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                {photo && <img src={photo} alt={`${m.name} 전수자`} className="absolute inset-y-0 left-0 w-1/2 object-cover" />}
                <div className="relative ml-auto flex h-full w-full flex-col justify-center p-8 sm:w-1/2">
                  <p className="text-[10px] font-bold tracking-[0.14em] text-[#ff7a45]">MASTER PROFILE</p>
                  <p className="mt-2 text-[22px] font-black">{m.name} 전수자</p>
                  <p className="mt-3 text-[11.5px] leading-relaxed text-white/70">{m.career}을 쌓은 현장 전문가입니다. 누적 {m.teams}팀의 예비 창업자를 교육했습니다.</p>
                </div>
              </div>
              <ul className="divide-y divide-neutral-100 rounded-2xl border border-neutral-200 px-6 text-[12.5px]">
                {t.timeline.map(([y, text], i) => (
                  <li key={i} className="flex gap-6 py-3.5">
                    <span className={`w-10 shrink-0 font-black ${i === t.timeline.length - 1 ? "text-brand" : "text-brand/70"}`}>{y}</span>
                    <span className="font-bold">{text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* 교육 과정 */}
          <section id="curriculum" className={`${card} scroll-mt-24`}>
            <Head eyebrow="CURRICULUM" title={`${t.days}일 교육 과정`} />
            <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {t.curriculum.map((c, i) => (
                <div key={c.title} className="rounded-xl border border-neutral-200 bg-[#faf9f7] p-5">
                  <div className="flex items-center justify-between">
                    <span className="grid size-6 place-items-center rounded bg-[#fff4ea] text-[10px] font-black text-brand">{String(i + 1).padStart(2, "0")}</span>
                    <span className="text-[10px] text-neutral-400">{c.range}</span>
                  </div>
                  <p className="mt-6 text-[15px] font-black">{c.title}</p>
                  <p className="mt-2 text-[11.5px] leading-relaxed text-neutral-500">{c.desc}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 flex flex-wrap items-center justify-between gap-2 rounded-lg bg-[#fff4ea] px-5 py-3.5 text-[11.5px] font-bold text-brand">
              <span>총 {t.days}일 · {t.hours}시간 · 1:1 현장 실습</span>
              <span className="font-normal">세부 일정은 상담 후 조율합니다.</span>
            </div>
          </section>

          {/* 비용 및 제공 자료 */}
          <section id="fee" className={`${card} scroll-mt-24`}>
            <Head eyebrow="PROGRAM FEE" title="전수 비용 및 제공 자료" />
            <div className="mt-7 grid gap-4 lg:grid-cols-[1fr_2fr]">
              <div className="flex flex-col justify-between rounded-2xl bg-[#0f0a07] p-7 text-white">
                <div>
                  <p className="text-[11px] text-white/60">총 기술 전수비</p>
                  <p className="mt-3 text-[32px] font-black leading-none tracking-tight">{man(l.price)}</p>
                  <p className="mt-2 text-[10px] text-white/50">VAT 별도</p>
                </div>
                <div className="mt-12 border-t border-white/10 pt-4">
                  <p className="text-[10px] text-white/50">결제 방식</p>
                  <p className="mt-1 text-[12px] font-bold">계약금 30% · 교육 시작 전 잔금 70%</p>
                </div>
              </div>
              <ul className="grid gap-3 sm:grid-cols-2">
                {provided(t.menus).map(([k, v]) => (
                  <li key={k} className="rounded-xl border border-neutral-200 px-5 py-4">
                    <p className="flex items-center gap-1.5 text-[12.5px] font-black"><Icon name="check" className="size-3.5 text-brand" />{k}</p>
                    <p className="mt-1.5 text-[11px] text-neutral-500">{v}</p>
                  </li>
                ))}
              </ul>
            </div>
            <p className="mt-4 rounded-lg border border-neutral-200 bg-[#faf9f7] px-5 py-3 text-[10.5px] leading-relaxed text-neutral-500">점포 임차비, 인테리어, 주방 장비, 식자재 및 영업 인허가 비용은 기술 전수비에 포함되지 않습니다. 조리 영상과 식자재 거래처 목록은 별도로 제공하지 않습니다.</p>
            <p className="mt-3 rounded-lg bg-[#fff4ea] px-5 py-3 text-[10.5px] leading-relaxed font-bold text-brand">기술 전수는 {t.days}일 교육과 자료 전달로 종료됩니다. 교육 종료 후 운영 지원은 포함되지 않으며, 추가 교육이 필요한 경우 별도 일정과 비용으로 협의합니다.</p>
          </section>

          {/* 창업 홍보 서비스 */}
          <section id="package" className="scroll-mt-24 rounded-3xl bg-gradient-to-br from-[#33231a] to-[#17100b] p-8 text-white md:p-10">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="text-[11px] font-bold tracking-[0.14em] text-[#ff7a45]">GUHAEJWO STARTUP</p>
                <h2 className="mt-2 text-[26px] font-black tracking-tight">기술만 배우고 끝내지 않습니다</h2>
                <p className="mt-3 max-w-[560px] text-[12px] leading-relaxed text-white/60">전수창업을 통해 전수받은 기술을 교육 이후 신규 매장의 영업·홍보·광고와 홍보영상 제작까지 하나의 실행 과정으로 연결합니다.</p>
              </div>
              <span className="rounded-full bg-brand/90 px-4 py-1.5 text-[10.5px] font-bold">구해줘창업 실행 패키지 · 별도 비용</span>
            </div>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {services.map(([no, title, desc, items]) => (
                <div key={no} className="flex flex-col rounded-2xl border border-white/10 bg-white/[0.04] p-6">
                  <div className="flex items-center justify-between">
                    <span className="grid size-7 place-items-center rounded-full bg-brand text-[10.5px] font-black">{no}</span>
                    <span className="text-[9px] tracking-wider text-white/30">LAUNCH SERVICE</span>
                  </div>
                  <p className="mt-5 text-[17px] font-black">{title}</p>
                  <p className="mt-2 text-[11.5px] leading-relaxed text-white/60">{desc}</p>
                  <ul className="mt-5 space-y-1.5 border-t border-white/10 pt-4 text-[11px] text-white/70">
                    {items.map((it) => <li key={it} className="flex items-center gap-1.5"><Icon name="check" className="size-3 text-brand" />{it}</li>)}
                  </ul>
                </div>
              ))}
            </div>
            <div className="mt-5 flex flex-wrap items-center justify-between gap-4 rounded-xl bg-white/10 px-6 py-5">
              <div>
                <p className="text-[13px] font-black">전수 교육부터 오픈 홍보까지 구해줘창업이 함께 실행합니다</p>
                <p className="mt-1 text-[10.5px] text-white/60">영업·홍보·광고 실행 비용은 기술 전수비와 별도이며, 업종·지역·광고 범위·광고 예산에 따라 교육 일정 상담과 함께 통합 견적을 제공합니다.</p>
              </div>
              {!l.sold && <ListingConsultButton id={l.id} title={`${m.name} 전수자 ${l.title} (교육 일정 + 실행 패키지 통합 상담)`} label="교육 일정·실행 패키지 통합 상담  →" className={`${btn} shrink-0`} />}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
