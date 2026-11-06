"use client";
import type { ReactNode } from "react";

// 관리자에서 "보기"를 누르면 새 탭이 아니라 작은 팝업 창으로 연다. (팝업이 막히면 새 탭으로 열린다)
export function PopupLink({ href, className, title, children }: { href: string; className?: string; title?: string; children: ReactNode }) {
  return (
    <a
      href={href} target="_blank" rel="noopener" className={className} title={title}
      onClick={(e) => {
        const w = Math.min(1200, window.screen.availWidth - 80);
        const h = Math.min(900, window.screen.availHeight - 80);
        const left = Math.round((window.screen.availWidth - w) / 2);
        const top = Math.round((window.screen.availHeight - h) / 2);
        const win = window.open(href, "listing-preview", `popup=yes,width=${w},height=${h},left=${left},top=${top},resizable=yes,scrollbars=yes`);
        if (win) { e.preventDefault(); win.focus(); }
      }}
    >{children}</a>
  );
}
