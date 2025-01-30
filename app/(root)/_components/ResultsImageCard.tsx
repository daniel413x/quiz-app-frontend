'use client';

import useHasMounted from '@/lib/hooks/useHasMounted';
import { useTheme } from 'next-themes';
import Image from 'next/image';

const ResultsImageCard = () => {
  const isDark = useTheme().theme === 'dark';
  if (!useHasMounted()) return null;
  return (
    <Image
      src={`/root/fp-results-card${isDark ? '-dark' : ''}.png`}
      width={500}
      height={500}
      className="absolute opacity-15 lg:static lg:opacity-100 pointer-events-none"
      alt="QuizApp taker results"
      priority
    />
  );
};

export default ResultsImageCard;
