import { useEffect } from "react";

import { ChakraProvider, useColorMode } from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Provider as ReduxProvider } from "react-redux";
import store from "../store";

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
      <ReduxProvider store={store}>
        <Navbar />
        <Component {...pageProps} />
      </ReduxProvider>
    </ChakraProvider>
  );
};
export default App;
