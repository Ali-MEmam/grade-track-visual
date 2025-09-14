import { useQuery } from "@tanstack/react-query";
import { schoolAdminService } from "../services/school-admin.service";

export const useSchoolAdmins = (schoolId: string) => {
  return useQuery({
    queryKey: ["school-admins", schoolId],
    queryFn: () => schoolAdminService.getSchoolAdmins(schoolId),
    enabled: !!schoolId,
  });
};