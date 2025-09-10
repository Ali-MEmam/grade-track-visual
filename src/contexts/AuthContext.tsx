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
          // Try to get current user from API
          try {
            const currentUser = await authService.getCurrentUser();
            setUser(currentUser);
          } catch (error) {
            // Can't get user info, clear tokens
            console.error("Error getting current user:", error);
            tokenManager.clearTokens();
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

  // Set authenticated user (called by useLogin hook after successful login)
  const setAuthUser = (authUser: User) => {
    setUser(authUser);
  };

  // Simple login method that delegates to the service
  // The actual login logic is handled by the useLogin hook
  const login = async (email: string, password: string): Promise<void> => {
    // This method is kept for backwards compatibility
    // but the actual implementation should use the useLogin hook
    throw new Error("Please use the useLogin hook for login functionality");
  };

  const register = async (userData: RegisterRequest): Promise<void> => {
    setIsLoading(true);
    try {
      const response = await authService.register(userData);
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


  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    register,
    logout,
    setAuthUser, // Add the new method
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
