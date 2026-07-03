import Dashboard from "../models/dashboard.model.js";

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
    return Dashboard.findByIdAndUpdate(
      id,
      {
        layouts,
      },
      {
        new: true,
      },
    );
  }

  static async deleteDashboard(id: string) {
    return Dashboard.findByIdAndDelete(id);
  }
  static async addWidgetToDashboard(dashboardId: string, widgetData: any) {
    return Dashboard.findByIdAndUpdate(
      dashboardId,
      { $push: { widgets: widgetData } },
      { new: true },
    ).populate("widgets");
  }



  static async deleteWidgetFromDashboard(dashboardId: string, widgetId: string) {
    return Dashboard.findByIdAndUpdate(
      dashboardId,
      { $pull: { widgets: { widgetId } } },
      { new: true },
    ).populate("widgets");
  }
}
