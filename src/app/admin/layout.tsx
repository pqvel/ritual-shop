import "../globals.scss";
import Header from "@/app/admin/_components/Header";
import { getServerSession } from "next-auth";
import { Metadata } from "next";
import { useRouter } from "next/navigation";

export const metadata: Metadata = {
  title: "Admin",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession();

  if (!session) {
    return (
      <html lang="ru">
        <body></body>
      </html>
    );
  }

  return (
    <html lang="ru">
      <body>
        <Header />
        <div className="w-full max-w-7xl px-3 mx-auto flex-1 my-5">
          <main className="min-h-full">{children}</main>
        </div>
      </body>
    </html>
  );
}
