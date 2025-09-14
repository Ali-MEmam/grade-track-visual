// School Admin Types

// API Request for creating a school admin
export interface CreateSchoolAdminRequest {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  schoolId: string;
  position: string;
  isActive: boolean;
}

// API Request for updating a school admin
export interface UpdateSchoolAdminRequest {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  position?: string;
  isActive?: boolean;
}

// API Response structure
export interface SchoolAdminApiResponse {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  schoolId: string;
  position: string;
  isActive: boolean;
  avatar?: string;
  createdAt: string;
  updatedAt: string;
  id: string;
}

// Frontend School Admin structure
export interface SchoolAdmin {
  id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  phone: string;
  schoolId: string;
  position: string;
  isActive: boolean;
  avatar?: string;
  createdAt: string;
  updatedAt: string;
}

// API Response with pagination
export interface SchoolAdminsResponse {
  statusCode: number;
  data: SchoolAdminApiResponse[];
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