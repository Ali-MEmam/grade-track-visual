import { useMutation, useQueryClient } from "@tanstack/react-query";
import { educationSystemService } from "../services/educationSystem.service";
import { CreateEducationSystemRequest } from "../types/educationSystem.types";

export const useCreateEducationSystem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateEducationSystemRequest) =>
      educationSystemService.createEducationSystem(data),
    onSuccess: () => {
      // Invalidate and refetch education systems list
      queryClient.invalidateQueries({ queryKey: ["education-systems"] });
    },
  });
};
