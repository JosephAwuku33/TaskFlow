export type Theme = "dark" | "light" | "system";

export interface ThemeProviderState {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

export const DEFAULT_THEME: Theme = "system";
export const STORAGE_KEY = "vite-ui-theme";