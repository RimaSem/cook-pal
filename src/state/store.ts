import { configureStore } from "@reduxjs/toolkit";
import menuReducer from "./menu/menuSlice";
import errorReducer from "./error/errorSlice";
import favoritesReducer from "./favorites/favoritesSlice";
import authReducer from "./auth/authSlice";
import searchReducer from "./search/searchSlice";

export const store = configureStore({
  reducer: {
    menu: menuReducer,
    error: errorReducer,
    favorites: favoritesReducer,
    auth: authReducer,
    search: searchReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
