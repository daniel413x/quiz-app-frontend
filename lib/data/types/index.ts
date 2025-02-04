import { StaticImageData } from 'next/image';

export enum QuizMarkdownType {
  INLINE_KATEX, KATEX, INLINE_CODE, CODE, TEXT, IMAGE, TABLE, BREAK, BLOCK_QUOTE,
}

export type QuizMarkdownTuple = [QuizMarkdownType, string | TableData | StaticImageData] | [QuizMarkdownType];

export type Answer = {
  answer: QuizMarkdownTuple[];
  order?: number;
  id: string;
};

export type TableData = {
  data: {
    [key: string]: any;
    _tableDataColId: string;
  }[];
  cols: {
    accessorKey: string;
    header: string;
  }[];
  name?: string;
};

export type Question = {
  question: QuizMarkdownTuple[];
  image?: string | StaticImageData;
  code?: string,
  katex?: string,
  tableData?: TableData,
  answers: Answer[];
  correctAnswer: string;
};

export type QuizQuestion = {
  question: QuizMarkdownTuple[];
  image?: string | StaticImageData;
  code?: string,
  katex?: string,
  tableData?: TableData,
  answers: Answer[];
  correctAnswer: string;
};

export type Domain = {
  id: string;
  name: string;
  slug: string;
  categories: Category[];
};

export type Quiz = {
  id: string;
  name: string;
  slug: string;
};

export type QuizInstance = {
  id: string;
};

export type Category = {
  domain: Domain;
  name: string;
  slug: string;
  quizzes: QuizDataObject[];
};

export type QuizDataObject = {
  name: string;
  slug: string;
  category: Pick<Category, 'slug'>;
  questions: Question[];
};

export type GETManyRes<T> = [T[], number];

export type CategoryGETManyRes = GETManyRes<Category>;
