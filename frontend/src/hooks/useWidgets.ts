import { useQuery } from "@tanstack/react-query";
import { widgetApi } from "../api/widget.api";

export const useBarWidget = (widgetId: string) =>
  useQuery({
    queryKey: ["widget", "bar", widgetId],
    queryFn: async () => (await widgetApi.getBar()).data,
  });

export const useLineWidget = (widgetId: string) =>
  useQuery({
    queryKey: ["widget", "line", widgetId],
    queryFn: async () => (await widgetApi.getLine()).data,
  });

export const useTreeMapWidget = (widgetId: string) =>
  useQuery({
    queryKey: ["widget", "treemap", widgetId],
    queryFn: async () => (await widgetApi.getTreeMap()).data,
  });

export const useScatterWidget = (widgetId: string) =>
  useQuery({
    queryKey: ["widget", "scatter", widgetId],
    queryFn: async () => (await widgetApi.getScatter()).data,
  });
