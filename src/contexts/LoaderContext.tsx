import { AppLoader } from "@/@shared/components/AppLoader";
import { RootState } from "@/config/redux-config";
import React from "react";
import { useSelector } from "react-redux";

interface ContextOptions {}

const LoaderContext = React.createContext<ContextOptions | null>(null);

const LoadingProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { loading, loadingMessage } = useSelector(
    (state: RootState) => state.loaderReducer
  );

  return (
    <LoaderContext.Provider value={{}}>
      {loading && <AppLoader loaderMessage={loadingMessage} />}
      {children}
    </LoaderContext.Provider>
  );
};

export default LoadingProvider;
