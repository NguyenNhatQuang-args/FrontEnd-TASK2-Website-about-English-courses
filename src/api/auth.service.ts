import apiClient from './config';
import type { 
  LoginRequest, 
  LoginResponse, 
  RegisterRequest, 
  RegisterResponse,
  RefreshTokenResponse,
  UserProfile,
  ApiResponse 
} from '@/types/auth.types';

/**
 * Auth Service - Handles all authentication related API calls
 */
export const authService = {
  /**
   * Login user with username and password
   */
  login: async (credentials: LoginRequest): Promise<ApiResponse<LoginResponse>> => {
    const response = await apiClient.post<ApiResponse<LoginResponse>>('/auth/login', credentials);
    return response.data;
  },

  /**
   * Register a new user
   */
  register: async (userData: RegisterRequest): Promise<ApiResponse<RegisterResponse>> => {
    const response = await apiClient.post<ApiResponse<RegisterResponse>>('/auth/register', userData);
    return response.data;
  },

  /**
   * Refresh access token using refresh token
   */
  refreshToken: async (refreshToken: string): Promise<ApiResponse<RefreshTokenResponse>> => {
    const response = await apiClient.post<ApiResponse<RefreshTokenResponse>>('/auth/refresh-token', {
      refreshToken,
    });
    return response.data;
  },

  /**
   * Get current user's profile
   */
  getProfile: async (): Promise<ApiResponse<UserProfile>> => {
    const response = await apiClient.get<ApiResponse<UserProfile>>('/auth/profile');
    return response.data;
  },

  /**
   * Change user's password
   */
  changePassword: async (
    currentPassword: string,
    newPassword: string,
    confirmPassword: string
  ): Promise<ApiResponse<{ message: string }>> => {
    const response = await apiClient.put<ApiResponse<{ message: string }>>('/auth/change-password', {
      currentPassword,
      newPassword,
      confirmPassword,
    });
    return response.data;
  },

  /**
   * Logout user
   */
  logout: async (): Promise<ApiResponse<null>> => {
    const response = await apiClient.post<ApiResponse<null>>('/auth/logout');
    // Clear local storage
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    return response.data;
  },

  /**
   * Save auth tokens to local storage
   */
  saveTokens: (accessToken: string, refreshToken: string): void => {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
  },

  /**
   * Get stored access token
   */
  getAccessToken: (): string | null => {
    return localStorage.getItem('accessToken');
  },

  /**
   * Check if user is authenticated
   */
  isAuthenticated: (): boolean => {
    return !!localStorage.getItem('accessToken');
  },

  /**
   * Save user data to local storage
   */
  saveUser: (user: UserProfile): void => {
    localStorage.setItem('user', JSON.stringify(user));
  },

  /**
   * Get stored user data
   */
  getUser: (): UserProfile | null => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },
};

export default authService;
