export type ThemeVariant = 'dark' | 'light';

export interface ThemeContextProps {
  setTheme: (value: ThemeVariant) => void;
}
