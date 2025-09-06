import React, { createContext, useContext, useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { unifiedAuthService } from "@/features/auth/services/unified-auth.service";
import { tokenManager } from "@/lib/api/token-manager";
import type {
  AuthType,
  SchoolUser,
  SuperAdminUser,
} from "@/features/auth/types/auth.types";

// Define context types
interface AuthContextType {
  user: SchoolUser | SuperAdminUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  authType: AuthType | null;
  login: (
    email: string,
    password: string,
    schoolCode?: string
  ) => Promise<void>;
  logout: () => Promise<void>;
}

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
  const [user, setUser] = useState<SchoolUser | SuperAdminUser | null>(null);
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
              await unifiedAuthService.refreshToken();
            } catch (refreshError) {
              // Refresh failed, clear tokens
              tokenManager.clearTokens();
              setIsLoading(false);
              return;
            }
          }

          // Try to get current user from API
          try {
            const currentUser = await unifiedAuthService.getCurrentUser();
            setUser(currentUser);
          } catch (error) {
            // API call failed, try to get user from token
            // Try to get user from token as fallback
            const userFromToken = tokenManager.getTokenPayload() as any;
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

  const login = async (email: string, password: string, schoolCode?: string): Promise<void> => {
    setIsLoading(true);
    
    try {
      // Determine auth type based on schoolCode
      const authType: AuthType = schoolCode ? 'school' : 'superadmin';
      
      // Create credentials based on auth type
      const credentials = schoolCode 
        ? { email, password, schoolCode }
        : { email, password };
      
      // Call the unified auth service to login
      const response = await unifiedAuthService.login(authType, credentials);
      
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


  const logout = async () => {
    try {
      await unifiedAuthService.logout();
      setUser(null);
      toast({
        title: "Logged out",
        description: "You have been successfully logged out.",
      });
    } catch (error) {
      // Even if logout fails, clear local state
      setUser(null);
      tokenManager.clearTokens();
      localStorage.removeItem("authType");
      localStorage.removeItem("schoolCode");
      console.error("Logout error:", error);
    }
  };


  const authType = unifiedAuthService.getCurrentAuthType();

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated: !!user,
    authType,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
