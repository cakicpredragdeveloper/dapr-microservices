export default class ServiceError extends Error {
  public readonly errorMessage: string;
  public readonly errorCode: string;
  public readonly status: number;

  constructor(error: any, status?: number) {
    super("Unknown error service error");
    this.errorMessage = error;
    this.errorCode = "SERVER_ERROR";
    this.status = status ?? 500;
    return;
  }
}
