import { useMutation, useQueryClient } from '@tanstack/react-query';
import { schoolsService } from '../services/schools.service';
import { CreateSchoolRequest } from '../types/schools.types';
import { useToast } from '@/hooks/use-toast';

export const useCreateSchool = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (data: CreateSchoolRequest) => {
      return await schoolsService.createSchool(data);
    },
    onSuccess: (newSchool) => {
      queryClient.invalidateQueries({ queryKey: ['schools'] });
      
      toast({
        title: 'Success',
        description: `School "${newSchool.nameEn}" has been created successfully.`,
      });
    },
    onError: (error: Error) => {
      toast({
        title: 'Error',
        description: error.message || 'Failed to create school. Please try again.',
        variant: 'destructive',
      });
    },
  });
};