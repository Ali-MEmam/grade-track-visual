import { useMutation, useQueryClient } from "@tanstack/react-query";
import { teacherService } from "../services/teacher.service";
import { CreateTeacherRequest } from "../types/teacher.types";

export const useCreateTeacher = (schoolId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Omit<CreateTeacherRequest, 'schoolId'>) =>
      teacherService.createTeacher(schoolId, data),
    onSuccess: () => {
      // Invalidate and refetch teachers list
      queryClient.invalidateQueries({ queryKey: ["teachers", schoolId] });
    },
  });
};
