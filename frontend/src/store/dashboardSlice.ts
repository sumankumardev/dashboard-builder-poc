import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

export interface DashboardLayout {
  i: string;
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface DashboardWidget {
  _id: string;
  widgetId: string;
  title: string;
  type: "bar" | "line" | "treemap" | "scatter";
  dataSource: string;
  config: Record<string, unknown>;
}

interface DashboardState {
  dashboardId: string | null;
  widgets: DashboardWidget[];
  layouts: DashboardLayout[];
  columns: number;
  rowHeight: number;
  selectedWidget: string | null;
  editMode: boolean;
}

const initialState: DashboardState = {
  dashboardId: null,
  widgets: [],
  layouts: [],
  columns: 12,
  rowHeight: 30,
  selectedWidget: null,
  editMode: true,
};

const dashboardSlice = createSlice({
  name: "dashboard",

  initialState,

  reducers: {
    setDashboard(state, action) {
      // console.log("Payload:", action.payload);

      state.dashboardId = action.payload.dashboardId;
      state.widgets = action.payload.widgets;
      state.layouts = action.payload.layouts;

      if (action.payload.columns !== undefined) {
        state.columns = action.payload.columns;
      }

      if (action.payload.rowHeight !== undefined) {
        state.rowHeight = action.payload.rowHeight;
      }
    },

    updateLayouts(state, action: PayloadAction<DashboardLayout[]>) {
      state.layouts = action.payload;
    },

    updateWidget(state, action: PayloadAction<DashboardWidget>) {
      const idx = state.widgets.findIndex((w) => w.widgetId === action.payload.widgetId);
      if (idx !== -1) state.widgets[idx] = action.payload;
    },

    addWidget(state, action: PayloadAction<DashboardWidget>) {
      state.widgets.push(action.payload);
      state.layouts.push(action.payload as unknown as DashboardLayout);
    },

    removeWidget(state, action: PayloadAction<string>) {
      state.widgets = state.widgets.filter(
        (widget) => widget.widgetId !== action.payload,
      );

      state.layouts = state.layouts.filter(
        (layout) => layout.i !== action.payload,
      );
    },

    selectWidget(state, action: PayloadAction<string | null>) {
      state.selectedWidget = action.payload;
    },

    toggleEditMode(state) {
      state.editMode = !state.editMode;
    },

    resetDashboard(state) {
      state.dashboardId = null;
      state.widgets = [];
      state.layouts = [];
    },
  },
  
});

export const {
  setDashboard,
  updateLayouts,
  updateWidget,
  addWidget,
  removeWidget,
  selectWidget,
  toggleEditMode,
  resetDashboard,
} = dashboardSlice.actions;

export default dashboardSlice.reducer;
