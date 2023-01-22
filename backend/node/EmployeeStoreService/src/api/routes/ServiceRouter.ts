import HttpRouter from "@app/HttpRouter";
import { Router } from "express";
import asyncHandler from "express-async-handler";

import ServiceController from "../controllers/ServiceController";

export default class ServiceRouter extends HttpRouter {
  constructor(private readonly controller: ServiceController) {
    super();
  }
  router(): Router {
    return Router().post(
      "/insert",
      asyncHandler(async (req, res) => this.controller.insertWorkingHours(req, res))
    );
  }
}
