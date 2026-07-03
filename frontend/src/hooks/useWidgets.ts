import { useQuery } from "@tanstack/react-query";

import { widgetApi } from "../api/widget.api";

export const useBarWidget = () =>
  useQuery({
    queryKey: ["widget", "bar"],
    queryFn: async () => (await widgetApi.getBar()).data,
  });

export const useLineWidget = () =>
  useQuery({
    queryKey: ["widget", "line"],
    queryFn: async () => (await widgetApi.getLine()).data,
  });

export const useTreeMapWidget = () =>
  useQuery({
    queryKey: ["widget", "treemap"],
    queryFn: async () => (await widgetApi.getTreeMap()).data,
  });

export const useScatterWidget = () =>
  useQuery({
    queryKey: ["widget", "scatter"],
    queryFn: async () => (await widgetApi.getScatter()).data,
  });
