import Link from "next/link";
import { photoSrc, type Listing } from "@/lib/data";
import type { TransferInfo } from "@/lib/transfer";
import { ListingConsultButton } from "./ListingConsultButton";
import { Icon } from "./Icons";
import { Head, card, man } from "./DetailParts";
import { OtherTransfers } from "./OtherTransfers";

const provided = [
  "레시피 자료",
  "원가 계산표",
  "운영 매뉴얼",
  "상권 분석 컨설팅",
  "BI, CI 제작 및 제공",
  "전담 오픈매니저",
];

const services = [
  ["01", "영업 실행", "상권과 업종에 맞는 고객 유치 전략을 세우고 제휴처 발굴과 초기 영업을 실행합니다", ["영업 전략 수립", "지역 제휴처 제안", "초기 고객 유치"]],
  ["02", "홍보·광고 실행", "네이버 플레이스, SNS, 지역 타깃 광고를 매장 상황에 맞게 기획하고 집행합니다", ["광고 채널 설계", "콘텐츠 운영", "광고 성과 리포트"]],
  ["03", "영상 제작", "전수받은 기술과 대표 메뉴가 잘 보이도록 매장 소개 영상과 숏폼 콘텐츠를 제작합니다", ["기획·촬영", "편집·자막", "숏폼 제공"]],
] as const;

const btn = "block rounded-lg bg-brand px-6 py-3.5 text-center text-[13px] font-bold text-white transition hover:bg-brand-dark";

export function TransferDetail({ l, t, srcs }: { l: Listing; t: TransferInfo; srcs?: string[] }) {
  const m = t.master;
  // 관리자 등록분은 사부 사진 뒤에 대표 메뉴 사진이 이어 붙어 있다
  const nMenu = Math.min(l.transfer?.menuPhotos ?? 0, srcs?.length ?? 0);
  const ownerSrcs = srcs?.slice(0, (srcs?.length ?? 0) - nMenu);
  const menuSrcs = nMenu ? srcs!.slice(srcs!.length - nMenu) : [];
  // 대표 메뉴는 이름을 3개까지 보여주고 더 있으면 '등'을 붙인다
  const names = t.menuNames ?? [];
  const menuNames = names;
  const menuText = names.slice(0, 3).join(", ") + (names.length > 3 ? " 등" : "");
  // 상단 큰 사진 칸은 교육 대표 메뉴 사진 (없으면 사부 사진)
  const photo = ownerSrcs?.[0] ?? (l.photos && !srcs ? photoSrc(l.id, 1) : null);
  const stats = [
    ["사부(전수자) 경력", `${m.years}년`],
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
              <span className="self-start rounded-full bg-white/15 px-3 py-1 text-[10.5px] font-bold">등록번호 {l.id}</span>
              <div className="my-auto max-lg:mt-6">
              <p className="text-[13px] font-bold tracking-wide text-white/55">{l.category}</p>
              {m.store && <p className="mt-2 text-[22px] font-black tracking-tight text-white">{m.store}</p>}
              <div className="my-6 h-px w-14 bg-white/25" />
              <p className="text-[13px] font-bold text-[#ff7a45]">{m.name} 사부의 전수메뉴</p>
              <h1 className="mt-2 text-[36px] font-semibold leading-[1.15] tracking-tight text-white/90 md:text-[46px]">{names[0] ?? menuText}</h1>
              {t.menuDesc && <p className="mt-3 line-clamp-2 max-w-[420px] text-[13px] leading-relaxed text-white/70">{t.menuDesc}</p>}
              <div className="mt-9 flex flex-wrap gap-2.5">
                <ListingConsultButton id={l.id} title={`${m.name} 사부(전수자) ${l.title} (전수창업 상담)`} label="전수창업 상담  →" className={btn} />
              </div>
              </div>
            </div>

            <div className="relative min-h-[300px] overflow-hidden rounded-2xl bg-gradient-to-b from-[#6b4a2e] via-[#3f2a18] to-[#1b120b]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              {(menuSrcs[0] ?? photo) && <img src={(menuSrcs[0] ?? photo)!} alt={menuText} className="absolute inset-0 size-full object-cover" />}
            </div>

            <div className="grid gap-4 lg:grid-rows-[1fr_0.8fr_1fr]">
              <div className="flex flex-col justify-between rounded-2xl bg-white/10 p-5">
                <Icon name="user" className="size-6 text-[#ff7a45]" />
                <div>
                  <p className="text-[10px] text-white/50">교육 방식</p>
                  <p className="mt-1 text-[16px] font-black">사부(전수자) 1:1 실습</p>
                </div>
              </div>
              <div className="flex flex-col justify-between rounded-2xl bg-brand p-5">
                <div>
                  <p className="text-[10px] text-white/70">기술 전수비</p>
                  <p className="mt-2 text-[28px] font-black leading-none tracking-tight">{man(l.price)}</p>
                </div>
                <p className="mt-4 text-[10px] text-white/80">구해줘창업 컨설팅 포함</p>
              </div>
              <div className="flex flex-col justify-between rounded-2xl bg-white/10 p-5">
                <Icon name="bag" className="size-6 text-[#ff7a45]" />
                <div>
                  <p className="text-[10px] text-white/50">대표 메뉴</p>
                  <p className="mt-1 text-[16px] font-black leading-snug">{menuText}</p>
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

        <div className="mt-5 space-y-5">
          {/* 사부(전수자) 소개 */}
          <section id="expert" className={`${card} scroll-mt-24`}>
            <Head title={<span className="text-brand">사부님 소개</span>} />
            <div className="mt-7 grid gap-4 lg:grid-cols-2">
              <div className="relative flex min-h-[260px] items-end overflow-hidden rounded-2xl bg-gradient-to-br from-[#33231a] to-[#0f0a07] text-white">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                {photo && <img src={photo} alt={`${m.name} 사부(전수자)`} className="absolute inset-0 size-full object-cover" />}
                <div className="relative w-full bg-gradient-to-t from-black/80 to-transparent p-8 pt-20">
                  <p className="text-[22px] font-black">{m.name} 사부(전수자)</p>
                </div>
              </div>
              <ul className="divide-y divide-neutral-100 rounded-2xl border border-neutral-200 px-6 text-[12.5px]">
                {t.timeline.length === 0 && <li className="py-3.5 font-bold text-neutral-400">경력없음</li>}
                {t.timeline.map(([y, text], i) => (
                  <li key={i} className="flex gap-6 py-3.5">
                    <span className={`w-10 shrink-0 font-black ${i === t.timeline.length - 1 ? "text-brand" : "text-brand/70"}`}>{y}</span>
                    <span className="font-bold">{text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* 교육 대표 메뉴 */}
          {((t.menuNames?.length ?? 0) > 0 || menuSrcs.length > 0) && (
            <section id="menus" className={`${card} scroll-mt-24`}>
              <Head title={<span className="text-brand">교육 대표 메뉴</span>} />
              <ul className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
                {Array.from({ length: Math.max(menuNames.length, menuSrcs.length) }, (_, k) => (
                  <li key={k}>
                    <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-gradient-to-br from-[#6b4a2e] via-[#3f2a18] to-[#24170d]">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      {menuSrcs[k] && <img src={menuSrcs[k]} alt={menuNames[k] ?? `대표 메뉴 ${k + 1}`} className="absolute inset-0 size-full object-cover" />}
                    </div>
                    {menuNames[k] && <p className="mt-2 text-center text-[13px] font-bold">{menuNames[k]}</p>}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* 비용 및 제공 자료 */}
          <section id="fee" className={`${card} scroll-mt-24`}>
            <Head title={<span className="text-brand">전수 비용 및 제공 자료</span>} />
            <div className="mt-6 flex flex-wrap items-center justify-between gap-x-10 gap-y-4 rounded-2xl bg-[#0f0a07] px-7 py-6 text-white">
              <div>
                <p className="text-[11px] text-white/60">총 기술 전수비 <span className="text-white/40">· VAT 별도</span></p>
                <p className="mt-2 text-[32px] font-black leading-none tracking-tight">{man(l.price)}</p>
              </div>
              <div className="border-white/15 sm:border-l sm:pl-10">
                <p className="text-[10px] text-white/50">결제 방식</p>
                <p className="mt-1.5 text-[13px] font-bold">계약금 30% · 교육 시작 전 잔금 70%</p>
              </div>
            </div>
            <ul className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {provided.map((k) => (
                <li key={k} className="flex items-center gap-2.5 rounded-xl border border-neutral-200 bg-[#faf9f7] px-5 py-4 text-[13px] font-black">
                  <span className="grid size-6 shrink-0 place-items-center rounded-full bg-[#fff4ea]"><Icon name="check" className="size-3.5 text-brand" /></span>{k}
                </li>
              ))}
            </ul>
            <p className="mt-4 rounded-lg border border-neutral-200 bg-[#faf9f7] px-5 py-3 text-[10.5px] leading-relaxed text-neutral-500">점포 임차비, 인테리어, 주방 장비, 식자재 및 영업 인허가 비용은 기술 전수비에 포함되지 않으며 식자재 거래처 목록도 별도로 제공하지 않습니다</p>
            <p className="mt-3 rounded-lg bg-[#fff4ea] px-5 py-3 text-[10.5px] leading-relaxed font-bold text-brand">교육 종료 후 운영 지원은 포함되지 않으며, 추가 교육이 필요한 경우 별도 일정과 비용으로 협의합니다</p>
          </section>

          {/* 창업 홍보 서비스 */}
          <section id="package" className="scroll-mt-24 rounded-3xl bg-gradient-to-br from-[#33231a] to-[#17100b] p-8 text-white md:p-10">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <h2 className="mt-2 text-[26px] font-black tracking-tight text-[#ff7a45]">기술만 배우고 끝내지 않습니다</h2>
                <p className="mt-3 max-w-[560px] text-[12px] leading-relaxed text-white/60">전수창업을 통해 전수받은 기술을 교육 이후 신규 매장의 영업·홍보·광고와 홍보영상 제작까지 하나의 실행 과정으로 연결합니다</p>
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
                <p className="mt-1 text-[10.5px] text-white/60">영업·홍보·광고 실행 비용은 기술 전수비와 별도이며, 업종·지역·광고 범위·광고 예산에 따라 교육 일정 상담과 함께 통합 견적을 제공합니다</p>
              </div>
              <ListingConsultButton id={l.id} title={`${m.name} 사부(전수자) ${l.title} (전수창업 상담)`} label="전수창업 상담  →" className={`${btn} shrink-0`} />
            </div>
          </section>

        </div>

        <OtherTransfers currentId={l.id} />
      </div>
    </main>
  );
}
