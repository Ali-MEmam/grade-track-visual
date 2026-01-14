import axiosInstance from "@/lib/api/axios-instance";
import { tokenManager } from "@/lib/api/token-manager";
import {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
  User,
  ApiResponse,
  ChangePasswordRequest,
  ChangePasswordResponse,
} from "@/components/pages/Auth/types/auth.types";

class AuthService {
  private readonly endpoints = {
    login: "/authentication",
    register: "/auth/register",
    logout: "/auth/logout",
    me: "/auth/me",
    changePassword: "/authentication/password-reset",
  };

  async login(credentials: LoginRequest): Promise<LoginResponse> {
    try {
      const response = await axiosInstance.post<
        ApiResponse<{ token: string; user: any; isTempPassword?: boolean }>
      >(this.endpoints.login, credentials);
      const { token, user, isTempPassword } = response.data.data;
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

      // Store user data in localStorage
      tokenManager.setUser(mappedUser);

      return {
        user: mappedUser,
        accessToken: token,
        isTempPassword,
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
        const { accessToken, user } = response.data.data;

        tokenManager.setTokens({
          accessToken,
        });

        // Store user data if available
        if (user) {
          tokenManager.setUser(user);
        }

        return response.data.data;
      }

      throw new Error(response.data.error?.message || "Registration failed");
    } catch (error: any) {
      throw new Error(
        error.message || "Registration failed. Please try again."
      );
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
    // First try to get user from localStorage
    const storedUser = tokenManager.getUser();
    if (storedUser) {
      return storedUser as User;
    }

    // If no stored user, try API (though this might fail if endpoint doesn't exist)
    try {
      const response = await axiosInstance.get<ApiResponse<User>>(
        this.endpoints.me
      );

      if (response.data.success && response.data.data) {
        // Store the fetched user for future use
        tokenManager.setUser(response.data.data);
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

  async changePassword(
    data: ChangePasswordRequest
  ): Promise<ChangePasswordResponse> {
    try {
      const response = await axiosInstance.post<
        ApiResponse<ChangePasswordResponse>
      >(this.endpoints.changePassword, data);

      if (response.data) {
        return {
          success: true,
          message:
            response.data.data?.message || "Password changed successfully",
        };
      }

      throw new Error(
        response.data.error?.message || "Failed to change password"
      );
    } catch (error: any) {
      throw new Error(
        error.message || "Failed to change password. Please try again."
      );
    }
  }
}

export const authService = new AuthService();
export { AuthService };
