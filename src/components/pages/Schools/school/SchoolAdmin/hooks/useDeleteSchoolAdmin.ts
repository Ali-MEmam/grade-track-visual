import { useMutation, useQueryClient } from "@tanstack/react-query";
import { schoolAdminService } from "../services/school-admin.service";
import { toast } from "@/hooks/use-toast";

export const useDeleteSchoolAdmin = (schoolId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (adminId: string) => 
      schoolAdminService.deleteSchoolAdmin(schoolId, adminId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["school-admins", schoolId] });
      toast({
        title: "Success",
        description: "School admin removed successfully",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to remove school admin",
        variant: "destructive",
      });
    },
  });
};