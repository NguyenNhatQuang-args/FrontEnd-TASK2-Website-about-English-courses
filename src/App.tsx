import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute, PublicRoute, RoleBasedRedirect } from './components/ProtectedRoute';
import { ROUTES, USER_ROLES } from '@/constants';

// Layouts
import Adminlayout from '@/layouts/Adminlayout';
import UserLayout from '@/layouts/UserLayout';

// Pages
import { 
  Login,
  // Admin pages
  Roles, 
  Accounts, 
  Courses, 
  Classes, 
  Lessons, 
  LessonDetails,
  // User pages
  UserPage,
  SentenceBuilderPage,
  WorkBankPage,
  // Legacy pages
  MyCoursesPage,
  LessonsPage,
  ExercisePage,
} from '@/pages';

// Admin Dashboard placeholder
const AdminDashboard = () => (
  <div className="p-6">
    <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
    <p>Chào mừng đến trang quản trị!</p>
  </div>
);

// Teacher Dashboard placeholder
const TeacherDashboard = () => (
  <div className="p-6">
    <h1 className="text-2xl font-bold mb-4">Teacher Dashboard</h1>
    <p>Chào mừng giáo viên!</p>
  </div>
);

// User Dashboard placeholder
const UserDashboard = () => (
  <div className="p-6">
    <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
    <p>Chào mừng học sinh!</p>
  </div>
);

// Permissions page placeholder
const Permissions = () => (
  <div className="p-6">
    <h1 className="text-2xl font-bold mb-4">Quản lý quyền</h1>
    <p>Danh sách quyền hạn</p>
  </div>
);

import './App.css';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* ========== PUBLIC ROUTES ========== */}
            <Route 
              path={ROUTES.LOGIN} 
              element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              } 
            />
            <Route 
              path={ROUTES.REGISTER} 
              element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              } 
            />

            {/* ========== ROOT REDIRECT ========== */}
            <Route path={ROUTES.HOME} element={<RoleBasedRedirect />} />

            {/* ========== ADMIN ROUTES ========== */}
            <Route
              path={ROUTES.ADMIN}
              element={
                <ProtectedRoute allowedRoles={[USER_ROLES.ADMIN]}>
                  <Adminlayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Navigate to="dashboard" replace />} />
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="roles" element={<Roles />} />
              <Route path="permissions" element={<Permissions />} />
              <Route path="accounts" element={<Accounts />} />
              <Route path="courses" element={<Courses />} />
              <Route path="classes" element={<Classes />} />
              <Route path="lessons" element={<Lessons />} />
              <Route path="lessons/:lessonId" element={<LessonDetails />} />
            </Route>

            {/* ========== TEACHER ROUTES ========== */}
            <Route
              path={ROUTES.TEACHER}
              element={
                <ProtectedRoute allowedRoles={[USER_ROLES.TEACHER, USER_ROLES.ADMIN]}>
                  <Adminlayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Navigate to="dashboard" replace />} />
              <Route path="dashboard" element={<TeacherDashboard />} />
              <Route path="courses" element={<Courses />} />
              <Route path="classes" element={<Classes />} />
              <Route path="lessons" element={<Lessons />} />
              <Route path="lessons/:lessonId" element={<LessonDetails />} />
            </Route>

            {/* ========== USER/STUDENT ROUTES ========== */}
            <Route
              path={ROUTES.USER}
              element={
                <ProtectedRoute allowedRoles={[USER_ROLES.STUDENT, USER_ROLES.TEACHER, USER_ROLES.ADMIN]}>
                  <UserLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Navigate to="dashboard" replace />} />
              <Route path="dashboard" element={<UserDashboard />} />
              <Route path="profile" element={<div>Profile Page</div>} />
              <Route path="courses" element={<MyCoursesPage />} />
              <Route path="courses/:courseId/lessons" element={<LessonsPage />} />
              <Route path="lessons/:lessonId/exercises" element={<ExercisePage />} />
              <Route path="lessons/:lessonId/sentence-builder" element={<SentenceBuilderPage />} />
              <Route path="lessons/:lessonId/work-bank" element={<WorkBankPage />} />
            </Route>

            {/* ========== CATCH ALL - 404 ========== */}
            <Route path="*" element={<Navigate to={ROUTES.HOME} replace />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
