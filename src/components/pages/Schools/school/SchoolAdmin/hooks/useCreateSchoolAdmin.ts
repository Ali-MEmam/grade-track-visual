import { useMutation, useQueryClient } from "@tanstack/react-query";
import { schoolAdminService } from "../services/school-admin.service";
import { CreateSchoolAdminRequest } from "../types/school-admin.types";
import { toast } from "@/hooks/use-toast";

export const useCreateSchoolAdmin = (schoolId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Omit<CreateSchoolAdminRequest, 'schoolId'>) => 
      schoolAdminService.createSchoolAdmin(schoolId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["school-admins", schoolId] });
      toast({
        title: "Success",
        description: "School admin added successfully",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to add school admin",
        variant: "destructive",
      });
    },
  });
};