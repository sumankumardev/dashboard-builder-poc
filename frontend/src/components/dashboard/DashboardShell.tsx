import { useEffect } from "react";
import { useDashboard } from "../../hooks/useDashboard";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { setDashboard } from "../../store/dashboardSlice";
import DashboardGrid from "./DashboardGrid";
import { Skeleton } from "../ui/skeleton";

export default function DashboardShell() {
  const dispatch = useAppDispatch();
  const { data, isLoading, error } = useDashboard();
  const layouts = useAppSelector((state) => state.dashboard.layouts);
 
 useEffect(() => {
  if (!data) return;

  const dashboardPayload = {
    dashboardId: data._id,
    widgets: data.widgets,
    layouts: data.layouts,
    columns: data.settings?.columns,
    rowHeight: data.settings?.rowHeight,
  };

  dispatch(setDashboard(dashboardPayload));
}, [data, dispatch]);

  if (isLoading) return <Skeleton className="h-75"/>;
  if (error) return <div>Error</div>;

  return <DashboardGrid />;
}
