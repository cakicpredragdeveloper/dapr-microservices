import Service from "@app/service/Service";
import { Request, Response } from "express";

export default class ServiceController {
  constructor(private readonly service: Service) {}

  async insertWorkingHours(req: Request, res: Response): Promise<void> {
    try {
      const values = req.body;

      res.json({
        message: await this.service.insertWorkingHours(values)
      });
    } catch (error: any) {
      throw error;
    }
  }
}
