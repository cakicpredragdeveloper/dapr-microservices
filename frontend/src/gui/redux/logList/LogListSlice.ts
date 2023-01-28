import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LogViewModel } from "../../presenter/logPresenter/viewModel/LogViewModel";

interface LogListState {
  logList: LogViewModel[];
  loading: boolean;
  tableSearchText: string;
  pageNumber: number;
  pageSize: number;
  error?: string;
}

const initialState: LogListState = {
  logList: [],
  tableSearchText: "",
  pageNumber: 0,
  pageSize: 10,
  loading: false
};

export const logListSlice = createSlice({
  name: "logList",
  initialState,
  reducers: {
    logsLoaded: (state, { payload }: PayloadAction<{ logs: LogViewModel[] }>) => {
      state.loading = false;
      state.logList = payload.logs;
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
  logsLoaded,
  errorHappened,
  requestStarted,
  requestFinished,
  viewUnloaded,
  searchBarSet,
  pageNumberSet,
  pageSizeSet,
  errorReset
} = logListSlice.actions;
