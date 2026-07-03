import type { DashboardLayout } from "../store/dashboardSlice";
import { apiClient } from "./client";

export const dashboardApi = {
  // saveDashboard(data: any) {
  //   return apiClient.post("/dashboard", data);
  // },

  getDashboard() {
    return apiClient.get("/dashboards");
  },
  updateLayout(id: string, layouts: DashboardLayout[]) {
    // console.log("Updating dashboard layout:", { id, layouts });
    return apiClient.put(`/dashboards/${id}/layout`, {
      layouts,
    });
  },
};
