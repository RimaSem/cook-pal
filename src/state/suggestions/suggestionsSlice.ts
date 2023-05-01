import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface SuggestionsState {
  savedDate: string;
  dailyRecipes: string[];
}

const initialState: SuggestionsState = {
  savedDate: "Mon March 01 2023",
  dailyRecipes: ["52890", "52922", "52855"],
};

export const suggestionsSlice = createSlice({
  name: "suggestions",
  initialState,
  reducers: {
    saveCurrentDate: (state) => {
      state.savedDate = new Date().toDateString();
    },
    clearRecipes: (state) => {
      state.dailyRecipes = [];
    },
    saveRecipe: (state, action: PayloadAction<string>) => {
      state.dailyRecipes.push(action.payload);
    },
  },
});

export const { saveCurrentDate, clearRecipes, saveRecipe } =
  suggestionsSlice.actions;

export default suggestionsSlice.reducer;
