import DatabaseService from "@app/service/database/DatabaseService";
import ServiceError from "@app/service/ServiceError";
import { Request, Response } from "express";
import { MissingParameterError } from "./controllerErrors";

export default class DatabaseController {
  constructor(private readonly service: DatabaseService) {}

  async getEmployees(req: Request, res: Response): Promise<void> {
    try {
      const { daprsecret } = req.headers;

      if (daprsecret == null) throw new MissingParameterError("daprsecret");
      if (daprsecret === "053346ef9f77c7f9c7eb9b3e78c1b72c") {
        const employees = await this.service.getEmployees();

        res.json(employees);
      } else throw new ServiceError("Unauthorized access: invalid secret key.", 401);
    } catch (error: any) {
      throw error;
    }
  }
}
