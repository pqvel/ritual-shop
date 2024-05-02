import { FC, ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/Wrappers";
import HoverSelect from "@/components/ui/HoverSelect";
import db from "../../../db/db";
import BurgerMenu from "./BurgerMenu";
import BurgerMenuSelect from "./BurgerMenuSelect";
import OrderPopup from "../popups/OrderPopup";

// const dynamic = "force-static"; // force static
// const revalidate = 3600; // 1 hour
// const dunamicParams = false;
// const fetchCache = "default-cahce";

const getCategories = async () => {
  return await db.category.findMany({
    where: { level: 1, active: true },
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
          {/* <Image
            className=""
            src="/images/XwI7.gif"
            alt="Логотип"
            width={60}
            height={60}
            priority
          /> */}
          {/* <Image
            className=""
            src="/images/XwI7.gif"
            alt="Логотип"
            width={60}
            height={60}
            priority
          />
          <Image
            className=""
            src="/images/XwI7.gif"
            alt="Логотип"
            width={60}
            height={60}
            priority
          /> */}
        </Link>

        <ul className="hidden lg:flex flex-col items-end">
          <li className="relative flex items-center">
            <span className="block text-gray-400 text-sm lg:text-base uppercase mr-2">
              МТС:
            </span>
            <a
              className="text-black text-base lg:text-lg lg:hover:underline transition"
              href="tel:+375296777400"
            >
              +375 (29) 677-74-00
            </a>
          </li>

          <li className="relative flex items-center">
            <span className="block text-gray-400 text-sm lg:text-base uppercase mr-2">
              ВЕЛКОМ:
            </span>
            <a
              className="text-black text-base lg:text-lg lg:hover:underline transition"
              href="tel:+375295405060"
            >
              +375 (29) 540-50-60
            </a>
          </li>
        </ul>

        <BurgerMenu>
          <ul className="flex flex-col items-center my-auto">
            <BurgerMenuLink href="/catalog">Каталог</BurgerMenuLink>
            {categories.map((category) => (
              <BurgerMenuSelect
                key={category.id}
                category={category}
                childCategories={category.childCategories}
              />
            ))}

            <BurgerMenuLink href="/portfolio">Наши работы</BurgerMenuLink>
            <BurgerMenuLink href="/contacts">Контакты</BurgerMenuLink>
            <BurgerMenuLink href="/articles">Статьи</BurgerMenuLink>
            <li>
              <ul className="flex items-center flex-col py-6">
                <li className="flex">
                  <a
                    className="px-2 py-1 text-lg text-gray-600"
                    href="tel:+375297542545"
                  >
                    А1 +375 (29) 754-25-45
                  </a>
                </li>
                <li className="flex">
                  <a
                    className="px-2 py-1 text-lg text-gray-600"
                    href="tel:+375297542545"
                  >
                    МТС: +375 (29) 754-25-45
                  </a>
                </li>
              </ul>
            </li>
            <li>
              {/* <button className="bg-cyan-700 text-white py-3 px-8 rounded-[30px] text-lg shadow-lg lg:hover:bg-cyan-800 transition">
                Заказать звонок
              </button> */}
              <OrderPopup />
            </li>
          </ul>
        </BurgerMenu>
      </Container>

      <nav className="w-full bg-cyan-900 py-1 text-white xl:text-lg font-medium hidden lg:flex h-11">
        <Container className="flex justify-between">
          <div className="flex items-center">
            <Link
              className="inline-block mr-3 hover:underline hover:underline-offset-4 p-1 rounded-md"
              href="/catalog"
            >
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
            <HoverSelect
              className="mr-3 hover:cursor-pointer"
              header={
                <Link href={`/services`} className="inline-block py-1 px-2">
                  Услуги
                </Link>
              }
              body={
                <>
                  <Link
                    className="inline-block mr-3 hover:underline hover:underline-offset-4 py-1 px-2 rounded-md font-normal flex-shrink-0"
                    href={`/services`}
                  >
                    Установка
                  </Link>
                  <Link
                    className="inline-block mr-3 hover:underline hover:underline-offset-4 py-1 px-2 rounded-md font-normal flex-shrink-0"
                    href={`/services`}
                  >
                    Демонтаж
                  </Link>
                </>
              }
            />
          </div>

          <div className=" flex items-center">
            <Link
              className="inline-block mr-3 hover:underline hover:underline-offset-4 p-1 rounded-md"
              href="/contacts"
            >
              Контакты
            </Link>
            <div className=" h-7 w-0.5 bg-white mr-3"></div>
            <Link
              className="inline-block mr-3 hover:underline hover:underline-offset-4 p-1 rounded-md"
              href="/portfolio"
            >
              Наши работы
            </Link>
            <div className=" h-7 w-0.5 bg-white mr-3"></div>
            <Link
              className="inline-block hover:underline hover:underline-offset-4 p-1 rounded-md"
              href="/articles"
            >
              Статьи
            </Link>
          </div>
        </Container>
      </nav>
    </header>
  );
};

export default Header;

type BurgerMenuLinkProps = {
  href: string;
  children: ReactNode;
};

const BurgerMenuLink: FC<BurgerMenuLinkProps> = ({ href, children }) => (
  <li className="flex mb-1">
    <Link
      className="py-1 px-2 w-full cursor-pointer font-medium text-xl text-gray-950 text-center"
      href={href}
    >
      {children}
    </Link>
  </li>
);
