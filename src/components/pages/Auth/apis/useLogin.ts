import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate, useLocation } from 'react-router-dom';
import { authService } from '@/components/pages/Auth/services/auth.service';
import { LoginResponse } from '@/components/pages/Auth/types/auth.types';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';

interface LoginCredentials {
  identifier: string;
  password: string;
}

export const useLogin = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const { setAuthUser } = useAuth();

  return useMutation<LoginResponse, Error, LoginCredentials>({
    mutationFn: async ({ identifier, password }) => {
      return await authService.login({ identifier, password });
    },
    onSuccess: (data) => {
      setAuthUser(data.user);
      queryClient.setQueryData(['currentUser'], data.user);
      
      toast({
        title: 'Welcome back!',
        description: `Logged in as ${data.user.email}`,
      });
      
      const from = (location.state as any)?.from?.pathname || '/';
      navigate(from, { replace: true });
    },
    onError: (error: Error) => {
      toast({
        title: 'Login failed',
        description: error.message || 'Invalid email or password',
        variant: 'destructive',
      });
    },
  });
};