import { Button } from "@/components/atoms/Button/Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Edit, Eye, MoreHorizontal, Trash2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { StudentDetails } from "./Details.Student.Modal";

export const TableActions = (student: any) => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button variant="ghost" size="sm">
        <MoreHorizontal className="w-4 h-4" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      {/* View in Modal */}
      <Dialog>
        <DialogTrigger asChild>
          <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
            <Eye className="w-4 h-4 mr-2" />
            View Details
          </DropdownMenuItem>
        </DialogTrigger>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Student Details</DialogTitle>
          </DialogHeader>
          <StudentDetails student={student} />
        </DialogContent>
      </Dialog>

      {/* Edit in Drawer */}
      <Drawer>
        <DrawerTrigger asChild>
          <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
            <Edit className="w-4 h-4 mr-2" />
            Edit Student
          </DropdownMenuItem>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Edit Student</DrawerTitle>
          </DrawerHeader>
          <div className="p-4">
            <StudentDetails student={student} />
            <div className="flex gap-2 mt-6">
              <Button className="flex-1">Save Changes</Button>
              <Button variant="outline" className="flex-1">
                Cancel
              </Button>
            </div>
          </div>
        </DrawerContent>
      </Drawer>

      <DropdownMenuItem className="text-destructive">
        <Trash2 className="w-4 h-4 mr-2" />
        Delete
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
);
