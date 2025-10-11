import { useMutation, useQueryClient } from "@tanstack/react-query";
import { educationSystemService } from "../services/educationSystem.service";

export const useDeleteEducationSystem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (systemId: string) =>
      educationSystemService.deleteEducationSystem(systemId),
    onSuccess: () => {
      // Invalidate and refetch education systems list
      queryClient.invalidateQueries({ queryKey: ["education-systems"] });
    },
  });
};
