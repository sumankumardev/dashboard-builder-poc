import ReactECharts from "echarts-for-react";
import { useTreeMapWidget } from "../hooks/useWidgets";

export default function TreeMapWidget() {
  const {
    data,
    isLoading,
    error,
  } = useTreeMapWidget();

  if (isLoading)
    return <div>Loading...</div>;

  if (error)
    return <div>Error</div>;

  const option = {
    series: [
      {
        type: "treemap",

        data: data.data,
      },
    ],
  };

  return (
    <ReactECharts
      option={option}
      style={{
        height: "100%",
        width: "100%",
      }}
    />
  );
}