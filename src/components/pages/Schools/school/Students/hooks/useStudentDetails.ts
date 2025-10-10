import { useQuery } from "@tanstack/react-query";
import { studentService } from "../services/student.service";

export const useStudentDetails = (studentId: string) => {
  return useQuery({
    queryKey: ["student", studentId],
    queryFn: () => studentService.getStudentDetails(studentId),
    enabled: !!studentId,
  });
};
