import { useEffect } from "react";

import { ChakraProvider, useColorMode } from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import "../styles/globals.css";
import type { AppProps } from "next/app";

const liffId: string = process.env.NEXT_PUBLIC_LIFF_ID
  ? process.env.NEXT_PUBLIC_LIFF_ID
  : "";

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  useEffect(() => {
    const getLiff = async () => {
      const liff = (await import("@line/liff")).default;
      try {
        await liff.init({ liffId });
      } catch (error) {
        console.error("liff init error", error.message);
      }
      if (!liff.isLoggedIn()) {
        liff.login();
      }
    };
    getLiff();
  });

  return (
    <ChakraProvider>
      <Navbar />
      <Component {...pageProps} />
    </ChakraProvider>
  );
};
export default App;
