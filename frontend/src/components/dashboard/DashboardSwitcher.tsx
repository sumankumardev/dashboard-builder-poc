import { useDashboards } from "../../hooks/useDashboards";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { setDashboard, resetDashboard } from "../../store/dashboardSlice";
import { dashboardApi } from "../../api/dashboard.api";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function DashboardSwitcher() {
  const dispatch = useAppDispatch();
  const currentId = useAppSelector((s) => s.dashboard.dashboardId);
  const { data: dashboards = [] } = useDashboards();

  const handleSwitch = async (id: string) => {
    if (id === currentId) return;
    const res = await dashboardApi.getDashboardById(id);
    const d = res.data;
    dispatch(resetDashboard());
    dispatch(setDashboard({
      dashboardId: d._id,
      widgets: d.widgets ?? [],
      layouts: d.layouts ?? [],
      columns: d.settings?.columns,
      rowHeight: d.settings?.rowHeight,
    }));
  };

  if (dashboards.length <= 1) return null;

  return (
    <Select value={currentId ?? ""} onValueChange={handleSwitch}>
      <SelectTrigger className="w-48">
        <SelectValue placeholder="Select dashboard" />
      </SelectTrigger>
      <SelectContent>
        {dashboards.map((d) => (
          <SelectItem key={d._id} value={d._id}>
            {d.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
