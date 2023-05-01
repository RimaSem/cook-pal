import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";

export const getSuggestions = createSelector(
  (state: RootState) => state,
  (state) => state.suggestions
);
