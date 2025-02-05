'use client';

import { useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Separator } from '@/components/ui/common/shadcn/separator';
import { Quiz } from '@/lib/data/types';
import { CATEGORIES_ROUTE } from '@/lib/data/routes';
import { useTimer } from '../_hooks/useTimer';
import QuizPrompt from './QuizPrompt';
import useUserQuizData from '../_hooks/useUserQuizData';
import QuizInfo from './QuizInfo';

type InstancePageContentProps = {
  quiz: Quiz;
};

const InstancePageContent = ({
  quiz,
}: InstancePageContentProps) => {
  const domainSlug = useParams().domainSlug as string;
  const quizSlug = useParams().quizSlug as string;
  const category = useParams().category as string;
  const instanceId = useParams().instanceId as string;
  const router = useRouter();
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
      <QuizInfo />
      <Separator className="w-1/5 mt-4 mx-auto" />
      <QuizPrompt quiz={quiz} />
    </main>
  );
};

export default InstancePageContent;
