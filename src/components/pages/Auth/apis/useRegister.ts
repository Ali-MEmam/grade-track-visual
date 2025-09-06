import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { authService } from '@/components/pages/Auth/services/auth.service';
import { RegisterRequest, RegisterResponse } from '@/components/pages/Auth/types/auth.types';
import { useToast } from '@/hooks/use-toast';

/**
 * React Query hook for user registration
 */
export const useRegister = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { toast } = useToast();

  return useMutation<RegisterResponse, Error, RegisterRequest>({
    mutationFn: async (userData: RegisterRequest) => {
      return await authService.register(userData);
    },
    onSuccess: (data) => {
      // Cache the user data
      queryClient.setQueryData(['currentUser'], data.user);
      
      // Show success toast
      toast({
        title: 'Account created!',
        description: 'Welcome to Grade Track Visual',
      });
      
      // Navigate to dashboard
      navigate('/');
    },
    onError: (error: Error) => {
      // Show error toast
      toast({
        title: 'Registration failed',
        description: error.message || 'Something went wrong. Please try again.',
        variant: 'destructive',
      });
    },
  });
};