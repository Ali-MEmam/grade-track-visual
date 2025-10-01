import { useMutation, useQueryClient } from "@tanstack/react-query";
import { classService } from "../services/class.service";
import { UpdateClassRequest } from "../types/class.types";

export const useUpdateClass = (schoolId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ classId, data }: { classId: string; data: UpdateClassRequest }) => 
      classService.updateClass(classId, data),
    onSuccess: () => {
      // Invalidate and refetch classes list
      queryClient.invalidateQueries({ queryKey: ["classes", schoolId] });
    },
  });
};