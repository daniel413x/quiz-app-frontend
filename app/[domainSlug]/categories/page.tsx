import CategoriesPageContent from './_components/CategoriesPageContent';

interface CategoriesPageProps {
  params: { domainSlug: string; };
}

const CategoriesPage = ({
  params,
}: CategoriesPageProps) => (
  <CategoriesPageContent params={params} />
);

export default CategoriesPage;
