import { DOMAIN_ROUTE, QUIZ_API_ROUTE, QUIZ_INSTANCE_ROUTE } from '@/lib/data/routes';
import qs from 'query-string';
import InstancePageContent from './_components/InstancePageContent';

type InstancePageProps = {
  params: { quizSlug: string; domainSlug: string; instanceId: string; };
  searchParams: { qNum: string }
};

const InstancePage = async ({
  params,
  searchParams,
}: InstancePageProps) => {
  const quizRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${DOMAIN_ROUTE}/${params.domainSlug}/${QUIZ_API_ROUTE}/${params.quizSlug}`, {
    method: 'GET',
  });
  const quiz = await quizRes.json();
  const qNum = Number(searchParams.qNum) || 0;
  const quizQuestionRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${DOMAIN_ROUTE}/${params.domainSlug}/${QUIZ_INSTANCE_ROUTE}/${params.instanceId}/get-quiz-question?qNum=${qNum}`, {
    method: 'GET',
  });
  const quizQuestion = await quizQuestionRes.json();
  return (
    <InstancePageContent quiz={quiz} quizQuestion={quizQuestion} />
  );
};

export default InstancePage;
