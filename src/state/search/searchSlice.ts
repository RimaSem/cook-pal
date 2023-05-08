import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface SearchState {
  searchWord: string;
}

const initialState: SearchState = {
  searchWord: "",
};

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchWord: (state, action: PayloadAction<string>) => {
      state.searchWord = action.payload;
    },
  },
});

export const { setSearchWord } = searchSlice.actions;

export default searchSlice.reducer;
