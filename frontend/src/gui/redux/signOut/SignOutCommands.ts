import { dependencyContainer } from "../../..";
import { ErrorCodes } from "../../presenter/error/ErrorCodes";
import { clearStorageChanged, flagsSet } from "../base/BaseSlice";
import { Command } from "../Command";
import ErrorHandler from "../ErrorHandler";
import { errorHappened } from "./SignOutSlice";

export const SignOutAction = (): Command => async (dispatch) => {
  try {
    const gateway = dependencyContainer.dependency.gatewayFactory.getSignOutGateway();
    gateway.clearToken();

    dispatch(flagsSet({ value: false }));

    dispatch(clearStorageChanged(true));
  } catch (e: any) {
    const errorMessage = ErrorHandler.errored(e, ErrorCodes.SERVER_ERROR);
    dispatch(errorHappened(errorMessage));
  }
};
