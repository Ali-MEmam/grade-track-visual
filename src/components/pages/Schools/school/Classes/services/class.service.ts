import axiosInstance from "@/lib/api/axios-instance";
import {
  Class,
  ClassApiResponse,
  ClassesResponse,
  CreateClassRequest,
  UpdateClassRequest,
} from "../types/class.types";

class ClassService {
  private readonly endpoints = {
    classes: `/classes`,
    class: (classId: string) => `/classes/${classId}`,
  };

  // Map backend class response to frontend Class type
  private mapClassResponse(classApi: ClassApiResponse): Class {
    return {
      id: classApi._id || classApi.id,
      name: classApi.name,
      description: classApi.description,
      schoolId: classApi.schoolId,
      createdAt: classApi.createdAt,
      updatedAt: classApi.updatedAt,
    };
  }

  async getClasses(schoolId: string): Promise<Class[]> {
    try {
      const response = await axiosInstance.get<ClassesResponse>(
        this.endpoints.classes
      );

      // Extract classes from the response and filter by schoolId
      const allClasses = response.data?.data || [];
      const schoolClasses = allClasses.filter(classItem => classItem.schoolId === schoolId);
      return schoolClasses.map(classItem => this.mapClassResponse(classItem));
    } catch (error: any) {
      console.error("Failed to fetch classes:", error);
      throw new Error(error.message || "Failed to fetch classes");
    }
  }

  async createClass(schoolId: string, data: Omit<CreateClassRequest, 'schoolId'>): Promise<Class> {
    try {
      const requestData = {
        ...data,
        schoolId,
      };

      const response = await axiosInstance.post<{ statusCode: number; data: ClassApiResponse }>(
        this.endpoints.classes,
        requestData
      );
      return this.mapClassResponse(response.data.data);
    } catch (error: any) {
      throw new Error(error.message || "Failed to create class");
    }
  }

  async updateClass(classId: string, data: UpdateClassRequest): Promise<Class> {
    try {
      const response = await axiosInstance.put<{ statusCode: number; data: ClassApiResponse }>(
        this.endpoints.class(classId),
        data
      );
      return this.mapClassResponse(response.data.data);
    } catch (error: any) {
      throw new Error(error.message || "Failed to update class");
    }
  }

  async deleteClass(classId: string): Promise<void> {
    try {
      await axiosInstance.delete(this.endpoints.class(classId));
    } catch (error: any) {
      throw new Error(error.message || "Failed to delete class");
    }
  }
}

export const classService = new ClassService();
export { ClassService };