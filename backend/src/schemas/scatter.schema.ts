import { z } from "zod";

export const PointSchema = z.tuple([z.number(), z.number()]);

export const ScatterSchema = z.object({
  type: z.literal("scatter"),

  title: z.string(),

  data: z.array(PointSchema),
});

export type Scatter = z.infer<typeof ScatterSchema>;
