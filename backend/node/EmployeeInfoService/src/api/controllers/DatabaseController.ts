import DatabaseService from "@app/service/database/DatabaseService";
import ServiceError from "@app/service/ServiceError";
import { Request, Response } from "express";
import { MissingParameterError } from "./controllerErrors";

export default class DatabaseController {
  constructor(private readonly service: DatabaseService, private readonly secret: string) {}

  async getEmployee(req: Request, res: Response): Promise<void> {
    try {
      const { employeeId } = req.params;

      if (employeeId == null) throw new MissingParameterError("employeeId");

      res.json(await this.service.getEmployee(employeeId));
    } catch (error: any) {
      throw error;
    }
  }

  async getEmployees(req: Request, res: Response): Promise<void> {
    try {
      const { daprsecret } = req.headers;

      if (daprsecret == null) throw new MissingParameterError("daprsecret");

      if (daprsecret === this.secret) res.json(await this.service.getEmployees());
      else throw new ServiceError("Unauthorized access: invalid secret key.", 401);
    } catch (error: any) {
      throw error;
    }
  }

  async getEmployeeLogs(req: Request, res: Response): Promise<void> {
    try {
      const { employeeId } = req.params;

      if (employeeId == null) throw new MissingParameterError("employeeId");

      res.json(await this.service.getEmployeeLogs(employeeId));
    } catch (error: any) {
      throw error;
    }
  }

  async getLogs(req: Request, res: Response): Promise<void> {
    try {
      const { daprsecret } = req.headers;

      if (daprsecret == null) throw new MissingParameterError("daprsecret");

      if (daprsecret === this.secret) res.json(await this.service.getLogs());
      else throw new ServiceError("Unauthorized access: invalid secret key.", 401);
    } catch (error: any) {
      throw error;
    }
  }
}
