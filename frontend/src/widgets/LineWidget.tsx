import ReactECharts from "echarts-for-react";
import { useLineWidget } from "../hooks/useWidgets";

export default function LineWidget() {
  const {
    data,
    isLoading,
    error,
  } = useLineWidget();

  if (isLoading)
    return <div>Loading...</div>;

  if (error)
    return <div>Error</div>;

  const option = {
    tooltip: {},

    xAxis: {
      type: "category",

      data: data.data.map(
        (item: any) =>
          item.date
      ),
    },

    yAxis: {
      type: "value",
    },

    series: [
      {
        type: "line",

        smooth: true,

        data: data.data.map(
          (item: any) =>
            item.value
        ),
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