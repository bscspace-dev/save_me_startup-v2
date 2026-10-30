"use client";
import { useState } from "react";

type Slide = { label: string; caption: string; sub: string };

// 사진이 준비되기 전까지 톤만 다른 자리표시 배경을 사용
const tones = [
  "from-[#6b4a2e] via-[#3f2a18] to-[#24170d]",
  "from-[#7a5a3a] via-[#4a3320] to-[#2a1c10]",
  "from-[#6a6f73] via-[#3c4044] to-[#222527]",
  "from-[#7d6a52] via-[#4d3d2c] to-[#2b2218]",
  "from-[#5b6f86] via-[#34414f] to-[#1e262e]",
];

export function FranchiseGallery({ slides, badges }: { slides: Slide[]; badges: string[] }) {
  const [i, setI] = useState(0);
  const n = slides.length;
  const s = slides[i];
  const go = (d: number) => setI((v) => (v + d + n) % n);
  const arrow = "absolute top-[44%] grid size-9 place-items-center rounded-full bg-black/55 text-[18px] text-white transition hover:bg-black/75";

  return (
    <div>
      <div className={`relative aspect-[1/0.92] overflow-hidden bg-gradient-to-br ${tones[i % tones.length]}`}>
        <div className="absolute left-4 top-4 flex gap-1.5 text-[11px] font-bold text-white">
          {badges.map((b, k) => (
            <span key={b} className={`rounded px-2.5 py-1 ${k === 0 ? "bg-brand" : "bg-black/60"}`}>{b}</span>
          ))}
        </div>
        <span className="absolute right-5 top-4 text-[12px] font-bold text-white/90">{String(i + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}</span>
        <button onClick={() => go(-1)} aria-label="이전 사진" className={`${arrow} left-4`}>‹</button>
        <button onClick={() => go(1)} aria-label="다음 사진" className={`${arrow} right-4`}>›</button>
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-5 pt-12 text-white">
          <p className="text-[15px] font-black">{s.caption}</p>
          <p className="mt-1 text-[12px] text-white/80">{s.sub}</p>
        </div>
      </div>
      <div className="grid grid-cols-5 gap-2 p-3">
        {slides.map((t, k) => (
          <button
            key={t.label}
            onClick={() => setI(k)}
            aria-label={t.label}
            aria-current={k === i}
            className={`relative aspect-[1.5/1] overflow-hidden rounded-md bg-gradient-to-br ${tones[k % tones.length]} ring-2 transition ${k === i ? "ring-brand" : "opacity-80 ring-transparent hover:opacity-100"}`}
          >
            <span className="absolute inset-x-0 bottom-0 bg-black/55 py-0.5 text-center text-[8.5px] font-bold text-white">{t.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
