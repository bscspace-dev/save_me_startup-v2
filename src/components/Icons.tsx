import Link from "next/link";
const P = { width: 20, height: 20, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round", strokeLinejoin: "round" } as const;

export function Icon({ name, className }: { name: string; className?: string }) {
  switch (name) {
    case "store": return <svg {...P} className={className}><path d="M4 9l1-5h14l1 5M4 9v11h16V9M4 9c0 2 3 2 4 0 1 2 3 2 4 0 1 2 3 2 4 0 1 2 4 2 4 0M9 20v-5h6v5" /></svg>;
    case "pin": return <svg {...P} className={className}><path d="M12 21s7-6.2 7-11a7 7 0 10-14 0c0 4.8 7 11 7 11z" /><circle cx="12" cy="10" r="2.5" /></svg>;
    case "bag": return <svg {...P} className={className}><path d="M5 8h14l-1 12H6L5 8zM9 8V6a3 3 0 016 0v2" /></svg>;
    case "spark": return <svg {...P} className={className}><path d="M5 19l9-9M14 4l1 3 3 1-3 1-1 3-1-3-3-1 3-1 1-3zM18 14l.6 1.6L20 16l-1.4.4L18 18l-.6-1.6L16 16l1.4-.4L18 14z" /></svg>;
    case "search": return <svg {...P} className={className}><circle cx="11" cy="11" r="7" /><path d="M20 20l-4-4" /></svg>;
    case "check": return <svg {...P} className={className}><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>;
    case "chevron": return <svg {...P} className={className}><path d="M6 9l6 6 6-6" /></svg>;
    case "warn": return <svg {...P} className={className}><path d="M12 4l9 16H3L12 4zM12 10v4M12 17v.5" /></svg>;
    case "user": return <svg {...P} className={className}><circle cx="9" cy="8" r="3.5" /><path d="M2.5 20c0-3.6 2.9-6 6.5-6s6.5 2.4 6.5 6M17 4.5a3.5 3.5 0 010 7M18.5 14.3c1.8.7 3 2.5 3 5.2" /></svg>;
    case "clock": return <svg {...P} className={className}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>;
    case "pan": return <svg {...P} className={className}><rect x="4" y="3" width="16" height="18" rx="2" /><path d="M4 9h16M8 6h.01M12 6h.01M9 14h6M9 17h4" /></svg>;
    default: return null;
  }
}

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link href="/" className="flex items-center gap-2.5">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/logo.png" alt="구해줘창업 로고" className="size-11 rounded-full" />
      <span className="leading-tight">
        <span className={`block text-[19px] font-black ${light ? "text-white" : "text-ink"}`}>구해줘창업</span>
        {!light && <span className="block text-[9px] font-medium text-brand">상가창업 전문 컨설팅 플랫폼</span>}
      </span>
    </Link>
  );
}
