import { CATEGORIES_ROUTE } from '@/lib/data/routes';
import { QuizDataObject } from '@/lib/data/types';
import { ChevronRight } from 'lucide-react';
import NextLink from 'next/link';

interface CategoriesQuizLinksProps {
  quizzes: QuizDataObject[];
  slug: string;
  params: { domainSlug: string; };
}

const CategoriesQuizLinks = async ({
  quizzes,
  slug,
  params,
}: CategoriesQuizLinksProps) => (
  <ul className="flex flex-col">
    {quizzes.map((q) => (
      <li key={q.slug}>
        <NextLink
          href={`/${params?.domainSlug}/${CATEGORIES_ROUTE}/${slug}/${q.slug}`}
          className="flex py-3 text-wrap w-[unset] underline hover:text-purple-500"
        >
          {q.name}
        </NextLink>
      </li>
    ))}
    <li>
      <NextLink
        href={`/${params.domainSlug}/${CATEGORIES_ROUTE}/${slug}`}
        className="flex py-3 text-wrap w-[unset] hover:underline text-sky-700"
      >
        <span>
          See all quizzes
        </span>
        <div className="flex items-center">
          <ChevronRight />
          <ChevronRight className="-ml-4 opacity-75 w-5 h-5" />
          <ChevronRight className="-ml-3 opacity-50 w-4 h-4" />
        </div>
      </NextLink>
    </li>
  </ul>
);

export default CategoriesQuizLinks;
