"use client";
import Link from "next/link";

// 로고: 누르면 홈으로. 이미 홈이면 새로 불러오지 않고 맨 위로 부드럽게 올라간다.
export function HomeLogo({ className }: { className: string }) {
  return (
    <Link
      href="/"
      aria-label="구해줘창업 홈"
      className="inline-block"
      onClick={(e) => {
        if (window.location.pathname === "/" && !window.location.hash) {
          e.preventDefault();
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/logo-wordmark.svg" alt="구해줘창업" className={className} />
    </Link>
  );
}
