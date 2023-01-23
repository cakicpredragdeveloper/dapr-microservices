import { createSlice } from "@reduxjs/toolkit";

interface SignOutState {
  error?: string;
}

const initialState: SignOutState = {};

export const signOutSlice = createSlice({
  name: "singOut",
  initialState,
  reducers: {
    errorHappened: (state, { payload }) => {
      state.error = payload;
    }
  }
});

export const { errorHappened } = signOutSlice.actions;
