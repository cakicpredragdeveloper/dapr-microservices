import HttpRouter from "@app/HttpRouter";
import { Router } from "express";
import asyncHandler from "express-async-handler";

import ServiceController from "../controllers/DatabaseController";

export default class DatabaseRouter extends HttpRouter {
  constructor(private readonly controller: ServiceController) {
    super();
  }

  router(): Router {
    return Router()
      .get(
        "/employees",
        asyncHandler(async (req, res) => this.controller.getEmployees(req, res))
      )
      .get(
        "/employees/:employeeId",
        asyncHandler(async (req, res) => this.controller.getEmployee(req, res))
      )
      .get(
        "/logs",
        asyncHandler(async (req, res) => this.controller.getLogs(req, res))
      )
      .get(
        "/logs/:employeeId",
        asyncHandler(async (req, res) => this.controller.getEmployeeLogs(req, res))
      );
  }
}
