// Education Level Types

// API Request for creating an education level
export interface CreateEducationLevelRequest {
  id: number;
  name: string;
}

// API Request for updating an education level
export interface UpdateEducationLevelRequest {
  id: number;
  name: string;
}

// API Response structure
export interface EducationLevelApiResponse {
  id: string | number;
  name: string;
  createdAt?: string;
  updatedAt?: string;
}

// Frontend Education Level structure
export interface EducationLevel {
  id: string;
  name: string;
  createdAt?: string;
  updatedAt?: string;
}

// API Response with pagination
export interface EducationLevelsResponse {
  statusCode: number;
  data: EducationLevelApiResponse[];
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