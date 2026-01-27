import apiClient from './config';

// Types
export interface Class {
  id: string;
  name: string;
  classCode: string;
  description?: string;
  courseId: string;
  teacherId: string;
  level: string;
  kind: string;
  maxStudents: number;
  startDate?: string;
  endDate?: string;
  status: 'ACTIVE' | 'INACTIVE' | 'COMPLETED';
  createdAt: string;
  updatedAt: string;
  // Relations
  course?: {
    id: string;
    title: string;
  };
  teacher?: {
    id: string;
    fullname: string;
  };
  students?: ClassStudent[];
}

export interface ClassStudent {
  id: string;
  classId: string;
  studentId: string;
  enrolledAt: string;
  status: 'ACTIVE' | 'INACTIVE' | 'COMPLETED';
  student?: {
    id: string;
    username: string;
    fullname: string;
    email: string;
  };
}

export interface CreateClassDto {
  name: string;
  classCode: string;
  description?: string;
  courseId: string;
  teacherId?: string;
  level: string;
  kind: string;
  maxStudents?: number;
  startDate?: string;
  endDate?: string;
}

export interface UpdateClassDto {
  name?: string;
  classCode?: string;
  description?: string;
  courseId?: string;
  teacherId?: string;
  level?: string;
  kind?: string;
  maxStudents?: number;
  startDate?: string;
  endDate?: string;
  status?: 'ACTIVE' | 'INACTIVE' | 'COMPLETED';
}

export interface AddStudentsDto {
  studentIds: string[];
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

/**
 * Class Service - CRUD operations for classes
 */
export const classService = {
  // Get all classes
  getAll: async (params?: {
    courseId?: string;
    teacherId?: string;
    status?: string;
  }): Promise<ApiResponse<Class[]>> => {
    const response = await apiClient.get<ApiResponse<Class[]>>('/classes', { params });
    return response.data;
  },

  // Get class by ID
  getById: async (id: string): Promise<ApiResponse<Class>> => {
    const response = await apiClient.get<ApiResponse<Class>>(`/classes/${id}`);
    return response.data;
  },

  // Create class
  create: async (data: CreateClassDto): Promise<ApiResponse<Class>> => {
    const response = await apiClient.post<ApiResponse<Class>>('/classes', data);
    return response.data;
  },

  // Update class
  update: async (id: string, data: UpdateClassDto): Promise<ApiResponse<Class>> => {
    const response = await apiClient.put<ApiResponse<Class>>(`/classes/${id}`, data);
    return response.data;
  },

  // Delete class
  delete: async (id: string): Promise<ApiResponse<null>> => {
    const response = await apiClient.delete<ApiResponse<null>>(`/classes/${id}`);
    return response.data;
  },

  // Get students in class
  getStudents: async (id: string): Promise<ApiResponse<ClassStudent[]>> => {
    const response = await apiClient.get<ApiResponse<ClassStudent[]>>(`/classes/${id}/students`);
    return response.data;
  },

  // Add students to class
  addStudents: async (id: string, data: AddStudentsDto): Promise<ApiResponse<ClassStudent[]>> => {
    const response = await apiClient.post<ApiResponse<ClassStudent[]>>(`/classes/${id}/students`, data);
    return response.data;
  },

  // Remove student from class
  removeStudent: async (classId: string, studentId: string): Promise<ApiResponse<null>> => {
    const response = await apiClient.delete<ApiResponse<null>>(`/classes/${classId}/students/${studentId}`);
    return response.data;
  },
};

export default classService;
