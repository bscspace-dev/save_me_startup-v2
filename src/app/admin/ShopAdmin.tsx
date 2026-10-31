"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { regions, won, type Listing } from "@/lib/data";
import { fetchRemoteListing, fetchRemoteListings, fetchRemotePhotos } from "@/lib/remote";
import type { ShopInfo } from "@/lib/shop";
import { supabase } from "@/lib/supabase";
import { dataUrlToBlob, shrink } from "./imageTools";

type Cred = { u: string; p: string };
type Form = Record<string, string>;
type Field = { k: string; label: string; ph?: string; wide?: boolean; area?: boolean; rows?: number; max?: number; num?: boolean; req?: boolean };

const MAX_PHOTOS = 10;
const inputCls = "w-full rounded border border-neutral-300 bg-white px-3 py-2.5 text-[13px] outline-none focus:border-brand";

// 입력 예시는 /listings/10032 에 입력된 값 기준
const sections: { title: string; fields: Field[] }[] = [
  { title: "기본 정보", fields: [
    { k: "title", label: "매물 제목 (목록과 상세 화면의 제목)", ph: "황금역 역세권 전면 통유리 무권리 신축 상가", wide: true, req: true },
    { k: "address", label: "소재지 (구·군 포함)", ph: "대구 수성구 두산동", req: true },
    { k: "area", label: "전용면적 (평)", ph: "35", num: true, req: true },
    { k: "buildingType", label: "건축물 용도", ph: "소매점 (1·2종 근린생활시설 구분 없음)", req: true },
    { k: "floor", label: "해당 층 / 총 층", ph: "지상 4층 / 총 지상 4층", req: true },
    { k: "desc", label: "소개 문구 (한 줄)", ph: "황금역 역세권 2024년 준공 신축 4층 상가, 권리금 없이 즉시 입주", wide: true, max: 80, req: true },
    { k: "point", label: "입지 포인트 (상세 설명 · 줄바꿈 가능)", ph: "황금역 역세권에 위치한 2024년 준공 신축 건물 4층 상가입니다.\n전면 통유리로 채광과 전망이 좋고, 화장실 2개와 공동주차 5대를 이용할 수 있습니다.\n권리금 없이 즉시 입주 가능합니다.", wide: true, area: true, rows: 6 },
  ] },
  { title: "임대 조건 (단위: 만원)", fields: [
    { k: "deposit", label: "보증금", ph: "3000", num: true, req: true },
    { k: "rent", label: "월세", ph: "180", num: true, req: true },
    { k: "maintenance", label: "관리비 (만원 · 없으면 0 · 변동이면 \"매월 변동\" 입력)", ph: "15" },
    { k: "premium", label: "권리금 (없으면 0 입력 → 사이트에 \"권리금 없음\"으로 표시)", ph: "0", num: true },
  ] },
  { title: "상세 정보", fields: [
    { k: "direction", label: "방향", ph: "동향 (주출입구 기준)" },
    { k: "parking", label: "주차", ph: "건물 전체 공동주차 5대 가능" },
    { k: "approved", label: "사용승인일", ph: "2024년 5월 30일" },
    { k: "moveIn", label: "입주 가능일", ph: "즉시 입주" },
    { k: "currentUse", label: "현업종", ph: "공실" },
    { k: "recommended", label: "추천 업종", ph: "다용도" },
    { k: "x_deal", label: "거래 형태", ph: "상가임대" },
    { k: "x_land", label: "지목", ph: "대" },
    { k: "x_room", label: "방 · 화장실", ph: "방 0개 · 화장실 2개" },
  ] },
];

const extraLabels = [["x_deal", "거래 형태"], ["x_land", "지목"], ["x_room", "방 · 화장실"]] as const;
const empty: Form = { sold: "" };

// 지역 필터용 구·군은 소재지("대구 수성구 두산동")에서 자동으로 가져온다
const regionOf = (address: string) => address.split(/s+/).find((w) => regions.some(([r]) => r === w)) ?? "";

const num = (s: string) => Number(String(s).replace(/,/g, "")) || 0;
const PYEONG = 3.3058; // 1평 = 3.3058㎡ (저장은 ㎡, 화면 입력은 평)
const today = () => new Date().toLocaleDateString("sv-SE");

function toData(f: Form, date: string) {
  const area = Math.round((Number(String(f.area).replace(/,/g, "")) || 0) * PYEONG * 100) / 100;
  const deposit = num(f.deposit), premium = num(f.premium);
  // 관리비: 숫자면 금액(만원), 글자(예: 매월 변동)면 그대로 표시, 비우거나 0이면 0원
  const mRaw = (f.maintenance ?? "").trim();
  const mNum = Number(mRaw.replace(/,/g, ""));
  const maintenance = mRaw && !Number.isNaN(mNum) ? mNum : 0;
  const mLabel = maintenance ? undefined : mRaw && Number.isNaN(mNum) ? mRaw : "0원";
  const shop: ShopInfo = {
    address: f.address.trim(), buildingType: f.buildingType.trim(), floor: f.floor.trim(),
    headline: [f.title.trim(), ""], desc: f.desc.trim(),
    direction: (f.direction ?? "").trim(), parking: (f.parking ?? "").trim(), approved: (f.approved ?? "").trim(), moveIn: (f.moveIn ?? "").trim(),
    point: (f.point ?? "").trim(),
    deposit, rent: num(f.rent), maintenance, premium,
    features: [],
    operation: "", hours: "", closed: "", years: "", sales: [], revenue: 0,
    costs: { material: 0, labor: 0, rent: 0, etc: 0 }, operatorNote: "",
    vacant: true, currentUse: (f.currentUse ?? "").trim(), recommended: (f.recommended ?? "").trim(),
    showZero: true, // 권리금 0은 "무권리" 대신 "없음"으로 표시
    maintenanceLabel: mLabel,
    // 공급면적은 입력한 전용면적과 같은 값으로 자동 입력
    extraInfo: [...extraLabels.map(([k, label]) => [label, (f[k] ?? "").trim()] as [string, string]), ["공급면적", `${area}㎡ (약 ${Math.round(area / PYEONG)}평)`]],
    gallery: [{ label: "전경", caption: "", sub: "" }],
  };
  return {
    title: f.title.trim(), region: regionOf(f.address), category: "기타 업종", op: "직접운영",
    area, price: deposit + premium, cost: deposit + premium,
    date, shop,
  };
}

function fromListing(l: Listing): Form {
  const s = l.shop!;
  const extra = (label: string) => s.extraInfo?.find(([k]) => k === label)?.[1] ?? "";
  return {
    title: l.title, area: String(Math.round((l.area / PYEONG) * 10) / 10), address: s.address, buildingType: s.buildingType, floor: s.floor,
    desc: s.desc, point: s.point,
    deposit: String(s.deposit), rent: String(s.rent), maintenance: s.maintenance ? String(s.maintenance) : s.maintenanceLabel && s.maintenanceLabel !== "0원" ? s.maintenanceLabel : "0", premium: String(s.premium),
    direction: s.direction, parking: s.parking, approved: s.approved, moveIn: s.moveIn, currentUse: s.currentUse ?? "", recommended: s.recommended ?? "",
    ...Object.fromEntries(extraLabels.map(([k, label]) => [k, extra(label)])),
    sold: l.sold ? "1" : "",
  };
}

export function Photos({ photos, setPhotos, title = "사진", lead = true }: { photos: string[]; setPhotos: (p: string[]) => void; title?: string; lead?: boolean }) {
  const ref = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState("");

  async function add(files: FileList | null) {
    if (!files?.length) return;
    setBusy(true); setMsg("");
    const room = MAX_PHOTOS - photos.length;
    const picked = Array.from(files).filter((f) => f.type.startsWith("image/")).slice(0, room);
    try {
      const done = await Promise.all(picked.map((f) => shrink(f, 1280, 0.8, 300_000)));
      setPhotos([...photos, ...done]);
      if (files.length > room) setMsg(`사진은 최대 ${MAX_PHOTOS}장까지 등록할 수 있습니다.`);
    } catch { setMsg("사진을 읽지 못했습니다. 다른 파일로 시도해주세요."); }
    setBusy(false);
    if (ref.current) ref.current.value = "";
  }

  const move = (i: number, d: number) => {
    const j = i + d;
    if (j < 0 || j >= photos.length) return;
    const n = [...photos];
    [n[i], n[j]] = [n[j], n[i]];
    setPhotos(n);
  };

  return (
    <section className="rounded-2xl border border-neutral-200 bg-white p-6">
      <h2 className="text-[15px] font-black">{title} <span className="ml-1 text-[12px] font-normal text-neutral-400">{photos.length} / {MAX_PHOTOS}장{lead && " · 첫 번째 사진이 대표 사진입니다"}</span></h2>
      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-5">
        {photos.map((p, i) => (
          <div key={i} className="overflow-hidden rounded-lg border border-neutral-200">
            <div className="relative aspect-[1.5/1] bg-neutral-100">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={p} alt="" className="size-full object-cover" />
              {lead && i === 0 && <span className="absolute left-1.5 top-1.5 rounded bg-brand px-1.5 py-0.5 text-[10px] font-bold text-white">대표</span>}
            </div>
            <div className="flex divide-x divide-neutral-200 text-[12px] font-bold">
              <button type="button" onClick={() => move(i, -1)} disabled={i === 0} className="flex-1 py-1.5 hover:bg-neutral-50 disabled:opacity-30">←</button>
              <button type="button" onClick={() => move(i, 1)} disabled={i === photos.length - 1} className="flex-1 py-1.5 hover:bg-neutral-50 disabled:opacity-30">→</button>
              <button type="button" onClick={() => setPhotos(photos.filter((_, k) => k !== i))} className="flex-1 py-1.5 text-red-600 hover:bg-red-50">삭제</button>
            </div>
          </div>
        ))}
        {photos.length < MAX_PHOTOS && (
          <button type="button" onClick={() => ref.current?.click()} disabled={busy} className="grid aspect-[1.5/1] place-items-center rounded-lg border-2 border-dashed border-neutral-300 text-[12px] font-bold text-neutral-400 hover:border-brand hover:text-brand disabled:opacity-50">
            {busy ? "처리 중..." : "+ 사진 추가"}
          </button>
        )}
      </div>
      <input ref={ref} type="file" accept="image/*" multiple hidden onChange={(e) => add(e.target.files)} />
      <p className="mt-3 text-[11px] text-neutral-400">큰 사진도 자동으로 줄여서 저장합니다(가로 1280px 이내, WebP).</p>
      {msg && <p className="mt-2 text-[12px] text-red-600">{msg}</p>}
    </section>
  );
}

export function ShopAdmin({ cred }: { cred: Cred }) {
  const [items, setItems] = useState<Listing[] | null>(null);
  const [editing, setEditing] = useState<number | "new" | null>(null);
  const [tick, setTick] = useState(0);
  const [note, setNote] = useState("");

  useEffect(() => {
    let alive = true;
    fetchRemoteListings().then((l) => { if (alive) setItems(l.filter((x) => x.shop)); }); // 상가매물만
    return () => { alive = false; };
  }, [tick]);

  const reload = () => setTick((t) => t + 1);

  async function toggleSold(l: Listing) {
    const { data, error } = await supabase!.rpc("admin_shop_set_sold", { ...cred, listing_id: l.id, v: !l.sold });
    if (error || !data) return setNote("변경하지 못했습니다. (shops.sql 실행 여부를 확인해주세요)");
    setNote(""); reload();
  }

  async function remove(l: Listing) {
    if (!confirm(`매물 ${l.id}번을 삭제할까요? 사진도 함께 삭제되며 되돌릴 수 없습니다.`)) return;
    const { data, error } = await supabase!.rpc("admin_shop_delete", { ...cred, listing_id: l.id });
    if (error || !data) return setNote("삭제하지 못했습니다.");
    setNote(""); reload();
  }

  if (editing !== null) {
    return <ShopForm key={editing} cred={cred} id={editing === "new" ? null : editing} onDone={(saved) => { setEditing(null); if (saved) reload(); }} />;
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-[12px] text-neutral-500">관리자에서 등록한 상가매물 {items ? `${items.length}건` : ""} <span className="text-neutral-300">· 기존 정적 매물(10xxx번)은 여기에 표시되지 않습니다</span></p>
        <button onClick={() => setEditing("new")} className="rounded bg-brand px-4 py-2.5 text-[13px] font-bold text-white hover:bg-brand-dark">+ 상가매물 등록</button>
      </div>
      {note && <p className="mt-3 rounded-lg bg-red-50 p-3 text-[12px] text-red-700">{note}</p>}
      <ul className="mt-4 space-y-3">
        {items === null && <li className="py-16 text-center text-[13px] text-neutral-400">불러오는 중...</li>}
        {items && items.length === 0 && <li className="py-16 text-center text-[13px] text-neutral-400">등록된 상가매물이 없습니다. 오른쪽 위 버튼으로 등록하세요.</li>}
        {items?.map((l) => (
          <li key={l.id} className="flex flex-wrap items-center gap-4 rounded-xl border border-neutral-200 bg-white p-3">
            <div className="relative h-[68px] w-[100px] shrink-0 overflow-hidden rounded-lg bg-neutral-100">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              {l.thumb && <img src={l.thumb} alt="" className="size-full object-cover" />}
              {l.sold && <span className="absolute inset-0 grid place-items-center bg-black/55 text-[11px] font-bold text-white">계약완료</span>}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[11px] text-neutral-400">[{l.id}] {l.shop?.address} · {l.date} · 사진 {l.photos}장</p>
              <p className="truncate text-[14px] font-black">{l.title}</p>
              <p className="text-[12px] text-neutral-500">보증금 {won(l.shop!.deposit)}원 · 월세 {won(l.shop!.rent)}원 · 권리금 {l.shop!.premium ? `${won(l.shop!.premium)}원` : "없음"}</p>
            </div>
            <div className="flex shrink-0 gap-2 text-[11.5px]">
              <Link href={`/listings/${l.id}`} target="_blank" className="rounded border border-neutral-300 px-3 py-1.5 font-bold hover:border-brand hover:text-brand">보기</Link>
              <button onClick={() => setEditing(l.id)} className="rounded border border-neutral-300 px-3 py-1.5 font-bold hover:border-brand hover:text-brand">수정</button>
              <button onClick={() => toggleSold(l)} className="rounded border border-neutral-300 px-3 py-1.5 font-bold hover:border-brand hover:text-brand">{l.sold ? "계약완료 해제" : "계약완료"}</button>
              <button onClick={() => remove(l)} className="rounded border border-neutral-300 px-3 py-1.5 font-bold text-red-600 hover:border-red-400">삭제</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ShopForm({ cred, id, onDone }: { cred: Cred; id: number | null; onDone: (saved: boolean) => void }) {
  const [f, setF] = useState<Form>(empty);
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
      if (l?.shop) { setF(fromListing(l)); setDate(l.date ?? ""); setPhotos(ph); } else setErr("매물을 불러오지 못했습니다.");
      setLoading(false);
    });
    return () => { alive = false; };
  }, [id]);

  const set = (k: string, v: string) => setF((p) => ({ ...p, [k]: v }));

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!supabase) return;
    if (!photos.length) return setErr("사진을 1장 이상 등록해주세요.");
    setBusy(true); setErr("");
    try {
      const thumb = await shrink(await dataUrlToBlob(photos[0]), 480, 0.7, 40_000);
      const { data, error } = await supabase.rpc("admin_shop_save", {
        ...cred, listing_id: id, d: toData(f, date || today()), t: thumb, photos, is_sold: !!f.sold,
      });
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
        <h2 className="text-[17px] font-black">{id === null ? "상가매물 등록" : `상가매물 수정 · ${id}번`}</h2>
        <button type="button" onClick={() => onDone(false)} className="text-[12px] font-bold text-neutral-500 hover:text-brand">← 목록으로</button>
      </div>

      <Photos photos={photos} setPhotos={setPhotos} />

      {sections.map((s) => (
        <section key={s.title} className="rounded-2xl border border-neutral-200 bg-white p-6">
          <h2 className="mb-4 text-[15px] font-black">{s.title}</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {s.fields.map((x) => (
              <label key={x.k} className={`block ${x.wide ? "sm:col-span-2" : ""}`}>
                <span className="mb-1 block text-[11px] font-bold text-neutral-500">{x.label}{x.req && <b className="ml-0.5 text-brand">*</b>}</span>
                {x.area
                  ? <textarea rows={x.rows ?? 3} required={x.req} value={f[x.k] ?? ""} onChange={(e) => set(x.k, e.target.value)} placeholder={x.ph} className={`${inputCls} resize-none`} />
                  : <input required={x.req} maxLength={x.max} inputMode={x.num ? "decimal" : undefined} value={f[x.k] ?? ""} onChange={(e) => set(x.k, x.num ? e.target.value.replace(/[^0-9.,]/g, "") : e.target.value)} placeholder={x.ph} className={inputCls} />}
              </label>
            ))}
          </div>
        </section>
      ))}

      {err && <p className="rounded-lg bg-red-50 p-3 text-[12px] leading-relaxed text-red-700">{err}</p>}
      <div className="flex gap-2">
        <button type="button" onClick={() => onDone(false)} className="rounded border border-neutral-300 bg-white px-6 py-3.5 text-[14px] font-bold hover:bg-neutral-50">취소</button>
        <button disabled={busy} className="flex-1 rounded bg-brand py-3.5 text-[14px] font-bold text-white hover:bg-brand-dark disabled:opacity-60">{busy ? "저장 중..." : id === null ? "등록하기" : "수정 저장"}</button>
      </div>
    </form>
  );
}
