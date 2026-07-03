import { useEffect } from "react";
import { useDashboard } from "../../hooks/useDashboard";
import { useAppDispatch } from "../../hooks/redux";
import { setDashboard } from "../../store/dashboardSlice";
import DashboardGrid from "./DashboardGrid";

export default function DashboardShell() {
  const dispatch = useAppDispatch();
  const { data, isLoading, error } = useDashboard();

  useEffect(() => {
    if (!data) return;
    dispatch(setDashboard({
      widgets: data.widgets,
      layouts: data.layouts,
      columns: data.settings?.columns,
      rowHeight: data.settings?.rowHeight,
    }));
  }, [data, dispatch]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error</div>;

  return <DashboardGrid />;
}
