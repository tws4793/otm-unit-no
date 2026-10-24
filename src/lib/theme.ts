import { useEffect, useState } from 'react';

export type ThemePreference = 'light' | 'dark' | 'system';

const STORAGE_KEY = 'otm-theme';

function readPreference(): ThemePreference {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'light' || stored === 'dark') return stored;
  } catch {
    // Storage may be unavailable (private mode); fall back to system.
  }
  return 'system';
}

export function useTheme() {
  const [theme, setTheme] = useState<ThemePreference>(readPreference);

  useEffect(() => {
    const root = document.documentElement;
    try {
      if (theme === 'system') {
        delete root.dataset.theme;
        localStorage.removeItem(STORAGE_KEY);
      } else {
        root.dataset.theme = theme;
        localStorage.setItem(STORAGE_KEY, theme);
      }
    } catch {
      // Ignore storage failures; the theme still applies for this session.
    }
  }, [theme]);

  return [theme, setTheme] as const;
}
