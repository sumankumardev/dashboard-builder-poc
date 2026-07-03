import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import type{ Dispatch, SetStateAction } from "react";

interface DeleteWidgetDialogProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  widgetTitle: string;
  onDelete: () => Promise<void> | void;
}

const DeleteWidgetDialog = ({
  open,
  setOpen,
  widgetTitle,
  onDelete,
}: DeleteWidgetDialogProps) => {
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Delete "{widgetTitle}"?
          </AlertDialogTitle>

          <AlertDialogDescription>
            This will permanently remove the widget from the dashboard.
            This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>
            Cancel
          </AlertDialogCancel>

          <AlertDialogAction
            variant="destructive"
            onClick={onDelete}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteWidgetDialog;