import { useCallback, useEffect, useState } from 'react';

/** localStorage에 붙은 상태. 면접 전날까지 반복해서 쓰는 도구라 학습 기록이 남아야 한다. */
export function useLocalStorage<T>(key: string, initial: T) {
  const [value, setValue] = useState<T>(() => {
    try {
      const raw = localStorage.getItem(key);
      return raw ? (JSON.parse(raw) as T) : initial;
    } catch {
      return initial;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      /* 저장 실패는 무시한다 — 학습 기록이지 원본 데이터가 아니다 */
    }
  }, [key, value]);

  return [value, setValue] as const;
}

/** 문자열 id 집합을 토글하는 상태. 즐겨찾기·체크에 쓴다. */
export function useIdSet(key: string) {
  const [ids, setIds] = useLocalStorage<string[]>(key, []);
  const set = new Set(ids);

  const toggle = useCallback(
    (id: string) => {
      setIds((prev) =>
        prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
      );
    },
    [setIds],
  );

  const clear = useCallback(() => setIds([]), [setIds]);

  return { set, toggle, clear, count: ids.length };
}
