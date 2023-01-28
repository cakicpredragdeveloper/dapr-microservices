import Service from "@app/service/Service";
import ServiceError from "@app/service/ServiceError";
import { Request, Response } from "express";

export default class ServiceController {
  constructor(private readonly service: Service) {}

  async insertWorkingHours(req: Request, res: Response): Promise<void> {
    try {
      const values = req.body;
      const message = await this.service.insertWorkingHours(values, res);

      if (message === "OK") {
        res.json({
          message
        });
      } else throw new ServiceError("ERROR");
    } catch (error: any) {
      throw new ServiceError(error.message);
    }
  }
}
