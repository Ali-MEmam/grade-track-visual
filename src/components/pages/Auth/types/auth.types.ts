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
  identifier: string;
  password: string;
}

export interface LoginResponse {
  user: User;
  accessToken: string;
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
}

export interface AuthError {
  message: string;
  code?: string;
  field?: string;
  details?: Record<string, any>;
}

export interface ValidationError {
  field: string;
  message: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: AuthError;
  errors?: ValidationError[];
}

export interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: RegisterRequest) => Promise<void>;
  logout: () => void;
  setAuthUser: (user: User) => void;
}

export interface TokenPayload {
  sub: string;
  email: string;
  role: string;
  exp: number;
  iat: number;
  [key: string]: any;
}

export interface SessionData {
  user: User;
  accessToken: string;
  refreshToken: string;
  expiresAt: Date;
}
