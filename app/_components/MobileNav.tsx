'use client';

import { Menu } from 'lucide-react';
import {
  Sheet, SheetContent, SheetTrigger,
} from '@/components/ui/common/shadcn/sheet';
import { Separator } from '@/components/ui/common/shadcn/separator';
import Link from '@/components/ui/common/Link';
import { categories } from '@/lib/data/quiz-data';
import { CATEGORIES_ROUTE } from '@/lib/data/routes';
import Logo from './Logo';
import { DarkModeToggle } from './DarkModeToggle';

const MobileNav = () => (
  <Sheet>
    <SheetTrigger>
      <Menu className="text-stone-500" />
    </SheetTrigger>
    <SheetContent className="space-y-3">
      <Logo />
      <Separator />
      <div className="flex flex-col text-sm">
        <DarkModeToggle className="self-end" />
        <div className="flex flex-col">
          <h2 className=" text-purple-500 text-lg">
            Browse categories
          </h2>
          <ul>
            <li>
              <Link href={`/${CATEGORIES_ROUTE}`} className="pt-6" name="All Quiz Categories" />
            </li>
            {categories.map((c) => (
              <li key={c.slug}>
                <Link href={`/${c.slug}`} name={c.name} className="pt-6" />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </SheetContent>
  </Sheet>
);

export default MobileNav;
