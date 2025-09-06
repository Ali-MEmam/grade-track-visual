import axios from '@/lib/api/axios-instance';
import { SchoolLoginCredentials, SchoolAuthResponse } from '../types/auth.types';
import { tokenManager } from '@/lib/api/token-manager';

class SchoolAuthService {
  private readonly baseURL = '/api/school/auth';

  async login(credentials: SchoolLoginCredentials): Promise<SchoolAuthResponse> {
    try {
      const response = await axios.post<SchoolAuthResponse>(
        `${this.baseURL}/login`,
        credentials
      );

      // Store tokens
      if (response.data.tokens) {
        tokenManager.setTokens(
          response.data.tokens.access,
          response.data.tokens.refresh
        );
      }

      // Store auth type
      localStorage.setItem('authType', 'school');
      localStorage.setItem('schoolCode', credentials.schoolCode);

      return response.data;
    } catch (error: any) {
      if (error.response?.status === 401) {
        throw new Error('Invalid school code or credentials');
      }
      if (error.response?.status === 403) {
        throw new Error('School account is suspended or inactive');
      }
      throw new Error(error.response?.data?.message || 'Failed to login to school portal');
    }
  }

  async register(data: {
    schoolCode: string;
    email: string;
    password: string;
    name: string;
    role: 'admin' | 'teacher' | 'staff';
  }): Promise<SchoolAuthResponse> {
    try {
      const response = await axios.post<SchoolAuthResponse>(
        `${this.baseURL}/register`,
        data
      );

      // Store tokens
      if (response.data.tokens) {
        tokenManager.setTokens(
          response.data.tokens.access,
          response.data.tokens.refresh
        );
      }

      // Store auth type
      localStorage.setItem('authType', 'school');
      localStorage.setItem('schoolCode', data.schoolCode);

      return response.data;
    } catch (error: any) {
      if (error.response?.status === 400) {
        throw new Error(error.response.data.message || 'Invalid registration data');
      }
      if (error.response?.status === 404) {
        throw new Error('School code not found');
      }
      throw new Error(error.response?.data?.message || 'Failed to register');
    }
  }

  async logout(): Promise<void> {
    try {
      await axios.post(`${this.baseURL}/logout`);
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      tokenManager.clearTokens();
      localStorage.removeItem('authType');
      localStorage.removeItem('schoolCode');
    }
  }

  async refreshToken(): Promise<string> {
    const refreshToken = tokenManager.getRefreshToken();
    if (!refreshToken) {
      throw new Error('No refresh token available');
    }

    try {
      const response = await axios.post<{ accessToken: string }>(
        `${this.baseURL}/refresh`,
        { refreshToken }
      );

      tokenManager.setAccessToken(response.data.accessToken);
      return response.data.accessToken;
    } catch (error) {
      tokenManager.clearTokens();
      localStorage.removeItem('authType');
      localStorage.removeItem('schoolCode');
      throw new Error('Failed to refresh token');
    }
  }

  async getMe(): Promise<SchoolAuthResponse['user']> {
    try {
      const response = await axios.get<SchoolAuthResponse['user']>(
        `${this.baseURL}/me`
      );
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch user information');
    }
  }
}

export const schoolAuthService = new SchoolAuthService();