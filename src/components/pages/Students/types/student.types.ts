// Student Types

// Address structure
export interface Address {
  address: string;
  city: string;
  country: string;
  area: string;
  coordinates?: {
    lat: string;
    long: string;
  };
}

// API Request for creating a student
export interface CreateStudentRequest {
  firstName: string;
  lastName: string;
  email: string;
  address: Address;
  dateOfBirth: string; // ISO 8601 format
  schoolId: string;
  enrollmentDate: string; // ISO 8601 format
  classId: string;
  educationLevelId: number; // 0 if not selected
  educationSystemId: number; // 0 if not selected
  phone: string;
  isActive: boolean;
}

// API Request for updating a student
export interface UpdateStudentRequest {
  firstName?: string;
  lastName?: string;
  email?: string;
  address?: Address;
  dateOfBirth?: string;
  schoolId?: string;
  enrollmentDate?: string;
  classId?: string;
  educationLevelId?: number;
  educationSystemId?: number;
  phone?: string;
  isActive?: boolean;
}

// API Response structure
export interface StudentApiResponse {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  address: Address;
  dateOfBirth: string;
  schoolId: string;
  enrollmentDate: string;
  classId: string;
  educationLevelId: number;
  educationSystemId: number;
  phone: string;
  isActive: boolean;
  avatar?: string;
  createdAt: string;
  updatedAt: string;
  id: string;
}

// Frontend Student structure
export interface Student {
  id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  address: Address;
  dateOfBirth: string;
  schoolId: string;
  enrollmentDate: string;
  classId: string;
  educationLevelId: number;
  educationSystemId: number;
  phone: string;
  isActive: boolean;
  avatar?: string;
  createdAt: string;
  updatedAt: string;
}

// API Response with pagination
export interface StudentsResponse {
  statusCode: number;
  data: StudentApiResponse[];
  paging?: {
    total: number;
    page: number;
    perPage: number;
    pageCount: number;
    prevPage: number | null;
    nextPage: number | null;
  };
  timestamp: string;
  message: string;
}

// Student status type
export type StudentStatus = 'active' | 'inactive';
