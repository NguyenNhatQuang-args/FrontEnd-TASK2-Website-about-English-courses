import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '@/api';
import { STORAGE_KEYS, ROUTES, USER_ROLES, type UserRole } from '@/constants';

// User interface matching backend response
export interface User {
  id: string;
  username: string;
  email: string;
  fullname: string;
  phone?: string;
  dateOfBirth?: string;
  role: UserRole;
  status: string;
  permissions?: string[];
  avatarUrl?: string;
  createdAt: string;
  updatedAt: string;
}

// Auth state interface
interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

// Auth context interface
interface AuthContextType extends AuthState {
  login: (username: string, password: string) => Promise<void>;
  register: (userData: RegisterData) => Promise<void>;
  logout: () => void;
  clearError: () => void;
  hasRole: (roles: UserRole | UserRole[]) => boolean;
  hasPermission: (permission: string) => boolean;
  getDefaultRoute: () => string;
}

interface RegisterData {
  username: string;
  email: string;
  password: string;
  fullname: string;
  phone?: string;
  dateOfBirth?: string;
}

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider component
export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
    error: null,
  });

  // Initialize auth state from localStorage
  useEffect(() => {
    const initAuth = async () => {
      const accessToken = localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
      const storedUser = localStorage.getItem(STORAGE_KEYS.USER_INFO);

      if (accessToken && storedUser) {
        try {
          const user = JSON.parse(storedUser);
          setState({
            user,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          });
          
          // Optionally verify token by fetching profile
          try {
            const response = await authService.getProfile();
            if (response.success && response.data) {
              const updatedUser = response.data as unknown as User;
              localStorage.setItem(STORAGE_KEYS.USER_INFO, JSON.stringify(updatedUser));
              setState(prev => ({ ...prev, user: updatedUser }));
            }
          } catch {
            // Token might be expired, will be handled by interceptor
          }
        } catch {
          // Invalid stored data
          localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
          localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
          localStorage.removeItem(STORAGE_KEYS.USER_INFO);
          setState({
            user: null,
            isAuthenticated: false,
            isLoading: false,
            error: null,
          });
        }
      } else {
        setState({
          user: null,
          isAuthenticated: false,
          isLoading: false,
          error: null,
        });
      }
    };

    initAuth();
  }, []);

  // Login function
  const login = useCallback(async (username: string, password: string) => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      const response = await authService.login({ username, password });
      
      if (response.success && response.data) {
        const { user, tokens } = response.data;
        
        // Save tokens
        localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, tokens.accessToken);
        localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, tokens.refreshToken);
        localStorage.setItem(STORAGE_KEYS.USER_INFO, JSON.stringify(user));

        setState({
          user: user as unknown as User,
          isAuthenticated: true,
          isLoading: false,
          error: null,
        });
      } else {
        throw new Error(response.message || 'Đăng nhập thất bại');
      }
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } }; message?: string };
      const errorMessage = error.response?.data?.message || error.message || 'Đăng nhập thất bại';
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: errorMessage,
      }));
      throw new Error(errorMessage);
    }
  }, []);

  // Register function
  const register = useCallback(async (userData: RegisterData) => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      const response = await authService.register(userData);
      
      if (response.success && response.data) {
        const { user, tokens } = response.data;
        
        // Save tokens
        localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, tokens.accessToken);
        localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, tokens.refreshToken);
        localStorage.setItem(STORAGE_KEYS.USER_INFO, JSON.stringify(user));

        setState({
          user: user as unknown as User,
          isAuthenticated: true,
          isLoading: false,
          error: null,
        });
      } else {
        throw new Error(response.message || 'Đăng ký thất bại');
      }
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } }; message?: string };
      const errorMessage = error.response?.data?.message || error.message || 'Đăng ký thất bại';
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: errorMessage,
      }));
      throw new Error(errorMessage);
    }
  }, []);

  // Logout function
  const logout = useCallback(() => {
    localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.USER_INFO);
    
    setState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
    });
  }, []);

  // Clear error
  const clearError = useCallback(() => {
    setState(prev => ({ ...prev, error: null }));
  }, []);

  // Check if user has specific role(s)
  const hasRole = useCallback((roles: UserRole | UserRole[]): boolean => {
    if (!state.user) return false;
    const roleArray = Array.isArray(roles) ? roles : [roles];
    return roleArray.includes(state.user.role);
  }, [state.user]);

  // Check if user has specific permission
  const hasPermission = useCallback((permission: string): boolean => {
    if (!state.user) return false;
    // Admin has all permissions
    if (state.user.role === USER_ROLES.ADMIN) return true;
    return state.user.permissions?.includes(permission) ?? false;
  }, [state.user]);

  // Get default route based on user role
  const getDefaultRoute = useCallback((): string => {
    if (!state.user) return ROUTES.LOGIN;
    
    switch (state.user.role) {
      case USER_ROLES.ADMIN:
        return ROUTES.ADMIN_DASHBOARD;
      case USER_ROLES.TEACHER:
        return ROUTES.TEACHER_DASHBOARD;
      case USER_ROLES.STUDENT:
        return ROUTES.DASHBOARD;
      default:
        return ROUTES.LOGIN;
    }
  }, [state.user]);

  const value: AuthContextType = {
    ...state,
    login,
    register,
    logout,
    clearError,
    hasRole,
    hasPermission,
    getDefaultRoute,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to use auth context
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

// HOC for protecting routes
export function withAuth<P extends object>(
  WrappedComponent: React.ComponentType<P>,
  allowedRoles?: UserRole[]
) {
  return function WithAuthComponent(props: P) {
    const { isAuthenticated, isLoading, hasRole } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
      if (!isLoading) {
        if (!isAuthenticated) {
          navigate(ROUTES.LOGIN);
        } else if (allowedRoles && !hasRole(allowedRoles)) {
          navigate(ROUTES.HOME); // Or show unauthorized page
        }
      }
    }, [isAuthenticated, isLoading, navigate]);

    if (isLoading) {
      return <div>Loading...</div>;
    }

    if (!isAuthenticated) {
      return null;
    }

    if (allowedRoles && !hasRole(allowedRoles)) {
      return null;
    }

    return <WrappedComponent {...props} />;
  };
}

export default AuthContext;
