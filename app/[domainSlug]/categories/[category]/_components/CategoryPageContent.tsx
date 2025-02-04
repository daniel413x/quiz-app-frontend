import Header from '@/components/ui/common/Header';
import Link from 'next/link';
import { CATEGORIES_ROUTE } from '@/lib/data/routes';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/common/shadcn/button';
import { Quiz } from '@/lib/data/types';
import Breadcrumbs from '../[quizSlug]/_components/Breadcrumbs';

interface CategoryPageProps {
  quiz: Quiz;
  quizzes: Quiz[];
  params: { category: string; domainSlug: string; }
}

const CategoryPageContent = ({
  quiz,
  quizzes,
  params,
}: CategoryPageProps) => (
  <main>
    <Breadcrumbs />
    <Header header={quiz.name} />
    <ul className="flex flex-col gap-2 justify-between h-full">
      {quizzes.map((q) => (
        <li key={q.slug}>
          <Link
            href={`/${params.domainSlug}/${CATEGORIES_ROUTE}/${params.category}/${q.slug}`}
              // this should be a cva
            className="h-full shadow-md flex flex-col gap-3 p-6 rounded-sm bg-gray-100 dark:bg-background"
          >
            <span className="text-violet-700 dark:text-violet-400">
              {q.name}
            </span>
          </Link>
        </li>
      ))}
      <div className="flex flex-col gap-2">
        <div className="grid grid-cols-2 gap-2">
          <li>
            <Button variant="blank" className={cn('h-full shadow-md flex flex-col gap-3 p-6 rounded-sm bg-gray-100 dark:bg-background ', 'flex-row gap-1 w-full ')}>
              <ChevronLeft />
              Prev. page
            </Button>
          </li>
          <li>
            <Button variant="blank" className={cn('h-full shadow-md flex flex-col gap-3 p-6 rounded-sm bg-gray-100 dark:bg-background ', 'flex-row gap-1 w-full ')}>
              Next page
              <ChevronRight />
            </Button>
          </li>
        </div>
        <li>
          <Link
            href={`/${params.domainSlug}/${CATEGORIES_ROUTE}`}
            className={cn('h-full shadow-md flex flex-col gap-3 p-6 rounded-sm bg-gray-100 dark:bg-background ', 'flex-row gap-2 justify-center', 'gap-0')}
          >
            <div className="flex items-center">
              <ChevronLeft className="relative left-2 w-5 h-5" />
              <ChevronLeft className="relative right-2" />
            </div>
            Browse all categories
          </Link>
        </li>
      </div>
    </ul>
  </main>
);

export default CategoryPageContent;
