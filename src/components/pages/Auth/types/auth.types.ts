/**
 * Authentication related type definitions
 */

// User types
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: "student" | "teacher" | "admin";
  avatar?: string;
  createdAt?: string;
  updatedAt?: string;
}

// Authentication request/response types
export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
  expiresIn: number; // Token expiry in seconds
}

export interface RegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword?: string;
  role?: "student" | "teacher" | "admin";
}

export interface RegisterResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

export interface RefreshTokenRequest {
  refreshToken: string;
}

export interface RefreshTokenResponse {
  accessToken: string;
  refreshToken?: string; // Optional: backend might return new refresh token
  expiresIn: number;
}

// Error types
export interface AuthError {
  message: string;
  code?: string;
  field?: string; // For field-specific validation errors
  details?: Record<string, any>;
}

export interface ValidationError {
  field: string;
  message: string;
}

// API Response wrapper
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: AuthError;
  errors?: ValidationError[]; // For multiple validation errors
}

// Auth context types
export interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: RegisterRequest) => Promise<void>;
  logout: () => void;
  refreshToken: () => Promise<void>;
}

// Token payload (JWT decoded)
export interface TokenPayload {
  sub: string; // Subject (user ID)
  email: string;
  role: string;
  exp: number; // Expiry timestamp
  iat: number; // Issued at timestamp
  [key: string]: any; // Allow for additional claims
}

// Session data
export interface SessionData {
  user: User;
  accessToken: string;
  refreshToken: string;
  expiresAt: Date;
}
