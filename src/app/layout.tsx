import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Container } from "@/components/ui/Wrappers";
import Link from "next/link";
import Image from "next/image";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className + " pt-[126px] bg-gray-100"}>
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
          <nav className="w-full bg-cyan-900">
            <Container>
              <Link href="/">Главная</Link>
              <Link href="/">Памятники</Link>
              <Link href="/portfolio">Портфолио</Link>
            </Container>
          </nav>
        </header>
        {children}
      </body>
    </html>
  );
}
