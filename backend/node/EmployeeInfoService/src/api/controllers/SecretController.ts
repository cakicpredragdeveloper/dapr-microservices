import SecretService from "@app/service/secret/SecretService";
import ServiceError from "@app/service/ServiceError";
import { Response } from "express";

export default class SecretController {
  constructor(private readonly service: SecretService) {}

  async getSecret(res: Response): Promise<void> {
    try {
      const secret = await this.service.getSecret();
      res.json(secret);
    } catch (error: any) {
      throw new ServiceError(error.message);
    }
  }
}
