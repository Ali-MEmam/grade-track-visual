import { useMutation, useQueryClient } from "@tanstack/react-query";
import { teacherService } from "../services/teacher.service";
import { CreateTeacherRequest } from "../types/teacher.types";

export const useCreateTeacher = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateTeacherRequest) =>
      teacherService.createTeacher(data.schoolId, data),
    onSuccess: (_, variables) => {
      // Invalidate and refetch teachers list
      queryClient.invalidateQueries({ queryKey: ["teachers", variables.schoolId] });
    },
  });
};
