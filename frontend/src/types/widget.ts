export type WidgetType = "bar" | "line" | "treemap" | "scatter";

export interface Widget {
  _id: string;

  widgetId: string;

  title: string;

  type: WidgetType;

  dataSource: string;

  config: Record<string, unknown>;
}
