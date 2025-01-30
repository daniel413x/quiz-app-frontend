import {
  Roboto_Condensed,
} from 'next/font/google';
import { cn } from '@/lib/utils';
import TypewriterTextHeader from './TypewriterTextHeader';
import SecondRow from './SecondRow';
import FirstRow from './FirstRow';

const robotoC = Roboto_Condensed({ subsets: ['latin'], weight: '400' });

const RootPageContent = () => (
  <main className={cn(robotoC.className, 'flex flex-col items-center relative')}>
    <TypewriterTextHeader />
    <FirstRow />
    <SecondRow />
  </main>
);

export default RootPageContent;
