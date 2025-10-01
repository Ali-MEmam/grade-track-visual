import { useMutation, useQueryClient } from "@tanstack/react-query";
import { classService } from "../services/class.service";

export const useDeleteClass = (schoolId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (classId: string) => 
      classService.deleteClass(classId),
    onSuccess: () => {
      // Invalidate and refetch classes list
      queryClient.invalidateQueries({ queryKey: ["classes", schoolId] });
    },
  });
};