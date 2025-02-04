import type { Metadata } from 'next';
import {
  Roboto,
} from 'next/font/google';
import './globals.css';
import { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import ThemeProvider from '@/components/providers/ThemeProvider';
import Navbar from './_components/Navbar';
import Footer from './_components/Footer';

// fonts used are Roboto, Roboto Condensed, Ubuntu
const roboto = Roboto({ subsets: ['latin'], weight: '400' });

export const metadata: Metadata = {
  title: {
    default: 'QuizGPT',
    template: '%s | QuizGPT',
  },
  icons: {
    icon: [
      {
        media: '(prefers-color-scheme: light)',
        url: '/icon.png',
        href: '/icon.png',
      },
    ],
  },
};

interface RootLayoutProps {
  children: ReactNode;
}

const rootLayout = ({
  children,
}: RootLayoutProps) => (
  <html lang="en" suppressHydrationWarning>
    <body className={cn(roboto.className, 'flex flex-col dark:bg-gray-900')}>
      <ThemeProvider
        attribute="class"
        defaultTheme="light"
        storageKey="quiz-app-theme-2"
      >
        <Navbar />
        {/* useRootLayoutClasses */}
        <div className="p-8 md:p-24 lg:p-32 self-center w-full max-w-7xl h-full">
          {children}
        </div>
        <Footer />
      </ThemeProvider>
    </body>
  </html>
);

export default rootLayout;
