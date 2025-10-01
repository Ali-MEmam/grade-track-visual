// Class Types

// API Request for creating a class
export interface CreateClassRequest {
  name: string;
  description: string;
  schoolId: string;
}

// API Request for updating a class
export interface UpdateClassRequest {
  name?: string;
  description?: string;
}

// API Response structure
export interface ClassApiResponse {
  _id: string;
  name: string;
  description: string;
  schoolId: string;
  createdAt: string;
  updatedAt: string;
  id: string;
}

// Frontend Class structure
export interface Class {
  id: string;
  name: string;
  description: string;
  schoolId: string;
  createdAt: string;
  updatedAt: string;
}

// API Response with pagination
export interface ClassesResponse {
  statusCode: number;
  data: ClassApiResponse[];
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