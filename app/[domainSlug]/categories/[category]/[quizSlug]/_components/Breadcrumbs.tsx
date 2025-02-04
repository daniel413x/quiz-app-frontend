/**
  * Breadcrumbs component that aligns width-wise with the <main> container
  */

'use client';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
} from '@/components/ui/common/shadcn/breadcrumb';
import { Slash } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useLayoutEffect, useState } from 'react';
import { validate } from 'uuid';

const Breadcrumbs = () => {
  const pathname = usePathname();
  const pathnameStrings = pathname.split('/').filter(Boolean);
  const [width, setWidth] = useState<number>();
  const handleUpdateWidth = () => {
    const main = document.getElementsByTagName('main')[0];
    if (main) {
      setWidth(main.clientWidth);
    }
  };
  useLayoutEffect(() => {
    handleUpdateWidth();
    window.addEventListener('resize', handleUpdateWidth);
    return () => window.removeEventListener('resize', handleUpdateWidth);
  }, [pathname]);
  return (
    <Breadcrumb className="mb-4" style={{ width }}>
      <BreadcrumbList>
        {pathnameStrings.map((str, i) => {
          // if the string is a UUID, assign a readable string
          const renderedStr = validate(str) ? 'Your Quiz' : str;
          // the last string should be rendered with no slash
          if (pathnameStrings[pathnameStrings.length - 1] === str) {
            return (
              <BreadcrumbItem key={renderedStr}>
                <BreadcrumbPage>{renderedStr}</BreadcrumbPage>
              </BreadcrumbItem>
            );
          }
          let href = '';
          for (let j = 0; j <= i; j += 1) {
            href += pathnameStrings[j];
            if (pathnameStrings[j] !== renderedStr) {
              href += '/';
            }
          }
          return (
            <BreadcrumbItem key={href}>
              <BreadcrumbLink href={`/${href}`}>
                {renderedStr}
              </BreadcrumbLink>
              <Slash strokeWidth={1} className="opacity-50" size={16} />
            </BreadcrumbItem>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default Breadcrumbs;
