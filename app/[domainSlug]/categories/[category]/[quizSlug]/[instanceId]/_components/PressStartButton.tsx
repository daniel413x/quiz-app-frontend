'use client';

import { Button } from '@/components/ui/common/shadcn/button';
import { useParams, useRouter } from 'next/navigation';
import { CATEGORIES_ROUTE } from '@/lib/data/routes';
import { useTimer } from '../_hooks/useTimer';

const PressStartButton = () => {
  const {
    instanceId,
    quizSlug,
    domainSlug,
    category,
  } = useParams();
  const router = useRouter();
  const {
    handleStartTimer,
  } = useTimer();
  const handlePressStart = () => {
    router.push(`/${domainSlug}/${CATEGORIES_ROUTE}/${category}/${quizSlug}/${instanceId}?qNum=0`);
    handleStartTimer();
  };
  return (
    <Button className="m-auto p-6 w-1/2 mt-4" variant="outline" onClick={handlePressStart}>
      Start
    </Button>
  );
};

export default PressStartButton;
