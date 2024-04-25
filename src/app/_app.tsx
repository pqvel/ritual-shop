import { useEffect, useState } from "react";
import LoadingBar from "react-top-loading-bar";
import { useRouter } from "next/router";
import { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  const [progress, setProgress] = useState(0);
  const router = useRouter();

  useEffect(() => {
    console.log("app");
    router.events.on("routeChangeStart", () => {
      setProgress(40);
    });

    router.events.on("routeChangeComplete", () => {
      setProgress(100);
    });
  }, []);

  return (
    <>
      <LoadingBar
        color="rgb(180, 130, 251)"
        progress={progress}
        waitingTime={400}
        onLoaderFinished={() => {
          setProgress(0);
        }}
      />
      <Component {...pageProps} />
    </>
  );
}
