'use client';

import useHasMounted from '@/lib/hooks/useHasMounted';
import { cn } from '@/lib/utils';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import { useEffect, useState } from 'react';

interface RotatingImageProps {
  delay: number;
  cardNum: string;
}

const RotatingImage = ({
  delay,
  cardNum,
}: RotatingImageProps) => {
  const [started, setStarted] = useState<boolean>(false);
  const isDark = useTheme().theme === 'dark';
  const [phase, setPhase] = useState<'0' | '1' | '2'>('0');
  const [show, setShow] = useState<boolean>(false);
  useEffect(() => {
    if (started) {
      // const id = setInterval(() => setShow(!show), 2000);
      const id = setInterval(() => {
        setShow(!show);
        if (phase === '0') {
          setPhase('1');
        }
        if (phase === '1') {
          setPhase('2');
        }
        if (phase === '2') {
          setPhase('0');
        }
      }, 2500);
      return () => {
        clearInterval(id);
      };
    }
  }, [started, show, phase]);
  useEffect(() => {
    setTimeout(() => setStarted(true), delay);
  }, [delay]);
  if (!useHasMounted()) return null;
  return (
    <div className={cn('absolute transition-all duration-300', {
      'opacity-0 top-10 ': phase === '0',
      'opacity-100  top-0': phase === '1',
      'opacity-0  -top-10': phase === '2',
    })}
    >
      <div className="relative">
        {/* <div className="absolute w-full h-10 top-0 bg-gradient-to-b from-white dark:from-gray-900 to-transparent dark:to-transparent" /> */}
        <Image
          src={`/root/fp-card-${cardNum}${isDark ? '-dark' : ''}.png`}
          width={500}
          height={500}
          alt="QuizApp taker results"
          priority
        />
        {/* <div className="absolute w-full h-10 bottom-0 bg-gradient-to-t from-white dark:from-gray-900 to-transparent dark:to-transparent" /> */}
      </div>
    </div>
  );
};

export default RotatingImage;
