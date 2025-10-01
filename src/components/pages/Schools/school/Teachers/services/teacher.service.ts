import axiosInstance from "@/lib/api/axios-instance";
import {
  Teacher,
  TeacherApiResponse,
  TeachersResponse,
  CreateTeacherRequest,
  UpdateTeacherRequest,
} from "../types/teacher.types";

class TeacherService {
  private readonly endpoints = {
    teachers: `/teachers`,
    teacher: (teacherId: string) => `/teachers/${teacherId}`,
  };

  // Map backend teacher response to frontend Teacher type
  private mapTeacherResponse(teacherApi: TeacherApiResponse): Teacher {
    return {
      id: teacherApi._id || teacherApi.id,
      firstName: teacherApi.firstName,
      lastName: teacherApi.lastName,
      fullName: `${teacherApi.firstName} ${teacherApi.lastName}`,
      email: teacherApi.email,
      phone: teacherApi.phone,
      schoolId: teacherApi.schoolId,
      classIds: teacherApi.classIds,
      subjects: teacherApi.subjects,
      isActive: teacherApi.isActive,
      avatar:
        teacherApi.avatar ||
        `https://api.dicebear.com/7.x/avataaars/svg?seed=${teacherApi.firstName}${teacherApi.lastName}`,
      createdAt: teacherApi.createdAt,
      updatedAt: teacherApi.updatedAt,
    };
  }

  async getTeachers(schoolId: string): Promise<Teacher[]> {
    try {
      const response = await axiosInstance.get<TeachersResponse>(
        this.endpoints.teachers
      );

      // Extract teachers from the response and filter by schoolId
      const allTeachers = response.data?.data || [];
      const schoolTeachers = allTeachers.filter(
        (teacher) => teacher.schoolId === schoolId
      );
      return schoolTeachers.map((teacher) => this.mapTeacherResponse(teacher));
    } catch (error: any) {
      console.error("Failed to fetch teachers:", error);
      throw new Error(error.message || "Failed to fetch teachers");
    }
  }

  async createTeacher(
    schoolId: string,
    data: Omit<CreateTeacherRequest, "schoolId">
  ): Promise<Teacher> {
    try {
      const requestData = {
        ...data,
        schoolId,
      };

      const response = await axiosInstance.post<{
        statusCode: number;
        data: TeacherApiResponse;
      }>(this.endpoints.teachers, requestData);
      return this.mapTeacherResponse(response.data.data);
    } catch (error: any) {
      throw new Error(error.message || "Failed to create teacher");
    }
  }

  async updateTeacher(
    teacherId: string,
    data: UpdateTeacherRequest
  ): Promise<Teacher> {
    try {
      const response = await axiosInstance.put<{
        statusCode: number;
        data: TeacherApiResponse;
      }>(this.endpoints.teacher(teacherId), data);
      return this.mapTeacherResponse(response.data.data);
    } catch (error: any) {
      throw new Error(error.message || "Failed to update teacher");
    }
  }

  async deleteTeacher(teacherId: string): Promise<void> {
    try {
      await axiosInstance.delete(this.endpoints.teacher(teacherId));
    } catch (error: any) {
      throw new Error(error.message || "Failed to delete teacher");
    }
  }
}

export const teacherService = new TeacherService();
export { TeacherService };
