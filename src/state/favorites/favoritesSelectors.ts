import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";

export const favoriteRecipesSelector = createSelector(
  (state: RootState) => state,
  (state) => state.favorites
);
