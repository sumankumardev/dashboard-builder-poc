import { z } from "zod";

export const TimePointSchema = z.object({
  date: z.string().datetime(),
  value: z.number(),
});

export const LineChartSchema = z.object({
  type: z.literal("line"),

  title: z.string(),

  data: z.array(TimePointSchema),
});

export type LineChart = z.infer<typeof LineChartSchema>;
