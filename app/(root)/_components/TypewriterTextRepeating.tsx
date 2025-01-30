'use client';

import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';
import TypewriterComponent from 'typewriter-effect';

interface TypewriterTextRepeatingProps {
  mobile?: boolean;
}

const TypewriterTextRepeating = ({
  mobile,
}: TypewriterTextRepeatingProps) => {
  const [show, setShow] = useState<boolean>(false);
  useEffect(() => {
    setTimeout(() => setShow(true), 2000);
  }, []);
  return !show ? null : (
    // h-[83px]: long strings can shift downstream containers
    <span className={cn('text-4xl text-transparent bg-clip-text bg-gradient-to-r from-amber-500 dark:from-white to-pink-600 dark:to-pink-600 h-[83px] pb-12 z-10 hidden lg:block', {
      'block lg:hidden': mobile,
    })}
    >
      <TypewriterComponent
        options={{
          strings: [
            'Linear algebra quizzes.',
            'Coding quizzes.',
            'Machine learning quizzes.',
            'Geometry quizzes.',
          ],
          autoStart: true,
          loop: true,
        }}
      />
    </span>
  );
};

export default TypewriterTextRepeating;
