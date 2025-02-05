'use client';

import 'katex/dist/katex.min.css';
import {
  Form,
} from '@/components/ui/common/shadcn/form';
import {
  RefObject,
  useEffect, useRef, useState,
} from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useParams, useRouter } from 'next/navigation';
import { Question, QuizInstanceQuestion } from '@/lib/data/types';
import { Button } from '@/components/ui/common/shadcn/button';
import { cn } from '@/lib/utils';
import {
  ArrowLeft, ArrowRight, CheckCircle, XCircle,
} from 'lucide-react';
import { useEventListener } from 'usehooks-ts';
import {
  CATEGORIES_ROUTE,
  RESULTS_ROUTE,
} from '@/lib/data/routes';
import LoaderSpinnerIcon from '@/components/ui/common/LoaderSpinnerIcon';
import createUserAnswer from '@/actions/user-answer/create';
import useUserQuizData from '../../_hooks/useUserQuizData';
import { useTimer } from '../../_hooks/useTimer';
import QuizFormFields from './QuizFormFields';
import IssueModal from '../../_components/IssueModal';
import useActiveElement from '../../_hooks/useActiveElement';

const formSchema = z.object({
  answerId: z.string(),
});

type QuizFormValues = z.infer<typeof formSchema>;

type InstancePageContentProps = {
  quizQuestion: QuizInstanceQuestion;
};

const QuizForm = ({
  quizQuestion,
}: InstancePageContentProps) => {
  const {
    handleStopTimer,
    timer,
  } = useTimer();
  const {
    answersRecord, setFinalTime,
  } = useUserQuizData();
  const [userAnswered, setUserAnswered] = useState<boolean | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const isAnsweredCorrectly = userAnswered && isCorrect;
  const isAnsweredIncorrectly = userAnswered && !isCorrect;
  const router = useRouter();
  const domainSlug = useParams().domainSlug as string;
  const instanceId = useParams().instanceId as string;
  const quizSlug = useParams().quizSlug as string;
  const category = useParams().category as string;
  const qNum = Number(useParams().qNum as string) || 0;
  const question = quizQuestion;
  const { answers } = question;
  const form = useForm<QuizFormValues>({
    resolver: zodResolver(formSchema),
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const answerId = form.watch('answerId');
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    const res = await createUserAnswer(values);
    setIsLoading(false);
    setIsCorrect(res.data.is_correct);
    setUserAnswered(true);
  };
  const getNextUrl = (p: number) => `/${domainSlug}/${CATEGORIES_ROUTE}/${category}/${quizSlug}/${instanceId}/${p}`;
  const handleChangeAnswer = (val: string) => {
    form.setValue('answerId', val);
    setIsCorrect(null);
    setUserAnswered(null);
  };
  const handlePressNextButton = () => {
    if (!isAnsweredCorrectly) {
      return null;
    }
    if (qNum === 25) {
      setFinalTime(timer);
      router.push(`/${domainSlug}/${CATEGORIES_ROUTE}/${category}/${quizSlug}/${instanceId}/${RESULTS_ROUTE}`);
      return;
    }
    router.push(getNextUrl(qNum + 1));
    form.reset({ answerId: undefined });
    router.refresh();
    setIsCorrect(null);
    setUserAnswered(null);
  };
  const fieldRefs = useRef<{
    radioGroupRef: RefObject<HTMLDivElement>;
    firstRadioButtonRef: RefObject<HTMLButtonElement>;
  }>(null);
  const submitRef = useRef<HTMLButtonElement>(null);
  const activeElement = useActiveElement();
  useEventListener('keydown', (e: KeyboardEvent) => {
    if (Number.isInteger(parseInt(e.key, 10))) {
      if (Number(e.key) > answers.length) {
        return;
      }
      const element = fieldRefs.current?.radioGroupRef.current?.children[Number(e.key) - 1];
      // select all button elements and figure out the correct one to interact with
      // if you add more button elements to the form fields (like Code's CopyButton), then you may need to modify the following lines
      const buttonElements = element!.querySelectorAll('button');
      const button = buttonElements![buttonElements!.length - 1];
      // submit the form if the user double presses the same key
      // or just select the form item according to the key pressed
      if (!isAnsweredCorrectly) {
        if (activeElement === button) {
          submitRef.current?.click();
        } else {
          button.click();
          button.focus();
        }
      }
      if (isAnsweredCorrectly) {
        submitRef.current?.click();
      }
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (!isAnsweredCorrectly) {
        if (!fieldRefs.current?.radioGroupRef.current?.contains(document.activeElement)) {
          fieldRefs.current?.firstRadioButtonRef.current?.focus();
        }
      }
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (!isAnsweredCorrectly) {
        if (!fieldRefs.current?.radioGroupRef.current?.contains(document.activeElement)) {
          fieldRefs.current?.firstRadioButtonRef.current?.focus();
        }
      }
    }
    if (e.key === 'Enter') {
      submitRef.current?.click();
    }
  });
  useEffect(() => {
    form.reset({ answerId: undefined });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [qNum]);
  const isFirstRender = useRef(true);
  useEffect(() => () => {
    if (!isFirstRender.current) {
      handleStopTimer();
    }
    isFirstRender.current = false;
  }, []);
  useEffect(() => {
    // snake case can be corrected by defining the data_key in the QuizInstanceQuestion serializer
    if (quizQuestion.correct_user_answer) {
      console.log(quizQuestion.correct_user_answer.quiz_instance_answer_id);
      form.setValue('answerId', quizQuestion.correct_user_answer.quiz_instance_answer_id);
      setIsCorrect(true);
      setUserAnswered(true);
    }
  }, [quizQuestion]);
  const userMustPickAnswer = (isAnsweredIncorrectly || !answerId) && !form.watch().answerId;
  return (
    <div className="flex flex-col mt-4">
      <div className="flex justify-between">
        <div className="flex gap-3 items-center mb-2">
          <h1 className="flex text-2xl">
            Question #
            {qNum + 1}
          </h1>
          <div className={cn('flex gap-0.5 h-[24px]', {
            'text-red-800 dark:text-red-600': isAnsweredIncorrectly,
            'text-green-800 dark:text-green-700': isAnsweredCorrectly,
          })}
          >
            {isAnsweredIncorrectly ? (
              <>
                &mdash;
                <XCircle />
                Incorrect
              </>
            ) : null}
            {isAnsweredCorrectly ? (
              <>
                &mdash;
                <CheckCircle />
                Correct
              </>
            ) : null}
          </div>
        </div>
        <IssueModal id={String(qNum)} />
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div dangerouslySetInnerHTML={{ __html: question.question }} />
          <QuizFormFields
            ref={fieldRefs}
            answers={answers}
            isAnsweredCorrectly={isAnsweredCorrectly}
            isAnsweredIncorrectly={isAnsweredIncorrectly}
            form={form}
            formAnswer={answerId}
            handleChangeAnswer={handleChangeAnswer}
          />
          <div className="relative grid gap-2">
            <LoaderSpinnerIcon
              className="left-full top-full"
              bool={isLoading}
              green={isAnsweredCorrectly}
              red={isAnsweredIncorrectly}
            />
            <Button
              className={cn({
                'pointer-events-none opacity-50': userMustPickAnswer || isLoading,
              })}
              onClick={handlePressNextButton}
              type={!isAnsweredCorrectly ? 'submit' : 'button'}
              variant="outline"
              ref={submitRef}
            >
              <span className="flex items-center relative left-2.5">
                Next
                <ArrowRight className="ml-0.5" size={12} />
              </span>
            </Button>
            <Button
              className={cn({
                'pointer-events-none opacity-50': qNum === 0 || isLoading,
              })}
              onClick={() => router.push(getNextUrl(qNum - 1))}
              type="button"
              variant="outline"
            >
              <span className="flex items-center">
                <ArrowLeft className="mr-0.5" size={12} />
                Previous
              </span>
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default QuizForm;
