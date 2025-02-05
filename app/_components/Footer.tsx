import { Separator } from '@/components/ui/common/shadcn/separator';
import {
  FaGithub,
  FaInstagram, FaTiktok, FaYoutube,
} from 'react-icons/fa';
import Link from 'next/link';
import NextJsLogo from '@/public/icons/next-js-logo.svg';
import FlaskLogo from '@/public/icons/flask-logo.svg';
import SQLAlchemyLogo from '@/public/icons/sqlalchemy-logo.svg';

const Footer = () => (
  <footer className="p-6 mt-auto">
    <Separator />
    <div className="flex items-center pt-6">
      <div className="flex gap-2">
        <Link href="https://nextjs.org/">
          <NextJsLogo className="text-indigo-700 dark:text-indigo-300" />
        </Link>
        <Link href="https://flask.palletsprojects.com/en/stable/" className="ml-2">
          <FlaskLogo className="text-indigo-700 dark:text-indigo-300" />
        </Link>
        <Link href="https://www.sqlalchemy.org/">
          <SQLAlchemyLogo className="text-indigo-700 dark:text-indigo-300" />
        </Link>
      </div>
      <div className="container flex justify-center gap-6">
        <span className="opacity-60">
          &copy;
          {' '}
          QuizGPT
        </span>
        <div className="flex gap-4 items-center text-gray-500 dark:text-gray-300 ">
          <Link href="/" className="hover:scale-110 hover:text-sky-600 dark:hover:text-purple-400">
            <FaYoutube className="w-5 h-5" />
          </Link>
          <Link href="/" className="hover:scale-110 hover:text-sky-600 dark:hover:text-purple-400">
            <FaInstagram />
          </Link>
          <Link href="/" className="hover:scale-110 hover:text-sky-600 dark:hover:text-purple-400">
            <FaTiktok />
          </Link>
        </div>
      </div>
      <Link href="https://github.com/daniel413x/quiz-app-frontend">
        <FaGithub className="w-8 h-8" />
      </Link>
    </div>
  </footer>
);

export default Footer;
