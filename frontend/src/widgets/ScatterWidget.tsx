import ReactECharts from "echarts-for-react";
import { useScatterWidget } from "../hooks/useWidgets";

export default function ScatterWidget() {
  const {
    data,
    isLoading,
    error,
  } = useScatterWidget();

  if (isLoading)
    return <div>Loading...</div>;

  if (error)
    return <div>Error</div>;

  const option = {
    xAxis: {},

    yAxis: {},

    series: [
      {
        type: "scatter",

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