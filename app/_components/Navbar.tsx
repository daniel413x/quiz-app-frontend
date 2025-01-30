import { CATEGORIES_ROUTE, DOMAIN_ROUTE, QUIZ_CATEGORY_API_ROUTE } from '@/lib/data/routes';
import Link from '@/components/ui/common/Link';
import { Separator } from '@/components/ui/common/shadcn/separator';
import { CategoryGETManyRes } from '@/lib/data/types';
import MobileNav from './MobileNav';
import { DarkModeToggle } from './DarkModeToggle';
import Logo from './Logo';

interface NavbarProps {
  params: { domainSlug: string; };
}

const Navbar = async ({
  params,
}: NavbarProps) => {
  const isMainDomain = params?.domainSlug === 'main' || !params?.domainSlug;
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${DOMAIN_ROUTE}/${isMainDomain ? 'main' : params?.domainSlug}/${QUIZ_CATEGORY_API_ROUTE}`, {
    method: 'GET',
  });
  const categories: CategoryGETManyRes = await res.json();
  return (
    <div className="relative bg-gradient-to-r from-orange-300/30 to-pink-500/30 dark:from-white/40 dark:to-pink-800/40 text-grad">
      <div className="absolute w-full h-full bg-white dark:bg-gray-800 bottom-1" />
      <div className="flex container justify-between items-center gap-6 w-full bg-white dark:bg-gray-800 p-8 pt-9 relative bottom-1">
        <Logo />
        <div className="md:hidden flex">
          <MobileNav />
        </div>
        <ul className="gap-2 text-sm hidden md:flex items-center overflow-x-auto h-14 -my-4">
          <li>
            <Link href={`${isMainDomain ? '/main' : params.domainSlug}/${CATEGORIES_ROUTE}`} name="All Categories" />
          </li>
          <Separator
            className="bg-gray-400 dark:bg-gray-400 w-[1px] h-8 mx-2.5 opacity-50"
          />
          {categories[0].slice(0, 11).map((c) => (
            <li key={c.slug}>
              <Link href={`/${c.domain.slug}/${CATEGORIES_ROUTE}/${c.slug}`} name={c.name} key={c.slug} />
            </li>
          ))}
        </ul>
        {/* add additional buttons? */}
        <div className="items-center gap-1.5 text-gray-400 hidden md:flex">
          <DarkModeToggle />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
