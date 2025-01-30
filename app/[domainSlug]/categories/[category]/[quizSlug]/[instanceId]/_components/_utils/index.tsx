import {
  Answer, Question, QuizMarkdownTuple, QuizMarkdownType,
  TableData,
} from '@/lib/data/types';
import shuffle from 'lodash/shuffle';
import { BlockMath, InlineMath } from 'react-katex';
import { cn } from '@/lib/utils';
import {
  Open_Sans,
} from 'next/font/google';
import Image, { StaticImageData } from 'next/image';
import { numOfQuestions } from '../../_consts';
import Code from '../Code';
import InlineCode from '../InlineCode';
import DataTable from '../DataTable';

const openSans = Open_Sans({ subsets: ['latin'], weight: '400' });

const shuffleAnswers = (answers: Answer[]) => shuffle(answers).slice().sort((a, b) => {
  const aa = a.order === 0 || undefined ? 0 : a.order;
  const bb = b.order === 0 || undefined ? 0 : b.order;
  if (aa! > bb!) {
    return 1;
  }
  if (bb! > aa!) {
    return -1;
  }
  return 0;
});

export const shuffleQuestions = (questions: Question[]) => shuffle(questions.map((q) => {
  const answers = shuffleAnswers(q.answers);
  return { ...q, answers };
})).slice(0, numOfQuestions);

export const renderMarkdown = (qmd: QuizMarkdownTuple[], params?: {
  isAnsweredIncorrectly?: boolean;
  isAnsweredCorrectly?: boolean;
  isCorrectAnswer?: boolean;
}) => qmd.map((tuple, i) => {
  if (tuple[0] === QuizMarkdownType.IMAGE) {
    return (
      <Image
        className="py-6 m-auto"
        src={tuple[1] as StaticImageData}
        alt="Question image"
      />
    );
  }
  if (tuple[0] === QuizMarkdownType.BREAK) {
    return (
      <br key={i} />
    );
  }
  if (tuple[0] === QuizMarkdownType.TEXT) {
    return (
      // add whitespace-normal for iOS
      <span className="whitespace-normal" key={i}>
        {tuple[1] as string}
      </span>
    );
  }
  if (tuple[0] === QuizMarkdownType.BLOCK_QUOTE) {
    return (
      <div className={cn(openSans.className, 'w-full text-sm text-emerald-800 text-xs border-l-8 border-stone-200 text-black dark:border-slate-700 bg-black/5 dark:bg-slate-800/20 dark:text-slate-300 mt-4 mb-1 py-12 px-14  tracking-wider')}>
        {tuple[1] as string}
      </div>
    );
  }
  if (tuple[0] === QuizMarkdownType.INLINE_KATEX) {
    return (
      <span
        className={cn('whitespace-normal px-0.5 text-black dark:text-white', {
          'dark:text-gray-900': params?.isCorrectAnswer,
        })}
        key={i}
      >
        {' '}
        <InlineMath>
          {tuple[1] as string}
        </InlineMath>
        {' '}
      </span>
    );
  }
  if (tuple[0] === QuizMarkdownType.KATEX) {
    return (
      <span
        className={cn('text-black dark:text-white', {
          'dark:text-gray-900 whitespace-normal': params?.isCorrectAnswer,
        })}
        key={i}
      >
        <BlockMath>
          {tuple[1] as string}
        </BlockMath>
      </span>
    );
  }
  if (tuple[0] === QuizMarkdownType.CODE) {
    return (
      <Code code={tuple[1] as string} key={i} />
    );
  }
  if (tuple[0] === QuizMarkdownType.INLINE_CODE) {
    return (
      <InlineCode code={tuple[1] as string} key={i} />
    );
  }
  if (tuple[0] === QuizMarkdownType.TABLE) {
    return (
      <DataTable tableData={tuple[1] as TableData} key={i} mbMargin={!!qmd[i + 1]} />
    );
  }
  return null;
});
