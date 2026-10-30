import { useSyncExternalStore } from "react";

const subscribe = () => () => {};
const iso = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
};

// 오늘 날짜(YYYY-MM-DD). 서버·첫 렌더에서는 null, 브라우저에서만 값이 채워진다
export const useToday = () => useSyncExternalStore(subscribe, iso, () => null);
