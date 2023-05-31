import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";

export const userLoginStatusSelector = createSelector(
  (state: RootState) => state,
  (state) => state.auth
);
