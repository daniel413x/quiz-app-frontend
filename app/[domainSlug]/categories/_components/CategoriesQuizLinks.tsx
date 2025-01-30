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
          className="py-3 text-wrap w-[unset] hover:underline"
        >
          {q.name}
        </NextLink>
      </li>
    ))}
    <li>
      <NextLink
        href={`/${CATEGORIES_ROUTE}/${slug}`}
        className="flex py-3 text-wrap w-[unset] hover:underline text-sky-700"
      >
        <span>
          See all quizzes
        </span>
        <div className="flex">
          <ChevronRight />
          <ChevronRight className="-ml-4 opacity-75" />
          <ChevronRight className="-ml-4 opacity-50" />
        </div>
      </NextLink>
    </li>
  </ul>
);

export default CategoriesQuizLinks;
