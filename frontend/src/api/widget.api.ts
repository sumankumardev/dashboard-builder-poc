import { apiClient } from "./client";

//TODO: Add the API calls for the widget endpoints here. For example:
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
