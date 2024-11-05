'use client';

import { SunIcon, MoonIcon } from '@radix-ui/react-icons';
import { useEffect, useState } from 'react';

const ThemeSwitch = () => {
  const [darkThemeEnabled, setDarkThemeEndabled] = useState<boolean>(false);

  const ThemeIcon = darkThemeEnabled ? SunIcon : MoonIcon;

  const handleThemeSwitch = () => {
    setDarkThemeEndabled((prev) => !prev);
    if (darkThemeEnabled) localStorage.setItem('dark-mode', 'true');
    else localStorage.removeItem('dark-mode');
  };

  useEffect(() => {
    const storedDarkModePreference = !localStorage.getItem('dark-mode');
    setDarkThemeEndabled(storedDarkModePreference);
  }, []);

  useEffect(() => {
    if (darkThemeEnabled) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkThemeEnabled]);

  return (
    <button onClick={handleThemeSwitch} className="">
      <ThemeIcon className="h-6 w-6"></ThemeIcon>
    </button>
  );
};
export default ThemeSwitch;
