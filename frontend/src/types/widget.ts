export type WidgetType = "bar" | "line" | "treemap" | "scatter";

export interface WidgetConfig {
  id: string;
  type: WidgetType;
  title: string;
}
