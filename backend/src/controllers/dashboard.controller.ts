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

  // static async updateLayout(req: Request, res: Response) {
  //   try {
  //     const id = req.params["id"] as string;
  //     const { layouts } = req.body;
  //     if (!id) return res.status(400).json({ message: "Dashboard ID is required" });
  //     const dashboard = await DashboardService.updateLayout(id, layouts);
  //     if (!dashboard) return res.status(404).json({ message: "Dashboard not found" });
  //     res.json(dashboard);
  //   } catch (error) {
  //     res.status(500).json(error);
  //   }
  // }

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
    // console.log(req.body);
    try {
      const id = req.params["id"] as string;
      if (!id) {
        return res.status(400).json({ message: "Dashboard ID is required" });
      }
      const dashboard = await DashboardService.updateLayout(
        id,
        req.body.layouts,
      );
      if (!dashboard) {
        return res.status(404).json({ message: "Dashboard not found" });
      }
      res.json(dashboard);
    } catch (error) {
      console.error("Error updating dashboard layout:", error);
      res.status(500).json(error);
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      const id = req.params["id"] as string;
      if (!id) {
        return res.status(400).json({ message: "Dashboard ID is required" });
      }
      const dashboard = await DashboardService.deleteDashboard(id);
      if (!dashboard) {
        return res.status(404).json({ message: "Dashboard not found" });
      }
      res.json({ message: "Dashboard deleted successfully" });
    } catch (error) {
      res.status(500).json(error);
    }
  }

  static async deleteWidget(req: Request, res: Response) {
    try {
      const dashboardId = req.params["dashboardId"] as string;
      const widgetId = req.params["widgetId"] as string;

      if (!dashboardId || !widgetId) {
        return res
          .status(400)
          .json({ message: "Dashboard ID and Widget ID are required" });
      }

      const dashboard = await DashboardService.deleteWidgetFromDashboard(
        dashboardId,
        widgetId,
      );
      if (!dashboard) {
        return res.status(404).json({ message: "Dashboard not found" });
      }
      res.json(dashboard);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  static async addWidget(req: Request, res: Response) {
    try {
      const dashboardId = req.params["dashboardId"] as string;
      const widgetData = req.body;

      if (!dashboardId) {
        return res.status(400).json({ message: "Dashboard ID is required" });
      }
      if (
        !widgetData.hasOwnProperty("type") ||
        !widgetData.hasOwnProperty("title") ||
        !widgetData.hasOwnProperty("layout")
      ) {
        return res
          .status(400)
          .json({ message: "Widget data must have type, title and layout" });
      }
      const result = await DashboardService.addWidgetToDashboard(
        dashboardId,
        widgetData,
      );
      res.json(result);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  static async updateWidget(req: Request, res: Response) {
    try {
      const dashboardId = req.params["dashboardId"] as string;
      const widgetId = req.params["widgetId"] as string;
      const widget = await DashboardService.updateWidgetInDashboard(
        dashboardId,
        widgetId,
        req.body,
      );
      if (!widget) return res.status(404).json({ message: "Not found" });
      res.json(widget);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  static async duplicateWidget(req: Request, res: Response) {
    try {
      console.log(req.params);
      const dashboardId = req.params["dashboardId"] as string;
      const widgetId = req.params["widgetId"] as string;
      const dashboard = await DashboardService.duplicateWidgetInDashboard(
        dashboardId,
        widgetId,
      );
      if (!dashboard) return res.status(404).json({ message: "Not found" });
      res.json(dashboard);
    } catch (error) {
      console.error(error);
      res.status(500).json(error);
    }
  }
}
