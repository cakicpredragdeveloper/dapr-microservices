import { Dispatch } from "redux";
import { dependencyContainer } from "../../..";
import EmployeePresentation from "../../presenter/employee/presentation/EmployeePresentation";
import { employeeLoaded, errorHappened, requestFinished, requestStarted, viewUnloaded } from "./EmployeeSlice";
import { Command } from "../Command";
import { ErrorCodes } from "../../presenter/error/ErrorCodes";
import ErrorHandler from "../ErrorHandler";
import LogPresentation from "../../presenter/logPresenter/presentation/LogPresentation";

export const GetEmployee =
  (employeeId: string): Command =>
  async (dispatch) => {
    try {
      dispatch(requestStarted());

      const gateway = dependencyContainer.dependency.gatewayFactory.getGetEmployeeGateway();
      const employee = await gateway.getEmployee(employeeId);
      const logs = await gateway.getEmployeeLogs(employeeId);

      const employeeViewModel = new EmployeePresentation().map(employee);
      const logsViewModel = new LogPresentation().presentLogs(logs);

      dispatch(
        employeeLoaded({
          employee: { ...employeeViewModel, logs: logsViewModel }
        })
      );
      dispatch(requestFinished());
    } catch (e: any) {
      const errorMessage = ErrorHandler.errored(e, ErrorCodes.GET_EMPLOYEE_ERROR);
      dispatch(errorHappened(errorMessage));
    }
  };

export const ResetEmployeeView = () => (dispatch: Dispatch) => {
  dispatch(viewUnloaded());
};
