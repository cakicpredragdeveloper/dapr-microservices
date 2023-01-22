import { ErrorResponse } from "@app/HttpServer";
import { Router } from "express";
import HttpRouter from "../HttpRouter";

export default class Api extends HttpRouter {
  constructor(private readonly secretRouter: HttpRouter, private readonly databaseRouter: HttpRouter) {
    super();
  }

  router(): Router {
    return Router().use("/secret", this.secretRouter.router()).use("/database", this.databaseRouter.router());
  }

  handleError(error: Error): ErrorResponse {
    console.log(error);
    return this.errorResponse("Internal server error", "SERVER_ERROR", 500);
  }

  private errorResponse(message: string, errorCode: string, status: number) {
    return { message, errorCode, status };
  }
}
