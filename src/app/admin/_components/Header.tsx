import { FC } from "react";
import Link from "next/link";
import { signOut } from "@/auth";

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
        <Link href="/admin/articles" className="text-white hover:underline">
          Статьи
        </Link>
        <form
          action={async () => {
            "use server";
            await signOut();
          }}
        >
          <button className="flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">
            <div className="hidden md:block">Sign Out</div>
          </button>
        </form>
      </nav>
    </header>
  );
};

export default Header;
