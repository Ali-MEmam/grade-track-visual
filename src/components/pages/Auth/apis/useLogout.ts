import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { authService } from '@/components/pages/Auth/services/auth.service';
import { useToast } from '@/hooks/use-toast';

/**
 * React Query hook for user logout
 */
export const useLogout = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async () => {
      await authService.logout();
    },
    onSuccess: () => {
      // Clear all cached queries
      queryClient.clear();
      
      // Show logout toast
      toast({
        title: 'Logged out',
        description: 'You have been successfully logged out.',
      });
      
      // Navigate to login page
      navigate('/login');
    },
    onError: (error: Error) => {
      // Even if logout API fails, we clear local session
      queryClient.clear();
      navigate('/login');
      
      console.error('Logout error:', error);
    },
  });
};