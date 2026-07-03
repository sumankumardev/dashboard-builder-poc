import type { Widget } from "@/types/widget";

export const useWidgetActions = (widget: Widget) => {
  const handleDelete = async () => {
    
  };

  const handleDuplicate = async () => {};

  const handleRefresh = () => {};

  const handleEditSave = async () => {};

  return {
    handleDelete,
    handleDuplicate,
    handleRefresh,
    handleEditSave,
  };
};
