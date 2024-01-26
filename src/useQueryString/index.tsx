import { useState, useEffect } from 'react';

export const useQueryString = (initValue = {}) => {
  const [query, setQuery] = useState(initValue);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const keys = [];
    const URLSearch = new URLSearchParams(location.search);

    const entries = Array.from(URLSearch.entries());

    const _query = entries.reduce<{ [key: string]: string }>(
      (acc, [key, value]) => {
        acc[key] = value;
        keys.push(key);
        return acc;
      },
      {}
    );

    setQuery(_query);
  }, []);

  return [query, setQuery];
};
