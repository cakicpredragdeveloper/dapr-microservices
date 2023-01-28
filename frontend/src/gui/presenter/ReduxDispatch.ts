import { AnyAction, Dispatch } from "redux";
import { IReduxDispatch } from "./IReduxDispatch";

export default class ReduxDispatch implements IReduxDispatch {
  constructor(private _dispatch: Dispatch) {}
  dispatch(action: AnyAction): void {
    this._dispatch(action);
  }
}
