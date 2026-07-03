import { useState } from "react";
import { BarChart2, LineChart, Map, ScatterChart, LayoutDashboard, Plus, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { addWidget, setDashboard, resetDashboard, type DashboardLayout } from "../../store/dashboardSlice";
import { dashboardApi } from "../../api/dashboard.api";
import { store } from "../../store/store";
import { useQueryClient } from "@tanstack/react-query";

type WidgetType = "bar" | "line" | "treemap" | "scatter";

const WIDGET_CATALOG: { type: WidgetType; label: string; icon: React.ReactNode }[] = [
  { type: "bar",      label: "Bar Chart",    icon: <BarChart2 className="h-4 w-4" /> },
  { type: "line",     label: "Line Chart",   icon: <LineChart className="h-4 w-4" /> },
  { type: "treemap",  label: "Tree Map",     icon: <Map className="h-4 w-4" /> },
  { type: "scatter",  label: "Scatter Plot", icon: <ScatterChart className="h-4 w-4" /> },
];

export default function DashboardToolbar() {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();
  const dashboardId = useAppSelector((s) => s.dashboard.dashboardId);

  // Add widget dialog
  const [widgetDialog, setWidgetDialog] = useState<{ open: boolean; type: WidgetType | null }>({ open: false, type: null });
  const [widgetTitle, setWidgetTitle] = useState("");
  const [widgetLoading, setWidgetLoading] = useState(false);

  // New layout dialog
  const [layoutDialog, setLayoutDialog] = useState(false);
  const [layoutName, setLayoutName] = useState("");
  const [layoutLoading, setLayoutLoading] = useState(false);

  const openWidgetDialog = (type: WidgetType) => {
    setWidgetTitle(`${WIDGET_CATALOG.find((w) => w.type === type)!.label}`);
    setWidgetDialog({ open: true, type });
  };

  const handleAddWidget = async () => {
    if (!dashboardId || !widgetDialog.type) return;
    setWidgetLoading(true);
    try {
      const layout = { i: "", x: 0, y: Infinity, w: 6, h: 8 };
      const result = await dashboardApi.addWidget(dashboardId, {
        type: widgetDialog.type,
        title: widgetTitle,
        dataSource: `/api/widgets/${widgetDialog.type}`,
        config: {},
        layout,
      });
      const { widget } = result.data;
      const newLayout: DashboardLayout = { i: widget.widgetId, x: 0, y: Infinity, w: 6, h: 8 };
      dispatch(addWidget({
        _id: widget._id,
        widgetId: widget.widgetId,
        title: widget.title,
        type: widget.type,
        dataSource: widget.dataSource,
        config: widget.config,
        layoutEntry: newLayout,
      } as any));
      // read layouts after dispatch so the new entry is included
      const updatedLayouts = store.getState().dashboard.layouts;
      await dashboardApi.updateLayout(dashboardId, updatedLayouts);
      setWidgetDialog({ open: false, type: null });
    } finally {
      setWidgetLoading(false);
    }
  };

  const handleNewLayout = async () => {
    if (!layoutName.trim()) return;
    setLayoutLoading(true);
    try {
      const res = await dashboardApi.createDashboard(layoutName.trim());
      const d = res.data;
      dispatch(resetDashboard());
      dispatch(setDashboard({
        dashboardId: d._id,
        widgets: d.widgets ?? [],
        layouts: d.layouts ?? [],
        columns: d.settings?.columns,
        rowHeight: d.settings?.rowHeight,
      }));
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
      queryClient.invalidateQueries({ queryKey: ["dashboards"] });
      setLayoutDialog(false);
      setLayoutName("");
    } finally {
      setLayoutLoading(false);
    }
  };

  return (
    <>
      <div className="flex flex-wrap gap-2 mb-4">
        {WIDGET_CATALOG.map(({ type, label, icon }) => (
          <Button key={type} variant="outline" onClick={() => openWidgetDialog(type)}>
            {icon}
            <Plus className="h-3 w-3 -ml-1" />
            {label}
          </Button>
        ))}

        <Button variant="default" onClick={() => { setLayoutName(""); setLayoutDialog(true); }}>
          <LayoutDashboard className="h-4 w-4" />
          New Layout
        </Button>
      </div>

      {/* Add Widget Dialog */}
      <Dialog open={widgetDialog.open} onOpenChange={(o) => setWidgetDialog({ open: o, type: widgetDialog.type })}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Add {WIDGET_CATALOG.find((w) => w.type === widgetDialog.type)?.label}
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-2 py-2">
            <Label htmlFor="widget-title">Widget Title</Label>
            <Input
              id="widget-title"
              value={widgetTitle}
              onChange={(e) => setWidgetTitle(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAddWidget()}
              autoFocus
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setWidgetDialog({ open: false, type: null })}>
              Cancel
            </Button>
            <Button onClick={handleAddWidget} disabled={!widgetTitle.trim() || widgetLoading}>
              {widgetLoading && <Loader2 className="h-4 w-4 animate-spin" />}
              Add Widget
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* New Layout Dialog */}
      <Dialog open={layoutDialog} onOpenChange={setLayoutDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>New Layout</DialogTitle>
          </DialogHeader>
          <div className="grid gap-2 py-2">
            <Label htmlFor="layout-name">Layout Name</Label>
            <Input
              id="layout-name"
              placeholder="e.g. Sales Dashboard"
              value={layoutName}
              onChange={(e) => setLayoutName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleNewLayout()}
              autoFocus
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setLayoutDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleNewLayout} disabled={!layoutName.trim() || layoutLoading}>
              {layoutLoading && <Loader2 className="h-4 w-4 animate-spin" />}
              Create
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
