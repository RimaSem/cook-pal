import { configureStore } from "@reduxjs/toolkit";
import menuReducer from "./menu/menuSlice";
import errorReducer from "./error/errorSlice";
import favoritesReducer from "./favorites/favoritesSlice";

export const store = configureStore({
  reducer: {
    menu: menuReducer,
    error: errorReducer,
    favorites: favoritesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
