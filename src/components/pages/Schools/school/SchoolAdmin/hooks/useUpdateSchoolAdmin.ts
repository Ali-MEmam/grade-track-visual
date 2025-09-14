import { useMutation, useQueryClient } from "@tanstack/react-query";
import { schoolAdminService } from "../services/school-admin.service";
import { UpdateSchoolAdminRequest } from "../types/school-admin.types";
import { toast } from "@/hooks/use-toast";

export const useUpdateSchoolAdmin = (schoolId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ adminId, data }: { adminId: string; data: UpdateSchoolAdminRequest }) => 
      schoolAdminService.updateSchoolAdmin(schoolId, adminId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["school-admins", schoolId] });
      toast({
        title: "Success",
        description: "School admin updated successfully",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to update school admin",
        variant: "destructive",
      });
    },
  });
};