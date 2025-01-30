/* eslint-disable linebreak-style */
import { QuizDataObject, QuizMarkdownType } from './types';

export default {
  name: 'Git',
  slug: 'git',
  category: {
    slug: 'git',
  },
  questions: [
    {
      question: [
        [
          QuizMarkdownType.TEXT,
          'You make changes to your project from the branch "main". Then you run the following series of commands:',
        ],
        [
          QuizMarkdownType.CODE, `git branch add-inventory-by-category-tests
git checkout add-inventory-by-category-tests
git add .
git commit -m "add InventoryByCategory tests"`,
        ],
        [
          QuizMarkdownType.TEXT,
          'Which answer is true?',
        ],
      ],
      answers: [
        {
          id: '0',
          answer: [
            [
              QuizMarkdownType.TEXT,
              'The changes committed will not appear in any other branch',
            ],
          ],
        },
        {
          id: '1',
          answer: [
            [
              QuizMarkdownType.TEXT,
              'The changes committed will appear in the main branch',
            ],
          ],
        },
        {
          id: '2',
          answer: [
            [
              QuizMarkdownType.TEXT,
              'The commands will not work because the changes were originally made in the branch "main"',
            ],
          ],
        },
        {
          id: '3',
          answer: [
            [
              QuizMarkdownType.TEXT,
              'The changes will be committed to both branches "main" and "add-inventory-by-category-tests"',
            ],
          ],
          order: 0,
        },
      ],
      correctAnswer: '0',
    },
    {
      question: [
        [
          QuizMarkdownType.TEXT,
          'You accidentally perform the action',
        ],
        [
          QuizMarkdownType.INLINE_CODE, 'git add .',
        ],
        [
          QuizMarkdownType.TEXT,
          'and add changes you did not intend to commit. What action can you take to undo this?',
        ],
      ],
      answers: [
        {
          id: '0',
          answer: [
            [
              QuizMarkdownType.INLINE_CODE,
              'git reset .',
            ],
          ],
        },
        {
          id: '1',
          answer: [
            [
              QuizMarkdownType.INLINE_CODE,
              'git restore .',
            ],
          ],
        },
        {
          id: '2',
          answer: [
            [
              QuizMarkdownType.INLINE_CODE,
              'git reset HEAD~',
            ],
          ],
        },
        {
          id: '3',
          answer: [
            [
              QuizMarkdownType.INLINE_CODE,
              'git pull',
            ],
          ],
        },
      ],
      correctAnswer: '0',
    },
    {
      question: [
        [
          QuizMarkdownType.TEXT,
          'In order to generate an access token to automate processes such as the creation of PR requests, it is necessary to set up a _____ in order to obtain a PEM file used in the JWT to authenticate in GitHub.',
        ],
      ],
      answers: [
        {
          id: '0',
          answer: [
            [
              QuizMarkdownType.INLINE_CODE,
              'GitHub App',
            ],
          ],
        },
        {
          id: '1',
          answer: [
            [
              QuizMarkdownType.INLINE_CODE,
              'GitHub Action',
            ],
          ],
        },
        {
          id: '2',
          answer: [
            [
              QuizMarkdownType.INLINE_CODE,
              'Copilot',
            ],
          ],
        },
        {
          id: '3',
          answer: [
            [
              QuizMarkdownType.INLINE_CODE,
              'GitHub Webhook',
            ],
          ],
        },
      ],
      correctAnswer: '0',
    },
    {
      question: [
        [
          QuizMarkdownType.TEXT,
          'The URL to obtain an access token is derived from the _______.',
        ],
      ],
      answers: [
        {
          id: '0',
          answer: [
            [
              QuizMarkdownType.INLINE_CODE,
              'Installation ID',
            ],
          ],
        },
        {
          id: '1',
          answer: [
            [
              QuizMarkdownType.INLINE_CODE,
              'App ID',
            ],
          ],
        },
        {
          id: '2',
          answer: [
            [
              QuizMarkdownType.INLINE_CODE,
              'JWT',
            ],
          ],
        },
        {
          id: '3',
          answer: [
            [
              QuizMarkdownType.INLINE_CODE,
              'PEM file',
            ],
          ],
        },
      ],
      correctAnswer: '0',
    },
  ],
} as QuizDataObject;
