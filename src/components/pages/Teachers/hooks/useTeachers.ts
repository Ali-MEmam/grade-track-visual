import { useQuery } from "@tanstack/react-query";
import { teacherService } from "../services/teacher.service";

export const useTeachers = (schoolId: string) => {
  return useQuery({
    queryKey: ["teachers", schoolId],
    queryFn: () => teacherService.getTeachers(schoolId),
  });
};
