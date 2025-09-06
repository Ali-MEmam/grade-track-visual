import { useMutation } from '@tanstack/react-query';
import { authService } from '@/components/pages/Auth/services/auth.service';
import { RefreshTokenResponse } from '@/components/pages/Auth/types/auth.types';

/**
 * React Query hook for refreshing access token
 */
export const useRefreshToken = () => {
  return useMutation<RefreshTokenResponse, Error>({
    mutationFn: async () => {
      return await authService.refreshToken();
    },
    onError: (error: Error) => {
      // Token refresh failed, user will be redirected to login
      console.error('Token refresh failed:', error);
    },
  });
};