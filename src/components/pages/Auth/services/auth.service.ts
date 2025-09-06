import axiosInstance from "@/lib/api/axios-instance";
import { tokenManager } from "@/lib/api/token-manager";
import {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
  RefreshTokenRequest,
  RefreshTokenResponse,
  User,
  ApiResponse,
} from "@/components/pages/Auth/types/auth.types";

/**
 * Authentication Service
 * Handles all authentication-related API calls
 */
class AuthService {
  private readonly endpoints = {
    login: "/auth/login",
    register: "/auth/register",
    logout: "/auth/logout",
    refresh: "/auth/refresh",
    me: "/auth/me",
  };

  /**
   * Login user with email and password
   */
  async login(credentials: LoginRequest): Promise<LoginResponse> {
    try {
      const response = await axiosInstance.post<ApiResponse<LoginResponse>>(
        this.endpoints.login,
        credentials
      );

      if (response.data.success && response.data.data) {
        const { accessToken, refreshToken, expiresIn } = response.data.data;

        // Store tokens
        tokenManager.setTokens({
          accessToken,
          refreshToken,
          expiresIn,
        });

        return response.data.data;
      }

      throw new Error(response.data.error?.message || "Login failed");
    } catch (error: any) {
      // Handle axios errors
      if (error.response?.data?.error) {
        throw new Error(error.response.data.error.message);
      }
      // Handle network errors (server down, no internet, etc.)
      if (error.code === "ERR_NETWORK" || error.code === "ECONNREFUSED") {
        throw new Error(
          "Unable to connect to server. Please check your connection and try again."
        );
      }
      // Handle timeout errors
      if (error.code === "ECONNABORTED") {
        throw new Error("Request timed out. Please try again.");
      }
      // Generic error fallback
      throw new Error(
        error.message || "An unexpected error occurred. Please try again."
      );
    }
  }

  /**
   * Register new user
   */
  async register(userData: RegisterRequest): Promise<RegisterResponse> {
    try {
      const response = await axiosInstance.post<ApiResponse<RegisterResponse>>(
        this.endpoints.register,
        userData
      );

      if (response.data.success && response.data.data) {
        const { accessToken, refreshToken, expiresIn } = response.data.data;

        // Store tokens
        tokenManager.setTokens({
          accessToken,
          refreshToken,
          expiresIn,
        });

        return response.data.data;
      }

      throw new Error(response.data.error?.message || "Registration failed");
    } catch (error: any) {
      // Handle validation errors
      if (error.response?.data?.errors) {
        const validationErrors = error.response.data.errors
          .map((err: any) => `${err.field}: ${err.message}`)
          .join(", ");
        throw new Error(validationErrors);
      }

      if (error.response?.data?.error) {
        throw new Error(error.response.data.error.message);
      }
      throw error;
    }
  }

  /**
   * Logout user
   */
  async logout(): Promise<void> {
    try {
      const refreshToken = tokenManager.getRefreshToken();

      // Call logout endpoint if refresh token exists
      if (refreshToken) {
        await axiosInstance.post(this.endpoints.logout, { refreshToken });
      }
    } catch (error) {
      // Log error but don't throw - we still want to clear local tokens
      console.error("Logout API error:", error);
    } finally {
      // Always clear tokens locally
      tokenManager.clearTokens();
    }
  }

  /**
   * Refresh access token using refresh token
   */
  async refreshToken(): Promise<RefreshTokenResponse> {
    const refreshToken = tokenManager.getRefreshToken();

    if (!refreshToken) {
      throw new Error("No refresh token available");
    }

    try {
      const response = await axiosInstance.post<
        ApiResponse<RefreshTokenResponse>
      >(this.endpoints.refresh, { refreshToken } as RefreshTokenRequest);

      if (response.data.success && response.data.data) {
        const {
          accessToken,
          refreshToken: newRefreshToken,
          expiresIn,
        } = response.data.data;

        // Update tokens
        if (newRefreshToken) {
          tokenManager.setTokens({
            accessToken,
            refreshToken: newRefreshToken,
            expiresIn,
          });
        } else {
          tokenManager.updateAccessToken(accessToken, expiresIn);
        }

        return response.data.data;
      }

      throw new Error(response.data.error?.message || "Token refresh failed");
    } catch (error: any) {
      tokenManager.clearTokens();

      if (error.response?.data?.error) {
        throw new Error(error.response.data.error.message);
      }
      throw error;
    }
  }

  /**
   * Get current authenticated user
   */
  async getCurrentUser(): Promise<User> {
    try {
      const response = await axiosInstance.get<ApiResponse<User>>(
        this.endpoints.me
      );

      if (response.data.success && response.data.data) {
        return response.data.data;
      }

      throw new Error(response.data.error?.message || "Failed to fetch user");
    } catch (error: any) {
      if (error.response?.data?.error) {
        throw new Error(error.response.data.error.message);
      }
      throw error;
    }
  }

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean {
    return tokenManager.hasTokens() && !tokenManager.isTokenExpired();
  }

  /**
   * Get user from stored token (without API call)
   */
  getUserFromToken(): User | null {
    const userInfo = tokenManager.getUserFromToken();
    if (!userInfo) return null;

    // Map token claims to User interface
    return {
      id: userInfo.id,
      email: userInfo.email,
      firstName: userInfo.firstName || "",
      lastName: userInfo.lastName || "",
      role: userInfo.role || "student",
    };
  }
}

// Export singleton instance
export const authService = new AuthService();

// Export the class for testing purposes
export { AuthService };
