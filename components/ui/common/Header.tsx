import { cn } from '@/lib/utils';

interface HeaderProps {
  header: string;
  className?: string;
}

const Header = ({
  header,
  className,
}: HeaderProps) => (
  <h1 className={cn('text-4xl mb-8 font-medium bg-gradient-to-r from-orange-300 to-pink-500 bg-clip-text text-transparent dark:from-white dark:to-pink-800', className)}>
    {header}
  </h1>
);

export default Header;
