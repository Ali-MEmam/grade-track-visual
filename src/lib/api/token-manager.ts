/**
 * Token Manager - Handles secure storage and retrieval of JWT tokens
 */

const TOKEN_KEY = 'access_token';
const REFRESH_TOKEN_KEY = 'refresh_token';
const TOKEN_EXPIRY_KEY = 'token_expiry';

export interface TokenData {
  accessToken: string;
  refreshToken: string;
  expiresIn?: number; // in seconds
}

class TokenManager {
  /**
   * Store tokens securely in localStorage
   */
  setTokens(tokens: TokenData): void {
    try {
      localStorage.setItem(TOKEN_KEY, tokens.accessToken);
      localStorage.setItem(REFRESH_TOKEN_KEY, tokens.refreshToken);
      
      // Calculate and store expiry time if provided
      if (tokens.expiresIn) {
        const expiryTime = Date.now() + (tokens.expiresIn * 1000);
        localStorage.setItem(TOKEN_EXPIRY_KEY, expiryTime.toString());
      }
    } catch (error) {
      console.error('Error storing tokens:', error);
    }
  }

  /**
   * Get access token from storage
   */
  getAccessToken(): string | null {
    try {
      return localStorage.getItem(TOKEN_KEY);
    } catch (error) {
      console.error('Error getting access token:', error);
      return null;
    }
  }

  /**
   * Get refresh token from storage
   */
  getRefreshToken(): string | null {
    try {
      return localStorage.getItem(REFRESH_TOKEN_KEY);
    } catch (error) {
      console.error('Error getting refresh token:', error);
      return null;
    }
  }

  /**
   * Check if access token is expired or about to expire
   * @param bufferTime - Buffer time in seconds before actual expiry (default: 60s)
   */
  isTokenExpired(bufferTime: number = 60): boolean {
    try {
      const expiryTime = localStorage.getItem(TOKEN_EXPIRY_KEY);
      if (!expiryTime) {
        // If no expiry time stored, assume token is valid
        return false;
      }
      
      const now = Date.now();
      const expiry = parseInt(expiryTime, 10);
      const bufferMs = bufferTime * 1000;
      
      // Token is expired if current time + buffer is past expiry
      return (now + bufferMs) >= expiry;
    } catch (error) {
      console.error('Error checking token expiry:', error);
      return true; // Assume expired on error for safety
    }
  }

  /**
   * Clear all tokens from storage
   */
  clearTokens(): void {
    try {
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(REFRESH_TOKEN_KEY);
      localStorage.removeItem(TOKEN_EXPIRY_KEY);
    } catch (error) {
      console.error('Error clearing tokens:', error);
    }
  }

  /**
   * Check if user has valid tokens
   */
  hasTokens(): boolean {
    return !!(this.getAccessToken() && this.getRefreshToken());
  }

  /**
   * Update only the access token (used after refresh)
   */
  updateAccessToken(accessToken: string, expiresIn?: number): void {
    try {
      localStorage.setItem(TOKEN_KEY, accessToken);
      
      if (expiresIn) {
        const expiryTime = Date.now() + (expiresIn * 1000);
        localStorage.setItem(TOKEN_EXPIRY_KEY, expiryTime.toString());
      }
    } catch (error) {
      console.error('Error updating access token:', error);
    }
  }

  /**
   * Decode JWT token payload (without verification)
   * Note: This is for client-side use only. Server should always verify.
   */
  decodeToken(token?: string): any | null {
    try {
      const tokenToUse = token || this.getAccessToken();
      if (!tokenToUse) return null;

      const parts = tokenToUse.split('.');
      if (parts.length !== 3) return null;

      const payload = parts[1];
      const decoded = atob(payload.replace(/-/g, '+').replace(/_/g, '/'));
      return JSON.parse(decoded);
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }

  /**
   * Get user info from stored token
   */
  getUserFromToken(): any | null {
    const decoded = this.decodeToken();
    if (!decoded) return null;

    // Common JWT claims that might contain user info
    return {
      id: decoded.sub || decoded.user_id || decoded.id,
      email: decoded.email,
      firstName: decoded.first_name || decoded.firstName,
      lastName: decoded.last_name || decoded.lastName,
      role: decoded.role || decoded.roles?.[0],
      // Add any other claims your backend provides
    };
  }
}

// Export singleton instance
export const tokenManager = new TokenManager();