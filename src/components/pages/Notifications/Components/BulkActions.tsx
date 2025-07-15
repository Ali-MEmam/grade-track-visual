import { Button } from "@/components/atoms/Button/Button";
import { Trash2, CheckCheck, Square, CheckSquare } from "lucide-react";
import { cn } from "@/lib/utils";

interface BulkActionsProps {
  selectedCount: number;
  totalCount: number;
  onMarkAllAsRead: () => void;
  onDeleteSelected: () => void;
  onSelectAll: () => void;
  onDeselectAll: () => void;
  className?: string;
}

export const BulkActions = ({
  selectedCount,
  totalCount,
  onMarkAllAsRead,
  onDeleteSelected,
  onSelectAll,
  onDeselectAll,
  className,
}: BulkActionsProps) => {
  const allSelected = selectedCount === totalCount && totalCount > 0;
  const someSelected = selectedCount > 0;

  return (
    <div className={cn("flex items-center gap-2 flex-wrap", className)}>
      {/* Select All/Deselect All */}
      <Button
        variant="outline"
        size="sm"
        onClick={allSelected ? onDeselectAll : onSelectAll}
        disabled={totalCount === 0}
      >
        {allSelected ? (
          <>
            <CheckSquare className="h-4 w-4" />
            Deselect All
          </>
        ) : (
          <>
            <Square className="h-4 w-4" />
            Select All
          </>
        )}
      </Button>

      {/* Actions that require selections */}
      {someSelected && (
        <>
          <Button variant="outline" size="sm" onClick={onMarkAllAsRead}>
            <CheckCheck className="h-4 w-4" />
            Mark as Read ({selectedCount})
          </Button>

          <Button variant="destructive" size="sm" onClick={onDeleteSelected}>
            <Trash2 className="h-4 w-4" />
            Delete ({selectedCount})
          </Button>
        </>
      )}
    </div>
  );
};

export type { BulkActionsProps };
