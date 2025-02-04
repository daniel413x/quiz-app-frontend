import { ReactNode } from 'react';
import { DOMAIN_ROUTE, QUIZ_API_ROUTE } from '@/lib/data/routes';
import { Quiz } from '@/lib/data/types';
import Breadcrumbs from './_components/Breadcrumbs';

interface QuizPageLayoutProps {
  children: ReactNode;
}

type MetadataProps = {
  params: { quizSlug: string; domainSlug: string; };
};

export const generateMetadata = async ({
  params,
}: MetadataProps) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${DOMAIN_ROUTE}/${params.domainSlug}/${QUIZ_API_ROUTE}/${params.quizSlug}`, {
    method: 'GET',
  });
  const quiz: Quiz = await res.json();
  return {
    title: {
      default: `${quiz.name} | Quiz App`,
      template: `%s | ${quiz.name} | Quiz App`,
    },
  };
};

const QuizPageLayout = ({
  children,
}: QuizPageLayoutProps) => (
  <>
    <Breadcrumbs />
    {children}
  </>
);

export default QuizPageLayout;
