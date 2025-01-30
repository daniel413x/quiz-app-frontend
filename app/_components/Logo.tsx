'use client';

import useHasMounted from '@/lib/hooks/useHasMounted';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import NextLink from 'next/link';

const Logo = () => {
  const { theme } = useTheme();
  if (!useHasMounted()) return null;
  return (
    <NextLink href="/" className="flex w-max shrink-0">
      <Image
        src={theme === 'dark' ? '/navbar-logo-dark.png' : '/navbar-logo.png'}
        alt="Logo"
        width={130}
        height={40}
      />
    </NextLink>
  );
};

export default Logo;
