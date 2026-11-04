"use client";
import { useEffect, useRef, useState } from "react";
import { fetchBanners } from "@/lib/remote";
import { supabase } from "@/lib/supabase";
import { shrink } from "./imageTools";

type Cred = { u: string; p: string };
const MAX = 5;

// 메인 페이지 관리: 메인 상단 배너 배경 이미지를 올리고 순서를 바꾼다 (여러 장이면 자동으로 넘어간다)
export function MainAdmin({ cred }: { cred: Cred }) {
  const [imgs, setImgs] = useState<string[] | null>(null);
  const [busy, setBusy] = useState(false);
  const [saving, setSaving] = useState(false);
  const [note, setNote] = useState<{ ok: boolean; t: string } | null>(null);
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    let alive = true;
    fetchBanners().then((b) => { if (alive) setImgs(b); });
    return () => { alive = false; };
  }, []);

  async function add(files: FileList | null) {
    if (!files?.length || !imgs) return;
    setBusy(true); setNote(null);
    const picked = Array.from(files).filter((f) => f.type.startsWith("image/")).slice(0, MAX - imgs.length);
    try {
      const done = await Promise.all(picked.map((f) => shrink(f, 1920, 0.8, 380_000)));
      setImgs([...imgs, ...done]);
      if (files.length > picked.length) setNote({ ok: false, t: `배너는 최대 ${MAX}장까지 등록할 수 있습니다.` });
    } catch { setNote({ ok: false, t: "이미지를 읽지 못했습니다. 다른 파일로 시도해주세요." }); }
    setBusy(false);
    if (ref.current) ref.current.value = "";
  }

  const move = (i: number, d: number) => {
    if (!imgs) return;
    const j = i + d;
    if (j < 0 || j >= imgs.length) return;
    const n = [...imgs];
    [n[i], n[j]] = [n[j], n[i]];
    setImgs(n);
  };

  async function save() {
    if (!supabase || !imgs) return;
    setSaving(true); setNote(null);
    const { data, error } = await supabase.rpc("admin_banner_save", { ...cred, imgs });
    setSaving(false);
    if (error) return setNote({ ok: false, t: "저장하지 못했습니다. (admin-roles.sql 실행 여부를 확인해주세요)" });
    if (!data) return setNote({ ok: false, t: "저장 권한이 없습니다." });
    setNote({ ok: true, t: imgs.length ? "저장되었습니다. 메인 페이지에 바로 반영됩니다." : "배너를 모두 비웠습니다. 기본 배경으로 표시됩니다." });
  }

  return (
    <div className="space-y-5">
      <section className="rounded-2xl border border-neutral-200 bg-white p-6">
        <h2 className="text-[0.9375rem] font-black">메인 배너 이미지 <span className="ml-1 text-[0.75rem] font-normal text-neutral-400">{imgs?.length ?? 0} / {MAX}장 · 2장 이상이면 5초마다 넘어갑니다</span></h2>
        <p className="mt-1 text-[0.75rem] text-neutral-500">메인 페이지 맨 위 큰 배너의 배경으로 쓰입니다. 가로로 긴 사진(권장 1920×800 이상)이 잘 어울리고, 글자는 위에 어둡게 겹쳐 표시됩니다.</p>

        {imgs === null ? (
          <p className="py-10 text-center text-[0.8125rem] text-neutral-400">불러오는 중...</p>
        ) : (
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {imgs.map((p, i) => (
              <div key={i} className="overflow-hidden rounded-lg border border-neutral-200">
                <div className="relative aspect-[2.4/1] bg-neutral-100">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={p} alt="" className="size-full object-cover" />
                  <span className="absolute left-1.5 top-1.5 rounded bg-black/60 px-1.5 py-0.5 text-[0.625rem] font-bold text-white">{i + 1}번째</span>
                </div>
                <div className="flex divide-x divide-neutral-200 text-[0.75rem] font-bold">
                  <button type="button" onClick={() => move(i, -1)} disabled={i === 0} className="flex-1 cursor-pointer py-1.5 hover:bg-neutral-50 disabled:opacity-30">←</button>
                  <button type="button" onClick={() => move(i, 1)} disabled={i === imgs.length - 1} className="flex-1 cursor-pointer py-1.5 hover:bg-neutral-50 disabled:opacity-30">→</button>
                  <button type="button" onClick={() => setImgs(imgs.filter((_, k) => k !== i))} className="flex-1 cursor-pointer py-1.5 text-red-600 hover:bg-red-50">삭제</button>
                </div>
              </div>
            ))}
            {imgs.length < MAX && (
              <button type="button" onClick={() => ref.current?.click()} disabled={busy} className="grid aspect-[2.4/1] cursor-pointer place-items-center rounded-lg border-2 border-dashed border-neutral-300 text-[0.75rem] font-bold text-neutral-500 hover:border-brand hover:text-brand disabled:opacity-60">
                {busy ? "처리 중..." : "+ 배너 이미지 추가"}
              </button>
            )}
          </div>
        )}
        <input ref={ref} type="file" accept="image/*" multiple hidden onChange={(e) => add(e.target.files)} />
        <p className="mt-3 text-[0.6875rem] text-neutral-400">큰 이미지는 자동으로 줄여서 저장합니다(가로 1920px 이내, WebP). 배너를 모두 삭제하고 저장하면 기본 배경으로 돌아갑니다.</p>

        <div className="mt-4 flex flex-wrap items-center gap-3">
          <button onClick={save} disabled={saving || imgs === null} className="cursor-pointer rounded bg-brand px-5 py-2.5 text-[0.8125rem] font-bold text-white hover:bg-brand-dark disabled:opacity-60">{saving ? "저장 중..." : "저장"}</button>
          {note && <span className={`text-[0.75rem] ${note.ok ? "text-emerald-600" : "text-red-600"}`}>{note.t}</span>}
        </div>
      </section>
    </div>
  );
}
