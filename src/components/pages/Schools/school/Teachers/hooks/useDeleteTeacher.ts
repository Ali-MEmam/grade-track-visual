import { useMutation, useQueryClient } from "@tanstack/react-query";
import { teacherService } from "../services/teacher.service";

export const useDeleteTeacher = (schoolId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (teacherId: string) => 
      teacherService.deleteTeacher(teacherId),
    onSuccess: () => {
      // Invalidate and refetch teachers list
      queryClient.invalidateQueries({ queryKey: ["teachers", schoolId] });
    },
  });
};