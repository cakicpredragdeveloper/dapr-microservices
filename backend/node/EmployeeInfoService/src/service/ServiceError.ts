export default class ServiceError extends Error {
  public readonly errorMessage: string;
  public readonly errorCode: string;
  public readonly status: number;

  constructor(error: any) {
    super("Unknown error service error");
    this.errorMessage = error;
    this.errorCode = "SERVER_ERROR";
    this.status = 500;
    return;
  }
}
