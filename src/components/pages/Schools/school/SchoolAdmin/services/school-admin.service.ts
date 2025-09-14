import axiosInstance from "@/lib/api/axios-instance";
import {
  SchoolAdmin,
  SchoolAdminApiResponse,
  SchoolAdminsResponse,
  CreateSchoolAdminRequest,
  UpdateSchoolAdminRequest,
} from "../types/school-admin.types";

class SchoolAdminService {
  private readonly endpoints = {
    schoolAdmins: (schoolId: string) => `/schools/${schoolId}/admins`,
    schoolAdmin: (schoolId: string, adminId: string) => `/schools/${schoolId}/admins/${adminId}`,
  };

  // Map backend admin response to frontend SchoolAdmin type
  private mapAdminResponse(adminApi: SchoolAdminApiResponse): SchoolAdmin {
    return {
      id: adminApi._id || adminApi.id,
      firstName: adminApi.firstName,
      lastName: adminApi.lastName,
      fullName: `${adminApi.firstName} ${adminApi.lastName}`,
      email: adminApi.email,
      phone: adminApi.phone,
      schoolId: adminApi.schoolId,
      position: adminApi.position,
      isActive: adminApi.isActive,
      avatar: adminApi.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${adminApi.firstName}${adminApi.lastName}`,
      createdAt: adminApi.createdAt,
      updatedAt: adminApi.updatedAt,
    };
  }

  async getSchoolAdmins(schoolId: string): Promise<SchoolAdmin[]> {
    try {
      const response = await axiosInstance.get<SchoolAdminsResponse>(
        this.endpoints.schoolAdmins(schoolId)
      );

      // Extract admins from the response and map them
      const admins = response.data?.data || [];
      return admins.map(admin => this.mapAdminResponse(admin));
    } catch (error: any) {
      console.error("Failed to fetch school admins:", error);
      throw new Error(error.message || "Failed to fetch school admins");
    }
  }

  async createSchoolAdmin(schoolId: string, data: Omit<CreateSchoolAdminRequest, 'schoolId'>): Promise<SchoolAdmin> {
    try {
      const requestData = {
        ...data,
        schoolId,
      };

      const response = await axiosInstance.post<{ statusCode: number; data: SchoolAdminApiResponse }>(
        this.endpoints.schoolAdmins(schoolId),
        requestData
      );
      return this.mapAdminResponse(response.data.data);
    } catch (error: any) {
      throw new Error(error.message || "Failed to create school admin");
    }
  }

  async updateSchoolAdmin(schoolId: string, adminId: string, data: UpdateSchoolAdminRequest): Promise<SchoolAdmin> {
    try {
      const response = await axiosInstance.put<{ statusCode: number; data: SchoolAdminApiResponse }>(
        this.endpoints.schoolAdmin(schoolId, adminId),
        data
      );
      return this.mapAdminResponse(response.data.data);
    } catch (error: any) {
      throw new Error(error.message || "Failed to update school admin");
    }
  }

  async deleteSchoolAdmin(schoolId: string, adminId: string): Promise<void> {
    try {
      await axiosInstance.delete(this.endpoints.schoolAdmin(schoolId, adminId));
    } catch (error: any) {
      throw new Error(error.message || "Failed to delete school admin");
    }
  }
}

export const schoolAdminService = new SchoolAdminService();
export { SchoolAdminService };