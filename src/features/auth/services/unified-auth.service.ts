import { schoolAuthService } from './school-auth.service';
import { superAdminAuthService } from './superadmin-auth.service';
import {
  AuthType,
  SchoolLoginCredentials,
  SuperAdminLoginCredentials,
  SchoolUser,
  SuperAdminUser,
} from '../types/auth.types';

class UnifiedAuthService {
  /**
   * Login based on auth type
   */
  async login(
    authType: AuthType,
    credentials: SchoolLoginCredentials | SuperAdminLoginCredentials
  ): Promise<{ user: SchoolUser | SuperAdminUser; tokens: { access: string; refresh: string } }> {
    if (authType === 'school') {
      return schoolAuthService.login(credentials as SchoolLoginCredentials);
    } else {
      return superAdminAuthService.login(credentials as SuperAdminLoginCredentials);
    }
  }

  /**
   * Logout based on current auth type
   */
  async logout(): Promise<void> {
    const authType = this.getCurrentAuthType();
    
    if (authType === 'school') {
      return schoolAuthService.logout();
    } else if (authType === 'superadmin') {
      return superAdminAuthService.logout();
    } else {
      // Clear any stored tokens even if auth type is unknown
      localStorage.removeItem('authType');
      localStorage.removeItem('schoolCode');
    }
  }

  /**
   * Refresh token based on current auth type
   */
  async refreshToken(): Promise<string> {
    const authType = this.getCurrentAuthType();
    
    if (authType === 'school') {
      return schoolAuthService.refreshToken();
    } else if (authType === 'superadmin') {
      return superAdminAuthService.refreshToken();
    } else {
      throw new Error('No auth type found');
    }
  }

  /**
   * Get current user based on auth type
   */
  async getCurrentUser(): Promise<SchoolUser | SuperAdminUser | null> {
    const authType = this.getCurrentAuthType();
    
    if (authType === 'school') {
      return schoolAuthService.getMe();
    } else if (authType === 'superadmin') {
      return superAdminAuthService.getMe();
    } else {
      return null;
    }
  }

  /**
   * Get current auth type from localStorage
   */
  getCurrentAuthType(): AuthType | null {
    const authType = localStorage.getItem('authType');
    if (authType === 'school' || authType === 'superadmin') {
      return authType;
    }
    return null;
  }

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean {
    const authType = this.getCurrentAuthType();
    return authType !== null;
  }

  /**
   * Check if current user is SuperAdmin
   */
  isSuperAdmin(): boolean {
    return this.getCurrentAuthType() === 'superadmin';
  }

  /**
   * Check if current user is School user
   */
  isSchoolUser(): boolean {
    return this.getCurrentAuthType() === 'school';
  }

  /**
   * Get school code for current school user
   */
  getSchoolCode(): string | null {
    if (this.isSchoolUser()) {
      return localStorage.getItem('schoolCode');
    }
    return null;
  }

  /**
   * Switch auth context (for development/testing)
   */
  switchAuthContext(authType: AuthType): void {
    localStorage.setItem('authType', authType);
    // Trigger a page reload to update the entire app context
    window.location.href = authType === 'school' ? '/school/dashboard' : '/admin/dashboard';
  }
}

export const unifiedAuthService = new UnifiedAuthService();