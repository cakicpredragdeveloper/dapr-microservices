import { configureStore } from "@reduxjs/toolkit";
import { baseSlice } from "./base/BaseSlice";
import { employeeListSlice } from "./employeeList/EmployeeListSlice";
import { signInSlice } from "./signIn/SignInSlice";
import { signOutSlice } from "./signOut/SignOutSlice";

export const store = configureStore({
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ thunk: true }),
  reducer: {
    base: baseSlice.reducer,
    signIn: signInSlice.reducer,
    employeeList: employeeListSlice.reducer,
    signOut: signOutSlice.reducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
