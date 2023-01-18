import axios from "axios";

export default class ServiceError extends Error {
  public readonly errorMessage: string;
  public readonly errorCode: string;
  public readonly status: number;

  constructor(error: any) {
    console.log(error);
    super("Unknown error service error");
    this.errorMessage = "Unknown error";
    this.errorCode = "UNKNOWN_ERROR";
    this.status = 500;
    return;
  }
}
