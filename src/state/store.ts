import { configureStore } from "@reduxjs/toolkit";
import menuReducer from "./menu/menuSlice";
import errorReducer from "./error/errorSlice";

export const store = configureStore({
  reducer: {
    menu: menuReducer,
    error: errorReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
