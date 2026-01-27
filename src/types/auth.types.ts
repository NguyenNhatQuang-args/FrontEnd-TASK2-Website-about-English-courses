// ============================================
// API Response Types
// ============================================

/**
 * Generic API response wrapper
 */
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

/**
 * API Error response
 */
export interface ApiError {
  success: false;
  message: string;
  statusCode: number;
  error?: string;
}

// ============================================
// Auth Request Types
// ============================================

/**
 * Login request payload
 */
export interface LoginRequest {
  username: string;
  password: string;
}

/**
 * Register request payload
 */
export interface RegisterRequest {
  username: string;
  fullname: string;
  phone: string;
  email: string;
  dateOfBirth: string;
  password: string;
}

/**
 * Change password request payload
 */
export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

// ============================================
// Auth Response Types
// ============================================

/**
 * Token pair response
 */
export interface TokenPair {
  accessToken: string;
  refreshToken: string;
}

/**
 * Login response data
 */
export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  user: UserProfile;
}

/**
 * Register response data
 */
export interface RegisterResponse {
  accessToken: string;
  refreshToken: string;
  user: UserProfile;
}

/**
 * Refresh token response
 */
export interface RefreshTokenResponse {
  accessToken: string;
  refreshToken: string;
}

// ============================================
// User Types
// ============================================

/**
 * User profile data
 */
export interface UserProfile {
  id: string;
  username: string;
  email: string;
  fullName?: string;
  avatar?: string;
  role?: UserRole;
  permissions?: string[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

/**
 * User role
 */
export interface UserRole {
  id: string;
  name: string;
  description?: string;
}

// ============================================
// Auth Context Types
// ============================================

/**
 * Auth state for context/store
 */
export interface AuthState {
  user: UserProfile | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

/**
 * Auth context actions
 */
export interface AuthActions {
  login: (credentials: LoginRequest) => Promise<void>;
  register: (userData: RegisterRequest) => Promise<void>;
  logout: () => Promise<void>;
  refreshTokens: () => Promise<void>;
  clearError: () => void;
}
