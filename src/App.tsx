import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ROUTES } from '@/constants';
import { LoginPage, MyCoursesPage, LessonsPage, ExercisePage } from '@/pages';

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path={ROUTES.HOME} element={<Navigate to={ROUTES.DASHBOARD} />} />
      <Route path={ROUTES.LOGIN} element={<LoginPage />} />
      <Route path={ROUTES.DASHBOARD} element={<MyCoursesPage />} />
      <Route path={ROUTES.LESSONS} element={<LessonsPage />} />
      <Route path={ROUTES.EXERCISE} element={<ExercisePage />} />
    </Routes>
  </BrowserRouter>
);

export default App;