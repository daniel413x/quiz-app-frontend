/* eslint-disable */

interface HeaderProps {
  header: string;
}

const Header = ({
  header,
}: HeaderProps) => {
  console.log();
  return (
    <h1 className="text-4xl mb-8 font-medium bg-gradient-to-r from-orange-300 to-pink-500 bg-clip-text text-transparent dark:from-white dark:to-pink-800">
      {header}
    </h1>
  );
}

export default Header;
