"use client";
import { PopupLink } from "./PopupLink";
import { useEffect, useState } from "react";
import { businessCategories, regions, won, type Listing } from "@/lib/data";
import { fetchRemoteListing, fetchRemoteListings, fetchRemotePhotos } from "@/lib/remote";
import { supabase } from "@/lib/supabase";
import { StateBadges, listingSorts, listingStatuses, listingText, usePeriod } from "./period";
import { dataUrlToBlob, shrink } from "./imageTools";
import { Photos } from "./ShopAdmin";

type Cred = { u: string; p: string };

const categories = businessCategories;
const inputCls = "w-full rounded border border-neutral-300 bg-white px-3 py-2.5 text-[0.8125rem] outline-none focus:border-brand";
// 지역 필터용 구·군은 입력한 주소("대구 중구 계양동")에서 자동으로 가져온다
const regionOf = (address: string) => address.split(/\s+/).find((w) => regions.some(([r]) => r === w)) ?? "";
const today = () => new Date().toLocaleDateString("sv-SE");
const num = (v: string) => v.replace(/[^0-9]/g, "");

function Label({ text, req, children }: { text: string; req?: boolean; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1 block text-[0.6875rem] font-bold text-neutral-500">{text}{req && <b className="ml-0.5 text-brand">*</b>}</span>
      {children}
    </label>
  );
}

// 전수창업 등록: 사부(전수자) 정보와 사진을 입력하면 상세 문구는 업종별 기본 문구로 만들어진다
// 이력 년도: "2012~2019"로 저장하고, 종료를 비워 두면 "2012~현재" (지금도 이어지는 경력)
const yearPair = (a: string, b?: string) => {
  const x = a.replace(/[^0-9]/g, ""), y = (b ?? "").replace(/[^0-9]/g, "");
  return x || y ? `${x}~${y || "현재"}` : "";
};

export function TransferAdmin({ cred, canDelete = true }: { cred: Cred; canDelete?: boolean }) {
  const [items, setItems] = useState<Listing[] | null>(null);
  const period = usePeriod(items, (l) => l.date, { searchOf: listingText, statuses: listingStatuses(), sorts: listingSorts({ label: "전수 비용", of: (l) => l.price }) });
  const [editing, setEditing] = useState<number | "new" | null>(null);
  const [tick, setTick] = useState(0);
  const [note, setNote] = useState("");

  useEffect(() => {
    let alive = true;
    fetchRemoteListings(true).then((l) => { if (alive) setItems(l.filter((x) => x.transfer)); }); // 전수창업만
    return () => { alive = false; };
  }, [tick]);

  const reload = () => setTick((t) => t + 1);

  async function toggleHidden(l: Listing) {
    const { data, error } = await supabase!.rpc("admin_shop_set_hidden", { ...cred, listing_id: l.id, v: !l.hidden });
    if (error || !data) return setNote("변경하지 못했습니다. (hide-listings.sql 실행 여부를 확인해주세요)");
    setNote(""); reload();
  }

  async function remove(l: Listing) {
    if (!confirm(`${l.transfer!.name} 사부 (${l.id}번)을 삭제할까요? 사진도 함께 삭제되며 되돌릴 수 없습니다.`)) return;
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
        <p className="text-[0.75rem] text-neutral-500">관리자에서 등록한 전수창업 {items ? `${items.length}건` : ""} <span className="text-neutral-300">· 기존 샘플(10020~10036)은 여기에 표시되지 않습니다</span></p>
        <button onClick={() => setEditing("new")} className="rounded bg-brand px-4 py-2.5 text-[0.8125rem] font-bold text-white hover:bg-brand-dark">+ 전수창업 등록</button>
      </div>
      {note && <p className="mt-3 rounded-lg bg-red-50 p-3 text-[0.75rem] text-red-700">{note}</p>}
      <div className="mt-4">{period.bar}</div>
      <ul className="mt-3 space-y-3">
        {items === null && <li className="py-16 text-center text-[0.8125rem] text-neutral-400">불러오는 중...</li>}
        {items && items.length === 0 && <li className="py-16 text-center text-[0.8125rem] text-neutral-400">등록된 전수창업이 없습니다. 오른쪽 위 버튼으로 등록하세요.</li>}
        {period.empty && <li className="py-16 text-center text-[0.8125rem] text-neutral-400">조건에 맞는 자료가 없습니다.</li>}
        {period.view.map((l) => (
          <li key={l.id} className={`flex flex-wrap items-center gap-4 rounded-xl border bg-white p-3 ${l.hidden ? "border-dashed border-neutral-300 bg-neutral-50" : "border-neutral-200"}`}>
            <PopupLink href={`/listings/${l.id}`} title="클릭하면 매물 화면이 팝업으로 열립니다" className="relative block h-[4.25rem] w-[6.25rem] shrink-0 cursor-pointer overflow-hidden rounded-lg bg-neutral-100 transition hover:opacity-80">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              {l.thumb && <img src={l.thumb} alt="" className="size-full object-cover" />}
              {l.hidden && <span className="absolute inset-x-0 bottom-0 bg-black/75 py-0.5 text-center text-[0.625rem] font-bold text-white">숨김</span>}
            </PopupLink>
            <div className="min-w-0 flex-1">
              <p className="text-[0.6875rem] text-neutral-400">[{l.id}] {l.date} · 사진 {l.photos}장</p>
              <p className="truncate text-[0.875rem] font-black"><StateBadges l={l} />{l.category}</p>
              <p className="text-[0.75rem] text-neutral-500">{l.transfer!.name} 사부 · {l.transfer!.address ?? `대구 ${l.region}`} · 전수 비용 약 {won(l.price)}원</p>
            </div>
            <div className="flex shrink-0 gap-2 text-[0.7188rem]">
              <button onClick={() => setEditing(l.id)} className="rounded border border-neutral-300 px-3 py-1.5 font-bold hover:border-brand hover:text-brand">수정</button>
              <button onClick={() => toggleHidden(l)} className={`rounded border px-3 py-1.5 font-bold hover:border-brand hover:text-brand ${l.hidden ? "border-brand text-brand" : "border-neutral-300"}`}>{l.hidden ? "숨김 해제" : "숨기기"}</button>
              {canDelete && <button onClick={() => remove(l)} className="rounded border border-neutral-300 px-3 py-1.5 font-bold text-red-600 hover:border-red-400">삭제</button>}
            </div>
          </li>
        ))}
      </ul>
      {period.pager}
    </div>
  );
}

function TransferForm({ cred, id, onDone }: { cred: Cred; id: number | null; onDone: (saved: boolean) => void }) {
  const [f, setF] = useState({ name: "", store: "", address: "", category: categories[0], price: "", years: "", days: "", menus: "", menuNames: "", masterBio: "", sales1: "", sales3: "", sales6: "", peakNote: "", revisit: "", satisfy: "", cost1: "", cost2: "", cost3: "", simSales: "", simMargin: "" });
  const [menuDescs, setMenuDescs] = useState<string[]>(["", "", ""]); // 대표 메뉴별 설명 (메뉴 순서대로)
  const [reviews, setReviews] = useState<[string, string][]>([]); // 손님 후기 [내용, 출처]
  const [history, setHistory] = useState<[string, string][]>([]); // 이력: [시기, 내용]
  const [photos, setPhotos] = useState<string[]>([]);
  const [detailPhotos, setDetailPhotos] = useState<string[]>([]); // 교육 대표 메뉴 아래에 이어 붙여 보여줄 상세 이미지 (메뉴 사진 뒤에 이어 저장)
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
          name: t.name, store: t.store, address: t.address ?? `대구 ${l.region}`, category: l.category,
          price: String(l.price), years: String(t.years), days: String(t.days), menus: String(t.menus), menuNames: (t.menuNames ?? []).join(", "), masterBio: t.masterBio ?? "", revisit: String(t.revisit ?? ""), satisfy: String(t.satisfy ?? ""), cost1: String(t.startCosts?.[0] ?? ""), cost2: String(t.startCosts?.[1] ?? ""), cost3: String(t.startCosts?.[2] ?? ""), simSales: String(t.simSales ?? ""), simMargin: t.simMargin ?? "", sales1: String(t.sales?.[0] ?? ""), sales3: String(t.sales?.[1] ?? ""), sales6: String(t.sales?.[2] ?? ""), peakNote: t.peakNote ?? "",
        });
        setMenuDescs([0, 1, 2].map((k) => t.menuDescs?.[k] ?? (k === 0 ? t.menuDesc : "") ?? "")); setReviews(t.reviews ?? []); setHistory(t.timeline ?? []); const nd = Math.min(t.detailPhotos ?? 0, ph.length); const nm = Math.min(t.menuPhotos ?? 0, ph.length - nd); setPhotos(ph.slice(0, ph.length - nd - nm)); setMenuPhotos(ph.slice(ph.length - nd - nm, ph.length - nd)); setDetailPhotos(ph.slice(ph.length - nd)); setDate(l.date ?? "");
      } else setErr("전수창업을 불러오지 못했습니다.");
      setLoading(false);
    });
    return () => { alive = false; };
  }, [id]);

  const menuNameList = f.menuNames.split(/[,\n]/).map((x) => x.trim()).filter(Boolean);
  const set = <K extends keyof typeof f>(k: K, v: (typeof f)[K]) => setF((p) => ({ ...p, [k]: v }));

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!supabase) return;
    if (!menuPhotos.length) return setErr("교육 대표 메뉴 사진을 1장 이상 등록해주세요.");
    const address = f.address.trim();
    const region = regionOf(address);
    if (!region) return setErr("주소에 구·군 이름이 필요합니다. 예) 대구 중구 계양동");
    // 이력은 항상 "년도(4자리) + 내용"이 한 쌍이어야 한다
    const rows = history.map(([y, x]) => [y.trim(), x.trim()] as [string, string]).filter(([y, x]) => y || x);
    if (rows.some(([y, x]) => !/^\d{4}(~(\d{4}|현재))?$/.test(y) || !x)) return setErr("이력은 시작 년도(예: 2012)와 내용을 함께 입력해주세요. 종료 년도를 비우면 현재로 표시됩니다. 한쪽만 입력된 줄이 있습니다.");
    if (rows.some(([y]) => /~\d{4}$/.test(y) && Number(y.slice(5)) < Number(y.slice(0, 4)))) return setErr("이력의 종료 년도는 시작 년도보다 빠를 수 없습니다.");
    const reviewRows = reviews.map(([x, y]) => [x.trim(), y.trim()] as [string, string]).filter(([x]) => x).slice(0, 3); const price = Number(f.price) || 0;
    setBusy(true); setErr("");
    try {
      const thumb = await shrink(await dataUrlToBlob(menuPhotos[0]), 480, 0.7, 40_000);
      const d = {
        title: `${f.name.trim()} 사부 전수창업`, region, category: f.category, op: "직접운영" as const, area: 0, // 운영방식은 입력받지 않는다
         price, cost: price, date: date || today(), kind: "전수창업",
        transfer: { name: f.name.trim(), store: "", address, years: Number(f.years) || 0, days: Number(f.days) || 1, menus: Number(f.menus) || 0, menuPhotos: menuPhotos.length, detailPhotos: detailPhotos.length || undefined, menuDesc: menuDescs[0]?.trim() || undefined, menuDescs: menuDescs.some((x) => x.trim()) ? menuDescs.map((x) => x.trim()) : undefined, revisit: Number(f.revisit) || undefined, satisfy: Number(f.satisfy) || undefined, startCosts: (Number(f.cost1) || Number(f.cost2) || Number(f.cost3)) ? [Number(f.cost1) || 0, Number(f.cost2) || 0, Number(f.cost3) || 0] : undefined, simSales: Number(f.simSales) || undefined, simMargin: f.simMargin.trim() || undefined, reviews: reviewRows.length ? reviewRows : undefined, masterBio: f.masterBio.trim() || undefined, sales: (Number(f.sales1) || Number(f.sales3) || Number(f.sales6)) ? [Number(f.sales1) || 0, Number(f.sales3) || 0, Number(f.sales6) || 0] : undefined, peakNote: f.peakNote.trim() || undefined, menuNames: f.menuNames.split(/[,\n]/).map((x) => x.trim()).filter(Boolean), timeline: [...rows].sort((a, b) => parseInt(a[0]) - parseInt(b[0])) }, // 시작 년도 순으로 저장
      };
      const { data, error } = await supabase.rpc("admin_shop_save", { ...cred, listing_id: id, d, t: thumb, photos: [...photos, ...menuPhotos, ...detailPhotos], is_sold: false });
      if (error) throw new Error(error.message);
      if (!data) throw new Error("인증에 실패했습니다. 다시 로그인해주세요.");
      onDone(true);
    } catch (ex) {
      setErr(`저장하지 못했습니다: ${ex instanceof Error ? ex.message : "알 수 없는 오류"} (shops.sql 실행 여부를 확인해주세요)`);
      setBusy(false);
    }
  }

  if (loading) return <p className="py-16 text-center text-[0.8125rem] text-neutral-400">불러오는 중...</p>;

  return (
    <form onSubmit={submit} className="space-y-5">
      <div className="flex items-center justify-between">
        <h2 className="text-[1.0625rem] font-black">{id === null ? "전수창업 등록" : `전수창업 수정 · ${id}번`}</h2>
        <button type="button" onClick={() => onDone(false)} className="text-[0.75rem] font-bold text-neutral-500 hover:text-brand">← 목록으로</button>
      </div>

      <Photos photos={photos} setPhotos={setPhotos} title="사부(전수자) 사진 (선택, 사부님 소개에 표시)" lead={false} />

      <section className="rounded-2xl border border-neutral-200 bg-white p-6">
        <h2 className="mb-4 text-[0.9375rem] font-black">사부(전수자) 정보</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          <Label text="사부(전수자) 이름" req><input required value={f.name} onChange={(e) => set("name", e.target.value)} placeholder="이정훈" className={inputCls} /></Label>
          <Label text="현장 경력 (년)" req><input required inputMode="numeric" value={f.years} onChange={(e) => set("years", num(e.target.value))} placeholder="14" className={inputCls} /></Label>
          <Label text="교육 대표 메뉴 (쉼표로 구분)"><input value={f.menuNames} onChange={(e) => set("menuNames", e.target.value)} placeholder="소금빵, 크루아상, 식빵, 마들렌" className={inputCls} /></Label>
          {menuNameList.slice(0, 3).concat(Array(Math.max(0, 1 - menuNameList.length)).fill("")).map((nm, k) => (
            <div key={k} className="sm:col-span-2"><Label text={`${nm || `대표 메뉴 ${k + 1}`} 설명 (메뉴 카드에 표시, 한두 줄)`}><textarea rows={2} maxLength={100} value={menuDescs[k]} onChange={(e) => setMenuDescs(menuDescs.map((x, j) => (j === k ? e.target.value : x)))} placeholder="14년간 사랑받아 온 대표 메뉴, 감칠맛 나는 양념과 불향을 전수합니다" className={`${inputCls} resize-none`} /></Label></div>
          ))}

          <div className="sm:col-span-2"><Label text="사부 소개 본문"><textarea rows={4} maxLength={400} value={f.masterBio} onChange={(e) => set("masterBio", e.target.value)} placeholder="유명 퓨전 일식 레스토랑 헤드 셰프 출신으로, 50개 이상의 직영/가맹 매장 레시피 전수 경험을 보유하고 있습니다." className={`${inputCls} resize-none`} /></Label></div>
          <Label text="오픈 1개월차 월 매출 (만원)"><input inputMode="numeric" value={f.sales1} onChange={(e) => set("sales1", num(e.target.value))} placeholder="3800" className={inputCls} /></Label>
          <Label text="오픈 3개월차 월 매출 (만원)"><input inputMode="numeric" value={f.sales3} onChange={(e) => set("sales3", num(e.target.value))} placeholder="6200" className={inputCls} /></Label>
          <Label text="오픈 6개월차 월 매출 (만원)"><input inputMode="numeric" value={f.sales6} onChange={(e) => set("sales6", num(e.target.value))} placeholder="8500" className={inputCls} /></Label>
          <div className="sm:col-span-2"><Label text="피크타임 증빙 설명 (사진 아래 문구)"><input value={f.peakNote} onChange={(e) => set("peakNote", e.target.value)} placeholder="점심 오피스 피크타임 테이블 회전율 4.5회전 완수, 평균 조리 출하시간 3분대 유지" className={inputCls} /></Label></div>          <Label text="재방문율 (%)"><input inputMode="numeric" maxLength={3} value={f.revisit} onChange={(e) => set("revisit", num(e.target.value))} placeholder="91" className={inputCls} /></Label>          <Label text="고객 만족도 (%)"><input inputMode="numeric" maxLength={3} value={f.satisfy} onChange={(e) => set("satisfy", num(e.target.value))} placeholder="96" className={inputCls} /></Label>
        </div>
      </section>

      <section className="rounded-2xl border border-neutral-200 bg-white p-6">
        <h2 className="mb-1 text-[0.9375rem] font-black">창업 비용 · 수익 시뮬레이션 <span className="ml-1 text-[0.75rem] font-normal text-neutral-400">비워두면 상세에 &quot;상담 시 안내&quot;로 표시됩니다 (전수 비용은 아래 전수 정보에서 가져옵니다)</span></h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          <Label text="초도 식자재 (만원)"><input inputMode="numeric" value={f.cost1} onChange={(e) => set("cost1", num(e.target.value))} placeholder="300" className={inputCls} /></Label>
          <Label text="주요 집기·설비 (만원)"><input inputMode="numeric" value={f.cost2} onChange={(e) => set("cost2", num(e.target.value))} placeholder="1500" className={inputCls} /></Label>
          <Label text="기타 오픈 준비 비용 (만원)"><input inputMode="numeric" value={f.cost3} onChange={(e) => set("cost3", num(e.target.value))} placeholder="500" className={inputCls} /></Label>
          <Label text="월 매출 가정 (만원, 비우면 3,000)"><input inputMode="numeric" value={f.simSales} onChange={(e) => set("simSales", num(e.target.value))} placeholder="3000" className={inputCls} /></Label>
          <Label text="예상 순이익률 (%, 비우면 20~25)"><input value={f.simMargin} onChange={(e) => set("simMargin", e.target.value.replace(/[^0-9~]/g, ""))} placeholder="20~25" className={inputCls} /></Label>
        </div>
        <p className="mt-3 text-[0.6875rem] text-neutral-400">총 예상 초기 비용은 세 항목을 모두 입력하면 전수 비용과 합산해 자동 계산됩니다.</p>
      </section>

      <section className="rounded-2xl border border-neutral-200 bg-white p-6">
        <h2 className="text-[0.9375rem] font-black">손님 후기 <span className="ml-1 text-[0.75rem] font-normal text-neutral-400">최대 3개, 비워두면 후기 구간이 나타나지 않습니다</span></h2>
        <ul className="mt-4 space-y-2">
          {reviews.map(([x, y], i) => (
            <li key={i} className="flex gap-2">
              <input value={x} maxLength={60} onChange={(e) => setReviews(reviews.map((r, k) => (k === i ? [e.target.value, r[1]] : r)))} placeholder="고기 너무 맛있어요! 또 올게요" className={inputCls} />
              <input value={y} maxLength={30} onChange={(e) => setReviews(reviews.map((r, k) => (k === i ? [r[0], e.target.value] : r)))} placeholder="출처 (네이버리뷰 홍**)" className={`${inputCls} !w-[12rem] shrink-0`} />
              <button type="button" onClick={() => setReviews(reviews.filter((_, k) => k !== i))} className="shrink-0 rounded border border-neutral-300 px-3 text-[0.75rem] font-bold text-red-600 hover:border-red-400">삭제</button>
            </li>
          ))}
        </ul>
        {reviews.length < 3 && <button type="button" onClick={() => setReviews([...reviews, ["", ""]])} className="mt-3 rounded border border-dashed border-neutral-300 px-4 py-2 text-[0.75rem] font-bold text-neutral-500 hover:border-brand hover:text-brand">+ 후기 추가</button>}
      </section>

      <section className="rounded-2xl border border-neutral-200 bg-white p-6">
        <h2 className="text-[0.9375rem] font-black">이력 <span className="ml-1 text-[0.75rem] font-normal text-neutral-400">비워두면 경력없음으로 나옵니다</span></h2>
        <p className="mb-2 mt-4 text-[0.6875rem] font-bold text-neutral-500">이력 (년도와 내용을 한 쌍으로, 종료 년도를 비우면 현재로 표시 · 저장하면 시작 년도 순으로 정렬됩니다)</p>
        <ul className="space-y-2">
          {history.map(([y, x], i) => (
            <li key={i} className="flex gap-2">
              <input value={y.split("~")[0]} inputMode="numeric" maxLength={4} onChange={(e) => setHistory(history.map((r, k) => (k === i ? [yearPair(e.target.value, y.split("~")[1]), r[1]] : r)))} placeholder="2012" className={`${inputCls} !w-[4.75rem] shrink-0`} />
              <span className="grid shrink-0 place-items-center text-neutral-400">~</span>
              <input value={/^\d+$/.test(y.split("~")[1] ?? "") ? y.split("~")[1] : ""} inputMode="numeric" maxLength={4} onChange={(e) => setHistory(history.map((r, k) => (k === i ? [yearPair(y.split("~")[0], e.target.value), r[1]] : r)))} placeholder="현재" className={`${inputCls} !w-[6.5rem] shrink-0`} />
              <input value={x} onChange={(e) => setHistory(history.map((r, k) => (k === i ? [r[0], e.target.value] : r)))} placeholder="호텔 베이커리 근무" className={inputCls} />
              <button type="button" onClick={() => setHistory(history.filter((_, k) => k !== i))} className="shrink-0 rounded border border-neutral-300 px-3 text-[0.75rem] font-bold text-red-600 hover:border-red-400">삭제</button>
            </li>
          ))}
        </ul>
        <button type="button" onClick={() => setHistory([...history, ["", ""]])} className="mt-3 rounded border border-dashed border-neutral-300 px-4 py-2 text-[0.75rem] font-bold text-neutral-500 hover:border-brand hover:text-brand">+ 이력 추가</button>
      </section>

      <section className="rounded-2xl border border-neutral-200 bg-white p-6">
        <h2 className="mb-4 text-[0.9375rem] font-black">전수 정보</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="sm:col-span-2"><Label text="지역 (구·군·동까지)" req><input required value={f.address} onChange={(e) => set("address", e.target.value)} placeholder="대구 중구 계양동" className={inputCls} /></Label></div>
          <Label text="업종 (업종별 기본 소개 문구가 정해집니다)">
            <select value={f.category} onChange={(e) => set("category", e.target.value)} className={inputCls}>{categories.map((c) => <option key={c}>{c}</option>)}</select>
          </Label>
          <Label text="전수 비용 (만원)" req><input required inputMode="numeric" value={f.price} onChange={(e) => set("price", num(e.target.value))} placeholder="1500" className={inputCls} /></Label>
          <Label text="교육 기간 (일)" req><input required inputMode="numeric" value={f.days} onChange={(e) => set("days", num(e.target.value))} placeholder="10" className={inputCls} /></Label>
          <Label text="전수 메뉴 (종)" req><input required inputMode="numeric" value={f.menus} onChange={(e) => set("menus", num(e.target.value))} placeholder="12" className={inputCls} /></Label>
        </div>
      </section>

      <Photos photos={menuPhotos} setPhotos={setMenuPhotos} title="교육 대표 메뉴 사진 *" />
      <Photos photos={detailPhotos} setPhotos={setDetailPhotos} title="교육 상세 이미지 (선택, 교육 대표 메뉴 아래에 이어 붙여 표시)" lead={false} />

      {err && <p className="rounded-lg bg-red-50 p-3 text-[0.75rem] leading-relaxed text-red-700">{err}</p>}
      <div className="flex gap-2">
        <button type="button" onClick={() => onDone(false)} className="rounded border border-neutral-300 bg-white px-6 py-3.5 text-[0.875rem] font-bold hover:bg-neutral-50">취소</button>
        <button disabled={busy} className="flex-1 rounded bg-brand py-3.5 text-[0.875rem] font-bold text-white hover:bg-brand-dark disabled:opacity-60">{busy ? "저장 중..." : id === null ? "등록하기" : "수정 저장"}</button>
      </div>
    </form>
  );
}
