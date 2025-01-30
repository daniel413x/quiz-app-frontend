import { cn } from '@/lib/utils';
import {
  Courier_Prime,
} from 'next/font/google';
import CopyButton from './CopyButton';

interface CodeProps {
  code: string;
}

const courierP = Courier_Prime({ subsets: ['latin'], weight: '400' });

const Code = ({
  code,
}: CodeProps) => (
  <div>
    <CopyButton code={code} />
    <code className="w-full text-sm text-emerald-800">
      <pre className={cn(courierP.className, 'max-w-full text-sm bg-black text-emerald-500 mt-4 mb-1 py-12 ps-14 overflow-x-auto')}>
        {code}
      </pre>
    </code>
  </div>
);

export default Code;
