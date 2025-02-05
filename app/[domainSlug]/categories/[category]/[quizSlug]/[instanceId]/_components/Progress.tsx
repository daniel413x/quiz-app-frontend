import { cn } from '@/lib/utils';
import { QuizResults } from '@/lib/data/types';
import { numOfQuestions } from '../_consts';

interface ProgressProps {
  quizResults: QuizResults;
}

const Progress = ({
  quizResults,
}: ProgressProps) => {
  const progress = quizResults?.progress || 0;
  return (
    <div className="flex gap-1 relative bottom-0.5">
      <span className={cn({
        'text-green-700': progress > 0,
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
