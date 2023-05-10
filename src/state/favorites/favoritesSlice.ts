import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface FavoritesState {
  favRecipes: string[];
}

const initialState: FavoritesState = {
  favRecipes: [],
};

export const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    updateFavorites: (state, action: PayloadAction<string[]>) => {
      state.favRecipes = action.payload;
    },
    addFavorite: (state, action: PayloadAction<string>) => {
      if (state.favRecipes.includes(action.payload)) {
        state.favRecipes = state.favRecipes.filter(
          (recipeID) => recipeID !== action.payload
        );
      } else {
        state.favRecipes.push(action.payload);
      }
    },
    removeFavorite: (state, action: PayloadAction<string>) => {
      state.favRecipes = state.favRecipes.filter(
        (recipeID) => recipeID !== action.payload
      );
    },
  },
});

export const { addFavorite, removeFavorite, updateFavorites } =
  favoritesSlice.actions;

export default favoritesSlice.reducer;
