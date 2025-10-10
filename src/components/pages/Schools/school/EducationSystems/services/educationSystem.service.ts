import axiosInstance from "@/lib/api/axios-instance";
import {
  EducationSystem,
  EducationSystemApiResponse,
  EducationSystemsResponse,
  CreateEducationSystemRequest,
  UpdateEducationSystemRequest,
} from "../types/educationSystem.types";

class EducationSystemService {
  private readonly endpoints = {
    educationSystems: `/education-systems`,
    educationSystem: (systemId: string) => `/education-systems/${systemId}`,
  };

  // Map backend education system response to frontend EducationSystem type
  private mapEducationSystemResponse(systemApi: EducationSystemApiResponse): EducationSystem {
    return {
      id: systemApi.id,
      name: systemApi.name,
      createdAt: systemApi.createdAt,
      updatedAt: systemApi.updatedAt,
    };
  }

  async getEducationSystems(): Promise<EducationSystem[]> {
    try {
      const response = await axiosInstance.get<EducationSystemsResponse>(
        this.endpoints.educationSystems
      );

      // Extract education systems from the response
      const systems = response.data?.data || [];
      return systems.map((system) => this.mapEducationSystemResponse(system));
    } catch (error: any) {
      console.error("Failed to fetch education systems:", error);
      throw new Error(error.message || "Failed to fetch education systems");
    }
  }

  async createEducationSystem(
    data: CreateEducationSystemRequest
  ): Promise<EducationSystem> {
    try {
      const response = await axiosInstance.post<{
        statusCode: number;
        data: EducationSystemApiResponse;
      }>(this.endpoints.educationSystems, data);
      return this.mapEducationSystemResponse(response.data.data);
    } catch (error: any) {
      throw new Error(error.message || "Failed to create education system");
    }
  }

  async updateEducationSystem(
    systemId: string,
    data: UpdateEducationSystemRequest
  ): Promise<EducationSystem> {
    try {
      const response = await axiosInstance.patch<{
        statusCode: number;
        data: EducationSystemApiResponse;
      }>(this.endpoints.educationSystem(systemId), data);
      return this.mapEducationSystemResponse(response.data.data);
    } catch (error: any) {
      throw new Error(error.message || "Failed to update education system");
    }
  }

  async deleteEducationSystem(systemId: string): Promise<void> {
    try {
      await axiosInstance.delete(this.endpoints.educationSystem(systemId));
    } catch (error: any) {
      throw new Error(error.message || "Failed to delete education system");
    }
  }
}

export const educationSystemService = new EducationSystemService();
export { EducationSystemService };