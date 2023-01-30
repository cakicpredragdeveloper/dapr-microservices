import Service from "@app/service/Service";
import { Request, Response } from "express";

export default class ServiceController {
  constructor(private readonly service: Service) {}

  async insertWorkingHours(req: Request, res: Response): Promise<void> {
    try {
      const values = req.body;

      const message = await this.service.insertWorkingHours(values);
      if (message === "OK")
        res.json({
          message
        });
    } catch (error: any) {
      throw error;
    }
  }
}
