import { useState } from "react";
import { Badge } from "@/components/atoms/Badge/Badge";
import { Button } from "@/components/atoms/Button/Button";
import { Card } from "@/components/atoms/Card/Card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, Search, MoreVertical, Edit, Trash2, Loader2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useEducationSystems } from "./hooks/useEducationSystems";
import { useCreateEducationSystem } from "./hooks/useCreateEducationSystem";
import { useUpdateEducationSystem } from "./hooks/useUpdateEducationSystem";
import { useDeleteEducationSystem } from "./hooks/useDeleteEducationSystem";
import { AddEducationSystemModal } from "./components/AddEducationSystemModal";
import { EducationSystem } from "./types/educationSystem.types";

interface EducationSystemsProps {
  schoolId?: string;
}

export const EducationSystems = ({ schoolId = "" }: EducationSystemsProps) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSystem, setSelectedSystem] = useState<EducationSystem | null>(null);
  const [modalMode, setModalMode] = useState<"create" | "edit">("create");

  const { data: systems = [], isLoading, error } = useEducationSystems();
  const createSystemMutation = useCreateEducationSystem();
  const updateSystemMutation = useUpdateEducationSystem();
  const deleteSystemMutation = useDeleteEducationSystem();

  const filteredSystems = systems.filter((system) =>
    system.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    system.id.toString().includes(searchQuery)
  );

  const handleOpenAddModal = () => {
    setModalMode("create");
    setSelectedSystem(null);
    setIsAddModalOpen(true);
  };

  const handleOpenEditModal = (system: EducationSystem) => {
    setModalMode("edit");
    setSelectedSystem(system);
    setIsAddModalOpen(true);
  };

  const handleModalSubmit = async (data: any) => {
    if (modalMode === "edit" && selectedSystem) {
      await updateSystemMutation.mutateAsync({
        id: selectedSystem.id,
        data: data,
      });
    } else {
      await createSystemMutation.mutateAsync(data);
    }
  };

  const handleDelete = (systemId: string) => {
    if (confirm("Are you sure you want to delete this education system?")) {
      deleteSystemMutation.mutate(systemId);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">Education Systems</h2>
          <p className="text-sm text-muted-foreground">
            Manage education systems for the school
          </p>
        </div>
        <Button onClick={handleOpenAddModal}>
          <Plus className="mr-2 h-4 w-4" />
          Add Education System
        </Button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search education systems by name or ID..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Education Systems Table */}
      <Card>
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center py-12">
            <p className="text-destructive mb-2">Failed to load education systems</p>
            <p className="text-sm text-muted-foreground">{error.message}</p>
          </div>
        ) : (
          <>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead className="hidden md:table-cell">Created At</TableHead>
                  <TableHead className="hidden md:table-cell">Updated At</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSystems.map((system) => (
                  <TableRow key={system.id}>
                    <TableCell>
                      <Badge variant="outline" className="text-xs">
                        {system.id}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <p className="font-medium">{system.name}</p>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {system.createdAt
                        ? new Date(system.createdAt).toLocaleDateString()
                        : "-"}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {system.updatedAt
                        ? new Date(system.updatedAt).toLocaleDateString()
                        : "-"}
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleOpenEditModal(system)}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit System
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            className="text-destructive"
                            onClick={() => handleDelete(system.id)}
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete System
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {/* Empty State */}
            {filteredSystems.length === 0 && (
              <div className="flex flex-col items-center justify-center py-12">
                <p className="text-lg font-semibold mb-2">
                  {searchQuery ? "No Education Systems Found" : "No Education Systems"}
                </p>
                <p className="text-sm text-muted-foreground text-center max-w-sm mb-4">
                  {searchQuery
                    ? "No education systems match your search criteria. Try adjusting your search."
                    : "No education systems have been created yet."}
                </p>
                {!searchQuery && (
                  <Button onClick={handleOpenAddModal}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add First Education System
                  </Button>
                )}
              </div>
            )}
          </>
        )}
      </Card>

      {/* Add/Edit Education System Modal */}
      <AddEducationSystemModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleModalSubmit}
        educationSystem={selectedSystem}
        mode={modalMode}
      />
    </div>
  );
};
