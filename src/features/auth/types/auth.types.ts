// Base User Types
export interface BaseUser {
  id: string;
  email: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

// Authentication Types
export type AuthType = 'school' | 'superadmin';

// School User Types
export interface SchoolUser extends BaseUser {
  type: 'school';
  schoolId: string;
  schoolName: string;
  role: 'admin' | 'teacher' | 'staff';
  permissions: SchoolPermission[];
}

export interface SchoolPermission {
  resource: 'students' | 'teachers' | 'classes' | 'grades' | 'calendar';
  actions: ('create' | 'read' | 'update' | 'delete')[];
}

// SuperAdmin User Types
export interface SuperAdminUser extends BaseUser {
  type: 'superadmin';
  level: 'full' | 'read' | 'support';
  permissions: SuperAdminPermission[];
}

export interface SuperAdminPermission {
  resource: 'schools' | 'reports' | 'settings' | 'billing';
  actions: ('create' | 'read' | 'update' | 'delete')[];
}

// School Entity
export interface School {
  id: string;
  name: string;
  code: string;
  address: string;
  adminEmail: string;
  studentCount: number;
  teacherCount: number;
  status: 'active' | 'inactive' | 'suspended';
  createdAt: Date;
  updatedAt: Date;
}

// Authentication State
export interface AuthState {
  isAuthenticated: boolean;
  authType: AuthType | null;
  user: SchoolUser | SuperAdminUser | null;
  tokens: {
    access: string;
    refresh: string;
  } | null;
  loading: boolean;
  error: string | null;
}

// Login Credentials
export interface SchoolLoginCredentials {
  email: string;
  password: string;
  schoolCode: string;
}

export interface SuperAdminLoginCredentials {
  email: string;
  password: string;
}

// API Response Types
export interface AuthResponse<T = SchoolUser | SuperAdminUser> {
  user: T;
  tokens: {
    access: string;
    refresh: string;
  };
}

export interface SchoolAuthResponse extends AuthResponse<SchoolUser> {}
export interface SuperAdminAuthResponse extends AuthResponse<SuperAdminUser> {}