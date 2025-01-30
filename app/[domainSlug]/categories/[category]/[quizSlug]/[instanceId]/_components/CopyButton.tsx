'use client';

import { Button } from '@/components/ui/common/shadcn/button';
import { cn } from '@/lib/utils';
import {
  ClipboardCopy,
  CopyCheck,
} from 'lucide-react';
import {
  Courier_Prime,
} from 'next/font/google';
import { useState } from 'react';

interface CopyButtonProps {
  code: string;
}

const courierP = Courier_Prime({ subsets: ['latin'], weight: '400' });

const CopyButton = ({
  code,
}: CopyButtonProps) => {
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout>();
  const [state, setState] = useState<number>(0);
  // handle recursively
  const handleShowConfirm = (nextState: number) => {
    if (nextState >= 3) {
      setState(0);
      return;
    }
    setState(nextState);
    // 50
    const id = setTimeout(() => handleShowConfirm(nextState + 1), nextState === 0 ? 50 : 1500);
    setTimeoutId(id);
  };
  const clickCopyButton = () => {
    clearTimeout(timeoutId);
    navigator.clipboard.writeText(code);
    handleShowConfirm(0);
  };
  return (
    <div className="relative">
      <div className={cn('flex gap-1 text-xs absolute right-0 bottom-0 py-2 px-3 pointer-events-none bg-black text-white opacity-0 ', {
        'transition-all': state > 0,
        'bottom-0': state === 0,
        'bottom-4 opacity-100': state === 1,
        'bottom-8': state === 2,
      })}
      >
        <CopyCheck size={16} />
        Copied
        {' '}
        <div className="-z-10 absolute top-8 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black rotate-45 w-4 h-4" />
      </div>
      <Button className={cn(courierP.className, 'text-xs border border-green-200/25 absolute right-0.5 top-0.5 h-8 text-green-200')} onClick={clickCopyButton} type="button" variant="ghost">
        <ClipboardCopy size={19} />
      </Button>
    </div>
  );
};

export default CopyButton;
