const TOKEN_KEY = 'access_token';
const USER_KEY = 'user_data';

export interface TokenData {
  accessToken: string;
}

export interface StoredUser {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  role: 'admin' | 'teacher' | 'student';
}

class TokenManager {
  setTokens(tokens: TokenData): void {
    try {
      localStorage.setItem(TOKEN_KEY, tokens.accessToken);
    } catch (error) {
    }
  }

  getAccessToken(): string | null {
    try {
      return localStorage.getItem(TOKEN_KEY);
    } catch (error) {
      return null;
    }
  }

  setUser(user: StoredUser): void {
    try {
      localStorage.setItem(USER_KEY, JSON.stringify(user));
    } catch (error) {
    }
  }

  getUser(): StoredUser | null {
    try {
      const userData = localStorage.getItem(USER_KEY);
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      return null;
    }
  }

  clearTokens(): void {
    try {
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(USER_KEY);
    } catch (error) {
    }
  }

  hasTokens(): boolean {
    return !!this.getAccessToken();
  }
}

export const tokenManager = new TokenManager();