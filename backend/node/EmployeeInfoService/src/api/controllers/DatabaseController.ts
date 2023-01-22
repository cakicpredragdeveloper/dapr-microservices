import DatabaseService from "@app/service/database/DatabaseService";
import ServiceError from "@app/service/ServiceError";
import { Request, Response } from "express";
import { MissingParameterError } from "./controllerErrors";

export default class DatabaseController {
  constructor(private readonly service: DatabaseService, private readonly secret: string) {}

  async getEmployees(req: Request, res: Response): Promise<void> {
    try {
      const { daprsecret } = req.headers;

      if (daprsecret == null) throw new MissingParameterError("daprsecret");
      if (daprsecret === this.secret) {
        const employees = await this.service.getEmployees();

        res.json(employees);
      } else throw new ServiceError("Unauthorized access: invalid secret key.", 401);
    } catch (error: any) {
      throw error;
    }
  }
}
