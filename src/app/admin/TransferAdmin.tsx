"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { regions, won, type Listing } from "@/lib/data";
import { fetchRemoteListing, fetchRemoteListings, fetchRemotePhotos } from "@/lib/remote";
import { supabase } from "@/lib/supabase";
import { makeTransfer } from "@/lib/transfer";
import { dataUrlToBlob, shrink } from "./imageTools";
import { Photos } from "./ShopAdmin";

type Cred = { u: string; p: string };

const categories = ["한식·분식", "카페·음료", "베이커리·디저트", "기타 업종"];
const ops = ["직접운영", "반오토", "풀오토"];
const inputCls = "w-full rounded border border-neutral-300 bg-white px-3 py-2.5 text-[13px] outline-none focus:border-brand";
// 지역 필터용 구·군은 입력한 주소("대구 중구 계양동")에서 자동으로 가져온다
const regionOf = (address: string) => address.split(/\s+/).find((w) => regions.some(([r]) => r === w)) ?? "";
const today = () => new Date().toLocaleDateString("sv-SE");
const num = (v: string) => v.replace(/[^0-9]/g, "");

function Label({ text, req, children }: { text: string; req?: boolean; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1 block text-[11px] font-bold text-neutral-500">{text}{req && <b className="ml-0.5 text-brand">*</b>}</span>
      {children}
    </label>
  );
}

// 전수창업 등록: 사부(전수자) 정보와 사진을 입력하면 상세 문구는 업종별 기본 문구로 만들어진다
export function TransferAdmin({ cred }: { cred: Cred }) {
  const [items, setItems] = useState<Listing[] | null>(null);
  const [editing, setEditing] = useState<number | "new" | null>(null);
  const [tick, setTick] = useState(0);
  const [note, setNote] = useState("");

  useEffect(() => {
    let alive = true;
    fetchRemoteListings().then((l) => { if (alive) setItems(l.filter((x) => x.transfer)); }); // 전수창업만
    return () => { alive = false; };
  }, [tick]);

  const reload = () => setTick((t) => t + 1);

  async function toggleSold(l: Listing) {
    const { data, error } = await supabase!.rpc("admin_shop_set_sold", { ...cred, listing_id: l.id, v: !l.sold });
    if (error || !data) return setNote("변경하지 못했습니다.");
    setNote(""); reload();
  }

  async function remove(l: Listing) {
    if (!confirm(`${l.transfer!.store} (${l.id}번)을 삭제할까요? 사진도 함께 삭제되며 되돌릴 수 없습니다.`)) return;
    const { data, error } = await supabase!.rpc("admin_shop_delete", { ...cred, listing_id: l.id });
    if (error || !data) return setNote("삭제하지 못했습니다.");
    setNote(""); reload();
  }

  if (editing !== null) {
    return <TransferForm key={editing} cred={cred} id={editing === "new" ? null : editing} onDone={(saved) => { setEditing(null); if (saved) reload(); }} />;
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-[12px] text-neutral-500">관리자에서 등록한 전수창업 {items ? `${items.length}건` : ""} <span className="text-neutral-300">· 기존 샘플(10020~10036)은 여기에 표시되지 않습니다</span></p>
        <button onClick={() => setEditing("new")} className="rounded bg-brand px-4 py-2.5 text-[13px] font-bold text-white hover:bg-brand-dark">+ 전수창업 등록</button>
      </div>
      {note && <p className="mt-3 rounded-lg bg-red-50 p-3 text-[12px] text-red-700">{note}</p>}
      <ul className="mt-4 space-y-3">
        {items === null && <li className="py-16 text-center text-[13px] text-neutral-400">불러오는 중...</li>}
        {items && items.length === 0 && <li className="py-16 text-center text-[13px] text-neutral-400">등록된 전수창업이 없습니다. 오른쪽 위 버튼으로 등록하세요.</li>}
        {items?.map((l) => (
          <li key={l.id} className="flex flex-wrap items-center gap-4 rounded-xl border border-neutral-200 bg-white p-3">
            <div className="relative h-[68px] w-[100px] shrink-0 overflow-hidden rounded-lg bg-neutral-100">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              {l.thumb && <img src={l.thumb} alt="" className="size-full object-cover" />}
              {l.sold && <span className="absolute inset-0 grid place-items-center bg-black/55 text-[11px] font-bold text-white">매칭완료</span>}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[11px] text-neutral-400">[{l.id}] {l.date} · 사진 {l.photos}장</p>
              <p className="truncate text-[14px] font-black">{l.category} · {l.transfer!.store}</p>
              <p className="text-[12px] text-neutral-500">{l.transfer!.name} 사부 · {l.transfer!.address ?? `대구 ${l.region}`} · 전수 비용 약 {won(l.price)}원</p>
            </div>
            <div className="flex shrink-0 gap-2 text-[11.5px]">
              <Link href={`/listings/${l.id}`} target="_blank" className="rounded border border-neutral-300 px-3 py-1.5 font-bold hover:border-brand hover:text-brand">보기</Link>
              <button onClick={() => setEditing(l.id)} className="rounded border border-neutral-300 px-3 py-1.5 font-bold hover:border-brand hover:text-brand">수정</button>
              <button onClick={() => toggleSold(l)} title="실제 창업자와 매칭되었을 때 설정" className="rounded border border-neutral-300 px-3 py-1.5 font-bold hover:border-brand hover:text-brand">{l.sold ? "매칭완료 해제" : "매칭완료"}</button>
              <button onClick={() => remove(l)} className="rounded border border-neutral-300 px-3 py-1.5 font-bold text-red-600 hover:border-red-400">삭제</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

function TransferForm({ cred, id, onDone }: { cred: Cred; id: number | null; onDone: (saved: boolean) => void }) {
  const [f, setF] = useState({ name: "", store: "", address: "", category: categories[0], op: ops[0], area: "", price: "", years: "", days: "", menus: "", sold: false, career: "", menuNames: "" });
  const [history, setHistory] = useState<[string, string][]>([]); // 이력: [시기, 내용]
  const [photos, setPhotos] = useState<string[]>([]);
  const [menuPhotos, setMenuPhotos] = useState<string[]>([]); // 대표 메뉴 사진 (저장할 때 사부 사진 뒤에 이어 붙인다)
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(id !== null);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");

  useEffect(() => {
    if (id === null) return;
    let alive = true;
    Promise.all([fetchRemoteListing(id), fetchRemotePhotos(id)]).then(([l, ph]) => {
      if (!alive) return;
      const t = l?.transfer;
      if (l && t) {
        setF({
          name: t.name, store: t.store, address: t.address ?? `대구 ${l.region}`, category: l.category, op: l.op, area: String(Math.round((l.area / 3.3058) * 10) / 10),
          price: String(l.price), years: String(t.years), days: String(t.days), menus: String(t.menus), sold: !!l.sold, career: t.career ?? "", menuNames: (t.menuNames ?? []).join(", "),
        });
        setHistory(t.timeline ?? []); const nm = Math.min(t.menuPhotos ?? 0, ph.length); setPhotos(ph.slice(0, ph.length - nm)); setMenuPhotos(ph.slice(ph.length - nm)); setDate(l.date ?? "");
      } else setErr("전수창업을 불러오지 못했습니다.");
      setLoading(false);
    });
    return () => { alive = false; };
  }, [id]);

  const set = <K extends keyof typeof f>(k: K, v: (typeof f)[K]) => setF((p) => ({ ...p, [k]: v }));

  // 업종·경력·교육 팀 수로 만든 기본 이력을 입력 칸에 채워 두고 고쳐 쓸 수 있게 한다
  const fillDefault = () => {
    const t = makeTransfer(f.category, { name: f.name || "사부", store: f.store, en: "", years: Number(f.years) || 1, days: Number(f.days) || 10, menus: Number(f.menus) || 0 });
    setHistory(t.timeline);
  };

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!supabase) return;
    if (!menuPhotos.length) return setErr("교육 대표 메뉴 사진을 1장 이상 등록해주세요.");
    const address = f.address.trim();
    const region = regionOf(address);
    if (!region) return setErr("주소에 구·군 이름이 필요합니다. 예) 대구 중구 계양동");
    const price = Number(f.price) || 0;
    setBusy(true); setErr("");
    try {
      const thumb = await shrink(await dataUrlToBlob(menuPhotos[0]), 480, 0.7, 40_000);
      const d = {
        title: `${f.store.trim()} 전수창업`, region, category: f.category, op: f.op, area: Math.round((Number(f.area) || 0) * 3.3058 * 100) / 100, price, cost: price, date: date || today(), kind: "전수창업",
        transfer: { name: f.name.trim(), store: f.store.trim(), address, years: Number(f.years) || 0, days: Number(f.days) || 1, menus: Number(f.menus) || 0, menuPhotos: menuPhotos.length, career: f.career.trim() || undefined, menuNames: f.menuNames.split(/[,\n]/).map((x) => x.trim()).filter(Boolean), timeline: history.filter(([y, x]) => y.trim() && x.trim()).map(([y, x]) => [y.trim(), x.trim()]) },
      };
      const { data, error } = await supabase.rpc("admin_shop_save", { ...cred, listing_id: id, d, t: thumb, photos: [...photos, ...menuPhotos], is_sold: f.sold });
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
        <h2 className="text-[17px] font-black">{id === null ? "전수창업 등록" : `전수창업 수정 · ${id}번`}</h2>
        <button type="button" onClick={() => onDone(false)} className="text-[12px] font-bold text-neutral-500 hover:text-brand">← 목록으로</button>
      </div>

      <section className="rounded-2xl border border-neutral-200 bg-white p-6">
        <h2 className="mb-4 text-[15px] font-black">사부(전수자) 정보</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          <Label text="사부(전수자) 이름" req><input required value={f.name} onChange={(e) => set("name", e.target.value)} placeholder="이정훈" className={inputCls} /></Label>
          <Label text="매장 이름" req><input required value={f.store} onChange={(e) => set("store", e.target.value)} placeholder="온기 베이커리" className={inputCls} /></Label>
          <Label text="현장 경력 (년)" req><input required inputMode="numeric" value={f.years} onChange={(e) => set("years", num(e.target.value))} placeholder="14" className={inputCls} /></Label>
        </div>
      </section>

      <section className="rounded-2xl border border-neutral-200 bg-white p-6">
        <h2 className="text-[15px] font-black">경력·이력 <span className="ml-1 text-[12px] font-normal text-neutral-400">비워 두면 업종별 기본 문구로 나옵니다</span></h2>
        <div className="mt-4">
          <Label text="경력 한 줄 (사부 사진 아래에 표시)"><input value={f.career} onChange={(e) => set("career", e.target.value)} placeholder="호텔 베이커리 경력 14년" className={inputCls} /></Label>
        </div>
        <p className="mb-2 mt-5 text-[11px] font-bold text-neutral-500">이력 (위에서 아래로 시간순)</p>
        <ul className="space-y-2">
          {history.map(([y, x], i) => (
            <li key={i} className="flex gap-2">
              <input value={y} onChange={(e) => setHistory(history.map((r, k) => (k === i ? [e.target.value, r[1]] : r)))} placeholder="2012" className={`${inputCls} !w-[110px] shrink-0`} />
              <input value={x} onChange={(e) => setHistory(history.map((r, k) => (k === i ? [r[0], e.target.value] : r)))} placeholder="호텔 베이커리 근무" className={inputCls} />
              <button type="button" onClick={() => setHistory(history.filter((_, k) => k !== i))} className="shrink-0 rounded border border-neutral-300 px-3 text-[12px] font-bold text-red-600 hover:border-red-400">삭제</button>
            </li>
          ))}
        </ul>
        <button type="button" onClick={() => setHistory([...history, ["", ""]])} className="mt-3 rounded border border-dashed border-neutral-300 px-4 py-2 text-[12px] font-bold text-neutral-500 hover:border-brand hover:text-brand">+ 이력 추가</button>
        <button type="button" onClick={fillDefault} className="ml-2 mt-3 rounded border border-neutral-300 px-4 py-2 text-[12px] font-bold text-neutral-500 hover:border-brand hover:text-brand">기본 이력 채우기</button>
      </section>

      <section className="rounded-2xl border border-neutral-200 bg-white p-6">
        <h2 className="mb-4 text-[15px] font-black">전수 정보</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="sm:col-span-2"><Label text="지역 (구·군·동까지)" req><input required value={f.address} onChange={(e) => set("address", e.target.value)} placeholder="대구 중구 계양동" className={inputCls} /></Label></div>
          <Label text="업종 (업종별 기본 소개 문구가 정해집니다)">
            <select value={f.category} onChange={(e) => set("category", e.target.value)} className={inputCls}>{categories.map((c) => <option key={c}>{c}</option>)}</select>
          </Label>
          <Label text="운영방식">
            <select value={f.op} onChange={(e) => set("op", e.target.value)} className={inputCls}>{ops.map((o) => <option key={o}>{o}</option>)}</select>
          </Label>
          <Label text="전용면적 (평)"><input inputMode="decimal" value={f.area} onChange={(e) => set("area", e.target.value.replace(/[^0-9.]/g, ""))} placeholder="20" className={inputCls} /></Label>
          <Label text="전수 비용 (만원)" req><input required inputMode="numeric" value={f.price} onChange={(e) => set("price", num(e.target.value))} placeholder="1500" className={inputCls} /></Label>
          <Label text="교육 기간 (일)" req><input required inputMode="numeric" value={f.days} onChange={(e) => set("days", num(e.target.value))} placeholder="10" className={inputCls} /></Label>
          <div className="sm:col-span-2"><Label text="교육 대표 메뉴 (쉼표로 구분)"><input value={f.menuNames} onChange={(e) => set("menuNames", e.target.value)} placeholder="소금빵, 크루아상, 식빵, 마들렌" className={inputCls} /></Label></div>
          <Label text="전수 메뉴 (종)" req><input required inputMode="numeric" value={f.menus} onChange={(e) => set("menus", num(e.target.value))} placeholder="12" className={inputCls} /></Label>
        </div>
        <label className="mt-4 flex items-center gap-2 text-[13px]"><input type="checkbox" checked={f.sold} onChange={(e) => set("sold", e.target.checked)} className="accent-[#d9480f]" />매칭완료 <span className="text-neutral-400">· 실제 창업자와 매칭되었을 때만 체크하세요 (목록과 상세에 매칭완료로 표시)</span></label>
      </section>

      <Photos photos={menuPhotos} setPhotos={setMenuPhotos} title="교육 대표 메뉴 사진 *" />
      <Photos photos={photos} setPhotos={setPhotos} title="사부(전수자) 사진 (선택, 사부님 소개에 표시)" lead={false} />

      {err && <p className="rounded-lg bg-red-50 p-3 text-[12px] leading-relaxed text-red-700">{err}</p>}
      <div className="flex gap-2">
        <button type="button" onClick={() => onDone(false)} className="rounded border border-neutral-300 bg-white px-6 py-3.5 text-[14px] font-bold hover:bg-neutral-50">취소</button>
        <button disabled={busy} className="flex-1 rounded bg-brand py-3.5 text-[14px] font-bold text-white hover:bg-brand-dark disabled:opacity-60">{busy ? "저장 중..." : id === null ? "등록하기" : "수정 저장"}</button>
      </div>
    </form>
  );
}
