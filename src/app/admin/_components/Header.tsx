import { FC } from "react";
import Link from "next/link";

const Header: FC = () => {
  return (
    <header className="flex items-center justify-center h-20 w-full bg-slate-900">
      <nav className="flex items-center justify-center gap-4">
        <Link href="/admin" className="text-white hover:underline">
          Главная
        </Link>
        <Link href="/admin/catalog" className="text-white hover:underline">
          Каталог
        </Link>
        <Link href="/admin/portfolio" className="text-white hover:underline">
          Портфолио
        </Link>
      </nav>
    </header>
  );
};

export default Header;
