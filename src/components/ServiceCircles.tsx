"use client";
import { useEffect, useState } from "react";

// .env.local 에서 설정: 대표 영상 주소(선택). 비어 있으면 채널의 최신 영상을 재생합니다.
const CHANNEL_URL = process.env.NEXT_PUBLIC_YOUTUBE_CHANNEL_URL ?? "https://www.youtube.com/channel/UC0Y0tolZw8UPefvbxQgMOPg";
const VIDEO_URL = process.env.NEXT_PUBLIC_YOUTUBE_URL ?? "";

function toPlayer(url: string, channel: string) {
  const m = url.match(/(?:v=|youtu\.be\/|embed\/|shorts\/)([\w-]{11})/);
  if (m) return { src: `https://www.youtube.com/embed/${m[1]}?rel=0&autoplay=1&playsinline=1`, thumb: `https://i.ytimg.com/vi/${m[1]}/hqdefault.jpg` };
  const c = channel.match(/channel\/UC([\w-]+)/);
  return c ? { src: `https://www.youtube.com/embed/videoseries?list=UU${c[1]}&rel=0&autoplay=1&playsinline=1`, thumb: "" } : null;
}

const items = [
  { no: "01", title: "메뉴/레시피 전수", points: ["시그니처 메뉴", "1:1 조리 실습", "원가율 노하우 전수"] },
  { no: "02", title: "CI / BI & 브랜딩", points: ["네이밍/스토리/슬로건", "로고 디자인", "패키징 디자인"] },
  { no: "03", title: "인테리어 & 가구", points: ["3D 도면 및 평면 설계", "전체 공정 직영 시공", "최저가 금액 최적화 시스템"] },
  { no: "04", title: "내·외부 홍보물", points: ["외부 메인 간판 및 돌출 간판", "매장 홍보용 실외 배너", "캔버스 액자 및 포스터"] },
  { no: "05", title: "온라인 초기 세팅", points: ["네이버 플레이스 최적화", "블로그/인스타 체험단 운영", "숏폼/유튜브 콘텐츠 제작"] },
];

// 가운데 영상 원을 중심으로 5개 원을 12시 방향부터 시계방향으로 배치 (데스크톱)
const RADIUS = 40;
const pos = (i: number) => {
  const a = ((-90 + i * 72) * Math.PI) / 180;
  return { "--x": `${50 + RADIUS * Math.cos(a)}%`, "--y": `${50 + RADIUS * Math.sin(a)}%` } as React.CSSProperties;
};

export function ServiceCircles() {
  const player = toPlayer(VIDEO_URL, CHANNEL_URL);
  const [playing, setPlaying] = useState(false);
  const [big, setBig] = useState(false); // 임시 소개 영상: 재생을 누르면 화면 가득 크게 띄운다

  useEffect(() => {
    if (!big) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setBig(false);
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = prev; };
  }, [big]);

  return (
    <div className="mt-14 flex flex-col items-center gap-8 md:relative md:mx-auto md:block md:aspect-square md:max-w-[42.5rem] md:mt-[7.5rem] md:gap-0">
      {/* 연결 링 */}
      <svg viewBox="0 0 100 100" className="absolute inset-0 hidden size-full md:block" aria-hidden>
        <polygon
          points={items.map((_, i) => { const a = ((-90 + i * 72) * Math.PI) / 180; return `${50 + RADIUS * Math.cos(a)},${50 + RADIUS * Math.sin(a)}`; }).join(" ")}
          fill="none"
          stroke="currentColor"
          strokeWidth="0.4"
          strokeDasharray="1.2 1.2"
          strokeLinejoin="round"
          className="text-[#F0C33F]/40"
        />
      </svg>

      {/* 가운데 유튜브 영상 */}
      <div className="relative aspect-video w-full max-w-[32.5rem] overflow-hidden rounded-2xl bg-black shadow-2xl ring-8 ring-[#fff8dc] md:absolute md:left-1/2 md:top-1/2 md:w-[46%] md:max-w-none md:-translate-x-1/2 md:-translate-y-1/2">
        {!VIDEO_URL ? (
          // 대표 YouTube 영상 주소(NEXT_PUBLIC_YOUTUBE_URL)가 없으면 사이트에 있는 소개 영상을 임시로 재생한다
          <button type="button" onClick={() => setBig(true)} aria-label="영상 크게 보기" className="absolute inset-0 cursor-pointer">
            <video src="/transfer-intro.mp4#t=0.1" muted playsInline preload="metadata" className="size-full bg-black object-cover" />
            <span className="absolute inset-0 grid place-items-center bg-black/25">
              <span className="grid size-16 place-items-center rounded-full bg-white shadow-xl transition hover:scale-105">
                <svg viewBox="0 0 10 10" className="ml-1 size-7 fill-red-600"><path d="M2 1l7 4-7 4z" /></svg>
              </span>
            </span>
          </button>
        ) : player && playing ? (
          <iframe
            src={player.src}
            title="구해줘창업 소개 영상"
            allow="autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 size-full"
          />
        ) : (
          <button
            type="button"
            onClick={() => (player ? setPlaying(true) : window.open(CHANNEL_URL, "_blank", "noopener"))}
            aria-label="영상 재생"
            className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-gradient-to-br from-[#e62117] to-[#b3150d] text-white"
          >
            {player?.thumb && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={player.thumb} alt="" className="absolute inset-0 size-full object-cover" />
            )}
            <span className="absolute inset-0 bg-black/25" />
            <span className="relative grid size-16 place-items-center rounded-full bg-white shadow-xl transition hover:scale-105">
              <svg viewBox="0 0 10 10" className="ml-1 size-7 fill-[#e62117]"><path d="M2 1l7 4-7 4z" /></svg>
            </span>
            <span className="relative text-[0.8125rem] font-bold">구해줘창업 YouTube</span>
          </button>
        )}
      </div>

      {/* 5가지 서비스 */}
      <div className="grid w-full grid-cols-3 gap-3 sm:mx-auto sm:max-w-[26.25rem] md:contents">
        {items.map((it, i) => (
          <div
            key={it.no}
            style={pos(i)}
            className="grid aspect-square place-items-center rounded-full border border-[#F0C33F]/50 bg-[#fff8dc] p-2 text-center shadow-sm transition hover:-translate-y-1 hover:border-[#F0C33F] hover:shadow-lg md:absolute md:left-(--x) md:top-(--y) md:w-[26%] md:-translate-x-1/2 md:-translate-y-1/2 md:p-3 md:hover:-translate-y-[calc(50%+0.25rem)]"
          >
            <div className="flex flex-col items-center">
              <p className="text-[0.625rem] font-bold text-[#D49F12] md:text-[0.6875rem]">{it.no}</p>
              <h3 className="mt-0.5 text-[0.75rem] font-black leading-tight md:text-[0.9375rem]">{it.title}</h3>
              <span className="my-2 hidden h-px w-8 bg-[#F0C33F]/40 md:block" />
              <ul className="hidden w-fit max-w-[8.25rem] space-y-1 text-left text-[0.6563rem] leading-snug text-neutral-600 md:block">
                {it.points.map((p) => (
                  <li key={p} className="flex items-start gap-1.5">
                    <span className="mt-[0.3125rem] size-1 shrink-0 rounded-full bg-[#F0C33F]" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>


      {/* 모바일: 원이 작아 설명은 아래에 따로 표시 */}
      <ul className="w-full max-w-[32.5rem] space-y-3 text-left md:hidden">
        {items.map((it) => (
          <li key={it.no} className="flex gap-3 text-[0.8125rem] leading-relaxed">
            <span className="w-6 shrink-0 font-black text-[#D49F12]">{it.no}</span>
            <span>
              <b className="block font-black">{it.title}</b>
              <span className="mt-0.5 block text-neutral-500">{it.points.join(" · ")}</span>
            </span>
          </li>
        ))}
      </ul>
      {big && (
        <div className="fixed inset-0 z-[100] grid place-items-center bg-black/85 p-4" onClick={() => setBig(false)}>
          <button type="button" onClick={() => setBig(false)} aria-label="닫기" className="absolute right-4 top-4 grid size-10 cursor-pointer place-items-center rounded-full bg-white/15 text-[1.25rem] text-white hover:bg-white/25">✕</button>
          <video src="/transfer-intro.mp4" controls autoPlay playsInline onClick={(e) => e.stopPropagation()} className="max-h-[90vh] w-full max-w-[70rem] rounded-xl bg-black shadow-2xl" />
        </div>
      )}
    </div>
  );
}
