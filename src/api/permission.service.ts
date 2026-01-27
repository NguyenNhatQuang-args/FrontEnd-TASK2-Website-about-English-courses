import apiClient from './config';

// Types
export interface Permission {
  id: number;
  code: string;
  name: string;
  description?: string;
  roles: string; // comma-separated: "ADMIN,TEACHER"
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreatePermissionDto {
  code: string;
  name: string;
  description?: string;
  roles: string;
}

export interface UpdatePermissionDto {
  code?: string;
  name?: string;
  description?: string;
  roles?: string;
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
 * Permission Service - CRUD operations for permissions
 */
export const permissionService = {
  // Get all permissions
  getAll: async (): Promise<ApiResponse<Permission[]>> => {
    const response = await apiClient.get<ApiResponse<Permission[]>>('/permissions');
    return response.data;
  },

  // Get permission by ID
  getById: async (id: number): Promise<ApiResponse<Permission>> => {
    const response = await apiClient.get<ApiResponse<Permission>>(`/permissions/${id}`);
    return response.data;
  },

  // Get permissions by role
  getByRole: async (role: string): Promise<ApiResponse<Permission[]>> => {
    const response = await apiClient.get<ApiResponse<Permission[]>>(`/permissions/by-role/${role}`);
    return response.data;
  },

  // Get all unique roles
  getRoles: async (): Promise<ApiResponse<string[]>> => {
    const response = await apiClient.get<ApiResponse<string[]>>('/permissions/roles');
    return response.data;
  },

  // Create permission
  create: async (data: CreatePermissionDto): Promise<ApiResponse<Permission>> => {
    const response = await apiClient.post<ApiResponse<Permission>>('/permissions', data);
    return response.data;
  },

  // Update permission
  update: async (id: number, data: UpdatePermissionDto): Promise<ApiResponse<Permission>> => {
    const response = await apiClient.put<ApiResponse<Permission>>(`/permissions/${id}`, data);
    return response.data;
  },

  // Delete permission
  delete: async (id: number): Promise<ApiResponse<null>> => {
    const response = await apiClient.delete<ApiResponse<null>>(`/permissions/${id}`);
    return response.data;
  },

  // Toggle active status
  toggleActive: async (id: number): Promise<ApiResponse<Permission>> => {
    const response = await apiClient.patch<ApiResponse<Permission>>(`/permissions/${id}/toggle-active`);
    return response.data;
  },
};

export default permissionService;
