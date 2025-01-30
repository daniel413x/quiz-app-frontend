'use client';

import { directQuizRoutes } from '@/lib/data/routes';
import Link from 'next/link';
import { ReactElement, useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/common/shadcn/button';
import {
  Link2Icon,
} from 'lucide-react';
import { SocialIcon } from 'react-social-icons';
import ResultsImageCard from './ResultsImageCard';

interface SocialMediaIconProps {
  name: string;
  url: string;
}

const SocialMediaIcon = ({
  name,
  url,
}: SocialMediaIconProps) => (
  <div className="relative flex flex-col">
    <SocialIcon as="div" style={{ position: 'absolute' }} className="scale-75 z-10 -left-5" url={url} />
    <Link href="/" className="flex gap-1 items-center justify-center py-3 border shadow-inner hover:shadow-md hover:underline">
      <Link2Icon size={20} />
      {' '}
      {name}
    </Link>
  </div>
);

interface ColProps {
  h3: string;
  children: ReactElement;
}

const Col = ({
  h3, children,
}: ColProps) => (
  <div className="flex flex-col gap-4">
    <h3 className="text-purple-600">
      {h3}
    </h3>
    {children}
  </div>
);

const SecondRow = () => {
  const [show, setShow] = useState<boolean>(false);
  useEffect(() => {
    setTimeout(() => setShow(true), 3000);
  }, []);
  return (
    <div className={cn('mt-20 lg:mt-0 relative top-1 transition-transform opacity-0 grid lg:grid-cols-2 gap-10', {
      'opacity-100 top-0': show,
    })}
    >
      <ResultsImageCard />
      <div className="flex flex-col gap-8">
        <Col
          h3="Browse quizzes for"
        >
          <div className="flex flex-col items-center">
            <ul className="flex flex-wrap justify-evenly gap-2 max-w-[400px] lg:max-w-[unset]">
              {directQuizRoutes.map((r) => (
                <li key={r.slug}>
                  <Link className="py-2 group" href={`/${r.category.slug}/${r.slug}`}>
                    <span className="text-sm border-l-4 pl-2 group-hover:underline group-hover:border-l-purple-500">
                      {r.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
            <Link className={cn(buttonVariants({ variant: 'link' }), 'mt-8')} href="/categories">
              +More
            </Link>
          </div>
        </Col>
        <Col
          h3="About QuizGPT"
        >
          <div className="text-sm tracking-wide leading-loose">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum
          </div>
        </Col>
        <Col
          h3="Follow us"
        >
          <div className="ps-3 grid grid-cols-1 xl:grid-cols-3 gap-y-2 gap-x-5">
            <SocialMediaIcon
              url="www.instagram.com"
              name="Instagram"
            />
            <SocialMediaIcon
              name="YouTube"
              url="www.youtube.com"
            />
            <SocialMediaIcon
              url="www.tiktok.com"
              name="TikTok"
            />
            <SocialMediaIcon
              url="www.twitch.tv"
              name="Twitch"
            />
            <SocialMediaIcon
              url="www.facebook.com"
              name="Facebook"
            />
            <SocialMediaIcon
              url="www.reddit.com"
              name="Reddit"
            />
          </div>
        </Col>
      </div>
    </div>
  );
};

export default SecondRow;
