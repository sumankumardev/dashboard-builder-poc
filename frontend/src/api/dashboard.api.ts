import type { DashboardLayout } from "../store/dashboardSlice";
import { apiClient } from "./client";

export const dashboardApi = {
  getDashboard() {
    return apiClient.get("/dashboards");
  },
  updateLayout(id: string, layouts: DashboardLayout[]) {
    return apiClient.put(`/dashboards/${id}/layout`, { layouts });
  },
  addWidget(dashboardId: string, widgetData: object) {
    return apiClient.post(`/dashboards/${dashboardId}/widgets`, widgetData);
  },
  updateWidget(dashboardId: string, widgetId: string, payload: object) {
    return apiClient.put(`/dashboards/${dashboardId}/widgets/${widgetId}`, payload);
  },
  duplicateWidget(dashboardId: string, widgetId: string) {
    return apiClient.post(`/dashboards/${dashboardId}/widgets/${widgetId}/duplicate`, {});
  },
  deleteWidget(dashboardId: string, widgetId: string) {
    return apiClient.delete(`/dashboards/${dashboardId}/widgets/${widgetId}`);
  },
  createDashboard(name: string) {
    return apiClient.post("/dashboards", { name });
  },
};
