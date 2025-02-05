'use client';

import { useTimerOnInterval } from '../_hooks/useTimer';
import Timer from './Timer';
import Progress from './Progress';
import { QuizResults } from '@/lib/data/types';

interface QuizInfoProps {
  quizResults: QuizResults;
}

const QuizInfo = ({
  quizResults,
}: QuizInfoProps) => {
  const {
    timer,
  } = useTimerOnInterval();
  return (
    <div className="flex justify-between items-end">
      <Timer timer={timer} />
      <Progress quizResults={quizResults} />
    </div>
  );
};

export default QuizInfo;
