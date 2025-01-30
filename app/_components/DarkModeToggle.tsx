'use client';

import {
  useRef,
} from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils';
import { useEventListener } from 'usehooks-ts';

interface DarkModeToggleProps {
  className?: string;
}

export const DarkModeToggle = ({
  className,
}: DarkModeToggleProps) => {
  const { setTheme, theme } = useTheme();
  const handleChangeTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };
  const darkModeButtonRef = useRef<HTMLButtonElement>(null);
  useEventListener('keydown', (e: KeyboardEvent) => {
    if (e.keyCode === 77) {
      e.preventDefault();
      darkModeButtonRef.current?.click();
    }
  });
  return (
    <button className={cn('bg-0 flex p-3 -m-3 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300', className)} type="button" onClick={handleChangeTheme} ref={darkModeButtonRef}>
      {/* anims won't work if disableTransitionOnChange on ThemeProvider */}
      <Sun className="h-[1.2rem] w-[1.2rem] dark:rotate-0 dark:scale-100 transition-all -rotate-90 scale-0" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] dark:rotate-90 dark:scale-0 transition-all rotate-0 scale-100" />
      <span className="sr-only">Toggle theme</span>
    </button>
  );
};
