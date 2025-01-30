import { Metadata } from 'next';
import ResultsPageContent from './_components/ResultsPageContent';

export const metadata: Metadata = {
  title: 'Quiz results',
};

const ResultsPage = () => (
  <ResultsPageContent />
);

export default ResultsPage;
