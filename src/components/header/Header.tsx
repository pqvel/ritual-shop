import { FC } from "react";
import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/Wrappers";
import HoverSelect from "@/components/ui/HoverSelect";
import db from "../../../db/db";
import BurgerMenu from "./BurgerMenu";

const getCategories = async () => {
  return await db.category.findMany({
    where: { level: 1 },
    include: { childCategories: true },
  });
};

const Header: FC = async () => {
  const categories = await getCategories();
  return (
    <header className="h-20 fixed top-0 left-0 w-full bg-white z-10 border-b border-b-gray-20 shadow-sm lg:border-none lg:h-[146px]">
      <Container className="flex justify-between items-center">
        <Link className="flex py-2" href="/">
          <Image
            className=" lg:w-[377px] lg:h-[86px]"
            src="/images/logo.png"
            alt="Логотип"
            width={280}
            height={64}
            priority
          />
        </Link>

        <ul className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-x-3 lg:gap-x-8 gap-y-1 pl-20 lg:pl-0">
          <li className=" relative flex lg:flex-col items-center lg:items-start">
            <span className="block text-gray-400 text-sm lg:text-base uppercase w-16 absolute -left-[70px] lg:static top-1/2 -translate-y-1/2 lg:translate-y-0">
              ВЕЛКОМ:
            </span>
            <a
              className="text-black text-base lg:text-lg lg:hover:underline transition"
              href="tel:+375296777400"
            >
              +375 (29) 677-74-00
            </a>
          </li>
          <li className=" relative flex lg:flex-col items-center lg:items-start">
            <span className="text-gray-400 text-sm lg:text-base uppercase hidden lg:inline absolute -left-[70px] lg:static top-1/2 -translate-y-1/2 lg:translate-y-0">
              ВЕЛКОМ:
            </span>
            <a
              className="text-black text-base lg:text-lg lg:hover:underline transition"
              href="tel:+375293351010"
            >
              +375 (29) 335-10-10
            </a>
          </li>
          <li className="relative flex lg:flex-col items-center lg:items-start">
            <span className="block text-gray-400 text-sm lg:text-base uppercase w-16 absolute -left-[70px] lg:static top-1/2 -translate-y-1/2 lg:translate-y-0">
              МТС:
            </span>
            <a
              className="text-black text-base lg:text-lg lg:hover:underline transition"
              href="tel:+375295405060"
            >
              +375 (29) 540-50-60
            </a>
          </li>
        </ul>
      </Container>
      <BurgerMenu />
      <nav className="w-full bg-cyan-900 py-1 text-white text-lg font-medium hidden lg:flex">
        <Container className="flex justify-between">
          <div className="flex items-center">
            <Link href="/catalog" className="inline-block py-1 px-2 mr-3">
              Каталог
            </Link>
            <div className=" h-7 w-0.5 bg-white mr-3"></div>
            {categories.map((category) => (
              <>
                <HoverSelect
                  key={category.id}
                  className="mr-3 hover:cursor-pointer"
                  header={
                    <Link
                      href={`/catalog/${category.slug}`}
                      className="inline-block py-1 px-2"
                    >
                      {category.title}
                    </Link>
                  }
                  body={category.childCategories.map((childCategory) => (
                    <Link
                      key={childCategory.id}
                      className="inline-block mr-3 hover:underline hover:underline-offset-4 py-1 px-2 rounded-md font-normal flex-shrink-0"
                      href={`/catalog/${category.slug}/${childCategory.slug}`}
                    >
                      {childCategory.title}
                    </Link>
                  ))}
                />

                <div className=" h-7 w-0.5 bg-white mr-3"></div>
              </>
            ))}
          </div>

          <div className=" flex items-center">
            <Link
              className="inline-block mr-3 hover:underline hover:underline-offset-4 p-1 rounded-md"
              href="/"
            >
              Контакты
            </Link>
            <div className=" h-7 w-0.5 bg-white mr-3"></div>
            <Link
              className="inline-block hover:underline hover:underline-offset-4 p-1 rounded-md"
              href="/"
            >
              Наши работы
            </Link>
          </div>
        </Container>
      </nav>
    </header>
  );
};

export default Header;
