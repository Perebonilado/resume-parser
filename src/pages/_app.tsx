import { reduxStore } from "@/config/redux-config";
import LoadingProvider from "@/contexts/LoaderContext";
import ModalProvider from "@/contexts/ModalContext";
import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <Provider store={reduxStore}>
        <ModalProvider>
          <LoadingProvider>
            <Component {...pageProps} />
          </LoadingProvider>
        </ModalProvider>
        <ToastContainer />
      </Provider>
    </SessionProvider>
  );
}
