'use client';

import { useEffect } from 'react';
import { Separator } from '@/components/ui/common/shadcn/separator';
import { Question, QuizResults } from '@/lib/data/types';
import { useTimer } from '../../_hooks/useTimer';
import QuizForm from './QuizForm';
import QuizInfo from '../../_components/QuizInfo';

type QuizNumberPageContentProps = {
  quizQuestion: Question;
  quizResults: QuizResults;
};

const QuizNumberPageContent = ({
  quizQuestion,
  quizResults,
}: QuizNumberPageContentProps) => {
  console.log(quizResults);
  const {
    resetTimer,
  } = useTimer();
  useEffect(() => {
    resetTimer();
  }, []);
  return (
    // consider className="max-w-2xl m-auto"
    <main className="max-w-3xl m-auto w-full">
      <QuizInfo quizResults={quizResults} />
      <Separator className="w-1/5 mt-4 mx-auto" />
      <QuizForm quizQuestion={quizQuestion} />
    </main>
  );
};

export default QuizNumberPageContent;
