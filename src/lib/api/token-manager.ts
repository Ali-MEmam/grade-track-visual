const TOKEN_KEY = 'access_token';

export interface TokenData {
  accessToken: string;
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

  clearTokens(): void {
    try {
      localStorage.removeItem(TOKEN_KEY);
    } catch (error) {
    }
  }

  hasTokens(): boolean {
    return !!this.getAccessToken();
  }
}

export const tokenManager = new TokenManager();