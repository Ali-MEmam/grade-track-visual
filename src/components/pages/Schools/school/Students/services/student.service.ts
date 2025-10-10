import axiosInstance from "@/lib/api/axios-instance";
import {
  CreateStudentRequest,
  Student,
  StudentApiResponse,
  StudentsResponse,
  UpdateStudentRequest,
} from "../types/student.types";

class StudentService {
  private readonly endpoints = {
    students: `/students`,
    student: (studentId: string) => `/students/${studentId}`,
  };

  // Map backend student response to frontend Student type
  private mapStudentResponse(studentApi: StudentApiResponse): Student {
    return {
      id: studentApi.id || studentApi._id,
      firstName: studentApi.firstName,
      lastName: studentApi.lastName,
      fullName: `${studentApi.firstName} ${studentApi.lastName}`,
      email: studentApi.email,
      address: studentApi.address,
      dateOfBirth: studentApi.dateOfBirth,
      schoolId: studentApi.schoolId,
      enrollmentDate: studentApi.enrollmentDate,
      classId: studentApi.classId,
      educationLevelId: studentApi.educationLevelId,
      educationSystemId: studentApi.educationSystemId,
      phone: studentApi.phone,
      isActive: studentApi.isActive,
      avatar: studentApi.avatar ||
        `https://api.dicebear.com/7.x/avataaars/svg?seed=${studentApi.firstName}${studentApi.lastName}`,
      createdAt: studentApi.createdAt,
      updatedAt: studentApi.updatedAt,
    };
  }

  async getStudents(): Promise<Student[]> {
    try {
      const response = await axiosInstance.get<StudentsResponse>(
        this.endpoints.students
      );

      // Extract students from the response
      const students = response.data?.data || [];
      return students.map((student) => this.mapStudentResponse(student));
    } catch (error: any) {
      console.error("Failed to fetch students:", error);
      throw new Error(error.message || "Failed to fetch students");
    }
  }

  async getStudentDetails(studentId: string): Promise<Student> {
    try {
      const response = await axiosInstance.get<{
        statusCode: number;
        data: StudentApiResponse;
      }>(this.endpoints.student(studentId));
      return this.mapStudentResponse(response.data.data);
    } catch (error: any) {
      console.error("Failed to fetch student details:", error);
      throw new Error(error.message || "Failed to fetch student details");
    }
  }

  async createStudent(data: CreateStudentRequest): Promise<Student> {
    try {
      const response = await axiosInstance.post<{
        statusCode: number;
        data: StudentApiResponse;
      }>(this.endpoints.students, data);
      return this.mapStudentResponse(response.data.data);
    } catch (error: any) {
      throw new Error(error.message || "Failed to create student");
    }
  }

  async updateStudent(
    studentId: string,
    data: UpdateStudentRequest
  ): Promise<Student> {
    try {
      const response = await axiosInstance.patch<{
        statusCode: number;
        data: StudentApiResponse;
      }>(this.endpoints.student(studentId), data);
      return this.mapStudentResponse(response.data.data);
    } catch (error: any) {
      throw new Error(error.message || "Failed to update student");
    }
  }

  async deleteStudent(studentId: string): Promise<void> {
    try {
      await axiosInstance.delete(this.endpoints.student(studentId));
    } catch (error: any) {
      throw new Error(error.message || "Failed to delete student");
    }
  }
}

export const studentService = new StudentService();
export { StudentService };
