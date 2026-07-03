import { MoreVertical, Pencil, Copy, RefreshCw, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
interface Props {
  title: string;
  children: React.ReactNode;
  onEdit?: () => void;
  onDuplicate?: () => void;
  onRefresh?: () => void;
  onDelete?: () => void;
}

export default function WidgetCard({ title, children,onDelete,onEdit,onDuplicate,onRefresh}: Props) {
  return (
  <div className="bg-white border rounded-lg shadow h-full flex flex-col">

      <div className="widget-card-header flex items-center justify-between border-b px-4 py-3 cursor-move">

        <h2 className="font-semibold">
          {title}
        </h2>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <MoreVertical className="h-4 w-4 text-muted-foreground" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={onEdit}>
              <Pencil className="mr-2 h-4 w-4" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem onClick={onDuplicate}>
              <Copy className="mr-2 h-4 w-4" />
              Duplicate
            </DropdownMenuItem>
            <DropdownMenuItem onClick={onRefresh}>
              <RefreshCw className="mr-2 h-4 w-4" />
              Refresh
            </DropdownMenuItem>
            <DropdownMenuItem onClick={onDelete} className="text-red-600">
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="flex-1 p-2">{children}</div>
    </div>
  );
}
