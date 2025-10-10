import { useMutation, useQueryClient } from "@tanstack/react-query";
import { educationLevelService } from "../services/educationLevel.service";

export const useDeleteEducationLevel = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (levelId: string) =>
      educationLevelService.deleteEducationLevel(levelId),
    onSuccess: () => {
      // Invalidate and refetch education levels list
      queryClient.invalidateQueries({ queryKey: ["education-levels"] });
    },
  });
};