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
}
