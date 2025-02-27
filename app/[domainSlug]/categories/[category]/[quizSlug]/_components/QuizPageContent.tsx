'use client';

import { cn } from '@/lib/utils';
import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import axios from 'axios';
import { CATEGORIES_ROUTE, DOMAIN_ROUTE, QUIZ_INSTANCE_ROUTE } from '@/lib/data/routes';
import { Button } from '@/components/ui/common/shadcn/button';
import { Play } from 'lucide-react';

const QuizPageContent = () => {
  const {
    domainSlug,
    quizSlug,
    category,
  } = useParams();
  const router = useRouter();
  const [clicked, setClicked] = useState<boolean>(false);
  const onBeginQuiz = async () => {
    setClicked(true);
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/${DOMAIN_ROUTE}/${domainSlug}/${QUIZ_INSTANCE_ROUTE}`,
      {
        quizSlug,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    const instanceId = res.data.id;
    router.push(`/${domainSlug}/${CATEGORIES_ROUTE}/${category}/${quizSlug}/${instanceId}`);
  };
  return (
    <main className="flex flex-col items-center justify-between">
      <Button
        variant="blank"
        className={cn('bg-transparent flex gap-1 px-8 py-4 border-2 border-red-500 shadow-sm text-red-400', {
          'opacity-50 pointer-events-none': clicked,
        })}
        onClick={onBeginQuiz}
      >
        <Play className="w-4 h-4" />
        Begin quiz
      </Button>
    </main>
  );
};

export default QuizPageContent;
