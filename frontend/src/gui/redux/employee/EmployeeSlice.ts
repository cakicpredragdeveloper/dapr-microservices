import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { EmployeeInfoViewModel } from "../../presenter/employee/viewModel/EmployeeInfoViewModel";

interface EmployeeState {
  employee: EmployeeInfoViewModel;
  loading: boolean;
  error?: string;
}

const initialState: EmployeeState = {
  loading: false,
  employee: {
    EmployeeId: "",
    FirstName: "",
    LastName: "",
    Email: "",
    JobTitle: "",
    logs: []
  }
};

export const employeeSlice = createSlice({
  name: "employee",
  initialState,
  reducers: {
    employeeLoaded: (state, { payload }: PayloadAction<{ employee: EmployeeInfoViewModel }>) => {
      const { employee } = payload;

      return {
        ...state,
        employee
      };
    },
    errorHappened: (state, { payload }) => {
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

export const { employeeLoaded, errorHappened, requestStarted, requestFinished, viewUnloaded } = employeeSlice.actions;
