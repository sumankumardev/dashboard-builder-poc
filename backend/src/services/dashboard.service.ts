import { nanoid } from "nanoid";
import Dashboard from "../models/dashboard.model.js";
import Widget from "../models/widget.model.js";

export class DashboardService {
  static async getDashboard(id: string) {
    return Dashboard.findById(id).populate("widgets");
  }
  static async getAllDashboards() {
    return Dashboard.find().populate("widgets");
  }

  static async createDashboard(payload: any) {
    return Dashboard.create(payload);
  }

  static async updateDashboard(id: string, payload: any) {
    return Dashboard.findByIdAndUpdate(id, payload, { new: true });
  }

  static async updateLayout(id: string, layouts: any[]) {
    return Dashboard.findByIdAndUpdate(id, { layouts }, { new: true });
  }

  static async deleteDashboard(id: string) {
    return Dashboard.findByIdAndDelete(id);
  }

  static async addWidgetToDashboard(dashboardId: string, widgetData: any) {
    const { layout, ...rest } = widgetData;
    const widgetId = `${rest.type}-${nanoid()}`;
    const widget = await Widget.create({ ...rest, widgetId });

    const dashboard = await Dashboard.findByIdAndUpdate(
      dashboardId,
      {
        $push: {
          widgets: widget._id,
          ...(layout ? { layouts: { ...layout, i: widgetId } } : {}),
        },
      },
      { new: true },
    ).populate("widgets");

    return { dashboard, widget };
  }

  static async updateWidgetInDashboard(_dashboardId: string, widgetId: string, payload: any) {
    return Widget.findOneAndUpdate({ widgetId }, payload, { new: true });
  }

  static async duplicateWidgetInDashboard(dashboardId: string, widgetId: string) {
    const original = await Widget.findOne({ widgetId });
    if (!original) return null;

    const newId = `${original.type}-${nanoid()}`;
    const copy = await Widget.create({
      widgetId: newId,
      title: `${original.title} (copy)`,
      type: original.type,
      dataSource: original.dataSource,
      config: original.config,
    });

    return Dashboard.findByIdAndUpdate(
      dashboardId,
      { $push: { widgets: copy._id } },
      { new: true },
    ).populate("widgets");
  }

  static async deleteWidgetFromDashboard(dashboardId: string, widgetId: string) {
    const widget = await Widget.findOne({ widgetId });
    if (!widget) return null;

    await Widget.deleteOne({ widgetId });

    return Dashboard.findByIdAndUpdate(
      dashboardId,
      { $pull: { widgets: widget._id } },
      { new: true },
    ).populate("widgets");
  }
}
