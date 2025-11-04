import { AppLoader } from "@/@shared/components/AppLoader";
import { RootState } from "@/config/redux-config";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSession } from "next-auth/react";
import {
  UserRepository,
  UserRepositoryImpl,
} from "@/repository/UserRepository";
import { setUser } from "@/features/userSlice";

interface ContextOptions {}

const LoaderContext = React.createContext<ContextOptions | null>(null);

const LoadingProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { loading, loadingMessage } = useSelector(
    (state: RootState) => state.loaderReducer
  );
  const { data: session } = useSession();
  const dispatch = useDispatch();

  // const fetchUserInfo = async () => {
  //   const userRepository: UserRepository = new UserRepositoryImpl();
  //   if (!session || !session?.user || !session?.user?.email) return;
  //   const userData = await userRepository.findByEmail(session?.user?.email);
  //   if (userData) {
  //     dispatch(setUser(userData));
  //   }
  // };

  // useEffect(() => {
  //   fetchUserInfo();
  // }, []);

  return (
    <LoaderContext.Provider value={{}}>
      {loading && <AppLoader loaderMessage={loadingMessage} />}
      {children}
    </LoaderContext.Provider>
  );
};

export default LoadingProvider;
