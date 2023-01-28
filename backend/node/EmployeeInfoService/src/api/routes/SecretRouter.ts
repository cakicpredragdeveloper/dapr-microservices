import HttpRouter from "@app/HttpRouter";
import { Router } from "express";
import asyncHandler from "express-async-handler";

import SecretServiceController from "../controllers/SecretController";

export default class SecretRouter extends HttpRouter {
  constructor(private readonly controller: SecretServiceController) {
    super();
  }

  router(): Router {
    return Router().post(
      "/",
      asyncHandler(async (req, res) => this.controller.getSecret(req, res))
    );
  }
}
