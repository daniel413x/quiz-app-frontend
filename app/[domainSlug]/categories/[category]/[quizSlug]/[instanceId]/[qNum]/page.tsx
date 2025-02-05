import {
  CATEGORIES_ROUTE,
  DOMAIN_ROUTE, GET_QUIZ_QUESTION_API_ROUTE, QUIZ_INSTANCE_ROUTE,
  QUIZ_RESULTS_ROUTE,
} from '@/lib/data/routes';
import { redirect } from 'next/navigation';
import QuizNumberPageContent from './_components/QuizNumberPageContent';

type QuizNumberPageProps = {
  params: { domainSlug: string; quizSlug: string; instanceId: string; qNum: string; category: string; };
};

const QuizNumberPage = async ({
  params,
}: QuizNumberPageProps) => {
  const {
    domainSlug,
    instanceId,
    category,
    quizSlug,
    qNum,
  } = params;
  const quizResultsRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${DOMAIN_ROUTE}/${domainSlug}/${QUIZ_RESULTS_ROUTE}/${instanceId}`, {
    method: 'GET',
    cache: 'no-cache',
  });
  const quizResults = await quizResultsRes.json();
  if (Number(qNum) > quizResults.progress) {
    redirect(`/${domainSlug}/${CATEGORIES_ROUTE}/${category}/${quizSlug}/${instanceId}/${quizResults.progress}`);
  }
  const quizQuestionRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${DOMAIN_ROUTE}/${domainSlug}/${QUIZ_INSTANCE_ROUTE}/${instanceId}/${GET_QUIZ_QUESTION_API_ROUTE}/${params.qNum}`, {
    method: 'GET',
  });
  const quizQuestion = await quizQuestionRes.json();
  return (
    <QuizNumberPageContent quizQuestion={quizQuestion} quizResults={quizResults} />
  );
};

export default QuizNumberPage;
