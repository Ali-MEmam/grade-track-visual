import { useQuery } from "@tanstack/react-query";
import { classService } from "../services/class.service";

export const useClasses = (schoolId: string) => {
  return useQuery({
    queryKey: ["classes", schoolId],
    queryFn: () => classService.getClasses(schoolId),
    enabled: !!schoolId,
  });
};