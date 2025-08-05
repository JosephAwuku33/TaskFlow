import { type Theme } from "./types";

export function getSystemTheme(): Theme {
  return window.matchMedia("(prefers-color-scheme: dark)").matches 
    ? "dark" 
    : "light";
}

export function applyTheme(theme: Theme) {
  const root = document.documentElement;
  root.classList.remove("light", "dark");
  root.classList.add(theme === "system" ? getSystemTheme() : theme);
}

export function getStoredTheme(storageKey: string, defaultTheme: Theme): Theme {
  return (localStorage.getItem(storageKey) as Theme) || defaultTheme;
}