import Header from '@/components/ui/common/Header';
import { DOMAIN_ROUTE, QUIZ_CATEGORY_API_ROUTE } from '@/lib/data/routes';
import { CategoryGETManyRes } from '@/lib/data/types';
import CategoriesQuizLinks from './CategoriesQuizLinks';

interface CategoriesPageContentProps {
  params: { domainSlug: string; };
}

const CategoriesPageContent = async ({
  params,
}: CategoriesPageContentProps) => {
  const isMainDomain = params?.domainSlug === 'main' || !params?.domainSlug;
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${DOMAIN_ROUTE}/${isMainDomain ? 'main' : params?.domainSlug}/${QUIZ_CATEGORY_API_ROUTE}?quizzes=true`, {
    method: 'GET',
  });
  // use params to filter out domain, add quizzes etc
  const categories: CategoryGETManyRes = await res.json();
  return (
    <div className="flex flex-col">
      <Header header="Quizzes by category" />
      <ul className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {categories[0].map((c) => (
          <li key={c.slug}>
            <div className="h-full shadow-md flex flex-col gap-3 p-6 rounded-sm dark:bg-background">
              <h3 className="text-lg text-purple-600">
                {c.name}
              </h3>
              <CategoriesQuizLinks
                params={params}
                quizzes={c.quizzes}
                slug={c.slug}
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoriesPageContent;
