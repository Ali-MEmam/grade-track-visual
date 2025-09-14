import { useState } from "react";
import { Badge } from "@/components/atoms/Badge/Badge";
import { Button } from "@/components/atoms/Button/Button";
import { Card } from "@/components/atoms/Card/Card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, MoreVertical, Edit, Trash2, Eye, Loader2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSchoolAdmins } from "./hooks/useSchoolAdmins";
import { useCreateSchoolAdmin } from "./hooks/useCreateSchoolAdmin";
import { useDeleteSchoolAdmin } from "./hooks/useDeleteSchoolAdmin";
import { AddSchoolAdminModal } from "./components/AddSchoolAdminModal";

interface SchoolAdminsProps {
  schoolId: string;
}

export const SchoolAdmins = ({ schoolId }: SchoolAdminsProps) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  
  const { data: admins = [], isLoading, error } = useSchoolAdmins(schoolId);
  const createAdminMutation = useCreateSchoolAdmin(schoolId);
  const deleteAdminMutation = useDeleteSchoolAdmin(schoolId);
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">School Administrators</h2>
          <p className="text-sm text-muted-foreground">
            Manage school administrative staff and their roles
          </p>
        </div>
        <Button onClick={() => setIsAddModalOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Admin
        </Button>
      </div>

      {/* Table */}
      <Card>
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center py-12">
            <p className="text-destructive mb-2">Failed to load administrators</p>
            <p className="text-sm text-muted-foreground">{error.message}</p>
          </div>
        ) : (
          <>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[350px]">Admin</TableHead>
                  <TableHead>Position</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="hidden sm:table-cell">Joined Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {admins.map((admin) => (
                  <TableRow key={admin.id}>
                    <TableCell>
                      <div className="flex items-start gap-3">
                        <img
                          src={admin.avatar}
                          alt={admin.fullName}
                          className="w-10 h-10 rounded-full"
                        />
                        <div className="space-y-1">
                          <p className="font-medium">{admin.fullName}</p>
                          <p className="text-xs text-muted-foreground">{admin.email}</p>
                          <p className="text-xs text-muted-foreground">{admin.phone}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary" className="text-xs">
                        {admin.position}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={admin.isActive ? "outline" : "destructive"}
                        className={`text-xs ${
                          admin.isActive
                            ? "border-green-500 text-green-700 dark:text-green-400"
                            : ""
                        }`}
                      >
                        {admin.isActive ? "Active" : "Inactive"}
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      <span className="text-sm text-muted-foreground">
                        {new Date(admin.createdAt).toLocaleDateString()}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Admin
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem 
                            className="text-destructive"
                            onClick={() => {
                              if (confirm("Are you sure you want to remove this administrator?")) {
                                deleteAdminMutation.mutate(admin.id);
                              }
                            }}
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Remove Admin
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {/* Empty State */}
            {admins.length === 0 && (
              <div className="flex flex-col items-center justify-center py-12">
                <p className="text-lg font-semibold mb-2">No Administrators</p>
                <p className="text-sm text-muted-foreground text-center max-w-sm mb-4">
                  No administrators have been assigned to this school yet.
                </p>
                <Button onClick={() => setIsAddModalOpen(true)}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add First Admin
                </Button>
              </div>
            )}
          </>
        )}
      </Card>

      {/* Add Admin Modal */}
      <AddSchoolAdminModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={createAdminMutation.mutateAsync}
      />
    </div>
  );
};