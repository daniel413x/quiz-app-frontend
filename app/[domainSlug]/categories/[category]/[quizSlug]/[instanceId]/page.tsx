import {
  DOMAIN_ROUTE, QUIZ_API_ROUTE,
} from '@/lib/data/routes';
import InstancePageContent from './_components/InstancePageContent';

type InstancePageProps = {
  params: { quizSlug: string; domainSlug: string; instanceId: string; };
};

const InstancePage = async ({
  params,
}: InstancePageProps) => {
  const {
    domainSlug,
    quizSlug,
  } = params;
  const quizRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${DOMAIN_ROUTE}/${domainSlug}/${QUIZ_API_ROUTE}/${quizSlug}`, {
    method: 'GET',
  });
  const quiz = await quizRes.json();
  return (
    <InstancePageContent quiz={quiz} />
  );
};

export default InstancePage;
