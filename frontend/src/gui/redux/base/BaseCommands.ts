import { dependencyContainer } from "../../..";
import { Command } from "../Command";
import { flagsSet, snackClosed, snackOpened } from "./BaseSlice";

export const CheckAuth = (): Command => async (dispatch) => {
  const gateway = dependencyContainer.dependency.gatewayFactory.getCheckAuthGateway();
  if (gateway.hasToken()) {
    dispatch(flagsSet({ value: true }));
  }
};

export const SnackClose = (): Command => async (dispatch) => {
  dispatch(snackClosed());
};

export const SnackOpen =
  (snackText: string): Command =>
  async (dispatch) => {
    dispatch(snackOpened(snackText));
  };
