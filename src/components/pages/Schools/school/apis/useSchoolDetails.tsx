import { useQuery } from '@tanstack/react-query';
import { schoolsService } from '../../services/schools.service';

export const useSchoolDetails = (id: string) => {
  return useQuery({
    queryKey: ['school', id],
    queryFn: () => schoolsService.getSchoolById(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};