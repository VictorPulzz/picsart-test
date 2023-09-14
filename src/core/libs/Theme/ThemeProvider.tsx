import React, { memo, PropsWithChildren, useCallback, useMemo } from 'react';

import { ThemeContext } from './context';
import { ThemeContextProps } from './types';

export const ThemeProvider = memo<PropsWithChildren<unknown>>(({ children }) => {
  const setTheme: ThemeContextProps['setTheme'] = useCallback(role => {
    const root = window.document.documentElement;
    const isDark = role === 'dark';
    root.classList.remove(isDark ? 'light' : 'dark');
    root.classList.add(isDark ? 'dark' : 'light');
  }, []);

  const value = useMemo(() => ({ setTheme }), [setTheme]);

  return <ThemeContext.Provider {...{ value }}>{children}</ThemeContext.Provider>;
});
