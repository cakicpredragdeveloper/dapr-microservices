import { dependencyContainer } from "../../..";
import NotEmptyString from "../../../domain/base/valueObject/NotEmptyString";
import { ErrorCodes } from "../../presenter/error/ErrorCodes";
import { flagsSet } from "../base/BaseSlice";
import { Command } from "../Command";
import ErrorHandler from "../ErrorHandler";
import { errorHappened, inputChanged, viewUnloaded } from "./SignInSlice";

export const ChangeSignInInputs =
  (payload: { field: "email" | "password"; value: string }): Command =>
  async (dispatch) => {
    const { field, value } = payload;
    dispatch(inputChanged({ field, value }));
  };

export const SignInCommand = (): Command => async (dispatch, getState) => {
  try {
    const { email, password } = getState().signIn;
    const gateway = dependencyContainer.dependency.gatewayFactory.getSignInGateway();
    gateway.storeToken(await gateway.getToken(NotEmptyString.create(email), NotEmptyString.create(password)));

    dispatch(viewUnloaded());
    dispatch(flagsSet({ value: true }));
  } catch (e: any) {
    const errorMessage = ErrorHandler.errored(e, ErrorCodes.INVALID_CREDENTIALS);
    dispatch(errorHappened(errorMessage));
  }
};
