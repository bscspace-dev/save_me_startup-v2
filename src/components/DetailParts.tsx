// 프랜차이즈·상가매물 상세 화면이 함께 쓰는 조각들
export const man = (v: number) => `${v.toLocaleString()}만원`;

export const card = "rounded-3xl border border-neutral-200 bg-white p-8 md:p-10";
export const inner = "rounded-xl border border-neutral-200 bg-[#faf9f7]";

export function Head({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <>
      <p className="text-[11px] font-bold tracking-[0.14em] text-brand">{eyebrow}</p>
      <h2 className="mt-2 text-[26px] font-black tracking-tight">{title}</h2>
    </>
  );
}

// 월 순수익 항목은 모든 매물에서 같은 이름·순서로 고정
export type Costs = { material: number; labor: number; rent: number; etc: number };

export function ProfitPanel({ revenue, costs, title, rateLabel, caption, revenueLabel = "매출액" }: {
  revenue: number; costs: Costs; title: string; rateLabel: string; caption: string; revenueLabel?: string;
}) {
  const rows = [
    { label: revenueLabel, amount: revenue, sign: "" },
    { label: "재료비", amount: costs.material, sign: "-" },
    { label: "인건비", amount: costs.labor, sign: "-" },
    { label: "임차·관리비", amount: costs.rent, sign: "-" },
    { label: "기타 운영비", amount: costs.etc, sign: "-" },
  ];
  const net = revenue - costs.material - costs.labor - costs.rent - costs.etc;
  const rate = Math.round((net / revenue) * 100);

  return (
    <div className="mt-7 grid overflow-hidden rounded-xl border border-neutral-200 lg:grid-cols-[1fr_2.1fr]">
      <div className="flex flex-col justify-between bg-[#fff4ea] p-7">
        <div>
          <p className="text-[11px] font-bold text-brand">{title}</p>
          <p className="mt-4 text-[34px] font-black leading-none tracking-tight">{man(net)}</p>
        </div>
        <div className="mt-12">
          <span className="inline-block rounded-full bg-brand px-3 py-1 text-[11px] font-bold text-white">{rateLabel} {rate}%</span>
          <p className="mt-2 text-[11px] text-brand">{caption}</p>
        </div>
      </div>
      <div className="divide-y divide-neutral-100 bg-white text-[12.5px]">
        {rows.map((r) => (
          <div key={r.label} className="flex items-center justify-between px-6 py-4">
            <span className={r.sign ? "text-neutral-500" : "font-bold"}>{r.label}</span>
            <span className="flex items-baseline gap-6">
              <b>{r.sign}{man(r.amount)}</b>
              <span className="w-9 text-right text-[10.5px] text-neutral-300">{Math.round((r.amount / revenue) * 100)}%</span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
