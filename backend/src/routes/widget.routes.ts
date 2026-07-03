import { Router } from "express";

import { WidgetController } from "../controllers/widget.controller.js";

const router = Router();

// router.get("/", WidgetController.getAll);

// router.post("/", WidgetController.create);

router.get(
  "/bar",
  WidgetController.getBar
);

router.get(
  "/line",
  WidgetController.getLine
);

router.get(
  "/treemap",
  WidgetController.getTreeMap
);

router.get(
  "/scatter",
  WidgetController.getScatter
);
export default router;
