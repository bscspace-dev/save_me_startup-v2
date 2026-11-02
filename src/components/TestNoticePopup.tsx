"use client";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

// 메인페이지에 들어올 때마다 뜨는 안내 팝업
export function TestNoticePopup() {
  const [open, setOpen] = useState(false);

  useEffect(() => { setOpen(true); }, []);

  const close = () => setOpen(false);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[110] grid place-items-center bg-black/60 p-4"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          onClick={close}
        >
          <motion.div
            role="dialog" aria-modal="true" aria-label="안내"
            className="w-full max-w-[360px] rounded-2xl bg-white p-7 text-center shadow-2xl"
            initial={{ scale: 0.92, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.92, y: 20 }}
            onClick={(e) => e.stopPropagation()}
          >
            <p className="text-[12px] font-bold text-brand">안내</p>
            <h2 className="mt-2 text-[22px] font-black tracking-tight">현재 페이지는 테스트 페이지입니다</h2>
            <p className="mt-4 text-[13px] leading-relaxed text-neutral-600">
              현재 보고 계신 페이지는 서비스 오픈 전 테스트용으로 운영 중입니다.<br />
              화면에 표시된 매물, 가격, 연락처 등의 정보는 실제와 다를 수 있으며, 디자인과 기능도 예고 없이 변경될 수 있습니다.<br />
              상담 신청 등 입력하신 내용은 테스트 목적으로만 사용되니 참고해 주세요.
            </p>
            <button onClick={close} className="mt-6 w-full rounded-lg bg-brand py-3 text-[14px] font-bold text-white">확인</button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
