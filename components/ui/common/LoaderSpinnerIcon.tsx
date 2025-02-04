'use client';

import { cn } from '@/lib/utils';
import { useTheme } from 'next-themes';
import styles from './LoaderSpinnerIcon.module.css';

interface LoaderSpinnerIconProps {
  className?: string;
}

const LoaderSpinnerIcon = ({
  className,
}: LoaderSpinnerIconProps) => {
  const isDark = useTheme().theme === 'dark';
  return (
    <div className={cn(
      styles.loaderSpinnerIcon,
      'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 scale-50',
      className,
      {
        [styles.dark]: isDark,
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
