'use client';

import TypewriterComponent from 'typewriter-effect';
import {
  Roboto,
} from 'next/font/google';
import { cn } from '@/lib/utils';

const roboto = Roboto({ subsets: ['latin'], weight: '400' });

const TypewriterTextHeader = () => (
  <h1 className={cn(roboto.className, 'text-4xl mb-14')}>
    <TypewriterComponent
      options={{
        strings: [
          'Qu<span style="color: indigo;">iz</span> <span style="color: purple;">you</span><span style="color: indigo;">rself</span>.',
        ],
        autoStart: true,
        loop: false,
        deleteSpeed: 99999999,
        cursor: '',
        delay: 100,
      }}
    />
  </h1>
);

export default TypewriterTextHeader;
