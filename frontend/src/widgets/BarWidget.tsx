import ReactECharts from "echarts-for-react";
import { useBarWidget } from "../hooks/useWidgets";

interface Props { widget: { widgetId: string } }

export default function BarWidget({ widget }: Props) {
  const { data, isLoading, error } = useBarWidget(widget.widgetId);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error</div>;

  const option = {
    tooltip: {},
    xAxis: { type: "category", data: data.data.map((item: any) => item.label) },
    yAxis: { type: "value" },
    series: [{ type: "bar", data: data.data.map((item: any) => item.value) }],
  };

  return <ReactECharts option={option} style={{ height: "100%", width: "100%" }} />;
}
