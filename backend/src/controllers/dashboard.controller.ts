import { Request, Response } from "express";

import { DashboardService } from "../services/dashboard.service.js";

export class DashboardController {
  static async getAll(req: Request, res: Response) {
    try {
      const dashboards = await DashboardService.getAllDashboards();
      //   console.log(dashboards);
      res.json(dashboards);
    } catch (error) {
      console.error(error);
      res.status(500).json(error);
    }
  }

  static async create(req: Request, res: Response) {
    try {
      const dashboard = await DashboardService.createDashboard(req.body);

      res.status(201).json(dashboard);
    } catch (error) {
      res.status(500).json(error);
    }
  }
}
