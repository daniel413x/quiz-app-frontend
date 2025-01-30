import { ReactNode } from 'react';

interface QuizLayoutProps {
  children: ReactNode;
}

export const metadata = {
  title: 'Quiz',
};

const QuizLayout = ({
  children,
}: QuizLayoutProps) => (
  children
);

export default QuizLayout;
