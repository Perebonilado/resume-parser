import {
  resetLoaderState,
  setLoading,
  setLoadingMessage,
} from "@/features/loaderSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

interface Args {
  loading: boolean;
  loadingMessage: string;
  error: boolean;
  errorMessage: string;
  isSuccess?: boolean;
  onSuccess?: () => void;
  successMessage?: string;
}

export const useLoadingSuccessAndError = ({
  error,
  errorMessage,
  loading,
  loadingMessage,
  isSuccess,
  onSuccess,
  successMessage,
}: Args) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (loading) {
      dispatch(setLoadingMessage({ loadingMessage }));
      dispatch(setLoading({ loading }));
    } else {
      dispatch(resetLoaderState());
    }
  }, [loading]);

  useEffect(() => {
    if (error) {
      toast.error(errorMessage);
    }
  }, [error]);

  useEffect(() => {
    if (isSuccess && successMessage) {
      toast.success(successMessage);
      onSuccess && onSuccess();
    }
  }, [isSuccess]);
};
