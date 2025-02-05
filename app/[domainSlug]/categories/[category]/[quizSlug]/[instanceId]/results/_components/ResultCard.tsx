import {
  Card, CardContent, CardHeader, CardTitle,
} from '@/components/ui/common/shadcn/card';
import { cn } from '@/lib/utils';
import {
  FileQuestion,
  MessageCircleQuestion,
} from 'lucide-react';
import { Button } from '@/components/ui/common/shadcn/button';
import { Separator } from '@/components/ui/common/shadcn/separator';
import { QuizInstanceQuestion } from '@/lib/data/types';
import { FaQuestion } from 'react-icons/fa';
import RenderedMarkdown from '../../_components/RenderedMarkdown';

interface ResultCardProps {
  question: QuizInstanceQuestion;
  i: number;
}

const ResultCard = ({
  question,
  i,
}: ResultCardProps) => {
  const hasWrongAnswers = question.answers.map((a) => a.userAnswer).filter(Boolean).length > 1;
  return (
  //  md:w-[500px] md:max-w-full — account for results lists with a length of < 2 rendering a bad grid
    <Card className={cn('w-full relative shadow-md p-5 outline-2 ', {
      'outline outline-4 outline-red-300': hasWrongAnswers,
    })}
    >
      <Button
        className="absolute border rounded-md -right-1.5 -top-1.5 bg-card w-14 h-14"
        variant="ghost"
      >
        <FaQuestion className="w-5 h-5 text-blue-400" />
      </Button>
      <CardHeader>
        <CardTitle>
          {`Question #${i + 1}`}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <Separator className="w-1/2" />
        <span className="font-regular text-gray-600">
          <span className="text-2xl text-gray-600/50 mr-1.5">
            Q
            {': '}
          </span>
          <RenderedMarkdown html={question.question} />
        </span>
        <div className="flex flex-col gap-2">
          {question.answers.map((a, answerIndex) => {
            const isCorrectAnswer = a.quizAnswer.correctAnswer;
            const isAnsweredIncorrectly = !isCorrectAnswer && a.userAnswer;
            return (
            // overflow-x-auto to catch katex overflow
              <div
                className={cn('flex relative overflow-x-auto px-3 py-1.5', {
                  'bg-green-100/50 dark:bg-green-500/10': isCorrectAnswer,
                  '   bg-orange-300/20 dark:bg-red-500/10': isAnsweredIncorrectly,
                })}
                key={answerIndex}
              >
                <div className="flex items-center self-start relative top-0.5">
                  <span className=" text-xs text-gray-700">
                    {answerIndex + 1}
                    &#46;
                    {' '}
                  </span>
                  <span className={cn('mx-2 shrink-0 border-2 border-black/20 rounded-full w-5 h-5 relative dark:bg-black/75 dark:border-secondary', {
                    'bg-green-100 border-green-500 dark:bg-green-100 dark:border-green-500': isCorrectAnswer,
                    'bg-red-100 border-red-500 dark:bg-red-100 dark:border-red-500': isAnsweredIncorrectly,
                  })}
                  >
                    {/* {isCorrectAnswer ? <CheckCircle size={22} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 shrink-0 text-green-700" /> : null} */}
                  </span>
                </div>
                <span className={cn('flex', {
                  'text-green-700': isCorrectAnswer,
                  'text-red-500': isAnsweredIncorrectly,
                // '[word-break:break-all]': a.answer?.map((qmd) => qmd[1]).join(' ').split(' ')[0].length > 25,
                })}
                >
                  <span>
                    {/* {renderMarkdown(a.answer)} */}
                    <RenderedMarkdown html={a.answer} />
                  </span>
                </span>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default ResultCard;
