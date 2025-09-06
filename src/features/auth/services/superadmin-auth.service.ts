import axios from '@/lib/api/axios-instance';
import { SuperAdminLoginCredentials, SuperAdminAuthResponse } from '../types/auth.types';
import { tokenManager } from '@/lib/api/token-manager';

class SuperAdminAuthService {
  private readonly baseURL = '/api/superadmin/auth';

  async login(credentials: SuperAdminLoginCredentials): Promise<SuperAdminAuthResponse> {
    try {
      const response = await axios.post<SuperAdminAuthResponse>(
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
      localStorage.setItem('authType', 'superadmin');

      // Log access attempt for security
      console.info('[Security] SuperAdmin login successful', {
        timestamp: new Date().toISOString(),
        email: credentials.email,
      });

      return response.data;
    } catch (error: any) {
      // Log failed attempt for security
      console.warn('[Security] SuperAdmin login failed', {
        timestamp: new Date().toISOString(),
        email: credentials.email,
        error: error.response?.status,
      });

      if (error.response?.status === 401) {
        throw new Error('Invalid superadmin credentials');
      }
      if (error.response?.status === 403) {
        throw new Error('Access denied. This incident will be reported.');
      }
      if (error.response?.status === 429) {
        throw new Error('Too many login attempts. Please try again later.');
      }
      throw new Error(error.response?.data?.message || 'Failed to authenticate as superadmin');
    }
  }

  async logout(): Promise<void> {
    try {
      await axios.post(`${this.baseURL}/logout`);
      
      // Log logout for security
      console.info('[Security] SuperAdmin logout', {
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      tokenManager.clearTokens();
      localStorage.removeItem('authType');
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
      throw new Error('Failed to refresh superadmin token');
    }
  }

  async getMe(): Promise<SuperAdminAuthResponse['user']> {
    try {
      const response = await axios.get<SuperAdminAuthResponse['user']>(
        `${this.baseURL}/me`
      );
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch superadmin information');
    }
  }

  // SuperAdmin specific methods
  async verifyTwoFactor(code: string): Promise<void> {
    try {
      await axios.post(`${this.baseURL}/verify-2fa`, { code });
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Invalid 2FA code');
    }
  }

  async getAuditLog(): Promise<any[]> {
    try {
      const response = await axios.get(`${this.baseURL}/audit-log`);
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch audit log');
    }
  }

  async getSystemStatus(): Promise<{
    status: 'operational' | 'degraded' | 'down';
    services: Array<{ name: string; status: string }>;
  }> {
    try {
      const response = await axios.get('/api/system/status');
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch system status');
    }
  }
}

export const superAdminAuthService = new SuperAdminAuthService();