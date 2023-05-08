import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";

export const getSearchWord = createSelector(
  (state: RootState) => state,
  (state) => state.search
);
