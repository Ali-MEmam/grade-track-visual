import { useQuery } from '@tanstack/react-query';
import { authService } from '@/components/pages/Auth/services/auth.service';
import { User } from '@/components/pages/Auth/types/auth.types';
import { tokenManager } from '@/lib/api/token-manager';

export const useCurrentUser = () => {
  return useQuery<User | null, Error>({
    queryKey: ['currentUser'],
    queryFn: async () => {
      if (!tokenManager.hasTokens()) {
        return null;
      }
      
      return await authService.getCurrentUser();
    },
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    retry: 1,
    enabled: tokenManager.hasTokens(),
  });
};