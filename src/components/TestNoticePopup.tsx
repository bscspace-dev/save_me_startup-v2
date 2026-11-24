"use client";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { hideFor24h, isHidden } from "@/lib/popupHide";

const KEY = "open-notice";

// 메인페이지에 들어올 때마다 뜨는 안내 팝업 (오픈 예정 + 테스트 안내를 하나로)
export function TestNoticePopup() {
  const [open, setOpen] = useState(false);

  // 서버 렌더링과 맞추려고 브라우저에서만 저장값을 읽어 연다
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { setOpen(!isHidden(KEY)); }, []);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[110] flex items-center justify-center bg-black/60 p-3"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        >
          <motion.div
            role="dialog" aria-modal="true" aria-label="오픈 예정 안내"
            className="w-full max-w-[22.5rem] overflow-hidden rounded-2xl bg-white text-center shadow-2xl"
            initial={{ scale: 0.92, y: 20 }} animate={{ scale: 1, y: 0 }}
          >
            <div className="bg-[#2d2d2d] px-6 pb-6 pt-7">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logo-footer.svg" alt="구해줘창업" className="mx-auto h-14 w-auto" />
              <p className="mt-4 inline-block rounded-full border border-[#F0C33F] px-3 py-0.5 text-[0.6875rem] font-bold tracking-[0.2em] text-[#F0C33F]">OPEN SOON</p>
            </div>
            <div className="h-1 bg-[#F0C33F]" />
            <div className="px-6 pb-6 pt-7">
              <h2 className="font-gmarket text-[1.5rem] font-black leading-tight tracking-tight text-ink"><span className="bg-[linear-gradient(transparent_62%,#F0C33F_62%)]">1월 중</span> 정식 오픈 예정</h2>
              <p className="mt-3 text-[0.875rem] leading-relaxed text-neutral-700">구해줘창업이 1월 중 정식 오픈합니다.<br />많은 관심 부탁드립니다.</p>
              <p className="mt-5 rounded-lg bg-[#faf9f7] px-4 py-3 text-[0.75rem] leading-relaxed text-neutral-500">현재는 오픈 전 테스트 운영 중이며,<br />표시된 정보는 실제와 다를 수 있습니다.</p>
              <button onClick={() => setOpen(false)} className="mt-6 w-full rounded-lg bg-[#F0C33F] py-3 text-[0.9375rem] font-black text-ink transition hover:brightness-95">확인</button>
              <button onClick={() => { hideFor24h(KEY); setOpen(false); }} className="mt-2 w-full py-2 text-[0.75rem] font-medium text-neutral-400 hover:text-neutral-600">24시간 동안 보지 않기</button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
