import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { userApi } from '@/api/userApi';
import { ROUTES } from '@/constants';
import { CourseCardSkeleton } from '@/components/Skeleton';

const MyCoursesPage = () => {
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    userApi.getMyCourses().then(setCourses).finally(() => setLoading(false));
  }, []);

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-8">Khóa học của tôi</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {loading ? [1,2,3].map(i => <CourseCardSkeleton key={i}/>) : 
          courses.map(course => (
            <div key={course.id} onClick={() => navigate(ROUTES.courseDetail(course.id))} className="p-6 bg-white border rounded-xl hover:shadow-md cursor-pointer transition-all">
              <h3 className="text-lg font-bold text-blue-600">{course.name}</h3>
              <p className="text-gray-500 text-sm mt-2">Bấm để học tiếp</p>
            </div>
          ))
        }
      </div>
    </div>
  );
};
export default MyCoursesPage;