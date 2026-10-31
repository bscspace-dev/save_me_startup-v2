"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { won, type Listing } from "@/lib/data";
import { fetchRemoteListing, fetchRemoteListings, fetchRemotePhotos } from "@/lib/remote";
import { supabase } from "@/lib/supabase";
import { shrink, slicePromo } from "./imageTools";

type Cred = { u: string; p: string };

const categories = ["한식·분식", "카페·음료", "베이커리·디저트", "기타 업종"];
const ops = ["직접운영", "반오토", "풀오토"];
const MAX_SLICES = 24;
const inputCls = "w-full rounded border border-neutral-300 bg-white px-3 py-2.5 text-[13px] outline-none focus:border-brand";
const today = () => new Date().toLocaleDateString("sv-SE");
const kb = (urls: string[]) => Math.round(urls.reduce((a, u) => a + u.length, 0) / 1024);

function Label({ text, req, children }: { text: string; req?: boolean; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1 block text-[11px] font-bold text-neutral-500">{text}{req && <b className="ml-0.5 text-brand">*</b>}</span>
      {children}
    </label>
  );
}

export function FranchiseAdmin({ cred }: { cred: Cred }) {
  const [items, setItems] = useState<Listing[] | null>(null);
  const [editing, setEditing] = useState<number | "new" | null>(null);
  const [tick, setTick] = useState(0);
  const [note, setNote] = useState("");

  useEffect(() => {
    let alive = true;
    fetchRemoteListings().then((l) => { if (alive) setItems(l.filter((x) => x.promo)); }); // 프랜차이즈 홍보만
    return () => { alive = false; };
  }, [tick]);

  const reload = () => setTick((t) => t + 1);

  async function toggleSold(l: Listing) {
    const { data, error } = await supabase!.rpc("admin_shop_set_sold", { ...cred, listing_id: l.id, v: !l.sold });
    if (error || !data) return setNote("변경하지 못했습니다.");
    setNote(""); reload();
  }

  async function remove(l: Listing) {
    if (!confirm(`${l.promo?.brand} (${l.id}번)을 삭제할까요? 이미지도 함께 삭제되며 되돌릴 수 없습니다.`)) return;
    const { data, error } = await supabase!.rpc("admin_shop_delete", { ...cred, listing_id: l.id });
    if (error || !data) return setNote("삭제하지 못했습니다.");
    setNote(""); reload();
  }

  if (editing !== null) {
    return <FranchiseForm key={editing} cred={cred} id={editing === "new" ? null : editing} onDone={(saved) => { setEditing(null); if (saved) reload(); }} />;
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-[12px] text-neutral-500">관리자에서 등록한 프랜차이즈 홍보 {items ? `${items.length}건` : ""} <span className="text-neutral-300">· 기존 정적 브랜드(10022·10033 등)는 여기에 표시되지 않습니다</span></p>
        <button onClick={() => setEditing("new")} className="rounded bg-brand px-4 py-2.5 text-[13px] font-bold text-white hover:bg-brand-dark">+ 프랜차이즈 등록</button>
      </div>
      {note && <p className="mt-3 rounded-lg bg-red-50 p-3 text-[12px] text-red-700">{note}</p>}
      <ul className="mt-4 space-y-3">
        {items === null && <li className="py-16 text-center text-[13px] text-neutral-400">불러오는 중...</li>}
        {items && items.length === 0 && <li className="py-16 text-center text-[13px] text-neutral-400">등록된 프랜차이즈 홍보가 없습니다. 오른쪽 위 버튼으로 등록하세요.</li>}
        {items?.map((l) => (
          <li key={l.id} className="flex flex-wrap items-center gap-4 rounded-xl border border-neutral-200 bg-white p-3">
            <div className="relative h-[68px] w-[100px] shrink-0 overflow-hidden rounded-lg bg-neutral-100">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              {l.thumb && <img src={l.thumb} alt="" className="size-full object-cover" />}
              {l.sold && <span className="absolute inset-0 grid place-items-center bg-black/55 text-[11px] font-bold text-white">모집마감</span>}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[11px] text-neutral-400">[{l.id}] {l.promo!.brand} · {l.date} · 이미지 {l.photos}장{l.promo!.sponsored && " · 광고"}</p>
              <p className="truncate text-[14px] font-black">{l.title}</p>
              <p className="text-[12px] text-neutral-500">{l.category} · {l.op} · 예상 창업비 약 {won(l.price)}원</p>
            </div>
            <div className="flex shrink-0 gap-2 text-[11.5px]">
              <Link href={`/listings/${l.id}`} target="_blank" className="rounded border border-neutral-300 px-3 py-1.5 font-bold hover:border-brand hover:text-brand">보기</Link>
              <button onClick={() => setEditing(l.id)} className="rounded border border-neutral-300 px-3 py-1.5 font-bold hover:border-brand hover:text-brand">수정</button>
              <button onClick={() => toggleSold(l)} className="rounded border border-neutral-300 px-3 py-1.5 font-bold hover:border-brand hover:text-brand">{l.sold ? "모집마감 해제" : "모집마감"}</button>
              <button onClick={() => remove(l)} className="rounded border border-neutral-300 px-3 py-1.5 font-bold text-red-600 hover:border-red-400">삭제</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

function FranchiseForm({ cred, id, onDone }: { cred: Cred; id: number | null; onDone: (saved: boolean) => void }) {
  const [f, setF] = useState({ brand: "", title: "", desc: "", category: categories[0], op: ops[0], cost: "", area: "", sponsored: false, sold: false });
  const [card, setCard] = useState("");      // 목록 카드에 쓰는 대표 이미지
  const [slices, setSlices] = useState<string[]>([]); // 상세에 이어 붙여 보여주는 홍보 이미지 조각
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(id !== null);
  const [busy, setBusy] = useState(false);
  const [working, setWorking] = useState(false);
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");
  const promoRef = useRef<HTMLInputElement>(null);
  const cardRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (id === null) return;
    let alive = true;
    Promise.all([fetchRemoteListing(id), fetchRemotePhotos(id)]).then(([l, ph]) => {
      if (!alive) return;
      if (l?.promo) {
        setF({ brand: l.promo.brand, title: l.title, desc: l.promo.desc, category: l.category, op: l.op, cost: String(l.price), area: l.promo.area ?? "", sponsored: !!l.promo.sponsored, sold: !!l.sold });
        setCard(l.thumb ?? ""); setSlices(ph); setDate(l.date ?? "");
      } else setErr("브랜드를 불러오지 못했습니다.");
      setLoading(false);
    });
    return () => { alive = false; };
  }, [id]);

  const set = <K extends keyof typeof f>(k: K, v: (typeof f)[K]) => setF((p) => ({ ...p, [k]: v }));

  async function addPromo(files: FileList | null) {
    if (!files?.length) return;
    setWorking(true); setMsg("");
    try {
      const added: string[] = [];
      for (const file of Array.from(files).filter((x) => x.type.startsWith("image/"))) added.push(...(await slicePromo(file)));
      const next = [...slices, ...added];
      if (next.length > MAX_SLICES) { setMsg(`이미지 조각은 최대 ${MAX_SLICES}개까지 등록할 수 있습니다. 더 긴 이미지는 나눠서 줄여 올려주세요.`); }
      setSlices(next.slice(0, MAX_SLICES));
    } catch { setMsg("이미지를 읽지 못했습니다. 다른 파일로 시도해주세요."); }
    setWorking(false);
    if (promoRef.current) promoRef.current.value = "";
  }

  async function pickCard(files: FileList | null) {
    const file = files?.[0];
    if (!file) return;
    try { setCard(await shrink(file, 800, 0.75, 70_000)); } catch { setMsg("대표 이미지를 읽지 못했습니다."); }
    if (cardRef.current) cardRef.current.value = "";
  }

  const move = (i: number, d: number) => {
    const j = i + d;
    if (j < 0 || j >= slices.length) return;
    const n = [...slices];
    [n[i], n[j]] = [n[j], n[i]];
    setSlices(n);
  };

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!supabase) return;
    if (!card) return setErr("목록 카드 대표 이미지를 올려주세요.");
    if (!slices.length) return setErr("홍보 이미지를 1개 이상 올려주세요.");
    setBusy(true); setErr("");
    const cost = Number(f.cost.replace(/,/g, "")) || 0;
    try {
      const d = {
        title: f.title.trim(), region: "", category: f.category, op: f.op, area: 0, price: cost, cost, date: date || today(), kind: "프랜차이즈",
        promo: { brand: f.brand.trim(), desc: f.desc.trim(), area: f.area.trim() || undefined, sponsored: f.sponsored },
      };
      const { data, error } = await supabase.rpc("admin_shop_save", { ...cred, listing_id: id, d, t: card, photos: slices, is_sold: f.sold });
      if (error) throw new Error(error.message);
      if (!data) throw new Error("인증에 실패했습니다. 다시 로그인해주세요.");
      onDone(true);
    } catch (ex) {
      setErr(`저장하지 못했습니다: ${ex instanceof Error ? ex.message : "알 수 없는 오류"} (이미지가 너무 많거나 크면 실패할 수 있습니다)`);
      setBusy(false);
    }
  }

  if (loading) return <p className="py-16 text-center text-[13px] text-neutral-400">불러오는 중...</p>;

  return (
    <form onSubmit={submit} className="space-y-5">
      <div className="flex items-center justify-between">
        <h2 className="text-[17px] font-black">{id === null ? "프랜차이즈 등록" : `프랜차이즈 수정 · ${id}번`}</h2>
        <button type="button" onClick={() => onDone(false)} className="text-[12px] font-bold text-neutral-500 hover:text-brand">← 목록으로</button>
      </div>

      <section className="rounded-2xl border border-neutral-200 bg-white p-6">
        <h2 className="mb-4 text-[15px] font-black">브랜드 정보</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          <Label text="브랜드명" req><input required value={f.brand} onChange={(e) => set("brand", e.target.value)} placeholder="브랜드 이름" className={inputCls} /></Label>
          <Label text="모집지역 (선택)"><input value={f.area} onChange={(e) => set("area", e.target.value)} placeholder="전국 · 대구 우선 모집" className={inputCls} /></Label>
          <div className="sm:col-span-2"><Label text="제목 (목록 카드와 상세의 큰 제목)" req><input required value={f.title} onChange={(e) => set("title", e.target.value)} placeholder="회사 다니면서도 도전할 수 있는 무인 인형뽑기 창업" className={inputCls} /></Label></div>
          <div className="sm:col-span-2"><Label text="소개 문구 (한 줄)" req><input required maxLength={100} value={f.desc} onChange={(e) => set("desc", e.target.value)} placeholder="월 순수익 800만원, 본사 직접 책임 시공과 A/S" className={inputCls} /></Label></div>
          <Label text="업종">
            <select value={f.category} onChange={(e) => set("category", e.target.value)} className={inputCls}>{categories.map((c) => <option key={c}>{c}</option>)}</select>
          </Label>
          <Label text="운영모델">
            <select value={f.op} onChange={(e) => set("op", e.target.value)} className={inputCls}>{ops.map((o) => <option key={o}>{o}</option>)}</select>
          </Label>
          <Label text="예상 창업비 (만원)" req><input required inputMode="numeric" value={f.cost} onChange={(e) => set("cost", e.target.value.replace(/[^0-9,]/g, ""))} placeholder="4900" className={inputCls} /></Label>
        </div>
        <div className="mt-4 flex flex-wrap gap-6 text-[13px]">
          <label className="flex items-center gap-2"><input type="checkbox" checked={f.sponsored} onChange={(e) => set("sponsored", e.target.checked)} className="accent-[#d9480f]" />유료 홍보 (상세에 광고 표시)</label>
        </div>
      </section>

      <section className="rounded-2xl border border-neutral-200 bg-white p-6">
        <h2 className="text-[15px] font-black">목록 카드 대표 이미지 <b className="text-brand">*</b> <span className="ml-1 text-[12px] font-normal text-neutral-400">매물 목록 카드와 상세 상단에 크게 나오는 대표 사진 · 가로형(4:3) 매장·제품 사진 권장</span></h2>
        <div className="mt-4 flex items-center gap-4">
          <div className="grid h-[100px] w-[150px] shrink-0 place-items-center overflow-hidden rounded-lg bg-neutral-100 text-[11px] text-neutral-400">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            {card ? <img src={card} alt="" className="size-full object-cover" /> : "미등록"}
          </div>
          <button type="button" onClick={() => cardRef.current?.click()} className="rounded border border-neutral-300 px-4 py-2.5 text-[12.5px] font-bold hover:border-brand hover:text-brand">{card ? "이미지 바꾸기" : "이미지 선택"}</button>
          <input ref={cardRef} type="file" accept="image/*" hidden onChange={(e) => pickCard(e.target.files)} />
        </div>
      </section>

      <section className="rounded-2xl border border-neutral-200 bg-white p-6">
        <h2 className="text-[15px] font-black">홍보 이미지 <b className="text-brand">*</b> <span className="ml-1 text-[12px] font-normal text-neutral-400">{slices.length} / {MAX_SLICES}조각 · 약 {kb(slices).toLocaleString()}KB</span></h2>
        <p className="mt-1 text-[11.5px] leading-relaxed text-neutral-400">가맹본부가 만든 홍보 이미지(세로로 긴 한 장도 가능)를 올리면 자동으로 가로 1100px에 맞춰 알맞은 크기로 잘라서 저장하고, 상세에서 틈 없이 이어서 보여줍니다. 여러 장을 올리면 순서대로 이어 붙습니다.</p>
        <div className="mt-4 grid grid-cols-3 gap-3 sm:grid-cols-4 lg:grid-cols-6">
          {slices.map((s, i) => (
            <div key={i} className="overflow-hidden rounded-lg border border-neutral-200">
              <div className="relative aspect-[3/4] bg-neutral-100">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={s} alt="" className="size-full object-cover object-top" />
                <span className="absolute left-1.5 top-1.5 rounded bg-black/60 px-1.5 py-0.5 text-[10px] font-bold text-white">{i + 1}</span>
              </div>
              <div className="flex divide-x divide-neutral-200 text-[12px] font-bold">
                <button type="button" onClick={() => move(i, -1)} disabled={i === 0} className="flex-1 py-1.5 hover:bg-neutral-50 disabled:opacity-30">↑</button>
                <button type="button" onClick={() => move(i, 1)} disabled={i === slices.length - 1} className="flex-1 py-1.5 hover:bg-neutral-50 disabled:opacity-30">↓</button>
                <button type="button" onClick={() => setSlices(slices.filter((_, k) => k !== i))} className="flex-1 py-1.5 text-red-600 hover:bg-red-50">삭제</button>
              </div>
            </div>
          ))}
          <button type="button" onClick={() => promoRef.current?.click()} disabled={working || slices.length >= MAX_SLICES} className="grid aspect-[3/4] place-items-center rounded-lg border-2 border-dashed border-neutral-300 text-[12px] font-bold text-neutral-400 hover:border-brand hover:text-brand disabled:opacity-50">
            {working ? "처리 중..." : "+ 이미지 추가"}
          </button>
        </div>
        <input ref={promoRef} type="file" accept="image/*" multiple hidden onChange={(e) => addPromo(e.target.files)} />
        {msg && <p className="mt-2 text-[12px] text-red-600">{msg}</p>}
      </section>

      {err && <p className="rounded-lg bg-red-50 p-3 text-[12px] leading-relaxed text-red-700">{err}</p>}
      <div className="flex gap-2">
        <button type="button" onClick={() => onDone(false)} className="rounded border border-neutral-300 bg-white px-6 py-3.5 text-[14px] font-bold hover:bg-neutral-50">취소</button>
        <button disabled={busy || working} className="flex-1 rounded bg-brand py-3.5 text-[14px] font-bold text-white hover:bg-brand-dark disabled:opacity-60">{busy ? "저장 중..." : id === null ? "등록하기" : "수정 저장"}</button>
      </div>
    </form>
  );
}
