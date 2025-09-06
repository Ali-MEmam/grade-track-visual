import React, { createContext, useContext, useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { authService } from "@/components/pages/Auth/services/auth.service";
import { tokenManager } from "@/lib/api/token-manager";
import {
  User,
  AuthContextType,
  RegisterRequest,
} from "@/components/pages/Auth/types/auth.types";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  // Check for existing session on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Check if we have tokens
        if (tokenManager.hasTokens()) {
          // Check if token is expired
          if (tokenManager.isTokenExpired()) {
            // Try to refresh the token
            try {
              await authService.refreshToken();
            } catch (refreshError) {
              // Refresh failed, clear tokens
              tokenManager.clearTokens();
              setIsLoading(false);
              return;
            }
          }

          // Try to get current user from API
          try {
            const currentUser = await authService.getCurrentUser();
            setUser(currentUser);
          } catch (error) {
            // API call failed, try to get user from token
            const userFromToken = authService.getUserFromToken();
            if (userFromToken) {
              setUser(userFromToken);
            } else {
              // Can't get user info, clear tokens
              tokenManager.clearTokens();
            }
          }
        }
      } catch (error) {
        console.error("Error checking auth:", error);
        tokenManager.clearTokens();
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string): Promise<void> => {
    setIsLoading(true);
    try {
      // Call the auth service to login
      const response = await authService.login({ email, password });
      // Set the user in state
      setUser(response.user);

      toast({
        title: "Welcome back!",
        description: `Logged in as ${response.user.email}`,
      });
    } catch (error: any) {
      toast({
        title: "Login failed",
        description: error.message || "Invalid email or password.",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData: RegisterRequest): Promise<void> => {
    setIsLoading(true);
    try {
      // Call the auth service to register
      const response = await authService.register(userData);

      // Set the user in state
      setUser(response.user);

      toast({
        title: "Account created!",
        description: "Welcome to Grade Track Visual.",
      });
    } catch (error: any) {
      toast({
        title: "Registration failed",
        description: error.message || "Something went wrong. Please try again.",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
      setUser(null);
      toast({
        title: "Logged out",
        description: "You have been successfully logged out.",
      });
    } catch (error) {
      // Even if logout fails, clear local state
      setUser(null);
      tokenManager.clearTokens();
      console.error("Logout error:", error);
    }
  };

  const refreshToken = async (): Promise<void> => {
    try {
      await authService.refreshToken();
      // Optionally refresh user data after token refresh
      const currentUser = await authService.getCurrentUser();
      setUser(currentUser);
    } catch (error) {
      // Token refresh failed, clear auth state
      setUser(null);
      tokenManager.clearTokens();
      throw error;
    }
  };

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    register,
    logout,
    refreshToken,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
