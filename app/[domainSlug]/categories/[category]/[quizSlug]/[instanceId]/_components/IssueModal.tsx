import { Button, buttonVariants } from '@/components/ui/common/shadcn/button';
import {
  Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger,
} from '@/components/ui/common/shadcn/dialog';
import {
  Form, FormDescription, FormField, FormItem,
} from '@/components/ui/common/shadcn/form';
import { Label } from '@/components/ui/common/shadcn/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/common/shadcn/radio-group';
import { Textarea } from '@/components/ui/common/shadcn/textarea';
import {
  Tooltip, TooltipContent, TooltipProvider, TooltipTrigger,
} from '@/components/ui/common/shadcn/tooltip';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  SendHorizonal,
  ThumbsUp,
  TriangleAlert,
  XIcon,
} from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

interface IssueModalProps {
  id: string;
}

const formSchema = z.object({
  issue: z.string().min(1, {
    message: 'Issue description is required',
  }),
});

type IssueFormValues = z.infer<typeof formSchema>;

const IssueModal = ({
  id,
}: IssueModalProps) => {
  const form = useForm<IssueFormValues>({
    resolver: zodResolver(formSchema),
  });
  const [selected, setSelected] = useState<string>('');
  const [ids, setIds] = useState<string[]>([]);
  const isReported = ids.includes(id);
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(id);
    console.log(values);
    setIds([...ids, id]);
    // TODO: implement ids, implement problem-marked question skipping
  };
  const answers = [
    'The question won\'t accept any answers',
    'There are visual and/or formatting errors',
    'Other',
  ];
  return (
    <Dialog>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <DialogTrigger className={cn(buttonVariants({ variant: 'outline' }))}>
              <TriangleAlert className="dark:text-white" />
              <TooltipContent>
                <p>Report a problem</p>
              </TooltipContent>
            </DialogTrigger>
          </TooltipTrigger>
        </Tooltip>
      </TooltipProvider>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Report problem
          </DialogTitle>
          <DialogDescription>
            Submit a report if there is a problem with the question
          </DialogDescription>
        </DialogHeader>
        {isReported ? (
          <div className="flex flex-col items-center">
            <div className="flex gap-1 text-xl text-purple-600 font-semibold">
              Thank you
              {' '}
              <ThumbsUp />
            </div>
            <span className="mb-14 mt-2">
              You submitted a report for this question
            </span>
            <DialogFooter className="w-full">
              <DialogClose asChild>
                <Button className="w-full" variant="outline">
                  <XIcon size={20} />
                  Close
                </Button>
              </DialogClose>
            </DialogFooter>
          </div>
        ) : (
          <Form {...form}>
            <FormDescription className="text-center underline">
              What is the issue you are observing?
            </FormDescription>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                key="issue"
                name="issue"
                control={form.control}
                render={() => (
                  <FormItem>
                    <RadioGroup
                      className="p-4"
                      onValueChange={(val) => {
                        if (val === 'Other') {
                          form.setValue('issue', '');
                        } else {
                          form.setValue('issue', val);
                        }
                        setSelected(val);
                      }}
                      value=""
                    >
                      {answers.map((answer) => (
                        <Label
                          className="flex w-full cursor-pointer whitespace-normal [line-height:2] h-full max-h-full"
                          htmlFor={answer}
                          key={answer}
                        >
                          <div
                            className={cn(buttonVariants({ variant: 'outline', className: 'flex gap-2 w-full text-wrap justify-start space-x-3 border-2 border-black/5 dark:border-gray-800 shadow-sm px-4 py-3 cursor-pointer group h-max' }), {
                            })}
                          >
                            <RadioGroupItem
                              checked={selected === answer}
                              value={answer}
                              id={answer}
                            />
                            {answer}
                          </div>
                        </Label>
                      ))}
                    </RadioGroup>
                    <Textarea
                      {...form.register('issue', {
                        required: 'Issue description required',
                      })}
                      value={selected === 'Other' ? form.watch('issue') : ''}
                      placeholder="Describe the issue"
                      disabled={selected !== 'Other'}
                    />
                  </FormItem>
                )}
              />
              <DialogFooter className="flex flex-row justify-end mt-2">
                <Button type="submit" variant="outline" disabled={!form.watch('issue')}>
                  <SendHorizonal className="mr-0.5" size={20} />
                  Submit
                </Button>
                <DialogClose asChild>
                  <Button variant="destructive">
                    <XIcon size={20} />
                    Cancel
                  </Button>
                </DialogClose>
              </DialogFooter>
            </form>
          </Form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default IssueModal;
