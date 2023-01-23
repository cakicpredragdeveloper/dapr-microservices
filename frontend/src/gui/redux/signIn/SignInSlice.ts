import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SignInState {
  email: string;
  password: string;
  loading: boolean;
  error?: string;
}

const initialState = {
  email: "",
  password: "",
  loading: false
} as SignInState;

export const signInSlice = createSlice({
  name: "signIn",
  initialState,
  reducers: {
    inputChanged: (state, { payload }: PayloadAction<{ field: "email" | "password"; value: string }>) => {
      state[payload.field] = payload.value;
    },
    errorHappened: (state, { payload }: PayloadAction<string>) => {
      state.error = payload;
      state.loading = false;
    },
    requestStarted: (state) => {
      state.loading = true;
    },
    requestFinished: (state) => {
      state.loading = false;
    },
    viewUnloaded: () => initialState
  }
});

export const { inputChanged, errorHappened, requestStarted, requestFinished, viewUnloaded } = signInSlice.actions;
