"use client";
import { useState } from "react";

// 대표 메뉴 사진: public/listings/<번호>/menu-1.jpg, menu-2.jpg … 에 넣으면 해당 메뉴 카드에 나온다.
// 파일이 없으면 사진 칸 없이 기존 카드 모양 그대로 보여준다.
export function MenuPhoto({ src, alt }: { src: string; alt: string }) {
  const [loaded, setLoaded] = useState(false);
  return (
    <div className={`-mx-6 -mt-6 mb-5 aspect-[4/3] overflow-hidden rounded-t-xl bg-neutral-100 ${loaded ? "block" : "hidden"}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        ref={(el) => { if (el?.complete && el.naturalWidth > 0) setLoaded(true); }}
        src={src}
        alt={alt}
        onLoad={() => setLoaded(true)}
        className="size-full object-cover"
      />
    </div>
  );
}
