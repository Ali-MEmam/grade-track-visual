import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { authService } from '@/components/pages/Auth/services/auth.service';
import { LoginRequest, LoginResponse } from '@/components/pages/Auth/types/auth.types';
import { useToast } from '@/hooks/use-toast';

/**
 * React Query hook for user login
 */
export const useLogin = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { toast } = useToast();

  return useMutation<LoginResponse, Error, LoginRequest>({
    mutationFn: async (credentials: LoginRequest) => {
      return await authService.login(credentials);
    },
    onSuccess: (data) => {
      // Cache the user data
      queryClient.setQueryData(['currentUser'], data.user);
      
      // Show success toast
      toast({
        title: 'Welcome back!',
        description: `Logged in as ${data.user.email}`,
      });
      
      // Navigate to dashboard
      navigate('/');
    },
    onError: (error: Error) => {
      // Show error toast
      toast({
        title: 'Login failed',
        description: error.message || 'Invalid email or password',
        variant: 'destructive',
      });
    },
  });
};