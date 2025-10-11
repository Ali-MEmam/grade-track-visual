import { useQuery } from "@tanstack/react-query";
import { educationSystemService } from "../services/educationSystem.service";

export const useEducationSystems = () => {
  return useQuery({
    queryKey: ["education-systems"],
    queryFn: () => educationSystemService.getEducationSystems(),
  });
};
