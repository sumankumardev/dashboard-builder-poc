import connectDb from "../config/db.js";
import dotenv from "dotenv";
import Dashboard from "../models/dashboard.model.js";
import Widget from "../models/widget.model.js";
dotenv.config();

import type { IWidget, WidgetType } from "../models/widget.model.js";

type WidgetInput = { widgetId: string; title: string; type: WidgetType; dataSource: string; config: Record<string, unknown> };

const seedDashboard = async () => {
  try {
    await connectDb();

    console.log("Connected");

    await Dashboard.deleteMany({});
    await Widget.deleteMany({});

    const widgetData: WidgetInput[] = [
      {
        widgetId: "bar-widget",
        title: "Student Enrollment",
        type: "bar",
        dataSource: "/api/widgets/bar",
        config: { xAxis: "label", yAxis: "value" },
      },
      {
        widgetId: "line-widget",
        title: "Monthly Revenue",
        type: "line",
        dataSource: "/api/widgets/line",
        config: { xAxis: "date", yAxis: "value" },
      },
      {
        widgetId: "treemap-widget",
        title: "Department Distribution",
        type: "treemap",
        dataSource: "/api/widgets/treemap",
        config: {},
      },
      {
        widgetId: "scatter-widget",
        title: "Student Performance",
        type: "scatter",
        dataSource: "/api/widgets/scatter",
        config: {},
      },
    ];

    const widgets = await Widget.insertMany(widgetData as unknown as IWidget[]);

    const dashboard = await Dashboard.create({
      name: "Analytics Dashboard",
      description: "Dashboard Builder POC",
      widgets: widgets.map((w) => w._id),
      layouts: [
        { i: "bar-widget", x: 0, y: 0, w: 6, h: 8 },
        { i: "line-widget", x: 6, y: 0, w: 6, h: 8 },
        { i: "treemap-widget", x: 0, y: 8, w: 6, h: 8 },
        { i: "scatter-widget", x: 6, y: 8, w: 6, h: 8 },
      ],
      settings: {
        columns: 12,
        rowHeight: 30,
        compactType: "vertical",
      },
    });

    console.log("Dashboard seeded:", dashboard._id);
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedDashboard();
