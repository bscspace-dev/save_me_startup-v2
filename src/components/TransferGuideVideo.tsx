"use client";
import { useRef, useState } from "react";

const clock = (s: number) => `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(Math.floor(s % 60)).padStart(2, "0")}`;

export function TransferGuideVideo() {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [dur, setDur] = useState(0);

  const play = () => {
    setPlaying(true);
    ref.current?.play().catch(() => {});
  };

  return (
    <div className="grid items-center gap-8 rounded-3xl bg-sand p-8 md:grid-cols-[1fr_1.35fr] md:gap-12 md:p-12">
      <div>
        <span className="inline-block rounded-full bg-brand px-3 py-1 text-[11px] font-bold text-white">{dur ? `${Math.max(1, Math.ceil(dur / 60))}분 ` : ""}핵심 가이드</span>
        <h2 className="mt-5 text-[30px] font-black leading-[1.25] tracking-tight">기술을 배우고<br />내 매장을 시작하는 방법</h2>
        <p className="mt-4 text-[13.5px] leading-relaxed text-neutral-600">스승(전수자) 선택부터 교육과 창업 실행까지 핵심 내용을 짧게 확인해 보세요.</p>
      </div>

      <div className="relative aspect-video overflow-hidden rounded-2xl bg-black shadow-2xl">
        <video
          ref={ref}
          src="/transfer-intro.mp4#t=0.1"
          className={`size-full ${playing ? "object-contain" : "object-cover"}`}
          controls={playing}
          playsInline
          preload="metadata"
          onLoadedMetadata={(e) => setDur(e.currentTarget.duration)}
          onEnded={() => setPlaying(false)}
        />
        {!playing && (
          <button onClick={play} aria-label="영상 재생" className="absolute inset-0 flex flex-col justify-between bg-gradient-to-t from-black/75 via-black/10 to-black/30 p-5 text-left text-white">
            <span className="flex w-fit items-center gap-2 rounded-lg bg-black/55 px-3 py-2 text-[10.5px] font-bold tracking-wide">
              <span className="grid size-6 place-items-center rounded bg-brand"><svg viewBox="0 0 10 10" className="size-2.5 fill-white"><path d="M2 1l7 4-7 4z" /></svg></span>
              구해줘창업 ORIGINAL
            </span>
            <span className="absolute left-1/2 top-1/2 grid size-[72px] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white shadow-xl transition hover:scale-105">
              <svg viewBox="0 0 10 10" className="ml-1 size-7 fill-brand"><path d="M2 1l7 4-7 4z" /></svg>
            </span>
            <span className="block">
              <span className="block text-[17px] font-black">기술을 배우고 내 매장을 시작하는 방법</span>
              <span className="mt-3 block h-[3px] rounded bg-white/25"><span className="block h-full w-[10%] rounded bg-brand" /></span>
              <span className="mt-2 flex justify-between text-[10px] text-white/70"><span>00:00 / {clock(dur)}</span><span>HD · 자막</span></span>
            </span>
          </button>
        )}
      </div>
    </div>
  );
}
