import apiClient from './config';

// Types
export interface Course {
  id: string;
  title: string;
  description?: string;
  thumbnailUrl?: string;
  level: string;
  kind: string;
  status: 'ACTIVE' | 'INACTIVE' | 'DRAFT';
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateCourseDto {
  title: string;
  description?: string;
  thumbnailUrl?: string;
  level: string;
  kind: string;
}

export interface UpdateCourseDto {
  title?: string;
  description?: string;
  thumbnailUrl?: string;
  level?: string;
  kind?: string;
  status?: 'ACTIVE' | 'INACTIVE' | 'DRAFT';
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

/**
 * Course Service - CRUD operations for courses
 */
export const courseService = {
  // Get all courses
  getAll: async (params?: {
    level?: string;
    kind?: string;
    status?: string;
  }): Promise<ApiResponse<Course[]>> => {
    const response = await apiClient.get<ApiResponse<Course[]>>('/courses', { params });
    return response.data;
  },

  // Get course by ID
  getById: async (id: string): Promise<ApiResponse<Course>> => {
    const response = await apiClient.get<ApiResponse<Course>>(`/courses/${id}`);
    return response.data;
  },

  // Create course
  create: async (data: CreateCourseDto): Promise<ApiResponse<Course>> => {
    const response = await apiClient.post<ApiResponse<Course>>('/courses', data);
    return response.data;
  },

  // Update course
  update: async (id: string, data: UpdateCourseDto): Promise<ApiResponse<Course>> => {
    const response = await apiClient.put<ApiResponse<Course>>(`/courses/${id}`, data);
    return response.data;
  },

  // Delete course
  delete: async (id: string): Promise<ApiResponse<null>> => {
    const response = await apiClient.delete<ApiResponse<null>>(`/courses/${id}`);
    return response.data;
  },
};

export default courseService;
