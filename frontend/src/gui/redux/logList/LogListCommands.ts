import { dependencyContainer } from "../../..";
import LogPresentation from "../../presenter/logPresenter/presentation/LogPresentation";
import { ErrorCodes } from "../../presenter/error/ErrorCodes";
import { Command } from "../Command";
import {
  errorHappened,
  requestFinished,
  requestStarted,
  viewUnloaded,
  pageNumberSet,
  pageSizeSet,
  logsLoaded,
  errorReset,
  searchBarSet
} from "./LogListSlice";
import ErrorHandler from "../ErrorHandler";

export const GetLogs = (): Command => async (dispatch) => {
  try {
    dispatch(requestStarted());

    const gateway = dependencyContainer.dependency.gatewayFactory.getGetLogsGateway();
    const logs = new LogPresentation().presentLogs(await gateway.getLogs());

    dispatch(logsLoaded({ logs }));
    dispatch(requestFinished());
  } catch (e: any) {
    const errorMessage = ErrorHandler.errored(e, ErrorCodes.EMPLOYEES_ERROR);
    dispatch(errorHappened(errorMessage));
  }
};

export const ResetLogListView = (): Command => async (dispatch) => {
  dispatch(viewUnloaded());
};

export const ResetLogListError = (): Command => async (dispatch) => {
  dispatch(errorReset());
};

export const SetLogSearch =
  (value: string): Command =>
  async (dispatch) => {
    dispatch(searchBarSet({ value }));
  };

export const SetLogPageNumber =
  (value: number): Command =>
  async (dispatch) => {
    dispatch(pageNumberSet({ value }));
  };

export const SetLogPageSize =
  (value: number): Command =>
  async (dispatch) => {
    dispatch(pageSizeSet({ value }));
  };
