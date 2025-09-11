import axiosInstance from "@/lib/api/axios-instance";
import {
  School,
  SchoolApiResponse,
  SchoolsResponse,
  CreateSchoolRequest,
  CreateSchoolApiRequest,
  UpdateSchoolRequest,
  SchoolStats,
  SchoolFilters,
} from "../types/schools.types";

class SchoolsService {
  private readonly endpoints = {
    schools: "/schools",
    school: (id: string) => `/schools/${id}`,
    schoolStats: (id: string) => `/schools/${id}/stats`,
  };

  // Map backend school response to frontend School type
  private mapSchoolResponse(schoolApi: SchoolApiResponse): School {
    return {
      id: schoolApi._id || schoolApi.id,
      nameEn: schoolApi.nameEn,
      nameAr: schoolApi.nameAr,
      address: schoolApi.address,
      phone: schoolApi.phone,
      email: schoolApi.email,
      website: schoolApi.website,
      educationSystemsIds: schoolApi.educationSystemsIds,
      logoUrl: schoolApi.logoUrl,
      isDeleted: schoolApi.isDeleted,
      educationSystems: schoolApi.educationSystems,
      createdAt: schoolApi.createdAt,
      updatedAt: schoolApi.updatedAt,
    };
  }

  async getSchools(filters?: SchoolFilters): Promise<School[]> {
    try {
      const params = new URLSearchParams();

      if (filters) {
        if (filters.search) params.append("search", filters.search);
        if (filters.type) params.append("type", filters.type);
        if (filters.status) params.append("status", filters.status);
        if (filters.establishedYearFrom)
          params.append("yearFrom", filters.establishedYearFrom.toString());
        if (filters.establishedYearTo)
          params.append("yearTo", filters.establishedYearTo.toString());
      }

      const response = await axiosInstance.get<SchoolsResponse>(
        `${this.endpoints.schools}?${params.toString()}`
      );

      // Extract schools from the response and map them
      const schools = response.data?.data || [];
      return schools.map(school => this.mapSchoolResponse(school));
    } catch (error: any) {
      console.error("Failed to fetch schools:", error);
      throw new Error(error.message || "Failed to fetch schools");
    }
  }

  async getSchoolById(id: string): Promise<School> {
    try {
      const response = await axiosInstance.get<{ statusCode: number; data: SchoolApiResponse }>(
        this.endpoints.school(id)
      );
      return this.mapSchoolResponse(response.data.data);
    } catch (error: any) {
      throw new Error(error.message || "Failed to fetch school details");
    }
  }

  async createSchool(data: CreateSchoolRequest): Promise<School> {
    try {
      // Transform frontend data to backend API format
      const apiRequest: CreateSchoolApiRequest = {
        nameEn: data.nameEn,
        nameAr: data.nameAr,
        address: {
          address: data.address,
          city: data.city,
          country: data.country,
          area: data.area,
          coordinates:
            data.latitude && data.longitude
              ? {
                  lat: data.latitude,
                  long: data.longitude,
                }
              : undefined,
        },
        phone: data.phone,
        email: data.email,
        website: data.website,
        educationSystemsIds: data.educationSystemsIds,
        logoUrl: data.logoUrl,
      };

      const response = await axiosInstance.post<{ statusCode: number; data: SchoolApiResponse }>(
        this.endpoints.schools,
        apiRequest
      );
      return this.mapSchoolResponse(response.data.data);
    } catch (error: any) {
      throw new Error(error.message || "Failed to create school");
    }
  }

  async updateSchool(id: string, data: UpdateSchoolRequest): Promise<School> {
    try {
      const response = await axiosInstance.put<{ statusCode: number; data: SchoolApiResponse }>(
        this.endpoints.school(id),
        data
      );
      return this.mapSchoolResponse(response.data.data);
    } catch (error: any) {
      throw new Error(error.message || "Failed to update school");
    }
  }

  async deleteSchool(id: string): Promise<void> {
    try {
      await axiosInstance.delete(this.endpoints.school(id));
    } catch (error: any) {
      throw new Error(error.message || "Failed to delete school");
    }
  }

  async getSchoolStats(id: string): Promise<SchoolStats> {
    try {
      const response = await axiosInstance.get<SchoolStats>(
        this.endpoints.schoolStats(id)
      );
      return response.data;
    } catch (error: any) {
      throw new Error(error.message || "Failed to fetch school statistics");
    }
  }
}

export const schoolsService = new SchoolsService();
export { SchoolsService };
