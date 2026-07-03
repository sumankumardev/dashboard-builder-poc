import { ResponsiveGridLayout, useContainerWidth } from "react-grid-layout";
import type { Layout } from "react-grid-layout";

import { useAppDispatch } from "../../hooks/redux";
import { useAppSelector } from "../../hooks/redux";

import { updateLayouts } from "../../store/dashboardSlice";

import WidgetRenderer from "../widget/WidgetRenderer";

import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

export default function DashboardGrid() {
  const dispatch = useAppDispatch();

  const widgets = useAppSelector((state) => state?.dashboard?.widgets);
  const layouts = useAppSelector((state) => state?.dashboard?.layouts);
  const rowHeight = useAppSelector((state) => state?.dashboard?.rowHeight);

  const handleLayoutChange = (newLayouts: Layout) => {
    dispatch(updateLayouts([...newLayouts]));
  };

  const { containerRef, width } = useContainerWidth();

  return (
    <div ref={containerRef}>
    <ResponsiveGridLayout
      className="layout"
      width={width}
      layouts={{
        lg: layouts,
        md: layouts,
        sm: layouts,
        xs: layouts,
        xxs: layouts,
      }}
      breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
      cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
      rowHeight={rowHeight}
      dragConfig={{ handle: ".widget-card-header" }}
      onLayoutChange={handleLayoutChange}
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
