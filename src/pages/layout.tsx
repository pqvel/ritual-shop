import { Container } from "@/components/ui/Wrappers";
import Link from "next/link";
import Image from "next/image";
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
          <Container>
            <Link
              className="inline-block mr-5 hover:bg-slate-500 p-1 rounded-md"
              href="/"
            >
              Главная
            </Link>
            <Link
              className="inline-block mr-5 hover:bg-slate-500 p-1 rounded-md"
              href="/"
            >
              Памятники
            </Link>
            <Link
              className="inline-block mr-5 hover:bg-slate-500 p-1 rounded-md"
              href="/portfolio"
            >
              Портфолио
            </Link>
          </Container>
        </nav>
      </header>
      {children}
    </>
  );
}
