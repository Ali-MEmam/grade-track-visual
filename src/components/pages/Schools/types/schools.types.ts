// Backend School response structure
export interface SchoolApiResponse {
  _id: string;
  isDeleted: boolean;
  nameEn: string;
  nameAr: string;
  address: {
    address: string;
    city: string;
    country: string;
    area: string;
    coordinates?: {
      lat: string;
      long: string;
    };
  };
  phone: string;
  email: string;
  website?: string;
  educationSystemsIds: number[];
  logoUrl?: string;
  createdAt: string;
  updatedAt: string;
  id: string;
  educationSystems: any[];
}

// Frontend School structure (mapped from backend)
export interface School {
  id: string;
  nameEn: string;
  nameAr: string;
  address: {
    address: string;
    city: string;
    country: string;
    area: string;
    coordinates?: {
      lat: string;
      long: string;
    };
  };
  phone: string;
  email: string;
  website?: string;
  educationSystemsIds: number[];
  logoUrl?: string;
  isDeleted: boolean;
  educationSystems: any[];
  createdAt: string;
  updatedAt: string;
}

// API response structure with pagination
export interface SchoolsResponse {
  statusCode: number;
  data: SchoolApiResponse[];
  paging: {
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

// API request structure matching backend
export interface CreateSchoolApiRequest {
  nameEn: string;
  nameAr: string;
  address: {
    address: string;
    city: string;
    country: string;
    area: string;
    coordinates?: {
      lat: string;
      long: string;
    };
  };
  phone: string;
  email: string;
  website?: string;
  educationSystemsIds: number[];
  logoUrl?: string;
}

// Frontend form structure
export interface CreateSchoolRequest {
  nameEn: string;
  nameAr: string;
  address: string;
  city: string;
  country: string;
  area: string;
  latitude?: string;
  longitude?: string;
  phone: string;
  email: string;
  website?: string;
  educationSystemsIds: number[];
  logoUrl?: string;
}

export interface UpdateSchoolRequest extends Partial<CreateSchoolRequest> {
  status?: School['status'];
}

export interface SchoolStats {
  totalStudents: number;
  totalTeachers: number;
  totalClasses: number;
  averageClassSize: number;
  studentTeacherRatio: number;
  attendanceRate: number;
  graduationRate?: number;
}

export interface SchoolFilters {
  search: string;
  type: string;
  status: string;
  establishedYearFrom?: number;
  establishedYearTo?: number;
}