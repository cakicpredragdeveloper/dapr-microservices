import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { EmployeeViewModel } from "../../presenter/employee/viewModel/EmployeeViewModel";

interface EmployeeListState {
  employeeList: EmployeeViewModel[];
  loading: boolean;
  tableSearchText: string;
  pageNumber: number;
  pageSize: number;
  error?: string;
}

const initialState: EmployeeListState = {
  employeeList: [],
  tableSearchText: "",
  pageNumber: 0,
  pageSize: 10,
  loading: false
};

export const employeeListSlice = createSlice({
  name: "employeeList",
  initialState,
  reducers: {
    employeesLoaded: (state, { payload }: PayloadAction<{ employees: EmployeeViewModel[] }>) => {
      state.loading = false;
      state.employeeList = payload.employees;
    },
    searchBarSet: (state, { payload }: PayloadAction<{ value: string }>) => {
      state.tableSearchText = payload.value;
    },
    pageNumberSet: (state, { payload }: PayloadAction<{ value: number }>) => {
      state.pageNumber = payload.value;
    },
    pageSizeSet: (state, { payload }: PayloadAction<{ value: number }>) => {
      state.pageSize = payload.value;
    },
    errorHappened: (state, { payload }) => {
      state.error = payload;
      state.loading = false;
    },
    errorReset: (state) => {
      state.error = undefined;
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

export const {
  employeesLoaded,
  errorHappened,
  requestStarted,
  requestFinished,
  viewUnloaded,
  searchBarSet,
  pageNumberSet,
  pageSizeSet,
  errorReset
} = employeeListSlice.actions;
