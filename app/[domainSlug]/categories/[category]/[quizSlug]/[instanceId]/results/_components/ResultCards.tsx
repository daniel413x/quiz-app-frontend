import { Question } from '@/lib/data/types';
import ResultCard from './ResultCard';

interface ResultCardsProps {
  questions: (Question | 0)[];
}

const ResultCards = ({
  questions,
}: ResultCardsProps) => (
  <ul className="grid grid-cols-1 md:grid-cols-1 2xl:grid-cols-1 gap-8">
    {questions
      // if 0, result is filtered
      .map((q, i) => (q === 0 ? null : (
        <li key={i}>
          {/* md:w-[500px] md:max-w-full — account for results lists with a length of < 2 rendering a bad grid */}
          <ResultCard question={q} i={i} />
        </li>
      )))}
  </ul>
);

export default ResultCards;
