import { useMutation, useQueryClient } from "@tanstack/react-query";
import { teacherService } from "../services/teacher.service";
import { UpdateTeacherRequest } from "../types/teacher.types";

export const useUpdateTeacher = (schoolId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ teacherId, data }: { teacherId: string; data: UpdateTeacherRequest }) =>
      teacherService.updateTeacher(teacherId, data),
    onSuccess: () => {
      // Invalidate and refetch teachers list
      queryClient.invalidateQueries({ queryKey: ["teachers", schoolId] });
    },
  });
};
