import { reduxStore } from "@/config/redux-config";
import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <Provider store={reduxStore}>
        <Component {...pageProps} />
        <ToastContainer />
      </Provider>
    </SessionProvider>
  );
}
