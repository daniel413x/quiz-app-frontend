import { Separator } from '@/components/ui/common/shadcn/separator';
import {
  FaInstagram, FaTiktok, FaYoutube,
} from 'react-icons/fa';
import Link from 'next/link';

const Footer = () => (
  <footer className="p-6 mt-auto">
    <Separator />
    <div className="container flex justify-center gap-6 pt-6">
      <span className="opacity-60">
        &copy;
        {' '}
        QuizGPT
      </span>
      <div className="flex gap-4 items-center text-gray-500 dark:text-gray-300">
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
  </footer>
);

export default Footer;
