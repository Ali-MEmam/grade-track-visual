import axiosInstance from "@/lib/api/axios-instance";
import {
  EducationLevel,
  EducationLevelApiResponse,
  EducationLevelsResponse,
  CreateEducationLevelRequest,
  UpdateEducationLevelRequest,
} from "../types/educationLevel.types";

class EducationLevelService {
  private readonly endpoints = {
    educationLevels: `/education-levels`,
    educationLevel: (levelId: string) => `/education-levels/${levelId}`,
  };

  // Map backend education level response to frontend EducationLevel type
  private mapEducationLevelResponse(levelApi: EducationLevelApiResponse): EducationLevel {
    return {
      id: String(levelApi.id),
      name: levelApi.name,
      createdAt: levelApi.createdAt,
      updatedAt: levelApi.updatedAt,
    };
  }

  async getEducationLevels(): Promise<EducationLevel[]> {
    try {
      const response = await axiosInstance.get<EducationLevelsResponse>(
        this.endpoints.educationLevels
      );

      // Extract education levels from the response
      const levels = response.data?.data || [];
      return levels.map((level) => this.mapEducationLevelResponse(level));
    } catch (error: any) {
      console.error("Failed to fetch education levels:", error);
      throw new Error(error.message || "Failed to fetch education levels");
    }
  }

  async createEducationLevel(
    data: CreateEducationLevelRequest
  ): Promise<EducationLevel> {
    try {
      const response = await axiosInstance.post<{
        statusCode: number;
        data: EducationLevelApiResponse;
      }>(this.endpoints.educationLevels, data);
      return this.mapEducationLevelResponse(response.data.data);
    } catch (error: any) {
      throw new Error(error.message || "Failed to create education level");
    }
  }

  async updateEducationLevel(
    levelId: string,
    data: UpdateEducationLevelRequest
  ): Promise<EducationLevel> {
    try {
      const response = await axiosInstance.patch<{
        statusCode: number;
        data: EducationLevelApiResponse;
      }>(this.endpoints.educationLevel(levelId), data);
      return this.mapEducationLevelResponse(response.data.data);
    } catch (error: any) {
      throw new Error(error.message || "Failed to update education level");
    }
  }

  async deleteEducationLevel(levelId: string): Promise<void> {
    try {
      await axiosInstance.delete(this.endpoints.educationLevel(levelId));
    } catch (error: any) {
      throw new Error(error.message || "Failed to delete education level");
    }
  }
}

export const educationLevelService = new EducationLevelService();
export { EducationLevelService };