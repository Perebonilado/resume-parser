import { navigationSliceReducer } from "@/features/navigationSlice";
import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import loaderSliceReducer from "../features/loaderSlice";

export const reduxStore = configureStore({
  reducer: {
    navigationSliceReducer: navigationSliceReducer,
    loaderReducer: loaderSliceReducer
  },
});

export type RootState = ReturnType<typeof reduxStore.getState>;

export type AppDispatch = typeof reduxStore.dispatch;

setupListeners(reduxStore.dispatch);
