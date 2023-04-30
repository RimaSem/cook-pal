import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface FavoritesState {
  favRecipes: string[];
}

const initialState: FavoritesState = {
  favRecipes: ["52768", "52893", "53049"],
};

export const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    addFavorite: (state, action: PayloadAction<string>) => {
      state.favRecipes.push(action.payload);
    },
    removeFavorite: (state, action: PayloadAction<string>) => {
      state.favRecipes = state.favRecipes.filter(
        (recipeID) => recipeID !== action.payload
      );
    },
  },
});

export const { addFavorite, removeFavorite } = favoritesSlice.actions;

export default favoritesSlice.reducer;
