import { Html, Head, Main, NextScript } from "next/document";
import { FC } from "react";

const Document: FC = () => {
  return (
    <Html lang="en">
      <Head>
        {/* Здесь метатеги, стили и другие общие настройки */}
        <title>Мой заголовок</title>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default Document;
