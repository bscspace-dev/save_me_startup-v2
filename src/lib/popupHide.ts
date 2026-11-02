// "24시간 동안 보지 않기": 누른 시각을 브라우저에 저장하고, 24시간이 지나면 다시 보여준다
const DAY = 24 * 60 * 60 * 1000;
const k = (key: string) => `popup-hide:${key}`;

export function isHidden(key: string): boolean {
  try {
    const t = Number(localStorage.getItem(k(key)));
    return t > 0 && Date.now() - t < DAY;
  } catch { return false; } // 저장소를 못 쓰는 환경에서는 항상 보여준다
}

export function hideFor24h(key: string) {
  try { localStorage.setItem(k(key), String(Date.now())); } catch { /* 저장 불가 */ }
}
