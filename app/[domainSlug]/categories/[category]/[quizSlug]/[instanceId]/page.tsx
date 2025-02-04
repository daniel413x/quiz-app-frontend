import {
  DOMAIN_ROUTE, QUIZ_API_ROUTE, QUIZ_INSTANCE_ROUTE,
} from '@/lib/data/routes';
import InstancePageContent from './_components/InstancePageContent';

type InstancePageProps = {
  params: { quizSlug: string; domainSlug: string; instanceId: string; };
  searchParams: { qNum: string }
};

const InstancePage = async ({
  params,
  searchParams,
}: InstancePageProps) => {
  const {
    domainSlug,
    quizSlug,
    instanceId,
  } = params;
  const quizRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${DOMAIN_ROUTE}/${domainSlug}/${QUIZ_API_ROUTE}/${quizSlug}`, {
    method: 'GET',
  });
  const quiz = await quizRes.json();
  const qNum = Number(searchParams.qNum) || 0;
  const quizQuestionRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${DOMAIN_ROUTE}/${domainSlug}/${QUIZ_INSTANCE_ROUTE}/${instanceId}/get-quiz-question?qNum=${qNum}`, {
    method: 'GET',
  });
  const quizQuestion = await quizQuestionRes.json();
  return (
    <InstancePageContent quiz={quiz} quizQuestion={quizQuestion} />
  );
};

export default InstancePage;
