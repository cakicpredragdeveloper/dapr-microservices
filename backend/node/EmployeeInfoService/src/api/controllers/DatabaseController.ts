import DatabaseService from "@app/service/database/DatabaseService";
import ServiceError from "@app/service/ServiceError";
import { Request, Response } from "express";

export default class DatabaseController {
  constructor(private readonly service: DatabaseService) {}

  async getEmployees(req: Request, res: Response): Promise<void> {
    try {
      const values = req.body;
      const employees = await this.service.getEmployees();

      res.json(employees);
    } catch (error: any) {
      throw new ServiceError(error.message);
    }
  }
}
