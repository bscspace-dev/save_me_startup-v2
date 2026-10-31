"use client";
import { useState } from "react";

// 브랜드 로고: public/listings/<번호>/logo.png 에 넣으면 상세 상단에 나온다.
// 파일이 없으면 아무것도 보이지 않는다.
export function BrandLogo({ src, alt }: { src: string; alt: string }) {
  const [loaded, setLoaded] = useState(false);
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      ref={(el) => { if (el?.complete && el.naturalWidth > 0) setLoaded(true); }}
      src={src}
      alt={alt}
      onLoad={() => setLoaded(true)}
      className={`mb-5 h-11 w-auto max-w-[200px] object-contain object-left ${loaded ? "block" : "hidden"}`}
    />
  );
}
