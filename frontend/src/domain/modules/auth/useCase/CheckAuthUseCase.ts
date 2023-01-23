import ICheckAuthGateway from "../gateway/ICheckAuthGateway";

export class CheckAuthError extends Error {
  constructor(message: string) {
    super(`[CheckAuth] Error - ${message}`);
  }
}

export interface ICheckAuthInput {
  check(): Promise<void>;
}

export interface ICheckAuthOutput {
  displaySuccessResponse(isSignedIn: boolean): void;
}

export class CheckAuthInteractor implements ICheckAuthInput {
  constructor(private _output: ICheckAuthOutput, private _gateway: ICheckAuthGateway) {}

  async check(): Promise<void> {
    try {
      await this.interact();
    } catch (err: any) {
      this._output.displaySuccessResponse(false);
    }
  }

  private async interact() {
    if (!this._gateway.hasToken()) throw new Error("No token");
    this._output.displaySuccessResponse(true);
  }
}
