import { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Categories',
};

interface SectionLayoutProps {
  children: ReactNode;
}

const CategoriesLayout = ({
  children,
}: SectionLayoutProps) => (
  children
);

export default CategoriesLayout;
