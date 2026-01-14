import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { authService } from '@/components/pages/Auth/services/auth.service';
import { ChangePasswordResponse } from '@/components/pages/Auth/types/auth.types';
import { useToast } from '@/hooks/use-toast';

interface ChangePasswordData {
  newPassword: string;
}

export const useChangePassword = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  return useMutation<ChangePasswordResponse, Error, ChangePasswordData>({
    mutationFn: async (data) => {
      return await authService.changePassword(data);
    },
    onSuccess: (data) => {
      toast({
        title: 'Success!',
        description: data.message || 'Your password has been changed successfully',
      });

      // Redirect to home page after successful password change
      navigate('/', { replace: true });
    },
    onError: (error: Error) => {
      toast({
        title: 'Failed to change password',
        description: error.message || 'Please try again',
        variant: 'destructive',
      });
    },
  });
};
