import { z } from "zod";

export const TreeNodeSchema: z.ZodType<any> = z.lazy(() =>
  z.object({
    name: z.string(),

    value: z.number().optional(),

    children: z.array(TreeNodeSchema).optional(),
  }),
);

export const TreeMapSchema = z.object({
  type: z.literal("treemap"),

  title: z.string(),

  data: z.array(TreeNodeSchema),
});

export type TreeMap = z.infer<typeof TreeMapSchema>;
