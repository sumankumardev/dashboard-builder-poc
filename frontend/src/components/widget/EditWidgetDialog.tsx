import type { Dispatch, SetStateAction } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

export interface EditWidgetDialogProps {
  editOpen: boolean;
  setEditOpen: Dispatch<SetStateAction<boolean>>;
  editTitle: string;
  setEditTitle: Dispatch<SetStateAction<string>>;
  handleEditSave: () => Promise<void> | void;
}
const EditWidgetDialog = ({
  editOpen,
  setEditOpen,
  editTitle,
  setEditTitle,
  handleEditSave,
}: EditWidgetDialogProps) => {
  return (
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
          <Button
            variant="outline"
            onClick={() => setEditOpen(false)}
          >
            Cancel
          </Button>

          <Button
            onClick={handleEditSave}
            disabled={!editTitle.trim()}
          >
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditWidgetDialog;