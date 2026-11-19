"use client";
import { useEffect, useState } from "react";

// 페이지 맨 아래에 도착하면 나타나는 "맨 위로" 화살표 버튼
export function ScrollTopButton() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const check = () => setShow(window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 160);
    check();
    window.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check);
    return () => { window.removeEventListener("scroll", check); window.removeEventListener("resize", check); };
  }, []);
  return (
    <button
      type="button"
      aria-label="맨 위로 이동"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={`fixed bottom-20 right-4 md:bottom-6 md:right-6 z-40 grid size-12 cursor-pointer place-items-center rounded-full bg-[#F0C33F] text-ink shadow-lg transition duration-300 hover:brightness-95 ${show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"}`}
    >
      <svg viewBox="0 0 24 24" aria-hidden className="size-5" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><path d="M12 19V5M5 12l7-7 7 7" /></svg>
    </button>
  );
}
