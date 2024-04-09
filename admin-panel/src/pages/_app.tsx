import "@/styles/globals.css";
import { AppProps } from "next/app"; // Импортируем типы пропсов приложения

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
