import { generateBarData } from "./generateBarData.js";

import { generateLineData } from "./generateLineData.js";

import { generateTreeMapData } from "./generateTreeMapData.js";

import { generateScatterData } from "./generateScatterData.js";

export const mockEngine = {
  bar: generateBarData,

  line: generateLineData,

  treemap: generateTreeMapData,

  scatter: generateScatterData,
};
