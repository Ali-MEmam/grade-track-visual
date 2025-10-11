import { useMutation, useQueryClient } from "@tanstack/react-query";
import { educationLevelService } from "../services/educationLevel.service";
import { UpdateEducationLevelRequest } from "../types/educationLevel.types";

export const useUpdateEducationLevel = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateEducationLevelRequest }) =>
      educationLevelService.updateEducationLevel(id, data),
    onSuccess: () => {
      // Invalidate and refetch education levels list
      queryClient.invalidateQueries({ queryKey: ["education-levels"] });
    },
  });
};
