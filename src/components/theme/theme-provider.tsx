import {  useEffect, useState } from "react";
import { 
  DEFAULT_THEME, 
  STORAGE_KEY,
  type Theme
} from "./types";
import { applyTheme, getStoredTheme } from "./utils";
import { ThemeContext } from "./context";


export function ThemeProvider({
  children,
  defaultTheme = DEFAULT_THEME,
  storageKey = STORAGE_KEY,
}: {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
}) {
  const [theme, setTheme] = useState<Theme>(
    () => getStoredTheme(storageKey, defaultTheme)
  );

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{
      theme,
      setTheme: (theme) => {
        localStorage.setItem(storageKey, theme);
        setTheme(theme);
      }
    }}>
      {children}
    </ThemeContext.Provider>
  );
}