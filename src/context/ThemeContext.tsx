import React, { createContext, useContext, useEffect, useState } from 'react';

export type Theme = 'light' | 'dark';
type ThemeContextValue = { theme: Theme; toggleTheme: () => void };
const ThemeContext = createContext<ThemeContextValue | null>(null);

const readTheme = (): Theme => {
  try { return localStorage.getItem('devpride-theme') === 'dark' ? 'dark' : 'light'; }
  catch { return 'light'; }
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(readTheme);
  useEffect(() => {
    try { localStorage.setItem('devpride-theme', theme); } catch { /* Storage may be disabled; keep the in-memory preference. */ }
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
    const background = theme === 'light' ? '#f4f2ec' : '#171814';
    document.documentElement.style.backgroundColor = background;
    document.body.style.backgroundColor = background;
  }, [theme]);
  const toggleTheme = () => setTheme((current) => current === 'light' ? 'dark' : 'light');
  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
};

export const useTheme = (): ThemeContextValue => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeProvider.');
  return context;
};
