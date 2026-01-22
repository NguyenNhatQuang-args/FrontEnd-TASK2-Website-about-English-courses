import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ROUTES } from '@/constants';
import { LoginPage, MyCoursesPage, LessonsPage, ExercisePage } from '@/pages';

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Navigate to={ROUTES.login} />} />
      <Route path={ROUTES.login} element={<LoginPage />} />
      <Route path={ROUTES.myCourses} element={<MyCoursesPage />} />
      <Route path="/courses/:courseId" element={<LessonsPage />} />
      <Route path="/lessons/:lessonId" element={<ExercisePage />} />
      <Route path="*" element={<div className="flex h-screen items-center justify-center">404 - Trang không tồn tại</div>} />
    </Routes>
  </BrowserRouter>
);
export default App;