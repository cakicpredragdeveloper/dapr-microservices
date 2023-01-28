import { ConfigData } from "@config/types";
import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import helmet from "helmet";
import ServiceError from "./service/ServiceError";
import { MissingParameterError } from "./api/controllers/controllerErrors";

export type ErrorResponse = {
  message: string;
  errorCode: string;
  status: number;
};

export default abstract class HttpServer {
  private port: string;

  constructor({ server }: ConfigData) {
    const { port } = server;
    this.port = port;
  }

  start() {
    const app = express()
      .set("trust proxy", true)
      .use(cors({ credentials: true, origin: true }))
      .use(helmet())
      .use(express.json())
      .use(express.urlencoded({ limit: "50mb", extended: true, parameterLimit: 1000000 }));

    this.router(app);

    app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
      const { errorCode, message, status } = this.handleError(err);
      res.status(status).json({ message, errorCode });
    });

    app.listen(this.port, () => console.log(`Listening on port ${this.port}...`));
  }

  protected handleError(error: Error): ErrorResponse {
    if (error instanceof ServiceError)
      return { message: error.errorMessage, errorCode: error.errorCode, status: error.status };
    if (error instanceof MissingParameterError)
      return { message: error.message, errorCode: "MISSING_PARAMETER", status: 400 };

    return {
      message: "Internal server error",
      errorCode: "SERVER_ERROR",
      status: 500
    };
  }

  protected errorResponse(message: string, errorCode: string, status: number): ErrorResponse {
    return { message, errorCode, status };
  }

  protected abstract router(app: express.Application): void;
}
