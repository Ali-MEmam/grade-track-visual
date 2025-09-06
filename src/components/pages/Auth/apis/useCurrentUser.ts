import { useQuery } from '@tanstack/react-query';
import { authService } from '@/components/pages/Auth/services/auth.service';
import { User } from '@/components/pages/Auth/types/auth.types';
import { tokenManager } from '@/lib/api/token-manager';

/**
 * React Query hook for fetching current user
 */
export const useCurrentUser = () => {
  return useQuery<User | null, Error>({
    queryKey: ['currentUser'],
    queryFn: async () => {
      // Check if tokens exist first
      if (!tokenManager.hasTokens()) {
        return null;
      }

      try {
        // Try to get user from API
        return await authService.getCurrentUser();
      } catch (error) {
        // If API call fails, try to get user from token
        const userFromToken = authService.getUserFromToken();
        if (userFromToken) {
          return userFromToken;
        }
        throw error;
      }
    },
    staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
    gcTime: 10 * 60 * 1000, // Keep in cache for 10 minutes (formerly cacheTime)
    retry: (failureCount, error) => {
      // Don't retry on 401 errors
      if (error.message.includes('401') || error.message.includes('Unauthorized')) {
        return false;
      }
      return failureCount < 2;
    },
    enabled: tokenManager.hasTokens(), // Only run query if tokens exist
  });
};