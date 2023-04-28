import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";

export const getMenuStatus = createSelector(
  (state: RootState) => state,
  (state) => state.menu
);
