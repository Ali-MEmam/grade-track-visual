import axiosInstance from "@/lib/api/axios-instance";
import { tokenManager } from "@/lib/api/token-manager";
import {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
  User,
  ApiResponse,
} from "@/components/pages/Auth/types/auth.types";

class AuthService {
  private readonly endpoints = {
    login: "/authentication",
    register: "/auth/register",
    logout: "/auth/logout",
    me: "/auth/me",
  };

  async login(credentials: LoginRequest): Promise<LoginResponse> {
    try {
      const response = await axiosInstance.post<
        ApiResponse<{ token: string; user: any }>
      >(this.endpoints.login, credentials);
      const { token, user } = response.data.data;
      const mappedUser: User = {
        id: user?._id || user?.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role:
          user.userType === "PLATFORM_ADMIN"
            ? "admin"
            : user.userType === "TEACHER"
            ? "teacher"
            : "student",
      };

      tokenManager.setTokens({
        accessToken: token,
      });

      return {
        user: mappedUser,
        accessToken: token,
      };
    } catch (error: any) {
      throw new Error(error.message || "Login failed. Please try again.");
    }
  }

  async register(userData: RegisterRequest): Promise<RegisterResponse> {
    try {
      const response = await axiosInstance.post<ApiResponse<RegisterResponse>>(
        this.endpoints.register,
        userData
      );

      if (response.data.success && response.data.data) {
        const { accessToken } = response.data.data;

        tokenManager.setTokens({
          accessToken,
        });

        return response.data.data;
      }

      throw new Error(response.data.error?.message || "Registration failed");
    } catch (error: any) {
      throw new Error(error.message || "Registration failed. Please try again.");
    }
  }

  async logout(): Promise<void> {
    try {
      await axiosInstance.post(this.endpoints.logout, {});
    } catch (error) {
    } finally {
      tokenManager.clearTokens();
    }
  }


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
      throw new Error(error.message || "Failed to fetch user information.");
    }
  }

  isAuthenticated(): boolean {
    return tokenManager.hasTokens();
  }

}

export const authService = new AuthService();
export { AuthService };
