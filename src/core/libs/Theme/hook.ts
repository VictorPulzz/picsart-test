import { useContext, useEffect } from 'react';

import { ThemeContext } from './context';
import { ThemeContextProps, ThemeVariant } from './types';

interface UseThemeContextFn {
  (): ThemeContextProps;
}

export const useThemeContext: UseThemeContextFn = () => {
  return useContext(ThemeContext);
};

export const useSetTheme = (value: ThemeVariant): void => {
  const { setTheme } = useThemeContext();
  useEffect(() => {
    if (value) {
      setTheme(value);
    }
  }, [setTheme, value]);
};
