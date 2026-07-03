import { widgetRegistry } from "../../registry/widgetResistry";
import type { ComponentType } from "react";
import WidgetCard from "./WidgetCard";

type WidgetType = keyof typeof widgetRegistry;

export interface Widget {
  widgetId: string;
  type: WidgetType;
  title: string;
}

export default function WidgetRenderer({ widget }: { widget: Widget }) {

  const Component = widgetRegistry[widget.type] as ComponentType<{ widget: Widget }>;

  if (!Component)
    return (
      <div>
        Unknown Widget
      </div>
    );

  return (
    <WidgetCard
      title={widget.title}
    >
      <Component
        widget={widget}
      />
    </WidgetCard>
  );
}