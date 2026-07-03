import { useQuery } from "@tanstack/react-query";

import { dashboardApi } from "../api/dashboard.api";

export const useDashboard = () => {
  return useQuery({
    queryKey: ["dashboard"],

    queryFn: async () => {
      const res = await dashboardApi.getDashboard();
        console.log(res.data);
      return res.data[0];
    },
  });
};
