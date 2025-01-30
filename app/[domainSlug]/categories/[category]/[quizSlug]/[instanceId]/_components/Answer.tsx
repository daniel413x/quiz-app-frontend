import { buttonVariants } from '@/components/ui/common/shadcn/button';
import { FormField, FormItem } from '@/components/ui/common/shadcn/form';
import { Label } from '@/components/ui/common/shadcn/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/common/shadcn/radio-group';
import { Answer as AnswerType } from '@/lib/data/types';
import { cn } from '@/lib/utils';
import { UseFormReturn } from 'react-hook-form';
import { forwardRef, useImperativeHandle, useRef } from 'react';
import { renderMarkdown } from './_utils';

interface AnswerProps {
  form: UseFormReturn<{
    answer: string;
  }, any, undefined>;
  isAnsweredCorrectly: boolean;
  isAnsweredIncorrectly: boolean;
  answers: AnswerType[];
  handleChangeAnswer: (val: string) => void;
  formAnswer: string;
  submittedAnswer: string | null;
}

const Answer = forwardRef(({
  form,
  isAnsweredCorrectly,
  isAnsweredIncorrectly,
  answers,
  handleChangeAnswer,
  formAnswer,
  submittedAnswer,
}: AnswerProps, ref) => {
  const radioGroupRef = useRef<HTMLDivElement>(null);
  const firstRadioButtonRef = useRef<HTMLButtonElement>(null);
  useImperativeHandle(ref, () => ({
    radioGroupRef,
    firstRadioButtonRef,
  }));
  return (
    <FormField
      key="answer"
      name="answer"
      control={form.control}
      render={() => (
        <FormItem>
          <RadioGroup
            className={cn('flex flex-col max-w-full p-2 sm:p-4 sm:ps-9', {
              'bg-green-50/50 dark:bg-green-50/25': isAnsweredCorrectly,
              'bg-red-50 dark:bg-red-400': isAnsweredIncorrectly,
            })}
            onValueChange={(val) => handleChangeAnswer(val)}
            value=""
            ref={radioGroupRef}
          >
            {answers.map((answer, i) => {
              const isWrongAnswer = answer.id === submittedAnswer && isAnsweredIncorrectly && !isAnsweredCorrectly;
              const isCorrectAnswer = answer.id === submittedAnswer && isAnsweredCorrectly;
              const qmd = renderMarkdown(answer.answer, {
                isCorrectAnswer,
              });
              return (
                <Label
                  className={cn('relative flex items-center gap-3 w-full cursor-pointer whitespace-normal [line-height:2] h-full max-h-full', {
                    'pointer-events-none': isAnsweredCorrectly,
                  })}
                  htmlFor={answer.id}
                  key={answer.id}
                >
                  <span className={cn('absolute -left-5 text-gray-600 dark:text-gray-500 text-xs flex', {
                    'dark:text-gray-400': isAnsweredCorrectly,
                    'dark:text-black': isAnsweredIncorrectly,
                  })}
                  >
                    {i + 1}
                    &#46;
                    {' '}
                  </span>
                  {/* flex-row-reverse: better copy/pasting ux because it deals with the unneeded flow of the div element */}
                  <span
                    className={cn(buttonVariants({ variant: 'outline', className: 'relative flex flex-row-reverse w-full text-wrap justify-start border border-black/75  dark:border-gray-700 shadow-sm ps-16 pe-5 py-[1.375rem] cursor-pointer group h-max ' }), {
                      'bg-accent': answer.id === formAnswer,
                      'bg-green-100 hover:bg-green-100 dark:text-black': isCorrectAnswer,
                      'bg-red-100 hover:bg-red-100 dark:bg-red-300 dark:text-red-800': isWrongAnswer,
                      'opacity-50': isAnsweredCorrectly && submittedAnswer !== answer.id,
                    })}
                  >
                    <span className={cn('w-full', {
                      'dark:text-black': isCorrectAnswer,
                    })}
                    >
                      {qmd}
                    </span>
                    <RadioGroupItem
                      checked={answer.id === form.watch('answer')}
                      value={answer.id}
                      id={answer.id}
                      ref={i === 0 ? firstRadioButtonRef : undefined}
                      className={cn('absolute left-5 me-2', {
                        'dark:border-red-800 dark:group-hover:bg-red-300': isWrongAnswer,
                      })}
                    />
                  </span>
                </Label>
              );
            })}
          </RadioGroup>
        </FormItem>
      )}
    />
  );
});

export default Answer;
