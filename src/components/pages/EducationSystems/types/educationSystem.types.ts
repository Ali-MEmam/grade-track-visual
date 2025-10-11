// Education System Types

// API Request for creating an education system
export interface CreateEducationSystemRequest {
  name: string;
}

// API Request for updating an education system
export interface UpdateEducationSystemRequest {
  name: string;
}

// API Response structure
export interface EducationSystemApiResponse {
  id: string;
  name: string;
  createdAt?: string;
  updatedAt?: string;
}

// Frontend Education System structure
export interface EducationSystem {
  id: string;
  name: string;
  createdAt?: string;
  updatedAt?: string;
}

// API Response with pagination
export interface EducationSystemsResponse {
  statusCode: number;
  data: EducationSystemApiResponse[];
  paging?: {
    total: number;
    page: number;
    perPage: number;
    pageCount: number;
    prevPage: number | null;
    nextPage: number | null;
  };
  timestamp?: string;
  message?: string;
}
