import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface BaseState {
  signedIn: boolean;
  clearStorageAllowed: boolean;
  error?: string;
  snackOpen: boolean;
  snackText: string;
}

const initialState: BaseState = {
  signedIn: false,
  clearStorageAllowed: false,
  snackOpen: false,
  snackText: ""
};

export const baseSlice = createSlice({
  name: "base",
  initialState,
  reducers: {
    snackOpened: (state, { payload }: PayloadAction<string>) => {
      state.snackOpen = true;
      state.snackText = payload;
    },
    snackClosed: (state) => {
      state.snackOpen = false;
    },
    flagsSet: (state, { payload }: PayloadAction<{ value: boolean }>) => {
      state.signedIn = payload.value;
    },
    clearStorageChanged: (state, { payload }: PayloadAction<boolean>) => {
      state.clearStorageAllowed = payload;
    },
    errorHappened: (state, { payload }) => {
      state.error = payload;
    }
  }
});

export const { snackClosed, snackOpened, flagsSet, errorHappened, clearStorageChanged } = baseSlice.actions;
