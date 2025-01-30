/* eslint-disable no-template-curly-in-string */
import data from './data';
import { QuizDataObject } from './types';
import git from './git';

type QuizData = {
  [key: string]: QuizDataObject;
};

const quizData: QuizData = {
  data,
  git,
};

const categories = [
  {
    name: 'Programming',
    slug: 'programming',
    quizzes: [
      quizData.git,
    ],
  },
  {
    name: 'Data',
    slug: 'data',
    quizzes: [
      quizData.data,
      quizData['data-structures'],
    ],
  },
];

export {
  categories,
};

export default quizData;
