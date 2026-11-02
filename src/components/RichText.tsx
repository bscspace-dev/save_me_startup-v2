import { Fragment } from "react";

// 줄바꿈은 그대로 두고, **굵게** 로 감싼 부분만 진하게 표시한다
// max를 주면 보이는 글자 기준으로 그 길이를 넘을 때 "…"로 줄인다 (카드용)
export function RichText({ text, max }: { text: string; max?: number }) {
  let left = max ?? Infinity;
  const out: React.ReactNode[] = [];
  for (const [i, part] of text.split(/(\*\*[^*]+\*\*)/g).entries()) {
    if (left <= 0) break;
    const bold = part.startsWith("**") && part.endsWith("**") && part.length > 4;
    let s = bold ? part.slice(2, -2) : part;
    if (s.length > left) { s = s.slice(0, left).trimEnd() + "…"; left = 0; } else left -= s.length;
    out.push(bold ? <b key={i} className="font-black">{s}</b> : <Fragment key={i}>{s}</Fragment>);
  }
  return <>{out}</>;
}
