import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";

export const searchWordSelector = createSelector(
  (state: RootState) => state,
  (state) => state.search
);
