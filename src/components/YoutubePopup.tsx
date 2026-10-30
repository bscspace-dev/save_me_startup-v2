"use client";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

// .env.local 에서 설정: 채널 주소(필수), 대표 영상 주소(선택)
const CHANNEL_URL = process.env.NEXT_PUBLIC_YOUTUBE_CHANNEL_URL ?? "https://www.youtube.com/channel/UC0Y0tolZw8UPefvbxQgMOPg";
const VIDEO_URL = process.env.NEXT_PUBLIC_YOUTUBE_URL ?? "";

function toEmbed(url: string) {
  const m = url.match(/(?:v=|youtu\.be\/|embed\/|shorts\/)([\w-]{11})/);
  return m ? `https://www.youtube.com/embed/${m[1]}?rel=0` : null;
}

const YtLogo = ({ size = 26 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M23 7.2a3 3 0 00-2.1-2.1C19 4.6 12 4.6 12 4.6s-7 0-8.9.5A3 3 0 001 7.2C.5 9.1.5 12 .5 12s0 2.9.5 4.8a3 3 0 002.1 2.1c1.9.5 8.9.5 8.9.5s7 0 8.9-.5a3 3 0 002.1-2.1c.5-1.9.5-4.8.5-4.8s0-2.9-.5-4.8zM9.8 15.2V8.8l5.7 3.2-5.7 3.2z" /></svg>
);

export function YoutubePopup() {
  const [open, setOpen] = useState(false);
  const embed = toEmbed(VIDEO_URL);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <motion.button
        onClick={() => setOpen(true)}
        initial={{ x: 80, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 1, type: "spring", stiffness: 120 }}
        whileHover={{ x: -4 }}
        aria-label="유튜브 채널 보기"
        className="fixed right-0 top-1/2 z-40 flex -translate-y-1/2 flex-col items-center gap-1.5 rounded-l-xl bg-[#e62117] px-3 py-4 text-white shadow-xl"
      >
        <YtLogo />
        <span className="text-[10px] font-bold leading-tight">유튜브<br />채널</span>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[100] grid place-items-center bg-black/70 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          >
            <motion.div
              className="relative w-full max-w-[480px] overflow-hidden rounded-2xl bg-white shadow-2xl"
              initial={{ scale: 0.92, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.92, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button onClick={() => setOpen(false)} aria-label="닫기" className="absolute right-3 top-3 z-10 grid size-8 place-items-center rounded-full bg-black/10 text-ink hover:bg-black/20">✕</button>

              <div className="bg-gradient-to-br from-[#e62117] to-[#b3150d] px-6 pb-5 pt-6 text-white">
                <p className="flex items-center gap-1.5 text-[11px] font-bold text-white/80"><YtLogo size={16} />YouTube 공식 채널</p>
                <div className="mt-4 flex items-center gap-4">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/logo.png" alt="구해줘창업 로고" className="size-16 shrink-0 rounded-full ring-4 ring-white/30" />
                  <div>
                    <h3 className="text-[22px] font-black">구해줘창업</h3>
                    <p className="mt-0.5 text-[12px] text-white/80">상가창업 전문 컨설팅 · 대구</p>
                  </div>
                </div>
              </div>

              <div className="p-6">
                {embed && (
                  <div className="mb-5 aspect-video overflow-hidden rounded-lg bg-black">
                    <iframe src={embed} title="구해줘창업 대표 영상" allow="encrypted-media; picture-in-picture" allowFullScreen className="size-full" />
                  </div>
                )}
                <p className="text-[13px] leading-relaxed text-neutral-600">
                  전수창업·신규창업·프랜차이즈 창업 노하우와 대구 상가 매물 소식을 영상으로 만나보세요. 구독하고 창업 정보를 가장 먼저 받아보세요.
                </p>
                <a href={CHANNEL_URL} target="_blank" rel="noopener noreferrer" className="mt-5 flex items-center justify-center gap-2 rounded-lg bg-[#e62117] py-3.5 text-[14px] font-bold text-white transition hover:bg-[#c71a11]">
                  <YtLogo size={20} />채널 구독하러 가기
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
