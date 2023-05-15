import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";

export const menuStatusSelector = createSelector(
  (state: RootState) => state,
  (state) => state.menu
);
