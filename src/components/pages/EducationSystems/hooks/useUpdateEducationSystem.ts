import { useMutation, useQueryClient } from "@tanstack/react-query";
import { educationSystemService } from "../services/educationSystem.service";
import { UpdateEducationSystemRequest } from "../types/educationSystem.types";

export const useUpdateEducationSystem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateEducationSystemRequest }) =>
      educationSystemService.updateEducationSystem(id, data),
    onSuccess: () => {
      // Invalidate and refetch education systems list
      queryClient.invalidateQueries({ queryKey: ["education-systems"] });
    },
  });
};
