import { useQuery } from "@tanstack/react-query";
import { studentService } from "../services/student.service";

export const useStudents = () => {
  return useQuery({
    queryKey: ["students"],
    queryFn: () => studentService.getStudents(),
  });
};
