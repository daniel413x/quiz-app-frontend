import { Label } from '@/components/ui/common/shadcn/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/common/shadcn/radio-group';
import { Plus } from 'lucide-react';
import { cn } from '@/lib/utils';
import useUserQuizData from '../../_hooks/useUserQuizData';

export const DEFAULT = 'DEFAULT';
export const INCORRECT_ONLY = 'INCORRECT_ONLY';

interface FilterOptionsProps {
  filter: string;
  setFilter: (string: string) => void;
}

const FilterOptions = ({
  filter,
  setFilter,
}: FilterOptionsProps) => {
  const {
    questions, answersRecord,
  } = useUserQuizData();
  let incorrectLength = 0;
  answersRecord.forEach((ar) => {
    if (ar.length > 1) {
      incorrectLength += 1;
    }
  });
  const filterLabelClassname = 'flex items-center w-full cursor-pointer whitespace-normal [line-height:2] h-full max-h-full ';
  return (
    <RadioGroup
      className="flex"
      onValueChange={(val) => {
        setFilter(val);
      }}
      value=""
    >
      <Label
        className={cn(filterLabelClassname, {
          'opacity-50': filter !== DEFAULT,
        })}
        htmlFor={DEFAULT}
      >
        {/* add tooltips */}
        <RadioGroupItem
          checked={DEFAULT === filter}
          value={DEFAULT}
          id={DEFAULT}
          className="mr-1"
        />
        <div className="shrink-0 rounded-full w-4 h-4 bg-green-400 dark:bg-green-400" />
        <Plus size={20} />
        <div className="shrink-0 rounded-full w-4 h-4 bg-red-400 dark:bg-red-400 mr-1" />
        &#40;
        {questions.length}
        &#41;
      </Label>
      <Label
        className={cn(filterLabelClassname, {
          'opacity-50': filter !== INCORRECT_ONLY,
          'pointer-events-none': incorrectLength === 0,
        })}
        htmlFor={INCORRECT_ONLY}
      >
        <RadioGroupItem
          checked={INCORRECT_ONLY === filter}
          value={INCORRECT_ONLY}
          id={INCORRECT_ONLY}
          className="mr-1"
        />
        <div className="shrink-0 rounded-full w-4 h-4 bg-red-400 dark:bg-red-400 mr-1" />
        &#40;
        {incorrectLength}
        &#41;
      </Label>
    </RadioGroup>
  );
};

export default FilterOptions;
