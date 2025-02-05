'use client';

import { useEffect, useRef, useState } from 'react';
import {
  Card, CardContent,
} from '@/components/ui/common/shadcn/card';
import { cn } from '@/lib/utils';
import {
  ChevronLeft, RefreshCcw,
} from 'lucide-react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { buttonVariants } from '@/components/ui/common/shadcn/button';
import { QuizInstance } from '@/lib/data/types';
import { CATEGORIES_ROUTE } from '@/lib/data/routes';
import Header from '@/components/ui/common/Header';
import Timer from '../../_components/Timer';
import useUserQuizData from '../../_hooks/useUserQuizData';
import { useTimer } from '../../_hooks/useTimer';
import { timerStartMs } from '../../_consts';
import ResultCards from './ResultCards';
import FilterOptions, { DEFAULT, INCORRECT_ONLY } from './FilterOptions';

interface ResultsPageContentProps {
  quizInstance: QuizInstance;
}

const ResultsPageContent = ({
  quizInstance,
}: ResultsPageContentProps) => {
  const questions = quizInstance.questions;
  const {
    domainSlug,
    category,
    quizSlug,
  } = useParams();
  const {
    handleStopTimer,
  } = useTimer();
  const {
    answersRecord,
    finalTime,
    reset,
  } = useUserQuizData();
  const ref = useRef(null);
  useEffect(() => {
    handleStopTimer();
    if (!ref.current) {
      ref.current = null;
      return;
    }
    return () => {
      reset();
    };
  }, []);
  let answeredCorrectly = answersRecord.length;
  answersRecord.forEach((a) => {
    if (a.length > 1) {
      answeredCorrectly -= 1;
    }
  });
  const grade = ((answeredCorrectly / questions.length) * 100);
  const [filter, setFilter] = useState<string>(DEFAULT);
  const filteredQuestions = questions.map((q, i) => {
    if (filter === INCORRECT_ONLY) {
      q.answers.forEach((quizInstanceAnsw) => {
        // loop to check if at least one wrong answer exists
        const hasWrongAnswer = quizInstanceAnsw.userAnswer && !quizInstanceAnsw.quizAnswer.correctAnswer;
        if (hasWrongAnswer) {
          return q;
        }
      });
      // result is filtered/not rendered
      return 0;
    }
    return q;
  });
  return (
    <main className="flex flex-col items-center justify-between">
      <div className="flex flex-col gap-6">
        <Header className="text-3xl mb-0" header="Your quiz results:" />
        <Card>
          <CardContent className="flex flex-col gap-6 pt-6 shadow-md">
            {' '}
            <div className="flex flex-col">
              <h2 className="text-2xl mb-1">
                Time taken:
              </h2>
              <Timer timer={timerStartMs - finalTime} />
            </div>
            <div className="flex flex-col">
              <h2 className="text-2xl mb-1">
                Time remaining:
              </h2>
              <Timer timer={finalTime} />
            </div>
            <div className="flex flex-col">
              <h2 className="text-2xl mb-1">
                Grade:
              </h2>
              <span className={cn('text-red-600', {
                'text-amber-600': grade > 60,
                'text-green-500 font-semibold': grade > 80,
              })}
              >
                {grade.toFixed(1)}
                %
              </span>
              <div className="flex flex-col mt-2">
                <span className="text-purple-600">
                  Explanation:
                </span>
                <span className="mb-2">
                  {`Your answers included errors in ${questions.length - answeredCorrectly} out of ${questions.length} questions.`}
                </span>
                <span>
                  You answered without error
                  {' '}
                  <span className={cn('text-red-600', {
                    'text-amber-600': grade > 60,
                    'text-green-500 font-semibold': grade > 80,
                  })}
                  >
                    {grade.toFixed(1)}
                    %
                  </span>
                  {' '}
                  of the time.
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
        <div className="flex flex-col">
          <div className="flex items-center gap-3 mb-7">
            <h2 className="text-2xl">
              Answers:
            </h2>
            <FilterOptions
              filter={filter}
              setFilter={setFilter}
            />
          </div>
          <ResultCards
            questions={filteredQuestions}
            answersRecord={answersRecord}
          />
        </div>
      </div>
      <Link
        href={`/${domainSlug}/${CATEGORIES_ROUTE}/${category}/${quizSlug}`}
        className={buttonVariants({ variant: 'outline', className: 'mt-8 h-[unset]' })}
      >
        <div className="flex items-center px-8 py-12">
          <ChevronLeft className="text-purple-600" />
          <RefreshCcw className="text-purple-600 mr-2" />
          <span className="ml-2 mr-4">
            Retake the quiz
          </span>
        </div>
      </Link>
    </main>
  );
};

export default ResultsPageContent;
