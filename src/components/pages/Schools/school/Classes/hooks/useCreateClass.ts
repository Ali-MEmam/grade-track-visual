import { useMutation, useQueryClient } from "@tanstack/react-query";
import { classService } from "../services/class.service";
import { CreateClassRequest } from "../types/class.types";

export const useCreateClass = (schoolId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Omit<CreateClassRequest, 'schoolId'>) => 
      classService.createClass(schoolId, data),
    onSuccess: () => {
      // Invalidate and refetch classes list
      queryClient.invalidateQueries({ queryKey: ["classes", schoolId] });
    },
  });
};