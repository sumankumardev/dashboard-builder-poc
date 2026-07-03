import { Router } from "express";
import { DashboardController } from "../controllers/dashboard.controller.js";

const router = Router();

router.get("/", DashboardController.getAll);
router.post("/", DashboardController.create);
router.put("/:id/layout", DashboardController.updateLayout);

router.post("/:dashboardId/widgets", DashboardController.addWidget);
router.put("/:dashboardId/widgets/:widgetId", DashboardController.updateWidget);
router.post(
  "/:dashboardId/widgets/:widgetId/duplicate",
  DashboardController.duplicateWidget,
);
router.delete(
  "/:dashboardId/widgets/:widgetId",
  DashboardController.deleteWidget,
);

export default router;
