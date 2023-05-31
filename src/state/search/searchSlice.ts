import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { defaultRecipes } from "../../utils/basicUtils";

interface SearchState {
  searchWord: string;
  searchResults: string[];
}

const initialState: SearchState = {
  searchWord: "",
  searchResults: defaultRecipes,
};

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchWord: (
      state,
      action: PayloadAction<SearchState["searchWord"]>
    ) => {
      state.searchWord = action.payload;
    },
    setSearchResults: (
      state,
      action: PayloadAction<SearchState["searchResults"]>
    ) => {
      state.searchResults = action.payload;
    },
  },
});

export const { setSearchWord, setSearchResults } = searchSlice.actions;

export default searchSlice.reducer;
