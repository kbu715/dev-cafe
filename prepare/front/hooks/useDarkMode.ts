import { useEffect, useState } from 'react';
import { lightTheme, darkTheme, ThemeType } from '../theme';

export const useDarkMode = () => {
  const [theme, setTheme] = useState(darkTheme);

  const setMode = (mode: ThemeType) => {
    if (mode === lightTheme) {
      window.localStorage.setItem('theme', 'light');
    } else {
      window.localStorage.setItem('theme', 'dark');
    }
    setTheme(mode);
  };

  const toggleTheme = () => {
    if (theme === lightTheme) {
      setMode(darkTheme);
    } else {
      setMode(lightTheme);
    }
  };

  useEffect(() => {
    const localTheme = window.localStorage.getItem('theme');
    if (localTheme !== null) {
      if (localTheme === 'dark') {
        setTheme(darkTheme);
      } else {
        setTheme(lightTheme);
      }
    }
  }, []);

  return { theme, toggleTheme };
};
