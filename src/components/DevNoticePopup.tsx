"use client";
import { useState } from "react";

// 개발 환경(NEXT_PUBLIC_APP_ENV=dev)에서만 뜨는 안내 팝업. 실서버에는 이 값이 없어 뜨지 않는다
export function DevNoticePopup() {
  const [open, setOpen] = useState(true);
  if (process.env.NEXT_PUBLIC_APP_ENV !== "dev" || !open) return null;

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/60 p-3">
      <div role="dialog" aria-modal="true" aria-label="개발 안내" className="w-full max-w-[21.25rem] rounded-2xl bg-white px-6 py-9 text-center shadow-2xl">
        <h2 className="text-[1.25rem] font-black tracking-tight">개발</h2>
        <p className="mt-3 text-[0.875rem] leading-snug text-neutral-600">현재 개발 서버입니다.<br />실서비스가 아닙니다.</p>
        <button onClick={() => setOpen(false)} className="mt-6 w-full rounded-lg bg-brand py-2.5 text-[0.875rem] font-bold text-white">닫기</button>
      </div>
    </div>
  );
}
