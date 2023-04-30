import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";

export const getFavorites = createSelector(
  (state: RootState) => state,
  (state) => state.favorites
);
