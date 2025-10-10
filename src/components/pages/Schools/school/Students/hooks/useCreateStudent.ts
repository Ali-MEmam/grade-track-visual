import { useMutation, useQueryClient } from "@tanstack/react-query";
import { studentService } from "../services/student.service";
import { CreateStudentRequest } from "../types/student.types";

export const useCreateStudent = (schoolId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Omit<CreateStudentRequest, "schoolId">) =>
      studentService.createStudent({ ...data, schoolId }),
    onSuccess: () => {
      // Invalidate students query to refresh the list
      queryClient.invalidateQueries({ queryKey: ["students"] });
    },
  });
};
