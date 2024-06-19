import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import NextTopLoader from "nextjs-toploader";
import "./globals.scss";
import { Suspense } from "react";
import Metrika from "@/components/Metrika";
export const metadata: Metadata = {
  title: "Ritual-sculpture.by | Гранитные памятники",
  description: "Generated by create next app",
  robots: {
    index: false,
    follow: false,
  },
};

const montserrat = Montserrat({
  subsets: ["cyrillic"],
  weight: ["300", "400", "500", "600", "700"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={montserrat.className}>
        <NextTopLoader showSpinner={false} />
        {children}
        <Suspense>
          <Metrika />
        </Suspense>
      </body>
    </html>
  );
}
