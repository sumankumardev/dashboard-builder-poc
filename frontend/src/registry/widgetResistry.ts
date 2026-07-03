import BarWidget from "../widgets/BarWidget";
import LineWidget from "../widgets/LineWidget";
import ScatterWidget from "../widgets/ScatterWidget";
import TreeMapWidget from "../widgets/TreeMapWidget";

export const widgetRegistry = {
  bar: BarWidget,
  line: LineWidget,
  treemap: TreeMapWidget,
  scatter: ScatterWidget,
};
