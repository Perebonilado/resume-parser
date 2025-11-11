import { navigationSliceReducer } from "@/features/navigationSlice";
import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import loaderSliceReducer from "../features/loaderSlice";
import userSliceReducer from "../features/userSlice";
import { ResumeService } from "@/api-services/resume.service";
import { ResumeHistoryService } from "@/api-services/resume-history.service";
import { UploadService } from "@/api-services/upload.service";
import { UserService } from "@/api-services/user.service";
import { PaymentService } from "@/api-services/payment.service";

export const reduxStore = configureStore({
  reducer: {
    [ResumeService.reducerPath]: ResumeService.reducer,
    [ResumeHistoryService.reducerPath]: ResumeHistoryService.reducer,
    [UploadService.reducerPath]: UploadService.reducer,
    [UserService.reducerPath]: UserService.reducer,
    [PaymentService.reducerPath]: PaymentService.reducer,
    navigationSliceReducer: navigationSliceReducer,
    loaderReducer: loaderSliceReducer,
    userReducer: userSliceReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat([
      ResumeService.middleware,
      ResumeHistoryService.middleware,
      UploadService.middleware,
      UserService.middleware,
      PaymentService.middleware
    ]);
  },
});

export type RootState = ReturnType<typeof reduxStore.getState>;

export type AppDispatch = typeof reduxStore.dispatch;

setupListeners(reduxStore.dispatch);
