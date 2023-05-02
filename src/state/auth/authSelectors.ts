import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";

export const getAuthStatus = createSelector(
  (state: RootState) => state,
  (state) => state.auth
);
