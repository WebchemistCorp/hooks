import { useState, useEffect, useRef } from 'react';

export function useQueryString<T = Record<string, unknown>>(initValue: T) {
  const prevQuery = useRef<any>(null);
  const [query, setQuery] = useState<T>(initValue);
  const [isLoading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const url = new URL(window.location.toString());

    if (prevQuery.current === null) {
      const isEmpty = url.searchParams.size === 0;
      const list = isEmpty
        ? Object.entries(query)
        : Array.from(url.searchParams.entries());

      const _query = Object.fromEntries(list) as T;
      const newUrl = new URL(url.origin + url.pathname);
      list.forEach(([key, value]) => {
        newUrl.searchParams.set(key, value);
      });

      history.pushState({}, '', newUrl.toString());
      prevQuery.current = _query;
      setQuery(_query);
      setLoading(false);
    } else if (JSON.stringify(query) !== JSON.stringify(prevQuery.current)) {
      const list = Object.entries(query);
      const newUrl = new URL(url.origin + url.pathname);

      list.forEach(([key, value]) => newUrl.searchParams.set(key, value));
      history.pushState({}, '', newUrl.toString());
      prevQuery.current = query;
      setLoading(false);
    }
  }, [query]);

  return { query, setQuery, isLoading };
}
