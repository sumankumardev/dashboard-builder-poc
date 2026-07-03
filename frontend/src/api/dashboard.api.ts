import { apiClient } from "./client";

export const dashboardApi = {
  // saveDashboard(data: any) {
  //   return apiClient.post("/dashboard", data);
  // },

  getDashboard() {
    return apiClient.get("/dashboards");
  },
};