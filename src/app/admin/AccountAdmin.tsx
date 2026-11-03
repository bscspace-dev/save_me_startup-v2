"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Cred = { u: string; p: string };
type Account = { username: string; name: string | null; super: boolean; perms: string[] };

// 메뉴 권한 키 (admin-roles.sql 과 같아야 한다)
// 화면에는 묶음별로 보여준다: 상담 관리(구분별) · 등록 관리 · 메인 페이지
export const PERM_GROUPS: { title: string; short: string; items: [string, string][] }[] = [
  { title: "상담 관리", short: "상담", items: [["consult_franchise", "프랜차이즈"], ["consult_listing", "상가매물"], ["consult_transfer", "전수창업"], ["consult_newbiz", "신규창업"], ["consult_register", "등록 문의"], ["consult_other", "기타"]] },
  { title: "등록 관리", short: "등록", items: [["reg_franchise", "프랜차이즈"], ["reg_shop", "상가매물"], ["reg_transfer", "전수창업"], ["reg_startup", "신규창업"]] },
  { title: "메인 페이지", short: "", items: [["main", "메인 페이지 관리"]] },
];

const inputCls = "w-full rounded border border-neutral-300 bg-white px-3 py-2.5 text-[13px] outline-none focus:border-brand";
const msg: Record<string, string> = {
  auth: "권한이 없습니다. 다시 로그인해주세요.",
  badid: "아이디는 영문·숫자·_ . - 3~30자로 입력해주세요.",
  noname: "이름을 입력해주세요. (20자까지)",
  withdrawn: "탈퇴한 아이디는 다시 만들 수 없습니다. 다른 아이디를 사용해주세요.",
  short: "비밀번호는 8자 이상이어야 합니다.",
  self: "내 계정은 여기서 변경하거나 탈퇴할 수 없습니다.",
  last: "최고 관리자가 한 명도 남지 않습니다.",
};

function PermChecks({ sup, perms, onSup, onPerms }: { sup: boolean; perms: string[]; onSup: (v: boolean) => void; onPerms: (v: string[]) => void }) {
  return (
    <div className="space-y-3 text-[13px]">
      <div className="flex flex-wrap gap-x-6 gap-y-1 font-bold">
        <label className="flex items-center gap-2">
          <input type="radio" checked={!sup} onChange={() => onSup(false)} className="size-4 accent-[#ff6a1a]" />
          일반 관리자 <span className="font-normal text-neutral-400">(체크한 메뉴만 · 게시물 삭제 불가)</span>
        </label>
        <label className="flex items-center gap-2">
          <input type="radio" checked={sup} onChange={() => onSup(true)} className="size-4 accent-[#ff6a1a]" />
          최고 관리자 <span className="font-normal text-neutral-400">(모든 메뉴 + 삭제 + 계정 관리)</span>
        </label>
      </div>
      <div className={`space-y-2.5 ${sup ? "opacity-40" : ""}`}>
        {PERM_GROUPS.map((g) => {
          const keys = g.items.map(([k]) => k);
          const all = keys.every((k) => sup || perms.includes(k));
          const single = g.items.length === 1;
          return (
            <div key={g.title} className="flex flex-wrap items-center gap-x-5 gap-y-2 rounded-lg border border-neutral-200 bg-white px-3 py-2.5">
              {!single && (
                <label className="flex w-full items-center gap-2 font-bold sm:w-[110px]">
                  <input type="checkbox" disabled={sup} checked={all} onChange={(e) => onPerms(e.target.checked ? [...new Set([...perms, ...keys])] : perms.filter((x) => !keys.includes(x)))} className="size-4 accent-[#ff6a1a]" />
                  {g.title}
                </label>
              )}
              {g.items.map(([k, t]) => (
                <label key={k} className={single ? "flex items-center gap-2 font-bold" : "flex items-center gap-2"}>
                  <input type="checkbox" disabled={sup} checked={sup || perms.includes(k)} onChange={(e) => onPerms(e.target.checked ? [...perms, k] : perms.filter((x) => x !== k))} className="size-4 accent-[#ff6a1a]" />
                  {t}
                </label>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// 계정 설정 팝업: a 가 있으면 수정, null 이면 새 계정
function AccountModal({ a, cred, me, items, onClose, onDone }: { a: Account | null; cred: Cred; me: boolean; items: Account[]; onClose: () => void; onDone: () => void }) {
  const [id, setId] = useState(a?.username ?? "");
  const [nm, setNm] = useState(a?.name ?? "");
  const [pw, setPw] = useState("");
  const [sup, setSup] = useState(a?.super ?? false);
  // 예전 통짜 상담 권한(consult)은 구분별 권한 전부로 펼쳐서 보여준다
  const [perms, setPerms] = useState(() => { const p = a?.perms ?? []; return p.includes("consult") ? [...new Set([...p.filter((x) => x !== "consult"), ...PERM_GROUPS[0].items.map(([k]) => k)])] : p; });
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  const [asking, setAsking] = useState(false); // 탈퇴 확인 팝업

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  async function save(e: React.FormEvent) {
    e.preventDefault();
    if (!supabase) return;
    const target = (a?.username ?? id).trim();
    if (!a && items.some((x) => x.username === target)) return setErr("이미 있는 아이디입니다. 목록에서 해당 계정을 눌러 수정해주세요.");
    setBusy(true); setErr("");
    const { data, error } = await supabase.rpc("admin_account_save", { ...cred, target, new_pw: pw, sup, pms: perms, nm });
    setBusy(false);
    if (error) return setErr("저장하지 못했습니다. (admin-roles.sql 실행 여부를 확인해주세요)");
    if (data !== "ok") return setErr(msg[data as string] ?? "저장하지 못했습니다.");
    onDone(); onClose();
  }

  async function remove() {
    if (!supabase || !a) return;
    setAsking(false);
    const { data, error } = await supabase.rpc("admin_account_delete", { ...cred, target: a.username });
    if (error || data !== "ok") return setErr(msg[data as string] ?? "탈퇴 처리하지 못했습니다.");
    onDone(); onClose();
  }

  return (
    <div className="fixed inset-0 z-[120] grid place-items-center overflow-y-auto bg-black/60 p-4" onClick={onClose}>
      <div role="dialog" aria-modal="true" className="relative my-auto w-full max-w-[520px] rounded-2xl bg-white p-6 shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <button type="button" onClick={onClose} aria-label="닫기" className="absolute right-4 top-4 grid size-8 place-items-center rounded-full text-neutral-400 hover:bg-neutral-100">✕</button>
        <h2 className="text-[17px] font-black">{a ? "계정 설정" : "새 관리자 계정"}</h2>

        {me ? (
          <div className="mt-4 space-y-3 text-[13px]">
            <p className="font-bold">{a!.name ? `${a!.name} 님` : a!.username} <span className="font-normal text-neutral-400">{a!.username}</span></p>
            <p className="text-neutral-500">최고 관리자</p>
            <p className="rounded-lg bg-neutral-50 p-3 text-[12px] text-neutral-500">내 계정은 여기서 변경하거나 탈퇴할 수 없습니다. 비밀번호는 화면 위쪽의 ‘비밀번호 변경’에서 바꿀 수 있습니다.</p>
          </div>
        ) : (
          <form onSubmit={save} className="mt-4 space-y-4">
            <div className="grid gap-2 sm:grid-cols-2">
              <label className="block">
                <span className="mb-1 block text-[11px] font-bold text-neutral-500">이름 <b className="text-brand">*</b></span>
                <input required maxLength={20} value={nm} onChange={(e) => setNm(e.target.value)} placeholder="화면에 ‘이름 님’으로 표시" className={inputCls} />
              </label>
              <label className="block">
                <span className="mb-1 block text-[11px] font-bold text-neutral-500">아이디{!a && <b className="ml-0.5 text-brand">*</b>}</span>
                <input required={!a} disabled={!!a} autoComplete="off" value={id} onChange={(e) => setId(e.target.value)} placeholder="영문·숫자 3~30자" className={`${inputCls} disabled:bg-neutral-100 disabled:text-neutral-500`} />
              </label>
            </div>
            <label className="block">
              <span className="mb-1 block text-[11px] font-bold text-neutral-500">{a ? "새 비밀번호 (바꿀 때만 입력)" : "비밀번호"}{!a && <b className="ml-0.5 text-brand">*</b>}</span>
              <input required={!a} type="password" autoComplete="new-password" value={pw} onChange={(e) => setPw(e.target.value)} placeholder="8자 이상" className={inputCls} />
            </label>
            <PermChecks sup={sup} perms={perms} onSup={setSup} onPerms={setPerms} />
            {err && <p className="rounded-lg bg-red-50 p-3 text-[12px] text-red-700">{err}</p>}
            <div className="flex items-center gap-2 pt-1">
              {a && <button type="button" onClick={() => setAsking(true)} className="cursor-pointer rounded border border-neutral-300 px-4 py-2.5 text-[13px] font-bold text-red-600 hover:border-red-400">계정 탈퇴</button>}
              <span className="flex-1" />
              <button type="button" onClick={onClose} className="rounded border border-neutral-300 px-4 py-2.5 text-[13px] font-bold hover:bg-neutral-50">취소</button>
              <button disabled={busy} className="rounded bg-brand px-5 py-2.5 text-[13px] font-bold text-white disabled:opacity-60">{busy ? "저장 중..." : a ? "저장" : "계정 만들기"}</button>
            </div>
          </form>
        )}
      </div>

      {asking && a && (
        <div className="fixed inset-0 z-[130] grid place-items-center bg-black/50 p-4" onClick={(e) => { e.stopPropagation(); setAsking(false); }}>
          <div role="alertdialog" aria-modal="true" className="w-full max-w-[380px] rounded-2xl bg-white p-6 text-center shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-[18px] font-black">{a.name || a.username} 님을 탈퇴시키겠습니까?</h3>
            <p className="mt-2 text-[12.5px] leading-relaxed text-neutral-500">아이디 {a.username}<br />탈퇴하면 로그인할 수 없고, 같은 아이디로 다시 만들 수 없습니다.</p>
            <div className="mt-5 flex gap-2">
              <button type="button" onClick={() => setAsking(false)} className="flex-1 cursor-pointer rounded border border-neutral-300 py-2.5 text-[13px] font-bold hover:bg-neutral-50">취소</button>
              <button type="button" onClick={remove} className="flex-1 cursor-pointer rounded bg-red-600 py-2.5 text-[13px] font-bold text-white hover:bg-red-700">탈퇴시키기</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// 계정 목록에 보이는 권한 요약: 묶음 전체면 "상담 전체", 일부면 "상담(프랜차이즈·상가매물)"
const permText = (a: Account) => {
  if (a.super) return "전체";
  const has = a.perms.includes("consult") ? (k: string) => k.startsWith("consult_") || a.perms.includes(k) : (k: string) => a.perms.includes(k); // 예전 통짜 상담 권한도 인식
  const out = PERM_GROUPS.map((g) => {
    const on = g.items.filter(([k]) => has(k));
    if (!on.length) return "";
    if (!g.short) return on[0][1];
    return on.length === g.items.length ? `${g.short} 전체` : `${g.short}(${on.map(([, t]) => t).join("·")})`;
  }).filter(Boolean);
  return out.length ? out.join(" · ") : "없음";
};

// 최고 관리자 전용: 계정 목록. 행을 누르면 계정 설정 팝업(메뉴 권한, 비밀번호 재설정, 탈퇴)이 열린다
export function AccountAdmin({ cred }: { cred: Cred }) {
  const [items, setItems] = useState<Account[] | null>(null);
  const [err, setErr] = useState("");
  const [tick, setTick] = useState(0);
  const [open, setOpen] = useState<Account | "new" | null>(null);
  const reload = () => setTick((t) => t + 1);

  useEffect(() => {
    let alive = true;
    supabase?.rpc("admin_account_list", cred).then(({ data, error }) => {
      if (!alive) return;
      if (error || !data) { setErr("계정 목록을 불러오지 못했습니다. (admin-roles.sql 실행 여부와 최고 관리자 권한을 확인해주세요)"); setItems([]); return; }
      setErr(""); setItems(data as Account[]);
    });
    return () => { alive = false; };
  }, [cred, tick]);

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <p className="text-[12px] text-neutral-500">관리자 계정 {items ? `${items.length}명` : ""} <span className="text-neutral-300">· 계정을 누르면 설정 창이 열립니다</span></p>
        <button onClick={() => setOpen("new")} className="cursor-pointer rounded bg-ink px-4 py-2.5 text-[13px] font-bold text-white hover:bg-black">+ 계정 추가</button>
      </div>

      {err && <p className="mb-3 rounded-lg bg-red-50 p-3 text-[12px] text-red-700">{err}</p>}

      <div className="overflow-hidden rounded-xl border border-neutral-200 bg-white">
        <div className="hidden grid-cols-[1.1fr_1.1fr_110px_1.6fr] gap-3 border-b border-neutral-200 bg-neutral-50 px-4 py-2.5 text-[11px] font-bold text-neutral-500 sm:grid">
          <span>이름</span><span>아이디</span><span>등급</span><span>사용 메뉴</span>
        </div>
        {items === null && <p className="py-12 text-center text-[13px] text-neutral-400">불러오는 중...</p>}
        {items && items.length === 0 && !err && <p className="py-12 text-center text-[13px] text-neutral-400">계정이 없습니다.</p>}
        <ul className="divide-y divide-neutral-100">
          {items?.map((a) => (
            <li key={a.username}>
              <button onClick={() => setOpen(a)} className="grid w-full cursor-pointer gap-x-3 gap-y-1 px-4 py-3.5 text-left text-[13px] transition hover:bg-orange-50/50 sm:grid-cols-[1.1fr_1.1fr_110px_1.6fr] sm:items-center">
                <span className="font-black">
                  {a.name ? `${a.name} 님` : <span className="font-normal text-neutral-300">이름 없음</span>}
                  {a.username === cred.u && <span className="ml-2 rounded bg-neutral-100 px-1.5 py-0.5 text-[10px] font-bold text-neutral-500">나</span>}
                </span>
                <span className="text-neutral-600">{a.username}</span>
                <span><span className={`rounded px-1.5 py-0.5 text-[11px] font-bold ${a.super ? "bg-orange-50 text-brand" : "bg-neutral-100 text-neutral-600"}`}>{a.super ? "최고 관리자" : "일반 관리자"}</span></span>
                <span className="text-[12px] text-neutral-500">{permText(a)}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      {open && items && (
        <AccountModal
          key={open === "new" ? "new" : open.username}
          a={open === "new" ? null : open}
          cred={cred}
          me={open !== "new" && open.username === cred.u}
          items={items}
          onClose={() => setOpen(null)}
          onDone={reload}
        />
      )}
    </div>
  );
}
