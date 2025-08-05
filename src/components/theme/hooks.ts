import { useContext } from "react";
import { ThemeContext } from "./context";
import { type ThemeProviderState } from "./types";

export function useTheme(): ThemeProviderState {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}

