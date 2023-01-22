import { AuthConfig } from "@app/config/types";
import SecretService from "@app/service/secret/SecretService";
import ServiceError from "@app/service/ServiceError";
import { Request, Response } from "express";
import { MissingParameterError } from "./controllerErrors";

export default class SecretController {
  constructor(private readonly service: SecretService, private readonly auth: AuthConfig) {}

  async getSecret(req: Request, res: Response): Promise<void> {
    try {
      const { username, password } = req.body;

      if (username == null) throw new MissingParameterError("username");

      if (password == null) throw new MissingParameterError("password");

      if (this.auth.username === username && this.auth.password === password) {
        const secret = await this.service.getSecret();
        res.json(secret);
      } else {
        throw new ServiceError(
          `Unathorized Access: ${this.auth.username !== username ? "Username" : "Password"} is not valid.`,
          401
        );
      }
    } catch (error: any) {
      throw error;
    }
  }
}
