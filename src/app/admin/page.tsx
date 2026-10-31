"use client";
import Link from "next/link";
import { useEffect, useMemo, useState, useSyncExternalStore } from "react";
import { franchises } from "@/lib/franchise";
import { fetchRemoteListings } from "@/lib/remote";
import { supabase } from "@/lib/supabase";
import { FranchiseAdmin } from "./FranchiseAdmin";
import { ShopAdmin } from "./ShopAdmin";
import { StartupAdmin } from "./StartupAdmin";
import { TransferAdmin } from "./TransferAdmin";

type Row = { id: string; name: string; phone: string; type: string | null; region: string | null; message: string | null; created_at: string; done: boolean };
type Cred = { u: string; p: string };
type Filter = "all" | "todo" | "done";
type Kind = "all" | "listing" | "franchise" | "startup" | "newbiz" | "transfer" | "register";

// 상담 유형(type)으로 구분. 메인 간편 상담은 고른 유형대로 들어간다: 프랜차이즈 → 가맹 상담, 상가매물 → 매물 상담, 신규창업, 전수창업 (그 외는 기타)
const kindOf = (t: string | null): Exclude<Kind, "all"> => (t?.startsWith("매물상담[") || t === "상가매물" ? "listing" : t?.startsWith("가맹상담[") || t === "프랜차이즈" ? "franchise" : t?.startsWith("매물등록문의") ? "register" : t === "신규창업" ? "newbiz" : t === "전수창업" ? "transfer" : "startup");
// 구분 라벨이 이미 "등록 문의"이므로 유형 칸에는 "매물등록문의(전수창업)" 대신 "전수창업"만 보여준다
const typeText = (t: string | null) => {
  const m = t?.match(/^(매물|가맹)상담\[(\d+)\]\s*(.*)$/);
  if (m) return m[1] === "가맹" ? `등록번호 ${m[2]}` : `매물번호 ${m[2]}`; // 매물상담[20001] → 매물번호 20001, 가맹상담[20002] → 등록번호 20002
  return t?.replace(/^매물등록문의\((.*)\)$/, "$1") ?? "";
};
const kinds: [Kind, string][] = [["all", "전체"], ["franchise", "프랜차이즈"], ["listing", "상가매물"], ["transfer", "전수창업"], ["newbiz", "신규창업"], ["register", "등록 문의"]];
const kindName: Record<Kind, string> = { ...(Object.fromEntries(kinds) as Record<Kind, string>), startup: "기타" }; // 유형이 비었거나 모르는 값
const kindTone: Record<Exclude<Kind, "all">, string> = { listing: "bg-emerald-50 text-emerald-700", franchise: "bg-orange-50 text-brand", startup: "bg-blue-50 text-blue-700", newbiz: "bg-sky-50 text-sky-700", transfer: "bg-amber-50 text-amber-800", register: "bg-purple-50 text-purple-700" };

const inputCls = "w-full rounded border border-neutral-300 bg-white px-3 py-2.5 text-[13px] outline-none focus:border-brand";
// 매물 상담·가맹 상담의 유형("매물상담[20001]", "가맹상담[20002]")에서 번호를 뽑는다
const listingId = (type: string | null) => type?.match(/^(?:매물|가맹)상담\[(\d+)\]/)?.[1];
const fmt = (iso: string) => new Date(iso).toLocaleString("ko-KR", { year: "2-digit", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", hour12: false });

// 로그인 정보는 탭을 닫으면 사라지도록 sessionStorage에만 보관한다
const KEY = "admin-cred";
const listeners = new Set<() => void>();
const read = () => { try { return sessionStorage.getItem(KEY); } catch { return null; } };
const subscribe = (cb: () => void) => { listeners.add(cb); return () => { listeners.delete(cb); }; };
function save(c: Cred | null) {
  try { if (c) sessionStorage.setItem(KEY, JSON.stringify(c)); else sessionStorage.removeItem(KEY); } catch { /* 저장 불가 환경에서는 새로고침 시 다시 로그인 */ }
  listeners.forEach((f) => f());
}

function Login() {
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!supabase) return;
    setBusy(true); setErr("");
    const c = { u: id.trim(), p: pw };
    const { data, error } = await supabase.rpc("admin_login", c);
    setBusy(false);
    if (error) return setErr("로그인할 수 없습니다. 관리자 설정(admin.sql)을 확인해주세요.");
    if (!data) return setErr("아이디 또는 비밀번호가 올바르지 않습니다. (5회 연속 실패 시 10분간 잠깁니다)");
    save(c);
  }

  return (
    <main className="grid min-h-screen place-items-center bg-neutral-50 p-4">
      <form onSubmit={submit} className="w-full max-w-[360px] rounded-2xl border border-neutral-200 bg-white p-7 shadow-sm">
        <h1 className="text-[18px] font-black">관리자 로그인</h1>
        <p className="mt-1 text-[12px] text-neutral-400">구해줘창업 상담 관리</p>
        <input required autoComplete="username" autoCapitalize="none" value={id} onChange={(e) => setId(e.target.value)} placeholder="아이디" className={`${inputCls} mt-5`} />
        <input type="password" required autoComplete="current-password" value={pw} onChange={(e) => setPw(e.target.value)} placeholder="비밀번호" className={`${inputCls} mt-2.5`} />
        {err && <p className="mt-2 text-[11.5px] leading-relaxed text-red-600">{err}</p>}
        <button disabled={busy} className="mt-4 w-full rounded bg-brand py-3 text-[14px] font-bold text-white transition hover:bg-brand-dark disabled:opacity-60">{busy ? "확인 중..." : "로그인"}</button>
      </form>
    </main>
  );
}

function ChangePassword({ cred, onClose }: { cred: Cred; onClose: () => void }) {
  const [cur, setCur] = useState("");
  const [next, setNext] = useState("");
  const [again, setAgain] = useState("");
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!supabase) return;
    if (next.length < 8) return setErr("새 비밀번호는 8자 이상이어야 합니다.");
    if (next !== again) return setErr("새 비밀번호가 서로 다릅니다.");
    if (next === cur) return setErr("현재 비밀번호와 다른 비밀번호를 입력해주세요.");
    setBusy(true); setErr("");
    const { data, error } = await supabase.rpc("admin_change_password", { u: cred.u, p: cur, new_p: next });
    setBusy(false);
    if (error) return setErr("변경하지 못했습니다. 관리자 설정(admin.sql)을 다시 실행했는지 확인해주세요.");
    if (data === "auth") return setErr("현재 비밀번호가 올바르지 않습니다. (5회 연속 실패 시 10분간 잠깁니다)");
    if (data === "short") return setErr("새 비밀번호는 8자 이상이어야 합니다.");
    save({ u: cred.u, p: next });
    alert("비밀번호가 변경되었습니다.");
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/60 p-4" onClick={onClose}>
      <form onSubmit={submit} onClick={(e) => e.stopPropagation()} className="w-full max-w-[360px] rounded-2xl bg-white p-7 shadow-2xl">
        <h2 className="text-[17px] font-black">비밀번호 변경</h2>
        <input type="password" required autoComplete="current-password" value={cur} onChange={(e) => setCur(e.target.value)} placeholder="현재 비밀번호" className={`${inputCls} mt-5`} />
        <input type="password" required autoComplete="new-password" minLength={8} value={next} onChange={(e) => setNext(e.target.value)} placeholder="새 비밀번호 (8자 이상)" className={`${inputCls} mt-2.5`} />
        <input type="password" required autoComplete="new-password" value={again} onChange={(e) => setAgain(e.target.value)} placeholder="새 비밀번호 확인" className={`${inputCls} mt-2.5`} />
        {err && <p className="mt-2 text-[11.5px] leading-relaxed text-red-600">{err}</p>}
        <div className="mt-4 flex gap-2">
          <button type="button" onClick={onClose} className="flex-1 rounded border border-neutral-300 py-3 text-[13px] font-bold hover:bg-neutral-50">취소</button>
          <button disabled={busy} className="flex-1 rounded bg-brand py-3 text-[13px] font-bold text-white hover:bg-brand-dark disabled:opacity-60">{busy ? "변경 중..." : "변경"}</button>
        </div>
      </form>
    </div>
  );
}

function Dashboard({ cred }: { cred: Cred }) {
  const [pwOpen, setPwOpen] = useState(false);
  const [tab, setTab] = useState<"consult" | "register">("consult");
  const [reg, setReg] = useState<"franchise" | "shop" | "transfer" | "startup">("franchise"); // 등록 하위 구분
  const [rows, setRows] = useState<Row[] | null>(null);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState<Filter>("all");
  const [kind, setKind] = useState<Kind>("all");
  const [q, setQ] = useState("");
  const [tick, setTick] = useState(0);
  // 가맹 상담 카드에 프랜차이즈명을 보여주기 위한 번호 → 브랜드명 (관리자 등록 브랜드)
  const [brands, setBrands] = useState<Record<number, string>>({});
  useEffect(() => {
    fetchRemoteListings().then((ls) => setBrands(Object.fromEntries(ls.filter((l) => l.promo).map((l) => [l.id, l.promo!.brand]))));
  }, []);
  const load = () => setTick((t) => t + 1);

  useEffect(() => {
    let alive = true;
    supabase?.rpc("admin_list", cred).then(({ data, error }) => {
      if (!alive) return;
      if (error) { setError(`불러오지 못했습니다: ${error.message}`); setRows([]); return; }
      if (data === null) { save(null); return; } // 아이디/비밀번호가 더 이상 유효하지 않음
      setError(""); setRows(data as Row[]);
    });
    return () => { alive = false; };
  }, [tick, cred]);

  async function toggle(r: Row) {
    if (!supabase) return;
    const { data, error } = await supabase.rpc("admin_set_done", { ...cred, row_id: r.id, v: !r.done });
    if (error || !data) return setError("변경하지 못했습니다.");
    setRows((p) => p && p.map((x) => (x.id === r.id ? { ...x, done: !r.done } : x)));
  }

  async function remove(r: Row) {
    if (!supabase || !confirm(`${r.name}님의 상담 신청을 삭제할까요? 되돌릴 수 없습니다.`)) return;
    const { data, error } = await supabase.rpc("admin_delete", { ...cred, row_id: r.id });
    if (error || !data) return setError("삭제하지 못했습니다.");
    setRows((p) => p && p.filter((x) => x.id !== r.id));
  }

  // 선택한 구분 안에서 상태 필터와 검색을 적용한다
  const scoped = useMemo(() => (rows ?? []).filter((r) => kind === "all" || kindOf(r.type) === kind), [rows, kind]);

  const list = useMemo(() => {
    const k = q.trim();
    return scoped.filter((r) =>
      (filter === "all" || (filter === "done") === r.done) &&
      (!k || r.name.includes(k) || r.phone.includes(k) || (r.message ?? "").includes(k) || (r.type ?? "").includes(k)),
    );
  }, [scoped, filter, q]);

  const todo = scoped.filter((r) => !r.done).length;

  function csv() {
    const esc = (s: string) => `"${s.replace(/"/g, '""')}"`;
    const head = ["접수일시", "구분", "이름", "연락처", "유형", "지역", "내용", "처리"];
    const body = list.map((r) => [fmt(r.created_at), kindName[kindOf(r.type)], r.name, r.phone, typeText(r.type), r.region ?? "", r.message ?? "", r.done ? "완료" : "대기"].map(esc).join(","));
    const blob = new Blob(["﻿" + [head.join(","), ...body].join("\r\n")], { type: "text/csv;charset=utf-8" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `상담신청_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(a.href);
  }

  const tabs: [Filter, string][] = [["all", "전체"], ["todo", "대기"], ["done", "처리 완료"]];

  return (
    <main className="min-h-screen bg-neutral-50">
      <header className="border-b border-neutral-200 bg-white">
        <div className="mx-auto flex max-w-[1100px] flex-wrap items-center justify-between gap-3 px-4 py-4">
          <div>
            <h1 className="text-[17px] font-black">관리자</h1>
            <p className="text-[11px] text-neutral-400">{cred.u}</p>
          </div>
          <div className="flex items-center gap-2 text-[12px]">
            <Link href="/" className="rounded border border-neutral-300 px-3 py-2 font-bold hover:border-brand hover:text-brand">사이트 보기</Link>
            <button onClick={() => setPwOpen(true)} className="rounded border border-neutral-300 px-3 py-2 font-bold hover:border-brand hover:text-brand">비밀번호 변경</button>
            <button onClick={() => save(null)} className="rounded bg-ink px-3 py-2 font-bold text-white hover:bg-black">로그아웃</button>
          </div>
        </div>
      </header>
      {pwOpen && <ChangePassword cred={cred} onClose={() => setPwOpen(false)} />}

      <div className="mx-auto max-w-[1100px] px-4 py-6">
        <div className="mb-5 flex gap-1 border-b border-neutral-200 text-[14px] font-bold">
          {([["consult", "상담"], ["register", "등록"]] as const).map(([k, t]) => (
            <button key={k} onClick={() => setTab(k)} className={`-mb-px border-b-2 px-4 py-3 transition ${tab === k ? "border-brand text-brand" : "border-transparent text-neutral-400 hover:text-ink"}`}>{t}</button>
          ))}
        </div>
        {tab === "register" ? (<>
          <div className="mb-5 flex flex-wrap gap-2">
            {([["franchise", "프랜차이즈"], ["shop", "상가매물"], ["transfer", "전수창업"], ["startup", "신규창업"]] as const).map(([k, n]) => (
              <button key={k} onClick={() => setReg(k)} className={`rounded-full border px-4 py-2 text-[13px] font-bold transition ${reg === k ? "border-ink bg-ink text-white" : "border-neutral-300 bg-white text-neutral-600 hover:border-brand hover:text-brand"}`}>{n}</button>
            ))}
          </div>
          {reg === "franchise" ? <FranchiseAdmin cred={cred} /> : reg === "shop" ? <ShopAdmin cred={cred} /> : reg === "transfer" ? <TransferAdmin cred={cred} /> : <StartupAdmin cred={cred} />}
        </>) : (<>
        <div className="mb-4 flex flex-wrap gap-2">
          {kinds.map(([k, t]) => {
            const n = (rows ?? []).filter((r) => !r.done && (k === "all" || kindOf(r.type) === k)).length; // 처리 완료되면 빠진다
            return (
              <button key={k} onClick={() => setKind(k)} className={`rounded-full border px-4 py-2 text-[13px] font-bold transition ${kind === k ? "border-ink bg-ink text-white" : "border-neutral-300 bg-white text-neutral-600 hover:border-brand hover:text-brand"}`}>{t} <span className={kind === k ? "text-white/70" : n ? "text-brand" : "text-neutral-300"}>{n}</span></button>
            );
          })}
        </div>

        <div className="grid grid-cols-3 gap-3">
          {[["전체", scoped.length], ["대기", todo], ["처리 완료", scoped.length - todo]].map(([t, n]) => (
            <div key={t} className="rounded-xl border border-neutral-200 bg-white p-4">
              <p className="text-[11px] text-neutral-400">{t}</p>
              <p className="mt-1 text-[24px] font-black">{n}</p>
            </div>
          ))}
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-2">
          <div className="flex rounded-lg bg-white p-1 text-[12px] ring-1 ring-neutral-200">
            {tabs.map(([k, t]) => (
              <button key={k} onClick={() => setFilter(k)} className={`rounded px-3 py-1.5 font-bold transition ${filter === k ? "bg-brand text-white" : "text-neutral-500 hover:text-ink"}`}>{t}</button>
            ))}
          </div>
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="이름·연락처·내용 검색" className={`${inputCls} max-w-[260px]`} />
          <div className="ml-auto flex gap-2 text-[12px]">
            <button onClick={load} className="rounded border border-neutral-300 bg-white px-3 py-2 font-bold hover:border-brand hover:text-brand">새로고침</button>
            <button onClick={csv} disabled={!list.length} className="rounded border border-neutral-300 bg-white px-3 py-2 font-bold hover:border-brand hover:text-brand disabled:opacity-40">CSV 내려받기</button>
          </div>
        </div>

        {error && <p className="mt-4 rounded-lg bg-red-50 p-3 text-[12px] text-red-700">{error}</p>}

        <ul className="mt-4 space-y-3">
          {rows === null && <li className="py-16 text-center text-[13px] text-neutral-400">불러오는 중...</li>}
          {rows && list.length === 0 && !error && <li className="py-16 text-center text-[13px] text-neutral-400">상담 신청이 없습니다.</li>}
          {list.map((r) => (
            <li key={r.id} className={`rounded-xl border bg-white p-4 ${r.done ? "border-neutral-200 opacity-70" : "border-orange-200"}`}>
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2 text-[11px]">
                    <span className={`rounded px-1.5 py-0.5 font-bold ${r.done ? "bg-neutral-100 text-neutral-500" : "bg-orange-50 text-brand"}`}>{r.done ? "처리 완료" : "대기"}</span>
                    <span className={`rounded px-1.5 py-0.5 font-bold ${kindTone[kindOf(r.type)]}`}>{kindName[kindOf(r.type)]}</span>
                    {r.type && <span className="max-w-full truncate rounded bg-neutral-100 px-1.5 py-0.5 text-neutral-600">{typeText(r.type)}</span>}
                    {listingId(r.type) && <Link href={`/listings/${listingId(r.type)}`} target="_blank" className="rounded border border-brand px-1.5 py-0.5 font-bold text-brand hover:bg-brand hover:text-white">{r.type?.startsWith("가맹상담[") ? `${brands[Number(listingId(r.type))] ?? franchises[Number(listingId(r.type))]?.brand ?? "프랜차이즈"}` : "매물 보기 →"}</Link>}
                    {r.region && <span className="text-neutral-400">{r.region}</span>}
                    <span className="text-neutral-300">{fmt(r.created_at)}</span>
                  </div>
                  <p className="mt-2 text-[15px] font-black">{r.name} <a href={`tel:${r.phone}`} className="ml-2 text-[14px] font-bold text-brand">{r.phone}</a></p>
                  {r.message && <p className="mt-2 whitespace-pre-wrap break-words text-[12.5px] leading-relaxed text-neutral-600">{r.message}</p>}
                </div>
                <div className="flex shrink-0 gap-2 text-[11.5px]">
                  <button onClick={() => toggle(r)} className="rounded border border-neutral-300 px-3 py-1.5 font-bold hover:border-brand hover:text-brand">{r.done ? "대기로 되돌리기" : "처리 완료"}</button>
                  <button onClick={() => remove(r)} className="rounded border border-neutral-300 px-3 py-1.5 font-bold text-red-600 hover:border-red-400">삭제</button>
                </div>
              </div>
            </li>
          ))}
        </ul>
        </>)}
      </div>
    </main>
  );
}

export default function AdminPage() {
  const stored = useSyncExternalStore(subscribe, read, () => undefined);
  const cred = useMemo<Cred | null>(() => {
    try { return stored ? (JSON.parse(stored) as Cred) : null; } catch { return null; }
  }, [stored]);

  if (!supabase) return <main className="grid min-h-screen place-items-center p-6 text-center text-[13px] text-neutral-500">Supabase 환경변수가 설정되지 않았습니다.</main>;
  if (stored === undefined) return <main className="grid min-h-screen place-items-center text-[13px] text-neutral-400">불러오는 중...</main>;
  return cred ? <Dashboard cred={cred} /> : <Login />;
}
