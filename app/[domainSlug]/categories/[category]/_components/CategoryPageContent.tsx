'use client';

import Header from '@/components/ui/common/Header';
import { notFound, useParams } from 'next/navigation';
import { categories } from '@/lib/data/quiz-data';
import Link from 'next/link';
import { CATEGORIES_ROUTE } from '@/lib/data/routes';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/common/shadcn/button';

const CategoryPageContent = () => {
  const categoryParam = useParams().category as string;
  const category = categories.find((cat) => cat.slug === categoryParam);
  if (!category) {
    notFound();
  }
  return (
    <main>
      <Header header={category.name} />
      <ul className="flex flex-col gap-2">
        {category.quizzes.map((q) => (
          <li key={q.slug}>
            <Link
              href={`/${category.slug}/${q.slug}`}
              // this should be a cva
              className="h-full shadow-md flex flex-col gap-3 p-6 rounded-sm bg-gray-100 dark:bg-background border border-black/75 dark:border-gray-700"
            >
              {q.name}
            </Link>
          </li>
        ))}
        <div className="grid grid-cols-2 gap-2">
          <li className="">
            <Button variant="blank" className={cn('h-full shadow-md flex flex-col gap-3 p-6 rounded-sm bg-gray-100 dark:bg-background border border-black/75 dark:border-gray-700', 'flex-row gap-1 w-full ')}>
              <ChevronLeft />
              Prev. page
            </Button>
          </li>
          <li className="">
            <Button variant="blank" className={cn('h-full shadow-md flex flex-col gap-3 p-6 rounded-sm bg-gray-100 dark:bg-background border border-black/75 dark:border-gray-700', 'flex-row gap-1 w-full ')}>
              Next page
              <ChevronRight />
            </Button>
          </li>
        </div>
        <li>
          <Link
            href={`/${CATEGORIES_ROUTE}`}
            className={cn('h-full shadow-md flex flex-col gap-3 p-6 rounded-sm bg-gray-100 dark:bg-background border border-black/75 dark:border-gray-700', 'flex-row gap-2 justify-center', 'gap-0')}
          >
            <div className="flex">
              <ChevronLeft className="relative left-2" />
              <ChevronLeft className="relative right-2" />
            </div>
            Browse all categories
          </Link>
        </li>
      </ul>
    </main>
  );
};

export default CategoryPageContent;
