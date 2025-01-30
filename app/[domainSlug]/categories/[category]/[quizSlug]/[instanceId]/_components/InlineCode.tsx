import { cn } from '@/lib/utils';
import {
  Courier_Prime,
} from 'next/font/google';

interface InlineCodeProps {
  code: string;
}

const courierP = Courier_Prime({ subsets: ['latin'], weight: '400' });

const InlineCode = ({
  code,
}: InlineCodeProps) => (
  <>
    {' '}
    <code className={cn(courierP.className, 'whitespace-normal h-max text-sm leading-none text-emerald-700 border bg-black/10 dark:bg-white/10 p-0.5 px-1 -mb-2')}>
      {code}
    </code>
    {' '}
  </>
);

export default InlineCode;
