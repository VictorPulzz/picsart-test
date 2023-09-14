import React from 'react';
import { useLocation } from 'react-router-dom';

export function useSearchParams(): Record<string, string | undefined> {
  const location = useLocation();

  return React.useMemo(() => {
    const urlSearchParams = new URLSearchParams(location.search);
    const params: Record<string, string | undefined> = {};
    urlSearchParams.forEach((value, key) => {
      params[key] = value;
    });
    return params;
  }, [location.search]);
}
