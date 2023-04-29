import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface ErrorState {
  errorMessage: string | null;
}

const initialState: ErrorState = {
  errorMessage: null,
};

export const errorSlice = createSlice({
  name: "error",
  initialState,
  reducers: {
    setErrorMessage: (state, action: PayloadAction<string | null>) => {
      state.errorMessage = action.payload;
    },
  },
});

export const { setErrorMessage } = errorSlice.actions;

export default errorSlice.reducer;
