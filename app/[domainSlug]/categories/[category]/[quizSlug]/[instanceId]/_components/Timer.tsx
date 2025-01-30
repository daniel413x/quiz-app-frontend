import { cn, formatTime } from '@/lib/utils';
import { Roboto } from 'next/font/google';

const robotoC = Roboto({ subsets: ['latin'], weight: '400' });

interface TimerProps {
  timer: number;
}

const Timer = ({
  timer,
}: TimerProps) => (
  <div className={cn(robotoC.className, '[font-family:Roboto] flex text-3xl text-stone-500 dark:text-gray-400')}>
    {formatTime(timer)}
  </div>
);

export default Timer;
