import "../globals.scss";
import Header from "@/app/admin/_components/Header";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body>
        <Header />
        <div className="w-full max-w-7xl px-3 mx-auto flex-1 my-5">
          <main className="min-h-full">{children}</main>
        </div>
      </body>
      <footer></footer>
    </html>
  );
}
