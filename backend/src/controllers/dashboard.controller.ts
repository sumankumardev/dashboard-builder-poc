import { Request, Response } from "express";
import { DashboardService } from "../services/dashboard.service.js";

export class DashboardController {
  static async getAll(req: Request, res: Response) {
    try {
      const dashboards = await DashboardService.getAllDashboards();
      res.json(dashboards);
    } catch (error) {
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

  static async getById(req: Request, res: Response) {
    try {
      const dashboard = await DashboardService.getDashboard(
        req.params["id"] as string,
      );
      if (!dashboard) {
        return res.status(404).json({ message: "Dashboard not found" });
      }
      res.json(dashboard);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const id = req.params["id"] as string;
      if (!id) {
        return res.status(400).json({ message: "Dashboard ID is required" });
      }
      const dashboard = await DashboardService.updateDashboard(id, req.body);
      if (!dashboard) {
        return res.status(404).json({ message: "Dashboard not found" });
      }
      res.json(dashboard);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  static async updateLayout(req: Request, res: Response) {
    try {
      const id = req.params["id"] as string;
      if (!id) {
        return res.status(400).json({ message: "Dashboard ID is required" });
      }
      const dashboard = await DashboardService.updateLayout(id, req.body.layouts);
      if (!dashboard) {
        return res.status(404).json({ message: "Dashboard not found" });
      }
      res.json(dashboard);
    } catch (error) {
      res.status(500).json(error);
    }
  }
}
