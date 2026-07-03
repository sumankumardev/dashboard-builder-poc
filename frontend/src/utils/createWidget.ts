import { nanoid } from "@reduxjs/toolkit";

export const createWidget = (type: "bar" | "line" | "treemap" | "scatter") => {
  const id = `${type}-${nanoid()}`;

  return {
    widget: {
      _id: id,

      widgetId: id,

      title: `${type} chart`,

      type,

      dataSource: `/api/widgets/${type}`,

      config: {},
    },

    layout: {
      i: id,

      x: 0,

      y: Infinity,

      w: 6,

      h: 8,
    },
  };
};
