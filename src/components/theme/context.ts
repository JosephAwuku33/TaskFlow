import { createContext } from "react";
import type { ThemeProviderState } from "./types";


export const ThemeContext = createContext<ThemeProviderState | undefined>(undefined);
