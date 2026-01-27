import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { ThemeProvider } from "./themes";
import { ProtectedRoute, getDefaultRouteForRole } from "./components";
import { AdminLayout, TeacherLayout, UserLayout } from "./layouts";
import { LoginPage } from "./pages/auth";
import { AdminDashboard } from "./pages/admin";
import { TeacherDashboard } from "./pages/teacher";
import { UserHome } from "./pages/user";
import { ComingSoon } from "./pages/shared";
import "./styles/index.css";

function RoleBasedRedirect() {
  const { isAuthenticated, user, isLoading } = useAuth();

  if (isLoading) {
    return <div className="loading-container">Đang tải...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Navigate to={getDefaultRouteForRole(user!.role)} replace />;
}

function RouterApp() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<RoleBasedRedirect />} />

      <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
        <Route element={<AdminLayout />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/users" element={<ComingSoon title="Quản lý Users" />} />
          <Route path="/admin/roles" element={<ComingSoon title="Quản lý Roles" />} />
          <Route path="/admin/permissions" element={<ComingSoon title="Permissions" />} />
          <Route path="/admin/lessons" element={<ComingSoon title="Quản lý Lessons" />} />
          <Route path="/admin/courses" element={<ComingSoon title="Quản lý Courses" />} />
        </Route>
      </Route>

      <Route element={<ProtectedRoute allowedRoles={["admin", "teacher"]} />}>
        <Route element={<TeacherLayout />}>
          <Route path="/teacher/dashboard" element={<TeacherDashboard />} />
          <Route path="/teacher/lessons" element={<ComingSoon title="Bài giảng của tôi" />} />
          <Route path="/teacher/lessons/create" element={<ComingSoon title="Tạo bài giảng" />} />
          <Route path="/teacher/courses" element={<ComingSoon title="Khóa học của tôi" />} />
          <Route path="/teacher/students" element={<ComingSoon title="Học viên" />} />
        </Route>
      </Route>

      <Route element={<ProtectedRoute allowedRoles={["admin", "teacher", "user"]} />}>
        <Route element={<UserLayout />}>
          <Route path="/home" element={<UserHome />} />
          <Route path="/courses" element={<ComingSoon title="Danh sách khóa học" />} />
          <Route path="/my-courses" element={<ComingSoon title="Khóa học của tôi" />} />
          <Route path="/profile" element={<ComingSoon title="Hồ sơ cá nhân" />} />
        </Route>
      </Route>

      <Route path="*" element={
        <div className="error-page">
          <h1>404</h1>
          <p>Không tìm thấy trang</p>
        </div>
      } />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <RouterApp />
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}
