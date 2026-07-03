import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { widgetRegistry } from "../../registry/widgetResistry";
import type { ComponentType } from "react";
import WidgetCard from "./WidgetCard";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import {
  removeWidget,
  updateWidget,
  addWidget,
} from "../../store/dashboardSlice";
import { dashboardApi } from "../../api/dashboard.api";
import { store } from "../../store/store";
import ErrorBoundary from "../ErrorBoundary";
import EditWidgetDialog from "./EditWidgetDialog";
import DeleteWidgetDialog from "./DeleteWidgetDialog";

type WidgetType = keyof typeof widgetRegistry;

export interface Widget {
  widgetId: string;
  type: WidgetType;
  title: string;
  dataSource: string;
  config: Record<string, unknown>;
  _id: string;
}

export default function WidgetRenderer({ widget }: { widget: Widget }) {
  const dispatch = useAppDispatch();
  const dashboardId = useAppSelector((s) => s.dashboard.dashboardId);
  const queryClient = useQueryClient();

  const [editOpen, setEditOpen] = useState(false);
  const [editTitle, setEditTitle] = useState(widget.title);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const Component = widgetRegistry[widget.type] as ComponentType<{
    widget: Widget;
  }>;
  if (!Component) return <div>Unknown Widget</div>;

  const handleDelete = async () => {
    if (!dashboardId) return;
    await dashboardApi.deleteWidget(dashboardId, widget.widgetId);
    dispatch(removeWidget(widget.widgetId));
    const updatedLayouts = store.getState().dashboard.layouts;
    await dashboardApi.updateLayout(dashboardId, updatedLayouts);
  };

  const handleDuplicate = async () => {
    if (!dashboardId) return;
    const res = await dashboardApi.duplicateWidget(
      dashboardId,
      widget.widgetId,
    );
    const widgets: Widget[] = res.data.widgets;
    const copy = widgets[widgets.length - 1];
    const layoutEntry = { i: copy.widgetId, x: 0, y: Infinity, w: 6, h: 8 };
    dispatch(
      addWidget({
        ...copy,
        _id: copy._id ?? copy.widgetId,
        layoutEntry,
      } as any),
    );
    // persist layout with the duplicated widget entry
    const updatedLayouts = store.getState().dashboard.layouts;
    if (dashboardId)
      await dashboardApi.updateLayout(dashboardId, updatedLayouts);
  };

  const handleRefresh = () => {
    queryClient.invalidateQueries({
      queryKey: ["widget", widget.type, widget.widgetId],
    });
  };

  const handleEditSave = async () => {
    if (!dashboardId) return;
    const res = await dashboardApi.updateWidget(dashboardId, widget.widgetId, {
      title: editTitle,
      config: widget.config,
    });
    const updated: Widget = res.data;
    dispatch(
      updateWidget({ ...updated, _id: updated._id ?? updated.widgetId } as any),
    );
    setEditOpen(false);
  };

  return (
    <>
      <WidgetCard
        title={widget.title}
        onEdit={() => {
          setEditTitle(widget.title);
          setEditOpen(true);
        }}
        onDuplicate={handleDuplicate}
        onRefresh={handleRefresh}
        onDelete={() => setDeleteOpen(true)}
      >
        <ErrorBoundary fallbackTitle={widget.title}>
          <Component widget={widget} />
        </ErrorBoundary>
      </WidgetCard>

      {/* Edit Dialog */}
      <EditWidgetDialog
        editOpen={editOpen}
        setEditOpen={setEditOpen}
        editTitle={editTitle}
        setEditTitle={setEditTitle}
        handleEditSave={handleEditSave}
      />

      {/* Delete Confirmation */}
      <DeleteWidgetDialog
        open={deleteOpen}
        setOpen={setDeleteOpen}
        widgetTitle={widget.title}
        onDelete={handleDelete}
      />
    </>
  );
}
