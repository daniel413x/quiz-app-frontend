'use client';

import { useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Separator } from '@/components/ui/common/shadcn/separator';
import { Question, Quiz } from '@/lib/data/types';
import { CATEGORIES_ROUTE } from '@/lib/data/routes';
import { useTimer, useTimerOnInterval } from '../_hooks/useTimer';
import QuizForm from './QuizForm';
import QuizPrompt from './QuizPrompt';
import Timer from './Timer';
import useUserQuizData from '../_hooks/useUserQuizData';
import Progress from './Progress';

type InstancePageContentProps = {
  quiz: Quiz;
  quizQuestion: Question;
};

const InstancePageContent = ({
  quiz,
  quizQuestion,
}: InstancePageContentProps) => {
  const domainSlug = useParams().domainSlug as string;
  const quizSlug = useParams().quizSlug as string;
  const category = useParams().category as string;
  const instanceId = useParams().instanceId as string;
  const router = useRouter();
  const {
    isStarted,
    timer,
  } = useTimerOnInterval();
  const {
    resetTimer,
  } = useTimer();
  const {
    setAnswersRecord,
    setProgress,
  } = useUserQuizData();
  useEffect(() => {
    router.replace(`/${domainSlug}/${CATEGORIES_ROUTE}/${category}/${quizSlug}/${instanceId}`);
    setAnswersRecord([]);
    resetTimer();
    setProgress(0);
  }, []);
  return (
    // consider className="max-w-2xl m-auto"
    <main className="max-w-3xl m-auto w-full">
      <div className="flex justify-between items-end">
        <Timer timer={timer} />
        <Progress />
      </div>
      <Separator className="w-1/5 mt-4 mx-auto" />
      {!isStarted ? <QuizPrompt quiz={quiz} /> : null}
      {!isStarted ? null : <QuizForm quizQuestion={quizQuestion} />}
    </main>
  );
};

export default InstancePageContent;
