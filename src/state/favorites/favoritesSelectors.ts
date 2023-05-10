import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";

export const getFavoriteRecipes = createSelector(
  (state: RootState) => state,
  (state) => state.favorites
);
