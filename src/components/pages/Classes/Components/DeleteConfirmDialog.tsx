import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/atoms/Button/Button";
import { AlertTriangle } from "lucide-react";
import { ClassData } from "./ClassCard";

interface DeleteConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  classData: ClassData | null;
  loading?: boolean;
}

export const DeleteConfirmDialog = ({
  isOpen,
  onClose,
  onConfirm,
  classData,
  loading = false,
}: DeleteConfirmDialogProps) => {
  if (!classData) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/20">
              <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400" />
            </div>
            <div>
              <DialogTitle>Delete Class</DialogTitle>
              <DialogDescription className="mt-1">
                This action cannot be undone.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="py-4">
          <p className="text-sm text-muted-foreground">
            Are you sure you want to delete <strong>{classData.name}</strong>?
            This will permanently remove the class and all its associated data,
            including:
          </p>

          <ul className="mt-3 text-sm text-muted-foreground list-disc list-inside space-y-1">
            <li>
              All student enrollments ({classData.studentsCount} students)
            </li>
            <li>Class schedule and room assignments</li>
            <li>Associated grades and attendance records</li>
            <li>Any related assignments or materials</li>
          </ul>

          <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800 rounded-lg">
            <p className="text-sm text-red-800 dark:text-red-400">
              <strong>Warning:</strong> Students currently enrolled in this
              class will need to be reassigned to other classes or their
              enrollment status will be affected.
            </p>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={onConfirm} disabled={loading}>
            {loading ? "Deleting..." : "Delete Class"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export type { DeleteConfirmDialogProps };
