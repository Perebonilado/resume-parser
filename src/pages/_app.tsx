import { reduxStore } from "@/config/redux-config";
import LoadingProvider from "@/contexts/LoaderContext";
import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <Provider store={reduxStore}>
        <LoadingProvider>
          <Component {...pageProps} />
        </LoadingProvider>
        <ToastContainer />
      </Provider>
    </SessionProvider>
  );
}
