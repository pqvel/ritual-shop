import { Container } from "@/components/ui/Wrappers";
import Link from "next/link";
import Image from "next/image";
import HoverSelect from "@/components/ui/HoverSelect";
import "../app/globals.scss";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <header className=" fixed top-0 left-0 w-full bg-white z-10">
        <Container>
          <Image
            className="py-2"
            src="/images/logo.png"
            alt="Логотип"
            width={377}
            height={86}
            priority
          />
        </Container>
        <nav className="w-full bg-cyan-900 py-1 text-white text-lg font-medium">
          <Container className="flex justify-between">
            <div className="flex items-center">
              <HoverSelect
                header={
                  <Link
                    className="inline-block mr-3 hover:underline hover:underline-offset-4 py-1 px-2"
                    href="/"
                  >
                    Памятники
                  </Link>
                }
                body={
                  <>
                    <Link
                      className="inline-block mr-3 hover:underline hover:underline-offset-4 py-1 px-2 rounded-md"
                      href="/catalog"
                    >
                      Каталог
                    </Link>

                    <Link
                      className="inline-block mr-3 hover:underline hover:underline-offset-4 py-1 px-2 rounded-md flex-shrink-0"
                      href="/all"
                    >
                      Смотреть все
                    </Link>

                    <Link
                      className="inline-block mr-3 hover:underline hover:underline-offset-4 py-1 px-2 rounded-md"
                      href="/contact"
                    >
                      Контакты
                    </Link>
                  </>
                }
              />

              <div className=" h-7 w-0.5 bg-white mr-3"></div>
              <Link
                className="inline-block mr-3 hover:underline hover:underline-offset-4 p-1 rounded-md"
                href="/"
              >
                Ограды
              </Link>
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
                Изделия из бронзы
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
      {children}
      <footer className=" bg-black bg-opacity-80 py-20 text-white">
        <Container>DW</Container>
      </footer>
    </>
  );
}
