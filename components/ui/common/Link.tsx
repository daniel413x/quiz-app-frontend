import { cn } from '@/lib/utils';
import NextLink from 'next/link';

interface LinkProps {
  href: string;
  name: string;
  className?: string;
}

const Link = ({
  href,
  name,
  className,
}: LinkProps) => (
  <NextLink href={href} className={cn('rounded-sm p-1 text-sm flex h-max w-max text-nowrap', className)} key={href}>
    <span className="flex  px-3 py-1 bg-white dark:bg-gray-800 hover:bg-black/10  dark:hover:bg-white/10">
      {name}
    </span>
  </NextLink>
);

export default Link;
