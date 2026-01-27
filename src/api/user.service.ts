import apiClient from './config';

// Types
export interface User {
  id: string;
  username: string;
  email: string;
  fullname: string;
  phone?: string;
  dateOfBirth?: string;
  role: 'ADMIN' | 'TEACHER' | 'STUDENT';
  status: 'ACTIVE' | 'INACTIVE' | 'BANNED';
  permissions?: string;
  avatarUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateUserDto {
  username: string;
  email: string;
  password: string;
  fullname: string;
  phone?: string;
  dateOfBirth?: string;
  role?: 'ADMIN' | 'TEACHER' | 'STUDENT';
}

export interface UpdateUserDto {
  username?: string;
  email?: string;
  fullname?: string;
  phone?: string;
  dateOfBirth?: string;
  role?: 'ADMIN' | 'TEACHER' | 'STUDENT';
  status?: 'ACTIVE' | 'INACTIVE' | 'BANNED';
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface PaginatedResponse<T> {
  success: boolean;
  message: string;
  data: {
    items: T[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

/**
 * User Service - CRUD operations for users/accounts
 */
export const userService = {
  // Get all users with pagination
  getAll: async (params?: { 
    page?: number; 
    limit?: number; 
    role?: string;
    status?: string;
    search?: string;
  }): Promise<ApiResponse<User[]>> => {
    const response = await apiClient.get<ApiResponse<User[]>>('/users', { params });
    return response.data;
  },

  // Get user by ID
  getById: async (id: string): Promise<ApiResponse<User>> => {
    const response = await apiClient.get<ApiResponse<User>>(`/users/${id}`);
    return response.data;
  },

  // Create user
  create: async (data: CreateUserDto): Promise<ApiResponse<User>> => {
    const response = await apiClient.post<ApiResponse<User>>('/users', data);
    return response.data;
  },

  // Update user
  update: async (id: string, data: UpdateUserDto): Promise<ApiResponse<User>> => {
    const response = await apiClient.put<ApiResponse<User>>(`/users/${id}`, data);
    return response.data;
  },

  // Delete user
  delete: async (id: string): Promise<ApiResponse<null>> => {
    const response = await apiClient.delete<ApiResponse<null>>(`/users/${id}`);
    return response.data;
  },

  // Update user role
  updateRole: async (id: string, role: string): Promise<ApiResponse<User>> => {
    const response = await apiClient.put<ApiResponse<User>>(`/users/${id}/role`, { role });
    return response.data;
  },

  // Update user permissions
  updatePermissions: async (id: string, permissions: string[]): Promise<ApiResponse<User>> => {
    const response = await apiClient.put<ApiResponse<User>>(`/users/${id}/permissions`, { permissions });
    return response.data;
  },
};

export default userService;
