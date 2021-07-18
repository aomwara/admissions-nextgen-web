import { useEffect } from "react";

import { ChakraProvider } from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import type { AppProps } from "next/app";
import { Provider as ReduxProvider } from "react-redux";
import { AuthProvider } from "../contexts/AuthContext";
import store from "../store";

import router, { useRouter } from "next/router";

// const liffId: string = process.env.NEXT_PUBLIC_LIFF_ID
//   ? process.env.NEXT_PUBLIC_LIFF_ID
//   : "";

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  const Router = useRouter();
  // useEffect(() => {
  //   const getLiff = async () => {
  //     const liff = (await import("@line/liff")).default;
  //     try {
  //       await liff.init({ liffId });
  //     } catch (error) {
  //       console.error("liff init error", error.message);
  //     }
  //     if (!liff.isLoggedIn()) {
  //       liff.login();
  //     }
  //   };
  //   getLiff();
  // });
  if (Router.pathname === "/auth/signin") {
    return (
      <ChakraProvider>
        <ReduxProvider store={store}>
          <Navbar />
          <Component {...pageProps} />
        </ReduxProvider>
      </ChakraProvider>
    );
  } else {
    return (
      <ChakraProvider>
        <ReduxProvider store={store}>
          <AuthProvider>
            <Navbar />
            <Component {...pageProps} />
          </AuthProvider>
        </ReduxProvider>
      </ChakraProvider>
    );
  }
};
export default App;
