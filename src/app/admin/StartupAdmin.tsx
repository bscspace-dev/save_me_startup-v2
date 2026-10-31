"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { businessCategories, regions, won, type Listing } from "@/lib/data";
import { fetchRemoteListing, fetchRemoteListings, fetchRemotePhotos } from "@/lib/remote";
import { consultItems } from "@/lib/startup";
import { supabase } from "@/lib/supabase";
import { dataUrlToBlob, shrink } from "./imageTools";
import { Photos } from "./ShopAdmin";

type Cred = { u: string; p: string };

const categories = businessCategories;
const ops = ["직접운영", "반오토", "풀오토"];
const inputCls = "w-full rounded border border-neutral-300 bg-white px-3 py-2.5 text-[13px] outline-none focus:border-brand";
// 지역 필터용 구·군은 입력한 주소("대구 중구 계양동")에서 자동으로 가져온다
const regionOf = (address: string) => address.split(/s+/).find((w) => regions.some(([r]) => r === w)) ?? "";
const PYEONG = 3.3058; // 1평 = 3.3058㎡ (저장은 ㎡, 화면 입력은 평)
const today = () => new Date().toLocaleDateString("sv-SE");

function Label({ text, req, children }: { text: string; req?: boolean; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1 block text-[11px] font-bold text-neutral-500">{text}{req && <b className="ml-0.5 text-brand">*</b>}</span>
      {children}
    </label>
  );
}

// 신규창업(창업컨설팅 상가) 등록: 상가 사진·소개와 구해줘창업이 진행한 컨설팅 항목을 관리한다
export function StartupAdmin({ cred }: { cred: Cred }) {
  const [items, setItems] = useState<Listing[] | null>(null);
  const [editing, setEditing] = useState<number | "new" | null>(null);
  const [tick, setTick] = useState(0);
  const [note, setNote] = useState("");

  useEffect(() => {
    let alive = true;
    fetchRemoteListings().then((l) => { if (alive) setItems(l.filter((x) => x.startup)); }); // 신규창업만
    return () => { alive = false; };
  }, [tick]);

  const reload = () => setTick((t) => t + 1);

  async function remove(l: Listing) {
    if (!confirm(`${l.title} (${l.id}번)을 삭제할까요? 사진도 함께 삭제되며 되돌릴 수 없습니다.`)) return;
    const { data, error } = await supabase!.rpc("admin_shop_delete", { ...cred, listing_id: l.id });
    if (error || !data) return setNote("삭제하지 못했습니다.");
    setNote(""); reload();
  }

  if (editing !== null) {
    return <StartupForm key={editing} cred={cred} id={editing === "new" ? null : editing} onDone={(saved) => { setEditing(null); if (saved) reload(); }} />;
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-[12px] text-neutral-500">관리자에서 등록한 신규창업 {items ? `${items.length}건` : ""} <span className="text-neutral-300">· 기존 샘플(10038~10040)은 여기에 표시되지 않습니다</span></p>
        <button onClick={() => setEditing("new")} className="rounded bg-brand px-4 py-2.5 text-[13px] font-bold text-white hover:bg-brand-dark">+ 신규창업 등록</button>
      </div>
      {note && <p className="mt-3 rounded-lg bg-red-50 p-3 text-[12px] text-red-700">{note}</p>}
      <ul className="mt-4 space-y-3">
        {items === null && <li className="py-16 text-center text-[13px] text-neutral-400">불러오는 중...</li>}
        {items && items.length === 0 && <li className="py-16 text-center text-[13px] text-neutral-400">등록된 신규창업이 없습니다. 오른쪽 위 버튼으로 등록하세요.</li>}
        {items?.map((l) => (
          <li key={l.id} className="flex flex-wrap items-center gap-4 rounded-xl border border-neutral-200 bg-white p-3">
            <div className="h-[68px] w-[100px] shrink-0 overflow-hidden rounded-lg bg-neutral-100">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              {l.thumb && <img src={l.thumb} alt="" className="size-full object-cover" />}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[11px] text-neutral-400">[{l.id}] {l.date} · 사진 {l.photos}장 · 컨설팅 {l.startup!.done.length}/{consultItems.length}항목</p>
              <p className="truncate text-[14px] font-black">{l.title}</p>
              <p className="text-[12px] text-neutral-500">{l.startup!.address ?? `대구 ${l.region}`} · {l.category} · 컨설팅 비용 약 {won(l.cost)}원</p>
            </div>
            <div className="flex shrink-0 gap-2 text-[11.5px]">
              <Link href={`/listings/${l.id}`} target="_blank" className="rounded border border-neutral-300 px-3 py-1.5 font-bold hover:border-brand hover:text-brand">보기</Link>
              <button onClick={() => setEditing(l.id)} className="rounded border border-neutral-300 px-3 py-1.5 font-bold hover:border-brand hover:text-brand">수정</button>
              <button onClick={() => remove(l)} className="rounded border border-neutral-300 px-3 py-1.5 font-bold text-red-600 hover:border-red-400">삭제</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

function StartupForm({ cred, id, onDone }: { cred: Cred; id: number | null; onDone: (saved: boolean) => void }) {
  const [f, setF] = useState({ title: "", address: "", category: categories[0], op: ops[0], area: "", cost: "", story: "" });
  const [done, setDone] = useState<string[]>([]);
  const [photos, setPhotos] = useState<string[]>([]);
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(id !== null);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");

  useEffect(() => {
    if (id === null) return;
    let alive = true;
    Promise.all([fetchRemoteListing(id), fetchRemotePhotos(id)]).then(([l, ph]) => {
      if (!alive) return;
      if (l?.startup) {
        setF({ title: l.title, address: l.startup.address ?? `대구 ${l.region}`, category: l.category, op: l.op, area: String(Math.round((l.area / PYEONG) * 10) / 10), cost: String(l.cost), story: l.startup.story });
        setDone(l.startup.done); setPhotos(ph); setDate(l.date ?? "");
      } else setErr("신규창업을 불러오지 못했습니다.");
      setLoading(false);
    });
    return () => { alive = false; };
  }, [id]);

  const set = <K extends keyof typeof f>(k: K, v: (typeof f)[K]) => setF((p) => ({ ...p, [k]: v }));
  const toggle = (label: string) => setDone((d) => (d.includes(label) ? d.filter((x) => x !== label) : [...d, label]));

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!supabase) return;
    if (!photos.length) return setErr("상가 사진을 1장 이상 등록해주세요.");
    setBusy(true); setErr("");
    const address = f.address.trim();
    const region = regionOf(address);
    if (!region) { setBusy(false); return setErr("주소에 구·군 이름이 필요합니다. 예) 대구 중구 계양동"); }
    const cost = Number(f.cost.replace(/,/g, "")) || 0;
    try {
      const thumb = await shrink(await dataUrlToBlob(photos[0]), 480, 0.7, 40_000);
      const d = {
        title: f.title.trim(), region, category: f.category, op: f.op, area: Math.round((Number(f.area) || 0) * PYEONG * 100) / 100, price: cost, cost, date: date || today(), kind: "신규창업",
        startup: { address, story: f.story.trim(), done: consultItems.filter((x) => done.includes(x)) }, // 항목 순서는 화면과 같게 유지
      };
      const { data, error } = await supabase.rpc("admin_shop_save", { ...cred, listing_id: id, d, t: thumb, photos, is_sold: false });
      if (error) throw new Error(error.message);
      if (!data) throw new Error("인증에 실패했습니다. 다시 로그인해주세요.");
      onDone(true);
    } catch (ex) {
      setErr(`저장하지 못했습니다: ${ex instanceof Error ? ex.message : "알 수 없는 오류"} (shops.sql 실행 여부를 확인해주세요)`);
      setBusy(false);
    }
  }

  if (loading) return <p className="py-16 text-center text-[13px] text-neutral-400">불러오는 중...</p>;

  return (
    <form onSubmit={submit} className="space-y-5">
      <div className="flex items-center justify-between">
        <h2 className="text-[17px] font-black">{id === null ? "신규창업 등록" : `신규창업 수정 · ${id}번`}</h2>
        <button type="button" onClick={() => onDone(false)} className="text-[12px] font-bold text-neutral-500 hover:text-brand">← 목록으로</button>
      </div>

      <section className="rounded-2xl border border-neutral-200 bg-white p-6">
        <h2 className="mb-4 text-[15px] font-black">상가 정보</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="sm:col-span-2"><Label text="상가 이름 (상세 맨 위 제목)" req><input required value={f.title} onChange={(e) => set("title", e.target.value)} placeholder="온기 베이커리" className={inputCls} /></Label></div>
          <div className="sm:col-span-2"><Label text="지역 (구·군·동까지)" req><input required value={f.address} onChange={(e) => set("address", e.target.value)} placeholder="대구 중구 계양동" className={inputCls} /></Label></div>
          <Label text="업종">
            <select value={f.category} onChange={(e) => set("category", e.target.value)} className={inputCls}>{categories.map((c) => <option key={c}>{c}</option>)}</select>
          </Label>
          <Label text="운영방식">
            <select value={f.op} onChange={(e) => set("op", e.target.value)} className={inputCls}>{ops.map((o) => <option key={o}>{o}</option>)}</select>
          </Label>
          <Label text="전용면적 (평)" req><input required inputMode="decimal" value={f.area} onChange={(e) => set("area", e.target.value.replace(/[^0-9.]/g, ""))} placeholder="20" className={inputCls} /></Label>
          <Label text="컨설팅 비용 (만원)" req><input required inputMode="numeric" value={f.cost} onChange={(e) => set("cost", e.target.value.replace(/[^0-9,]/g, ""))} placeholder="9000" className={inputCls} /></Label>
        </div>
      </section>

      <Photos photos={photos} setPhotos={setPhotos} />

      <section className="rounded-2xl border border-neutral-200 bg-white p-6">
        <h2 className="mb-4 text-[15px] font-black">창업 상가 소개</h2>
        <textarea required rows={5} value={f.story} onChange={(e) => set("story", e.target.value)} placeholder="상가의 외관·분위기·규모 등을 소개해주세요" className={inputCls} />
      </section>

      <section className="rounded-2xl border border-neutral-200 bg-white p-6">
        <h2 className="text-[15px] font-black">컨설팅 리스트 <span className="ml-1 text-[12px] font-normal text-neutral-400">구해줘창업이 진행한 항목만 체크하세요 · 체크한 항목은 주황색으로 표시됩니다</span></h2>
        <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {consultItems.map((label) => (
            <label key={label} className={`flex cursor-pointer items-center gap-2.5 rounded-lg border px-4 py-3 text-[13px] font-bold transition ${done.includes(label) ? "border-brand bg-orange-50 text-brand" : "border-neutral-200 text-neutral-400"}`}>
              <input type="checkbox" checked={done.includes(label)} onChange={() => toggle(label)} className="accent-[#d9480f]" />{label}
            </label>
          ))}
        </div>
      </section>

      {err && <p className="rounded-lg bg-red-50 p-3 text-[12px] leading-relaxed text-red-700">{err}</p>}
      <div className="flex gap-2">
        <button type="button" onClick={() => onDone(false)} className="rounded border border-neutral-300 bg-white px-6 py-3.5 text-[14px] font-bold hover:bg-neutral-50">취소</button>
        <button disabled={busy} className="flex-1 rounded bg-brand py-3.5 text-[14px] font-bold text-white hover:bg-brand-dark disabled:opacity-60">{busy ? "저장 중..." : id === null ? "등록하기" : "수정 저장"}</button>
      </div>
    </form>
  );
}
