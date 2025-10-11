import { useMutation, useQueryClient } from "@tanstack/react-query";
import { studentService } from "../services/student.service";

export const useDeleteStudent = (schoolId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (studentId: string) => studentService.deleteStudent(studentId),
    onSuccess: () => {
      // Invalidate students query to refresh the list
      queryClient.invalidateQueries({ queryKey: ["students"] });
    },
  });
};
