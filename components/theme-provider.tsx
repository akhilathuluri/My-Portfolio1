"use client";

import * as React from "react";

type Theme = "light" | "night" | "skyblue";

interface ThemeProviderProps {
  children: React.ReactNode;
}

interface ThemeProviderState {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const initialState: ThemeProviderState = {
  theme: "light",
  setTheme: () => null,
};

const ThemeProviderContext = React.createContext<ThemeProviderState>(initialState);

export function ThemeProvider({
  children,
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = React.useState<Theme>("light");
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
    const storedTheme = localStorage.getItem("theme") as Theme | null;
    if (storedTheme) {
      setTheme(storedTheme);
    }
  }, []);

  React.useEffect(() => {
    if (!mounted) return;
    const root = window.document.documentElement;
    root.classList.remove("theme-light", "theme-night", "theme-skyblue");
    root.classList.add(`theme-${theme}`);
    localStorage.setItem("theme", theme);
  }, [theme, mounted]);

  const value = React.useMemo(
    () => ({
      theme,
      setTheme: (theme: Theme) => {
        setTheme(theme);
      },
    }),
    [theme]
  );

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return <div style={{ visibility: 'hidden' }}>{children}</div>;
  }

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = React.useContext(ThemeProviderContext);

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider");

  return context;
};
