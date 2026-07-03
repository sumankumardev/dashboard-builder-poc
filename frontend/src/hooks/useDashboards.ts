import { useQuery } from "@tanstack/react-query";
import { dashboardApi } from "../api/dashboard.api";

export const useDashboards = () =>
  useQuery({
    queryKey: ["dashboards"],
    queryFn: async () => {
      const res = await dashboardApi.getDashboard();
      return res.data as { _id: string; name: string }[];
    },
  });
