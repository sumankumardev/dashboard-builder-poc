import { dashboardApi } from "@/api/dashboard.api";
import type { Widget } from "@/types/widget";
import { useQuery } from "@tanstack/react-query";



export const useWidgetDelete = (dashboardId: string, widgetId: string) => {
  useQuery({
    queryKey: ["widgetDelete"],
    queryFn: async () => {
      const res = await dashboardApi.deleteWidget(dashboardId, widgetId);
      return res.data;
    },
  });
};

export const useWidgetDuplicate = (dashboardId: string, widgetId: string) => {
  useQuery({
    queryKey: ["widgetDuplicate"],
    queryFn: async () => {
      const res = await dashboardApi.duplicateWidget(dashboardId, widgetId);
      return res.data;
    },
  });
};

//TODO


// export const useWidgetEditSave=(dashboardId: string, widgetId: string,,)=>{
//     useQuery({
//         queryKey:["widgetEditSave"],
//         queryFn:async ()=>{
//             const res=await dashboardApi.updateWidget(dashboardId,widgetId),{
//                 title:editTile
//             };
//         }
//     })
// }