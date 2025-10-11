import { useQuery } from "@tanstack/react-query";
import { educationLevelService } from "../services/educationLevel.service";

export const useEducationLevels = () => {
  return useQuery({
    queryKey: ["education-levels"],
    queryFn: () => educationLevelService.getEducationLevels(),
  });
};
