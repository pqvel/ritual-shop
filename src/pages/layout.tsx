import { Container, Grid } from "@/components/ui/Wrappers";
import Link from "next/link";
import Image from "next/image";
import HoverSelect from "@/components/ui/HoverSelect";
import "../app/globals.scss";
import { useState } from "react";
import { Section } from "@/components/ui/Section";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isOpenNav, setOpenNav] = useState<boolean>(false);
  // const isOpenNav = null;
  // const setOpenPopup = (isOpen: boolean) => {};

  return (
    <>
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
          <button
            className="HAMBURGER-ICON space-y-2 lg:hidden"
            onClick={() => setOpenNav((prev) => !prev)}
          >
            <span className="block h-0.5 w-8 bg-gray-700"></span>
            <span className="block h-0.5 w-8 bg-gray-700"></span>
            <span className="block h-0.5 w-8 bg-gray-700"></span>
          </button>

          <div className={isOpenNav ? "showMenuNav" : "hideMenuNav"}>
            <div
              className="CROSS-ICON absolute top-0 right-0 px-8 py-8"
              onClick={() => setOpenNav(false)} // change isNavOpen state to false to close the menu
            >
              <svg
                className="h-8 w-8 text-gray-600"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </div>
            <ul className="MENU-LINK-MOBILE-OPEN flex flex-col items-center justify-between min-h-[250px]">
              <li className="border-b border-gray-400 my-8 uppercase">
                <a href="/about">About</a>
              </li>
              <li className="border-b border-gray-400 my-8 uppercase">
                <a href="/portfolio">Portfolio</a>
              </li>
              <li className="border-b border-gray-400 my-8 uppercase">
                <a href="/contact">Contact</a>
              </li>
            </ul>
          </div>
        </Container>
        <nav className="w-full bg-cyan-900 py-1 text-white text-lg font-medium hidden lg:flex">
          <Container className="flex justify-between">
            <div className="flex items-center">
              <HoverSelect
                className="mr-3 hover:cursor-pointer"
                header={
                  <span className="inline-block py-1 px-2">Памятники</span>
                }
                body={
                  <>
                    <Link
                      className="inline-block mr-3 hover:underline hover:underline-offset-4 py-1 px-2 rounded-md font-normal flex-shrink-0"
                      href="/catalog/odinocnie-pamyatniki"
                    >
                      Одиночные памятники из гранита
                    </Link>

                    <Link
                      className="inline-block mr-3 hover:underline hover:underline-offset-4 py-1 px-2 rounded-md font-normal flex-shrink-0"
                      href="/catalog/odinocnie-pamyatniki"
                    >
                      Двойные памятники из гранита
                    </Link>

                    <Link
                      className="inline-block mr-3 hover:underline hover:underline-offset-4 py-1 px-2 rounded-md font-normal flex-shrink-0"
                      href="/catalog/odinocnie-pamyatniki"
                    >
                      Элитные памятники из гранита
                    </Link>

                    <Link
                      className="inline-block mr-3 hover:underline hover:underline-offset-4 py-1 px-2 rounded-md font-normal flex-shrink-0"
                      href="/catalog/odinocnie-pamyatniki"
                    >
                      Станочные скульптурные работы
                    </Link>

                    <Link
                      className="inline-block mr-3 hover:underline hover:underline-offset-4 py-1 px-2 rounded-md font-normal flex-shrink-0"
                      href="/catalog/odinocnie-pamyatniki"
                    >
                      Бюджетные памятники
                    </Link>

                    <Link
                      className="inline-block mr-3 hover:underline hover:underline-offset-4 py-1 px-2 rounded-md font-normal flex-shrink-0"
                      href="/catalog/odinocnie-pamyatniki"
                    >
                      Колумбарные памятники
                    </Link>
                  </>
                }
              />

              <div className=" h-7 w-0.5 bg-white mr-3"></div>
              <HoverSelect
                className="mr-3 hover:cursor-pointer"
                header={<span className="inline-block py-1 px-2">Ограды</span>}
                body={
                  <>
                    <Link
                      className="inline-block mr-3 hover:underline hover:underline-offset-4 py-1 px-2 rounded-md font-normal flex-shrink-0"
                      href="/catalog/odinocnie-pamyatniki"
                    >
                      Ограды из гранита
                    </Link>

                    <Link
                      className="inline-block mr-3 hover:underline hover:underline-offset-4 py-1 px-2 rounded-md font-normal flex-shrink-0"
                      href="/catalog/odinocnie-pamyatniki"
                    >
                      Ограды металлические
                    </Link>

                    <Link
                      className="inline-block mr-3 hover:underline hover:underline-offset-4 py-1 px-2 rounded-md font-normal flex-shrink-0"
                      href="/catalog/odinocnie-pamyatniki"
                    >
                      Ограды из нержавеющей стали
                    </Link>

                    <Link
                      className="inline-block mr-3 hover:underline hover:underline-offset-4 py-1 px-2 rounded-md font-normal flex-shrink-0"
                      href="/catalog/odinocnie-pamyatniki"
                    >
                      Кованые ограды
                    </Link>
                  </>
                }
              />

              <div className=" h-7 w-0.5 bg-white mr-3"></div>
              <Link
                className="inline-block mr-3 hover:underline hover:underline-offset-4 p-1 rounded-md"
                href="/portfolio"
              >
                Изделия из гранита
              </Link>
              <div className=" h-7 w-0.5 bg-white mr-3"></div>
              <Link
                className="inline-block mr-3 hover:underline hover:underline-offset-4 p-1 rounded-md"
                href="/portfolio"
              >
                Установка
              </Link>
              <div className=" h-7 w-0.5 bg-white mr-3"></div>
              <Link
                className="inline-block mr-3 hover:underline hover:underline-offset-4 p-1 rounded-md"
                href="/portfolio"
              >
                Доставка
              </Link>
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
      <main className="pt-[80px] lg:pt-[146px] bg-gray-100 flex-1">
        {children}
      </main>
      <footer className=" bg-black bg-opacity-80 py-10 text-white">
        <Container>
          <Grid>
            <span className=" text-sm">© 2011—2023 | УНП 590264434</span>
            <div></div>
            <div>
              Разработчик сайта:
              <a href="mailto:solyqnik@gmail.com">solyqnik@gmail.com</a>
            </div>
          </Grid>
        </Container>
      </footer>
    </>
  );
}
