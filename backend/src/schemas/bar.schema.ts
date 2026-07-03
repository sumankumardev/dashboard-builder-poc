import { z } from "zod";

export const BarDataSchema = z.object({
  label: z.string(),
  value: z.number(),
});

export const BarChartSchema = z.object({
  type: z.literal("bar"),

  title: z.string(),

  data: z.array(BarDataSchema),
});

export type BarChart = z.infer<typeof BarChartSchema>;
