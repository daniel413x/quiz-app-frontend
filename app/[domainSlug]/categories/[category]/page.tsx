import { DOMAIN_ROUTE, QUIZ_CATEGORY_API_ROUTE, QUIZZES_ROUTE } from '@/lib/data/routes';
import CategoryPageContent from './_components/CategoryPageContent';

interface CategoryPageProps {
  params: { category: string; domainSlug: string; }
}

const CategoryPage = async ({
  params,
}: CategoryPageProps) => {
  // get quizzes belonging to the category
  const quizzesRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${DOMAIN_ROUTE}/${params.domainSlug}/${QUIZ_CATEGORY_API_ROUTE}/${QUIZZES_ROUTE}/${params.category}`, {
    method: 'GET',
  });
  const quizzes = await quizzesRes.json();
  const quizRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${DOMAIN_ROUTE}/${params.domainSlug}/${QUIZ_CATEGORY_API_ROUTE}/${params.category}`, {
    method: 'GET',
  });
  const quiz = await quizRes.json();
  return (
    <CategoryPageContent quiz={quiz} quizzes={quizzes} params={params} />
  );
};

export default CategoryPage;
