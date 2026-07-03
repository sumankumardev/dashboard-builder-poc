import { useState } from "react";
import { ResponsiveGridLayout, useContainerWidth } from "react-grid-layout";
import type { Layout, EventCallback, ResponsiveLayouts } from "react-grid-layout";

import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { updateLayouts, type DashboardLayout } from "../../store/dashboardSlice";
import { dashboardApi } from "../../api/dashboard.api";
import WidgetRenderer from "../widget/WidgetRenderer";

import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

export default function DashboardGrid() {
  const dispatch = useAppDispatch();

  const widgets = useAppSelector((state) => state.dashboard.widgets);
  const layouts = useAppSelector((state) => state.dashboard.layouts);
  const rowHeight = useAppSelector((state) => state.dashboard.rowHeight);
  const dashboardId = useAppSelector((state) => state.dashboard.dashboardId);

  const [initialLayouts] = useState<ResponsiveLayouts>(() => {
    if (layouts.length === 0) return {};
    const l = layouts as unknown as Layout;
    return { lg: l, md: l, sm: l, xs: l, xxs: l };
  });

  const saveLayout: EventCallback = (layout) => {
    const mutable = (layout as unknown as DashboardLayout[]).map(({ i, x, y, w, h }) => ({ i, x, y, w, h }));
    dispatch(updateLayouts(mutable));
    if (dashboardId) {
      dashboardApi.updateLayout(dashboardId, mutable);
    }
  };

  const { containerRef, width } = useContainerWidth();

  return (
    <div ref={containerRef}>
      <ResponsiveGridLayout
        className="layout"
        width={width}
        layouts={initialLayouts}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
        rowHeight={rowHeight}
        draggableHandle=".widget-card-header"
        onDragStop={saveLayout}
        onResizeStop={saveLayout}
      >
        {widgets.map((widget) => (
          <div key={widget.widgetId}>
            <WidgetRenderer widget={widget} />
          </div>
        ))}
      </ResponsiveGridLayout>
    </div>
  );
}
