import type { Widget } from "./widget";

export interface Layout {
  i: string;

  x: number;

  y: number;

  w: number;

  h: number;
}

export interface Dashboard {
  _id: string;

  description: string;

  widgets: Widget[];

  layouts: Layout[];

  settings: {
    columns: number;

    rowHeight: number;

    compactType: "vertical" | "horizontal" | null;
  };
}
