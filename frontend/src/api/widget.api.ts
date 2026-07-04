import { apiClient } from "./client";


export const widgetApi = {
  getBar() {
    return apiClient.get("/widgets/bar");
  },

  getLine() {
    return apiClient.get("/widgets/line");
  },

  getTreeMap() {
    return apiClient.get("/widgets/treemap");
  },
  getScatter() {
    return apiClient.get("/widgets/scatter");
  },
};
