"use client";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

// 메인페이지에 들어올 때마다 뜨는 안내 팝업
export function TestNoticePopup() {
  const [openA, setOpenA] = useState(false);
  const [openB, setOpenB] = useState(false);

  useEffect(() => { setOpenA(true); setOpenB(true); }, []);

  const open = openA || openB; // 둘 다 닫히면 배경도 사라진다

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[110] flex items-center justify-center gap-3 bg-black/60 p-3"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        >
          <AnimatePresence>
            {openA && (
          <motion.div
            role="dialog" aria-modal="true" aria-label="안내"
            className="w-full max-w-[340px] rounded-2xl bg-white px-6 py-9 text-center shadow-2xl"
            initial={{ scale: 0.92, y: 20 }} animate={{ scale: 1, y: 0 }}
          >
            <h2 className="text-[20px] font-black tracking-tight">현재 페이지는 테스트 페이지입니다</h2>
            <p className="mt-3 text-[14px] leading-snug text-neutral-600">
              서비스 오픈 전 테스트용으로 운영 중입니다.<br />
              표시된 정보는 실제와 다를 수 있습니다.
            </p>
            <button onClick={() => setOpenA(false)} className="mt-6 w-full rounded-lg bg-brand py-2.5 text-[14px] font-bold text-white">닫기</button>
          </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {openB && (
          <motion.div
            role="dialog" aria-modal="true" aria-label="오픈 예정 안내"
            className="flex w-full max-w-[340px] flex-col justify-center rounded-2xl bg-white px-6 py-9 text-center shadow-2xl"
            initial={{ scale: 0.92, y: 20 }} animate={{ scale: 1, y: 0 }}
            transition={{ delay: 0.08 }}
          >
            <h2 className="text-[20px] font-black tracking-tight">12월 중 오픈 예정</h2>
            <p className="mt-3 text-[14px] leading-snug text-neutral-600">구해줘창업이 12월 중 정식 오픈합니다.<br />많은 관심 부탁드립니다.</p>
            <button onClick={() => setOpenB(false)} className="mt-6 w-full rounded-lg bg-brand py-2.5 text-[14px] font-bold text-white">닫기</button>
          </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
