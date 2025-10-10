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
import { useEducationLevels } from "./hooks/useEducationLevels";
import { useCreateEducationLevel } from "./hooks/useCreateEducationLevel";
import { useUpdateEducationLevel } from "./hooks/useUpdateEducationLevel";
import { useDeleteEducationLevel } from "./hooks/useDeleteEducationLevel";
import { AddEducationLevelModal } from "./components/AddEducationLevelModal";
import { EducationLevel } from "./types/educationLevel.types";

interface EducationLevelsProps {
  schoolId: string;
}

export const EducationLevels = ({ schoolId }: EducationLevelsProps) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLevel, setSelectedLevel] = useState<EducationLevel | null>(null);
  const [modalMode, setModalMode] = useState<"create" | "edit">("create");

  const { data: levels = [], isLoading, error } = useEducationLevels();
  const createLevelMutation = useCreateEducationLevel();
  const updateLevelMutation = useUpdateEducationLevel();
  const deleteLevelMutation = useDeleteEducationLevel();

  const filteredLevels = levels.filter((level) =>
    level.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    level.id.toString().includes(searchQuery)
  );

  const handleOpenAddModal = () => {
    setModalMode("create");
    setSelectedLevel(null);
    setIsAddModalOpen(true);
  };

  const handleOpenEditModal = (level: EducationLevel) => {
    setModalMode("edit");
    setSelectedLevel(level);
    setIsAddModalOpen(true);
  };

  const handleModalSubmit = async (data: any) => {
    if (modalMode === "edit" && selectedLevel) {
      await updateLevelMutation.mutateAsync({
        id: selectedLevel.id,
        data: data,
      });
    } else {
      await createLevelMutation.mutateAsync(data);
    }
  };

  const handleDelete = (levelId: string) => {
    if (confirm("Are you sure you want to delete this education level?")) {
      deleteLevelMutation.mutate(levelId);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">Education Levels</h2>
          <p className="text-sm text-muted-foreground">
            Manage education levels for the school system
          </p>
        </div>
        <Button onClick={handleOpenAddModal}>
          <Plus className="mr-2 h-4 w-4" />
          Add Education Level
        </Button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search education levels by name or ID..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Education Levels Table */}
      <Card>
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center py-12">
            <p className="text-destructive mb-2">Failed to load education levels</p>
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
                {filteredLevels.map((level) => (
                  <TableRow key={level.id}>
                    <TableCell>
                      <Badge variant="outline" className="text-xs">
                        {level.id}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <p className="font-medium">{level.name}</p>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {level.createdAt
                        ? new Date(level.createdAt).toLocaleDateString()
                        : "-"}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {level.updatedAt
                        ? new Date(level.updatedAt).toLocaleDateString()
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
                          <DropdownMenuItem onClick={() => handleOpenEditModal(level)}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Level
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            className="text-destructive"
                            onClick={() => handleDelete(level.id)}
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete Level
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {/* Empty State */}
            {filteredLevels.length === 0 && (
              <div className="flex flex-col items-center justify-center py-12">
                <p className="text-lg font-semibold mb-2">
                  {searchQuery ? "No Education Levels Found" : "No Education Levels"}
                </p>
                <p className="text-sm text-muted-foreground text-center max-w-sm mb-4">
                  {searchQuery
                    ? "No education levels match your search criteria. Try adjusting your search."
                    : "No education levels have been created yet."}
                </p>
                {!searchQuery && (
                  <Button onClick={handleOpenAddModal}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add First Education Level
                  </Button>
                )}
              </div>
            )}
          </>
        )}
      </Card>

      {/* Add/Edit Education Level Modal */}
      <AddEducationLevelModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleModalSubmit}
        educationLevel={selectedLevel}
        mode={modalMode}
      />
    </div>
  );
};