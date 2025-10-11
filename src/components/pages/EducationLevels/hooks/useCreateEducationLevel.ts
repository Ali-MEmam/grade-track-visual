import { useMutation, useQueryClient } from "@tanstack/react-query";
import { educationLevelService } from "../services/educationLevel.service";
import { CreateEducationLevelRequest } from "../types/educationLevel.types";

export const useCreateEducationLevel = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateEducationLevelRequest) =>
      educationLevelService.createEducationLevel(data),
    onSuccess: () => {
      // Invalidate and refetch education levels list
      queryClient.invalidateQueries({ queryKey: ["education-levels"] });
    },
  });
};
