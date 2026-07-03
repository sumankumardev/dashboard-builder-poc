import ReactECharts from "echarts-for-react";
import { useScatterWidget } from "../hooks/useWidgets";

interface Props { widget: { widgetId: string } }

export default function ScatterWidget({ widget }: Props) {
  const { data, isLoading, error } = useScatterWidget(widget.widgetId);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error</div>;

  const option = {
    xAxis: {},
    yAxis: {},
    series: [{ type: "scatter", data: data.data }],
  };

  return <ReactECharts option={option} style={{ height: "100%", width: "100%" }} />;
}
