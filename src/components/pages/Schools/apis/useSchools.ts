import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { schoolsService } from '../services/schools.service';
import { 
  School, 
  SchoolFilters, 
  CreateSchoolRequest, 
  UpdateSchoolRequest 
} from '../types/schools.types';
import { useToast } from '@/hooks/use-toast';

export const useSchools = (filters?: SchoolFilters) => {
  return useQuery({
    queryKey: ['schools', filters],
    queryFn: () => schoolsService.getSchools(filters),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};

export const useSchool = (id: string) => {
  return useQuery({
    queryKey: ['school', id],
    queryFn: () => schoolsService.getSchoolById(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};

export const useSchoolStats = (id: string) => {
  return useQuery({
    queryKey: ['school-stats', id],
    queryFn: () => schoolsService.getSchoolStats(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};

export const useCreateSchool = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (data: CreateSchoolRequest) => schoolsService.createSchool(data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['schools'] });
      toast({
        title: 'School created',
        description: `${data.name} has been successfully created.`,
      });
    },
    onError: (error: Error) => {
      toast({
        title: 'Failed to create school',
        description: error.message,
        variant: 'destructive',
      });
    },
  });
};

export const useUpdateSchool = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateSchoolRequest }) =>
      schoolsService.updateSchool(id, data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['schools'] });
      queryClient.invalidateQueries({ queryKey: ['school', data.id] });
      toast({
        title: 'School updated',
        description: `${data.nameEn} has been successfully updated.`,
      });
    },
    onError: (error: Error) => {
      toast({
        title: 'Failed to update school',
        description: error.message,
        variant: 'destructive',
      });
    },
  });
};

export const useDeleteSchool = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (id: string) => schoolsService.deleteSchool(id),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ['schools'] });
      queryClient.removeQueries({ queryKey: ['school', id] });
      toast({
        title: 'School deleted',
        description: 'The school has been successfully deleted.',
      });
    },
    onError: (error: Error) => {
      toast({
        title: 'Failed to delete school',
        description: error.message,
        variant: 'destructive',
      });
    },
  });
};