import { createSlice } from "@reduxjs/toolkit";

// Define the initial state

const initialState = {
  currUser: null,
  error: false,
  loading: false,
};

// Define the slice
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    SignInStart(state) {
      state.loading = true;
    },
    SignInSuccess(state, action) {
      state.loading = false;
      state.currUser = action.payload;
    },
    SignInFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    }
  },
});
export const { SignInStart, SignInSuccess, SignInFailure } = userSlice.actions;
export default userSlice.reducer;
