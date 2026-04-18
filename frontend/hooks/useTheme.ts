'use client';

import { useEffect, useState } from 'react';

export const useTheme = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const storedTheme = window.localStorage.getItem('algolens-theme') as 'light' | 'dark' | null;
    const nextTheme = storedTheme ?? 'light';
    setTheme(nextTheme);
    document.documentElement.classList.toggle('dark', nextTheme === 'dark');
  }, []);

  const toggleTheme = () => {
    setTheme((currentTheme) => {
      const nextTheme = currentTheme === 'light' ? 'dark' : 'light';
      document.documentElement.classList.toggle('dark', nextTheme === 'dark');
      window.localStorage.setItem('algolens-theme', nextTheme);
      return nextTheme;
    });
  };

  return { theme, toggleTheme };
};
