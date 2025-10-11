// Teacher Types

// API Request for creating a teacher
export interface CreateTeacherRequest {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  schoolId: string;
  classIds: string[];
  subjects: string[];
  isActive: boolean;
}

// API Request for updating a teacher
export interface UpdateTeacherRequest {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  classIds?: string[];
  subjects?: string[];
  isActive?: boolean;
}

// API Response structure
export interface TeacherApiResponse {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  schoolId: string;
  classIds: string[];
  subjects: string[];
  isActive: boolean;
  avatar?: string;
  createdAt: string;
  updatedAt: string;
  id: string;
}

// Frontend Teacher structure
export interface Teacher {
  id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  phone: string;
  schoolId: string;
  classIds: string[];
  subjects: string[];
  isActive: boolean;
  avatar?: string;
  createdAt: string;
  updatedAt: string;
}

// API Response with pagination
export interface TeachersResponse {
  statusCode: number;
  data: TeacherApiResponse[];
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

// Teacher status type
export type TeacherStatus = 'active' | 'on-leave' | 'inactive';
