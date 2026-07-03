import { z } from "zod";

import { BarChartSchema } from "./bar.schema.js";

import { LineChartSchema } from "./line.schema.js";

import { TreeMapSchema } from "./treemap.schema.js";

import { ScatterSchema } from "./scatter.schema.js";

export const WidgetSchema = z.discriminatedUnion("type", [
  BarChartSchema,
  LineChartSchema,
  TreeMapSchema,
  ScatterSchema,
]);
