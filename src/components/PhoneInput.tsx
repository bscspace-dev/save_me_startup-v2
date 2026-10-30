"use client";

// 숫자만 남기고 하이픈 자동 삽입 (02 지역번호, 10자리/11자리 구분)
export function formatPhone(raw: string) {
  const d = raw.replace(/\D/g, "").slice(0, 11);
  if (d.startsWith("02")) {
    if (d.length <= 2) return d;
    if (d.length <= 5) return `${d.slice(0, 2)}-${d.slice(2)}`;
    if (d.length <= 9) return `${d.slice(0, 2)}-${d.slice(2, 5)}-${d.slice(5)}`;
    return `${d.slice(0, 2)}-${d.slice(2, 6)}-${d.slice(6)}`;
  }
  if (d.length <= 3) return d;
  if (d.length <= 7) return `${d.slice(0, 3)}-${d.slice(3)}`;
  if (d.length <= 10) return `${d.slice(0, 3)}-${d.slice(3, 6)}-${d.slice(6)}`;
  return `${d.slice(0, 3)}-${d.slice(3, 7)}-${d.slice(7)}`;
}

export function PhoneInput({ className }: { className?: string }) {
  return (
    <input
      name="phone"
      required
      type="tel"
      inputMode="numeric"
      autoComplete="tel"
      maxLength={13}
      pattern="0[0-9]{1,2}-[0-9]{3,4}-[0-9]{4}"
      title="숫자만 입력해주세요 (예: 010-0000-0000)"
      placeholder="010-0000-0000"
      onChange={(e) => { e.currentTarget.value = formatPhone(e.currentTarget.value); }}
      className={className}
    />
  );
}
