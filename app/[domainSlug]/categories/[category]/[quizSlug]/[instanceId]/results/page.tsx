import { Metadata } from 'next';
import {
  CATEGORIES_ROUTE, DOMAIN_ROUTE, QUIZ_INSTANCE_ROUTE, QUIZ_RESULTS_ROUTE,
} from '@/lib/data/routes';
import { redirect } from 'next/navigation';
import ResultsPageContent from './_components/ResultsPageContent';

export const metadata: Metadata = {
  title: 'Quiz results',
};

interface ResultsPageProps {
  params: {
    instanceId: string;
    domainSlug: string;
    category: string;
    quizSlug: string;
  }
}

const ResultsPage = async ({
  params,
}: ResultsPageProps) => {
  const {
    instanceId,
    domainSlug,
    category,
    quizSlug,
  } = params;
  const quizResultsRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${DOMAIN_ROUTE}/${domainSlug}/${QUIZ_RESULTS_ROUTE}/${instanceId}`, {
    method: 'GET',
    cache: 'no-cache',
  });
  const quizResults = await quizResultsRes.json();
  if (quizResults.progress < 26) {
    redirect(`/${domainSlug}/${CATEGORIES_ROUTE}/${category}/${quizSlug}/${instanceId}/${quizResults.progress}`);
  }
  const quizInstanceRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${DOMAIN_ROUTE}/${domainSlug}/${QUIZ_INSTANCE_ROUTE}/${instanceId}`, {
    method: 'GET',
  });
  const quizInstance = await quizInstanceRes.json();
  return (
    <ResultsPageContent quizInstance={quizInstance} />
  );
};

export default ResultsPage;
