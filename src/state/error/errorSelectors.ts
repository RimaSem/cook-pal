import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";

export const getErrorMessage = createSelector(
  (state: RootState) => state,
  (state) => state.error
);
