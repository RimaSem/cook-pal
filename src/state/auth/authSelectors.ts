import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";

export const userLoggedIn = createSelector(
  (state: RootState) => state,
  (state) => state.auth
);
