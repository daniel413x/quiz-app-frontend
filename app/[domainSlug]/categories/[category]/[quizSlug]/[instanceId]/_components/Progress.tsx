'use client';

import { cn } from '@/lib/utils';
import useUserQuizData from '../_hooks/useUserQuizData';
import { numOfQuestions } from '../_consts';

const Progress = () => {
  const {
    progress,
  } = useUserQuizData();
  return (
    <div className="flex gap-1 relative bottom-0.5">
      <span className={cn({
        'text-green-700': progress,
      })}
      >
        {`${progress}/${numOfQuestions}`}
      </span>
      <span>
        passed
      </span>
      <span className={cn({
        'text-green-700': progress,
      })}
      >
        {`(${(100 * (progress / numOfQuestions)).toFixed(2)}%)`}
      </span>
    </div>
  );
};

export default Progress;
