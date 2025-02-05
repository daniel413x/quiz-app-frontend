'use client';

import { cn } from '@/lib/utils';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import styles from './LoaderSpinnerIcon.module.css';

interface LoaderSpinnerIconProps {
  className?: string;
  green?: boolean | null;
  red?: boolean | null;
  bool: boolean;
}

const LoaderSpinnerIcon = ({
  className,
  green,
  red,
  bool,
}: LoaderSpinnerIconProps) => {
  const isDark = useTheme().theme === 'dark';
  const [render, setRender] = useState<boolean>(false);
  useEffect(() => {
    let id: NodeJS.Timeout;
    if (bool) {
      setRender(true);
    } else {
      id = setTimeout(() => setRender(false), 250);
    }
    return () => clearTimeout(id);
  }, [bool]);
  return (
    <div className={cn(
      styles.loaderSpinnerIcon,
      'transition-all opacity-0 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 scale-0',
      className,
      {
        [styles.dark]: isDark,
        [styles.green]: green,
        [styles.red]: red,
        'opacity-100 scale-50': render,
        'mt-2': !render,
      },
    )}
    >
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
    </div>
  );
};

export default LoaderSpinnerIcon;
