import { useState } from "react";
import { SchoolsList } from "./Components/SchoolsList";
import { CreateSchoolModal } from "./Components/CreateSchoolModal";
import { CreateSchoolRequest, School } from "./types/schools.types";
import { useToast } from "@/hooks/use-toast";
import { useSchools, useDeleteSchool } from "./apis/useSchools";
import { useCreateSchool } from "./apis/useCreateSchool";
import { Loader2 } from "lucide-react";

export const Schools = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const { toast } = useToast();
  const { data: schools, isLoading, error } = useSchools();
  const createSchoolMutation = useCreateSchool();
  const deleteSchoolMutation = useDeleteSchool();

  const handleCreateSchool = () => {
    setIsCreateModalOpen(true);
  };

  const handleCreateSchoolSubmit = async (data: CreateSchoolRequest) => {
    await createSchoolMutation.mutateAsync(data);
    setIsCreateModalOpen(false);
  };

  const handleEditSchool = (school: School) => {
    toast({
      title: "Edit School",
      description: `Edit functionality for ${school.name} would be implemented here.`,
    });
  };

  const handleDeleteSchool = async (id: string) => {
    try {
      await deleteSchoolMutation.mutateAsync(id);
    } catch (error) {
      console.error("Error deleting school:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-muted-foreground">Loading schools...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <p className="text-destructive mb-2">Failed to load schools</p>
          <p className="text-sm text-muted-foreground">{error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 lg:space-y-8 animate-fade-in">
      <div className="space-y-2">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground">
          Schools
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground">
          Manage all schools in the educational network
        </p>
      </div>

      <SchoolsList
        schools={schools || []}
        onCreateSchool={handleCreateSchool}
        onEditSchool={handleEditSchool}
        onDeleteSchool={handleDeleteSchool}
      />

      <CreateSchoolModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreateSchoolSubmit}
      />
    </div>
  );
};