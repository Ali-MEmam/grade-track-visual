import { useMutation, useQueryClient } from "@tanstack/react-query";
import { studentService } from "../services/student.service";
import { UpdateStudentRequest } from "../types/student.types";

export const useUpdateStudent = (schoolId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateStudentRequest }) =>
      studentService.updateStudent(id, data),
    onSuccess: (_, variables) => {
      // Invalidate both the list and the specific student detail
      queryClient.invalidateQueries({ queryKey: ["students"] });
      queryClient.invalidateQueries({ queryKey: ["student", variables.id] });
    },
  });
};
