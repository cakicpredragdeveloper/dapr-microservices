import { AnyAction } from "redux";

export interface IReduxDispatch {
  dispatch(action: AnyAction): void;
}
