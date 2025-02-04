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
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { Question } from '@/lib/data/types';
import { Button } from '@/components/ui/common/shadcn/button';
import { cn } from '@/lib/utils';
import {
  ArrowLeft, ArrowRight, CheckCircle, XCircle,
} from 'lucide-react';
import qs from 'query-string';
import { useEventListener } from 'usehooks-ts';
import {
  DOMAIN_ROUTE, QUIZ_ROUTE, RESULTS_ROUTE, USER_ANSWER_ROUTE,
} from '@/lib/data/routes';
import axios from 'axios';
import LoaderSpinnerIcon from '@/components/ui/common/LoaderSpinnerIcon';
import useUserQuizData from '../_hooks/useUserQuizData';
import { useTimer } from '../_hooks/useTimer';
import QuizFormFields from './QuizFormFields';
import IssueModal from './IssueModal';
import useActiveElement from '../_hooks/useActiveElement';

const formSchema = z.object({
  answerId: z.string(),
});

type QuizFormValues = z.infer<typeof formSchema>;

type InstancePageContentProps = {
  quizQuestion: Question;
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
  const section = useParams().section as string;
  const category = useParams().category as string;
  const searchParams = useSearchParams();
  const qNum = Number(searchParams.get('qNum')) || 0;
  const question = quizQuestion;
  const { answers } = question;
  const form = useForm<QuizFormValues>({
    resolver: zodResolver(formSchema),
  });
  const isSubmitting = form.formState.isSubmitting;
  const answerId = form.watch('answerId');
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/${DOMAIN_ROUTE}/${domainSlug}/${USER_ANSWER_ROUTE}`,
      {
        answerId: values.answerId,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    setIsCorrect(res.data.is_correct);
    setUserAnswered(true);
    // setSubmittedAnswer(values.answer);
    // const newAnswersRecord = [...answersRecord];
    // if (newAnswersRecord[qNum]) {
    //   newAnswersRecord[qNum] = [...newAnswersRecord[qNum], values.answer];
    // } else {
    //   newAnswersRecord.push([values.answer]);
    // }
    // setAnswersRecord(newAnswersRecord);
    // if (question.correctAnswer === values.answer) {
    //   setProgress(progress + 1);
    // }
  };
  const getNextUrl = (p: number) => qs.stringifyUrl({
    url: window.location.href,
    query: {
      qNum: p,
    },
  });
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
      // setQuestions(questions);
      router.push(`/${category}/${section}/${QUIZ_ROUTE}/${RESULTS_ROUTE}`);
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
    if (answersRecord[qNum]?.find((a) => a === question.correctAnswer)) {
      form.reset({ answerId: question.correctAnswer });
    } else {
      form.reset({ answerId: undefined });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [qNum]);
  const isFirstRender = useRef(true);
  useEffect(() => () => {
    if (!isFirstRender.current) {
      handleStopTimer();
    }
    isFirstRender.current = false;
  }, []);
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
            {!isSubmitting ? null : <LoaderSpinnerIcon className="left-full top-full" />}
            <Button
              className={cn({
                'pointer-events-none opacity-25': (isAnsweredIncorrectly || !answerId) && !form.watch().answerId,
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
                'pointer-events-none opacity-25': qNum === 0,
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
