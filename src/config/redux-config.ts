import { navigationSliceReducer } from "@/features/navigationSlice";
import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

export const reduxStore = configureStore({
  reducer: {
    navigationSliceReducer: navigationSliceReducer,
  },
});

export type RootState = ReturnType<typeof reduxStore.getState>;

export type AppDispatch = typeof reduxStore.dispatch;

setupListeners(reduxStore.dispatch);
