import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { widgetRegistry } from "../../registry/widgetResistry";
import type { ComponentType } from "react";
import WidgetCard from "./WidgetCard";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { removeWidget, updateWidget, addWidget } from "../../store/dashboardSlice";
import { dashboardApi } from "../../api/dashboard.api";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

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

  const Component = widgetRegistry[widget.type] as ComponentType<{ widget: Widget }>;
  if (!Component) return <div>Unknown Widget</div>;

  const handleDelete = async () => {
    if (!dashboardId) return;
    await dashboardApi.deleteWidget(dashboardId, widget.widgetId);
    dispatch(removeWidget(widget.widgetId));
  };

  const handleDuplicate = async () => {
    if (!dashboardId) return;
    const res = await dashboardApi.duplicateWidget(dashboardId, widget.widgetId);
    const widgets: Widget[] = res.data.widgets;
    const copy = widgets[widgets.length - 1];
    dispatch(addWidget({ ...copy, _id: copy._id ?? copy.widgetId } as any));
  };

  const handleRefresh = () => {
    queryClient.invalidateQueries({ queryKey: ["widget", widget.type, widget.widgetId] });
  };

  const handleEditSave = async () => {
    if (!dashboardId) return;
    const res = await dashboardApi.updateWidget(dashboardId, widget.widgetId, {
      title: editTitle,
      config: widget.config,
    });
    const updated: Widget = res.data;
    dispatch(updateWidget({ ...updated, _id: updated._id ?? updated.widgetId } as any));
    setEditOpen(false);
  };

  return (
    <>
      <WidgetCard
        title={widget.title}
        onEdit={() => { setEditTitle(widget.title); setEditOpen(true); }}
        onDuplicate={handleDuplicate}
        onRefresh={handleRefresh}
        onDelete={() => setDeleteOpen(true)}
      >
        <Component widget={widget} />
      </WidgetCard>

      {/* Edit Dialog */}
      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Widget</DialogTitle>
          </DialogHeader>
          <div className="grid gap-2 py-2">
            <Label htmlFor="widget-title">Title</Label>
            <Input
              id="widget-title"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleEditSave()}
              autoFocus
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditOpen(false)}>Cancel</Button>
            <Button onClick={handleEditSave} disabled={!editTitle.trim()}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete "{widget.title}"?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently remove the widget from the dashboard. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction variant="destructive" onClick={handleDelete}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
