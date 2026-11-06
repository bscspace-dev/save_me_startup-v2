"use client";
import { useRef, useState } from "react";
import { supabase } from "@/lib/supabase";

type Cred = { u: string; p: string };
export type ImportRow = Record<string, string>;
export type Built = { d?: object; errors: string[] };

// 엑셀 양식의 열 이름 (* 는 필수). 순서가 곧 양식의 열 순서
export const importHeaders = [
  "매물 제목*", "소재지*", "전용면적(평)*", "건축물 용도*", "해당 층 구분(지상/지하)", "해당 층*", "총 층*", "한 줄 소개*", "입지 포인트",
  "보증금(만원)*", "월세(만원)*", "관리비(만원)", "권리금(만원)", "방향", "거래 형태", "사용승인일", "입주 가능일", "현업종", "추천 업종",
  "주차(가능/불가능)", "주차 대수", "화장실(있음/없음)",
] as const;
export const col = (h: string) => h.replace(/\*$/, "");

const example: string[] = [
  "(예시) 황금역 역세권 전면 통유리 신축 상가", "대구 수성구 황금동", "35", "소매점", "지상", "4", "4", "황금역 역세권 신축 4층 상가, 권리금 없이 즉시 입주", "역세권에 위치한 신축 건물 4층 상가입니다.",
  "3000", "180", "15", "0", "남향", "임대", "2024-05-30", "즉시 입주", "공실", "다용도", "가능", "5", "있음",
];
const guide = "※ 아래 예시 행(제목이 '(예시)'로 시작)은 등록되지 않습니다. * 표시는 필수입니다. 금액은 만원 단위 숫자, 날짜는 2024-05-30 형태로 입력하세요. 한 번에 최대 100건까지 올릴 수 있습니다.";

const MAX_ROWS = 100;
type Parsed = { line: number; title: string; d?: object; errors: string[] };

// 셀 값을 글자로: 날짜 칸은 YYYY-MM-DD, 숫자는 그대로
const cell = (v: unknown): string => {
  if (v == null) return "";
  if (v instanceof Date) return `${v.getUTCFullYear()}-${String(v.getUTCMonth() + 1).padStart(2, "0")}-${String(v.getUTCDate()).padStart(2, "0")}`;
  return String(v).trim();
};

export function ShopImport({ cred, build, onDone, onClose }: { cred: Cred; build: (r: ImportRow) => Built; onDone: (n: number) => void; onClose: () => void }) {
  const [rows, setRows] = useState<Parsed[] | null>(null);
  const [msg, setMsg] = useState("");
  const [busy, setBusy] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  async function downloadTemplate() {
    const { default: write } = await import("write-excel-file/browser");
    const head = importHeaders.map((h) => ({ value: h, fontWeight: "bold" as const }));
    await write([[{ value: guide }], head, example.map((v) => ({ value: v }))], { columns: importHeaders.map(() => ({ width: 22 })) }).toFile("상가매물_등록양식.xlsx");
  }

  async function onFile(file: File) {
    setMsg(""); setRows(null);
    try {
      const { readSheet } = await import("read-excel-file/browser");
      const data = (await readSheet(file)) as unknown[][];
      // 안내 문구 줄이 있어도 되도록, 필수 열 이름(매물 제목)이 있는 줄을 머리글로 본다
      const hi = data.findIndex((r) => r.some((c) => cell(c) === col(importHeaders[0])));
      if (hi < 0) return setMsg("양식의 머리글(매물 제목 …)을 찾지 못했습니다. '엑셀 양식 받기'로 받은 파일에 입력해주세요.");
      const names = data[hi].map((c) => cell(c).replace(/\*$/, "").trim());
      const miss = importHeaders.map(col).filter((h) => !names.includes(h));
      if (miss.length) return setMsg(`양식에 없는 열이 있습니다: ${miss.join(", ")}`);
      const out: Parsed[] = [];
      for (let i = hi + 1; i < data.length; i++) {
        const r: ImportRow = {};
        names.forEach((n, j) => { if (n) r[n] = cell(data[i][j]); });
        if (!Object.values(r).some(Boolean)) continue;
        if (r[col(importHeaders[0])].startsWith("(예시)")) continue;
        out.push({ line: i + 1, title: r[col(importHeaders[0])], ...build(r) });
      }
      if (!out.length) return setMsg("등록할 행이 없습니다.");
      if (out.length > MAX_ROWS) return setMsg(`한 번에 ${MAX_ROWS}건까지만 올릴 수 있습니다. (${out.length}건)`);
      setRows(out);
    } catch {
      setMsg("파일을 읽지 못했습니다. .xlsx 파일인지 확인해주세요.");
    }
  }

  const ok = rows?.filter((r) => !r.errors.length) ?? [];

  async function register() {
    if (!ok.length) return;
    setBusy(true); setMsg("");
    const { data, error } = await supabase!.rpc("admin_shop_import", { ...cred, items: ok.map((r) => r.d) });
    setBusy(false);
    if (error || typeof data !== "number") return setMsg("등록하지 못했습니다. (shop-import.sql 실행 여부와 매물 등록 권한을 확인해주세요)");
    onDone(data);
  }

  return (
    <section className="mb-5 rounded-2xl border border-neutral-200 bg-white p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-[0.9375rem] font-black">엑셀로 상가매물 등록</h2>
        <button onClick={onClose} className="text-[0.75rem] font-bold text-neutral-400 hover:text-ink">닫기</button>
      </div>
      <p className="mt-1 text-[0.75rem] leading-relaxed text-neutral-500">등록된 매물은 <b>숨김 + 확인필요</b> 상태로 들어갑니다. 목록에서 내용을 확인하고 &quot;확인 후 게시&quot;를 누르면 사이트에 노출됩니다. 사진은 엑셀로 넣을 수 없어 수정 화면에서 올려주세요.</p>
      <div className="mt-3 flex flex-wrap gap-2 text-[0.8125rem]">
        <button onClick={downloadTemplate} className="rounded border border-neutral-300 px-4 py-2 font-bold hover:border-brand hover:text-brand">엑셀 양식 받기</button>
        <button onClick={() => fileRef.current?.click()} className="rounded bg-brand px-4 py-2 font-bold text-white hover:bg-brand-dark">엑셀 파일 올리기</button>
        <input ref={fileRef} type="file" accept=".xlsx" hidden onChange={(e) => { const f = e.target.files?.[0]; if (f) onFile(f); e.target.value = ""; }} />
      </div>
      {msg && <p className="mt-3 rounded-lg bg-red-50 p-3 text-[0.75rem] text-red-700">{msg}</p>}
      {rows && (
        <div className="mt-4">
          <p className="text-[0.8125rem] font-bold">미리보기: 전체 {rows.length}건 · 등록 가능 {ok.length}건 · 오류 {rows.length - ok.length}건</p>
          <ul className="mt-2 max-h-80 space-y-1 overflow-y-auto text-[0.75rem]">
            {rows.map((r) => (
              <li key={r.line} className={`rounded border px-3 py-2 ${r.errors.length ? "border-red-200 bg-red-50" : "border-neutral-200"}`}>
                <span className="text-neutral-400">{r.line}행</span> <b>{r.title || "(제목 없음)"}</b>
                {r.errors.length ? <span className="ml-2 text-red-700">{r.errors.join(" · ")}</span> : <span className="ml-2 text-green-700">OK</span>}
              </li>
            ))}
          </ul>
          <button disabled={!ok.length || busy} onClick={register} className="mt-3 rounded bg-brand px-5 py-2.5 text-[0.8125rem] font-bold text-white hover:bg-brand-dark disabled:opacity-40">
            {busy ? "등록 중..." : `오류 없는 ${ok.length}건 등록 (확인필요 상태)`}
          </button>
          {rows.length !== ok.length && <p className="mt-2 text-[0.6875rem] text-neutral-400">오류가 있는 행은 등록되지 않습니다. 등록된 행은 지우고, 오류 행만 고쳐서 다시 올려주세요 (그대로 다시 올리면 중복 등록됩니다).</p>}
        </div>
      )}
    </section>
  );
}
