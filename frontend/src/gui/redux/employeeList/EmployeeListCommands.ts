import { dependencyContainer } from "../../..";
import EmployeePresentation from "../../presenter/employee/presentation/EmployeePresentation";
import { ErrorCodes } from "../../presenter/error/ErrorCodes";
import { Command } from "../Command";
import {
  errorHappened,
  requestFinished,
  requestStarted,
  viewUnloaded,
  pageNumberSet,
  pageSizeSet,
  employeesLoaded,
  errorReset,
  searchBarSet
} from "./EmployeeListSlice";
import ErrorHandler from "../ErrorHandler";

export const GetEmployees = (): Command => async (dispatch) => {
  try {
    dispatch(requestStarted());

    const gateway = dependencyContainer.dependency.gatewayFactory.getGetEmployeesGateway();
    const employees = new EmployeePresentation().presentEmployees(await gateway.getEmployees());

    dispatch(employeesLoaded({ employees }));
    dispatch(requestFinished());
  } catch (e: any) {
    const errorMessage = ErrorHandler.errored(e, ErrorCodes.EMPLOYEES_ERROR);
    dispatch(errorHappened(errorMessage));
  }
};

export const ResetEmployeeListView = (): Command => async (dispatch) => {
  dispatch(viewUnloaded());
};

export const ResetEmployeeListError = (): Command => async (dispatch) => {
  dispatch(errorReset());
};

export const SetEmployeeSearch =
  (value: string): Command =>
  async (dispatch) => {
    dispatch(searchBarSet({ value }));
  };

export const SetEmployeePageNumber =
  (value: number): Command =>
  async (dispatch) => {
    dispatch(pageNumberSet({ value }));
  };

export const SetEmployeePageSize =
  (value: number): Command =>
  async (dispatch) => {
    dispatch(pageSizeSet({ value }));
  };
