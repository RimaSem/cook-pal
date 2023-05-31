import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";

export const errorMessageSelector = createSelector(
  (state: RootState) => state,
  (state) => state.error
);
