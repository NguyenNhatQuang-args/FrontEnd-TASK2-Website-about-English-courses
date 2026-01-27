import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { ROUTES, USER_ROLES, type UserRole } from '@/constants';
import { ReactNode } from 'react';

interface ProtectedRouteProps {
  children: ReactNode;
  allowedRoles?: UserRole[];
  redirectTo?: string;
}

/**
 * ProtectedRoute - Bảo vệ route dựa trên authentication và role
 * 
 * @param children - Component con cần render
 * @param allowedRoles - Danh sách roles được phép truy cập (optional)
 * @param redirectTo - Route redirect khi không có quyền (default: login)
 */
export function ProtectedRoute({ 
  children, 
  allowedRoles,
  redirectTo = ROUTES.LOGIN 
}: ProtectedRouteProps) {
  const { isAuthenticated, isLoading, user, hasRole } = useAuth();
  const location = useLocation();

  // Show loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Not authenticated - redirect to login
  if (!isAuthenticated) {
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }

  // Check role-based access
  if (allowedRoles && allowedRoles.length > 0) {
    const hasAccess = hasRole(allowedRoles);
    
    if (!hasAccess) {
      // Redirect to appropriate dashboard based on role
      const defaultRoute = user?.role === USER_ROLES.ADMIN 
        ? ROUTES.ADMIN_DASHBOARD
        : user?.role === USER_ROLES.TEACHER
        ? ROUTES.TEACHER_DASHBOARD
        : ROUTES.DASHBOARD;
      
      return <Navigate to={defaultRoute} replace />;
    }
  }

  return <>{children}</>;
}

/**
 * PublicRoute - Route chỉ cho phép khi chưa đăng nhập
 * Nếu đã đăng nhập, redirect về dashboard tương ứng
 */
interface PublicRouteProps {
  children: ReactNode;
}

export function PublicRoute({ children }: PublicRouteProps) {
  const { isAuthenticated, isLoading, getDefaultRoute } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Already authenticated - redirect to default route
  if (isAuthenticated) {
    const from = (location.state as { from?: Location })?.from?.pathname || getDefaultRoute();
    return <Navigate to={from} replace />;
  }

  return <>{children}</>;
}

/**
 * RoleBasedRedirect - Redirect dựa trên role của user
 */
export function RoleBasedRedirect() {
  const { isAuthenticated, isLoading, getDefaultRoute } = useAuth();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }

  return <Navigate to={getDefaultRoute()} replace />;
}

export default ProtectedRoute;
