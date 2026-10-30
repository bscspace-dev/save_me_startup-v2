"use client";
import { createContext, useContext, useMemo, useState } from "react";
import { listings, regions } from "@/lib/data";
import { useToday } from "@/lib/today";

// 서버 없이 매물을 추가하기 위한 코드 생성기: 입력값 → data.ts / franchise.ts / shop.ts 에 붙여넣을 코드
const kinds = ["프랜차이즈", "상가매물", "전수창업", "신규창업"] as const;
const cats = ["한식·분식", "카페·음료", "베이커리·디저트", "프랜차이즈", "기타"];
const ops = ["직접운영", "반오토", "풀오토"];
const nextId = Math.max(...listings.map((l) => l.id)) + 1;

const q = (s: string) => JSON.stringify(s ?? "");
const n = (s: string) => (Number(String(s).replace(/,/g, "")) || 0);
const rows = (pairs: [string, string][]) => pairs.filter(([a]) => a.trim());

type V = Record<string, string>;
const inputCls = "w-full rounded border border-neutral-300 bg-white px-3 py-2 text-[13px] outline-none focus:border-brand";

function Box({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-2xl border border-neutral-200 bg-white p-6">
      <h2 className="mb-4 text-[15px] font-black">{title}</h2>
      <div className="grid gap-3 sm:grid-cols-2">{children}</div>
    </section>
  );
}

const Ctx = createContext<{ v: V; set: (k: string, val: string) => void }>({ v: {}, set: () => {} });

function F({ k, label, ph, wide, area }: { k: string; label: string; ph?: string; wide?: boolean; area?: boolean }) {
  const { v, set } = useContext(Ctx);
  const today = useToday();
  const val = v[k] ?? (k === "date" ? (today ?? "") : "");
  return (
    <label className={`block ${wide ? "sm:col-span-2" : ""}`}>
      <span className="mb-1 block text-[11px] font-bold text-neutral-500">{label}</span>
      {area
        ? <textarea rows={2} value={val} onChange={(e) => set(k, e.target.value)} placeholder={ph} className={inputCls} />
        : <input value={val} onChange={(e) => set(k, e.target.value)} placeholder={ph} className={inputCls} />}
    </label>
  );
}

function S({ k, label, options }: { k: string; label: string; options: readonly string[] }) {
  const { v, set } = useContext(Ctx);
  return (
    <label className="block">
      <span className="mb-1 block text-[11px] font-bold text-neutral-500">{label}</span>
      <select value={v[k] ?? ""} onChange={(e) => set(k, e.target.value)} className={inputCls}>{options.map((o) => <option key={o}>{o}</option>)}</select>
    </label>
  );
}

function Out({ title, where, code }: { title: string; where: string; code: string }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try { await navigator.clipboard.writeText(code); setCopied(true); setTimeout(() => setCopied(false), 1500); } catch { /* 복사 실패 시 직접 선택 */ }
  };
  return (
    <div className="rounded-2xl border border-neutral-200 bg-white p-6">
      <div className="mb-2 flex items-center justify-between gap-3">
        <div><p className="text-[14px] font-black">{title}</p><p className="text-[11.5px] text-neutral-500">붙여넣을 곳: <b className="text-brand">{where}</b></p></div>
        <button onClick={copy} className="shrink-0 rounded bg-brand px-4 py-2 text-[12px] font-bold text-white hover:bg-brand-dark">{copied ? "복사됨 ✓" : "복사"}</button>
      </div>
      <pre className="max-h-[360px] overflow-auto rounded-lg bg-neutral-900 p-4 text-[11.5px] leading-relaxed text-neutral-100">{code}</pre>
    </div>
  );
}

export default function NewListingPage() {
  const [v, setV] = useState<V>({ id: String(nextId), kind: "프랜차이즈", region: "수성구", category: "카페·음료", op: "직접운영", group: "외식업" });
  const today = useToday();
  const set = (k: string, val: string) => setV((p) => ({ ...p, [k]: val }));

  const g = (k: string) => v[k] ?? (k === "date" ? (today ?? "") : "");
  const kind = g("kind");

  const out = useMemo(() => {
    const photos = n(g("photos"));
    const flags = [g("date") && `date: ${q(g("date"))}`, photos && `photos: ${photos}`,g("rec") && "rec: true", g("isNew") && "isNew: true", g("sold") && "sold: true"].filter(Boolean).join(", ");
    const line = `  { id: ${n(g("id"))}, price: ${n(g("price"))}, title: ${q(g("title"))}, region: ${q(g("region"))}, category: ${q(g("category"))}, op: ${q(g("op"))}, cost: ${n(g("cost"))}, area: ${n(g("area"))}, ${flags ? flags + ", " : ""}views: 0, kind: ${q(kind)} },`;

    let detail = "";
    let file = "";
    if (kind === "프랜차이즈") {
      file = "src/lib/franchise.ts 의 franchises 안";
      const st = [1, 2, 3].map((i) => `      { title: ${q(g("st" + i + "t"))}, desc: ${q(g("st" + i + "d"))} },`).join("\n");
      const mn = [1, 2, 3].map((i) => `      { name: ${q(g("mn" + i))}, desc: ${q(g("md" + i))}, price: ${n(g("mp" + i))}${g("mb" + i) ? `, badge: ${q(g("mb" + i))}` : ""} },`).join("\n");
      const side = (p: string, c: number) => rows(Array.from({ length: c }, (_, i) => [g(p + i), g(p + i + "a")] as [string, string]))
        .map(([a, b]) => `{ label: ${q(a)}, amount: ${n(b)} }`).join(", ");
      detail = `  ${n(g("id"))}: {
    brand: ${q(g("brand"))}, group: ${q(g("group"))}, sector: ${q(g("sector"))}, eyebrow: ${q(g("eyebrow"))},
    headline: [${q(g("h1"))}, ${q(g("h2"))}],
    desc: ${q(g("desc"))},
    area: ${q(g("farea"))}, place: ${q(g("place"))}, opModel: ${q(g("opModel"))},
    gallery: galleryLabels(${q(g("gcap") || "매장 전경")}, ${q(g("gsub"))}),
    strengths: [
${st}
    ],
    menus: [
${mn}
    ],
    model: { size: ${q(g("size"))}, seats: ${q(g("seats"))}, place: ${q(g("mplace"))}, sales: ${q(g("msales"))}, staff: ${q(g("staff"))}, hours: ${q(g("hours"))}, cook: ${q(g("cook"))} },
    revenue: ${n(g("revenue"))},
    costs: { material: ${n(g("c1"))}, labor: ${n(g("c2"))}, rent: ${n(g("c3"))}, etc: ${n(g("c4"))} },
    profitNote, basis: ${q(g("basis"))}, royalty: ${q(g("royalty"))},
    startupLeft: [${side("sl", 5)}],
    startupRight: [${side("sr", 4)}],
    startupNote,
  },`;
    } else if (kind === "상가매물") {
      file = "src/lib/shop.ts 의 shops 안";
      const feats = g("features").split(",").map((s) => s.trim()).filter(Boolean).map(q).join(", ");
      const sales = g("sales").split(",").map((s) => n(s)).join(", ");
      detail = `  ${n(g("id"))}: {
    address: ${q(g("address"))}, buildingType: ${q(g("buildingType"))}, floor: ${q(g("floor"))}, shortType: ${q(g("shortType"))},
    headline: [${q(g("h1"))}, ${q(g("h2"))}],
    desc: ${q(g("desc"))},
    direction: ${q(g("direction"))}, parking: ${q(g("parking"))}, approved: ${q(g("approved"))}, moveIn: ${q(g("moveIn"))},
    point: ${q(g("point"))},
    deposit: ${n(g("deposit"))}, rent: ${n(g("rent"))}, maintenance: ${n(g("maintenance"))}, premium: ${n(g("premium"))},
    features: [${feats}],
    operation: ${q(g("operation"))}, hours: ${q(g("hours"))}, closed: ${q(g("closed"))}, years: ${q(g("years"))},
    sales: [${sales}], revenue: ${n(g("revenue"))},
    costs: { material: ${n(g("c1"))}, labor: ${n(g("c2"))}, rent: ${n(g("c3"))}, etc: ${n(g("c4"))} },
    operatorNote: ${q(g("operatorNote"))},
  },`;
    }
    return { line, detail, file };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [v]);

  return (
    <Ctx.Provider value={{ v, set }}>
    <main className="min-h-screen bg-[#f7f6f4] pb-24">
      <div className="mx-auto max-w-[900px] space-y-5 px-6 pt-10">
        <h1 className="text-[24px] font-black">새 매물 코드 만들기</h1>
        <p className="text-[12.5px] leading-relaxed text-neutral-500">
          서버 없이 매물을 추가하는 도구입니다. 아래를 입력하면 코드가 만들어지고, 안내된 파일에 붙여넣은 뒤 저장·푸시하면 사이트에 반영됩니다. 이 화면에서 입력한 내용은 저장되지 않습니다.
        </p>

        <Box title="1. 기본 정보 (목록 카드)">
          <S k="kind" label="유형" options={kinds} />
          <F k="id" label="매물 번호 (다른 매물과 겹치면 안 됨)" />
          <F k="title" label="제목" wide />
          <F k="price" label="총 금액 (만원)" ph="7000" />
          <F k="cost" label="창업비용 (만원)" ph="6000" />
          <F k="area" label="전용면적 (㎡)" ph="30" />
          <F k="date" label="등록일 (YYYY-MM-DD, 기본값 오늘)" ph="2026-10-30" />
          <F k="photos" label="사진 장수 (없으면 비움)" ph="5" />
          <S k="region" label="지역" options={regions.map((r) => r[0])} />
          <S k="category" label="업종" options={cats} />
          <S k="op" label="운영방식" options={ops} />
          <div className="flex items-end gap-5 pb-2 text-[12.5px]">
            {[["rec", "추천"], ["isNew", "신규"], ["sold", "계약완료"]].map(([k, l]) => (
              <label key={k} className="flex items-center gap-1.5"><input type="checkbox" checked={!!g(k)} onChange={(e) => set(k, e.target.checked ? "1" : "")} />{l}</label>
            ))}
          </div>
        </Box>

        {kind === "프랜차이즈" && (
          <>
            <Box title="2. 브랜드 소개">
              <F k="brand" label="브랜드명" /><F k="sector" label="업종 (예: 한식, 카페)" />
              <F k="group" label="분류" /><F k="eyebrow" label="영문 소제목" ph="KOREAN CASUAL DINING" />
              <F k="h1" label="제목 윗줄" /><F k="h2" label="제목 아랫줄 (강조색)" />
              <F k="desc" label="소개 문구" wide area />
              <F k="farea" label="모집 지역" /><F k="place" label="추천 입지" />
              <F k="opModel" label="운영 형태" /><F k="gsub" label="대표 사진 설명" />
            </Box>
            <Box title="3. 브랜드 강점 (3개)">
              {[1, 2, 3].map((i) => (<div key={i} className="contents"><F k={"st" + i + "t"} label={`강점 ${i} 제목`} /><F k={"st" + i + "d"} label="설명" /></div>))}
            </Box>
            <Box title="4. 대표 메뉴 (3개)">
              {[1, 2, 3].map((i) => (<div key={i} className="contents"><F k={"mn" + i} label={`메뉴 ${i} 이름`} /><F k={"md" + i} label="설명" /><F k={"mp" + i} label="가격 (원)" /><F k={"mb" + i} label="뱃지 (BEST 등, 선택)" /></div>))}
            </Box>
            <Box title="5. 매장 모델">
              <F k="size" label="평수" ph="15~25평" /><F k="seats" label="좌석" ph="24~36석" />
              <F k="mplace" label="입지" /><F k="msales" label="예상 매출" ph="5,000~6,500만원" />
              <F k="staff" label="인원" /><F k="hours" label="영업시간" ph="11:00 – 22:00" />
              <F k="cook" label="조리 시간" ph="주문 후 약 7분" />
            </Box>
            <Box title="6. 월 예상 순수익 (만원)">
              <F k="revenue" label="매출액" /><F k="basis" label="기준 (예: 20평 표준 매장)" />
              <F k="c1" label="재료비" /><F k="c2" label="인건비" /><F k="c3" label="임차·관리비" /><F k="c4" label="기타 운영비" />
              <F k="royalty" label="로열티" ph="로열티 월 매출의 2%" />
            </Box>
            <Box title="7. 창업 비용 (만원, 안 쓰는 칸은 비워두세요)">
              {Array.from({ length: 5 }, (_, i) => (<div key={i} className="contents"><F k={"sl" + i} label={`왼쪽 ${i + 1} 항목`} ph="가맹비" /><F k={"sl" + i + "a"} label="금액" /></div>))}
              {Array.from({ length: 4 }, (_, i) => (<div key={i} className="contents"><F k={"sr" + i} label={`오른쪽 ${i + 1} 항목`} ph="교육비" /><F k={"sr" + i + "a"} label="금액" /></div>))}
            </Box>
          </>
        )}

        {kind === "상가매물" && (
          <>
            <Box title="2. 매물 소개">
              <F k="address" label="소재지" ph="대구 중구 남산동" /><F k="shortType" label="짧은 유형" ph="1층 근린상가" />
              <F k="h1" label="제목 윗줄" /><F k="h2" label="제목 아랫줄 (강조색)" />
              <F k="desc" label="소개 문구" wide area />
              <F k="buildingType" label="건축물 용도" ph="제2종 근린생활시설" /><F k="floor" label="해당 층" ph="1층 / 총 5층" />
              <F k="direction" label="방향" /><F k="parking" label="주차" />
              <F k="approved" label="사용승인일" /><F k="moveIn" label="입주 가능일" />
              <F k="point" label="입지 포인트" wide area />
            </Box>
            <Box title="3. 임대 조건 (만원)">
              <F k="deposit" label="보증금" /><F k="rent" label="월세" />
              <F k="maintenance" label="관리비" /><F k="premium" label="권리금" />
              <F k="features" label="시설 (쉼표로 구분)" wide ph="냉난방기 2대, 도시가스 인입, 전용 화장실" />
            </Box>
            <Box title="4. 현재 사용 현황">
              <F k="operation" label="운영 형태" /><F k="hours" label="영업시간" />
              <F k="closed" label="정기 휴무" /><F k="years" label="운영 기간" />
              <F k="sales" label="최근 6개월 매출 (만원, 쉼표 구분)" wide ph="5000,5200,5400,5500,5700,5800" />
            </Box>
            <Box title="5. 현재 임차인 운영 자료 (만원)">
              <F k="revenue" label="월 매출" /><F k="operatorNote" label="설명" ph="1인 운영 + 파트 1명 기준" />
              <F k="c1" label="재료비" /><F k="c2" label="인건비" /><F k="c3" label="임차·관리비" /><F k="c4" label="기타 운영비" />
            </Box>
          </>
        )}

        {n(g("photos")) > 0 && (
          <p className="rounded-xl bg-[#fff4ea] px-5 py-4 text-[12.5px] leading-relaxed text-brand">
            사진 {n(g("photos"))}장을 <b>public/listings/{g("id")}/</b> 폴더에 <b>1.jpg ~ {n(g("photos"))}.jpg</b> 이름으로 넣어 주세요. (가로 1200px, 한 장 500KB 이하 권장)
          </p>
        )}
        <Out title="목록 카드 코드" where="src/lib/data.ts 의 listings 안 (맨 위에 한 줄 추가)" code={out.line} />
        {out.detail
          ? <Out title="상세 화면 코드" where={out.file} code={out.detail} />
          : <p className="rounded-xl bg-white px-5 py-4 text-[12.5px] text-neutral-500">전수창업·신규창업은 상세 화면 코드 없이 목록 카드만 추가하면 됩니다.</p>}
      </div>
    </main>
    </Ctx.Provider>
  );
}
