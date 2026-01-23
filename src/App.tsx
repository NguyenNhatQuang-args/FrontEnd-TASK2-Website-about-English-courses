import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AdminLayout from "./Layouts/AdimLayout";

import LessonList from "./pages/admin/lessons/LessonList";
import LessonCreate from "./pages/admin/lessons/lessonCreate";
import LessonDetail from "./pages/admin/lessons/LessonDetail";
import LessonEdit from "./pages/admin/lessons/LessonEdit";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/admin/lessons" replace />} />

        <Route path="/admin" element={<AdminLayout />}>
          <Route path="lessons" element={<LessonList />} />
          <Route path="lessons/create" element={<LessonCreate />} />
          <Route path="lessons/:id" element={<LessonDetail />} />
          <Route path="lessons/edit/:id" element={<LessonEdit />} />
        </Route>

        <Route path="*" element={<h2 style={{ padding: 20 }}>404 - Không tìm thấy trang</h2>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
