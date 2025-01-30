import { Quiz } from '@/lib/data/types';
import { numOfQuestions } from '../_consts';
import PressStartButton from './PressStartButton';

type QuizPromptProps = {
  quiz: Quiz;
};

const QuizPrompt = ({
  quiz,
}: QuizPromptProps) => (
  <div className="flex flex-col">
    <div className="flex flex-col my-10">
      <h1 className="text-2xl text-center">
        {`${quiz.name} Quiz`}
      </h1>
      <span className="text-center text-purple-500">
        {`(${numOfQuestions} questions)`}
      </span>
      <span className="text-center mb-4">
        Once you press start, the timer will begin. You have within the alotted time to complete the quiz.
      </span>
    </div>
    <PressStartButton />
  </div>
);

export default QuizPrompt;
