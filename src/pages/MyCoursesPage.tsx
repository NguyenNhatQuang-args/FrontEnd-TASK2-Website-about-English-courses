import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { userApi } from '@/api/userApi';
import { ROUTES } from '@/constants';
import { CourseCardSkeleton } from '@/components/Skeleton';
import { getDecodedToken } from '@/utils/auth';

const MyCoursesPage = () => {
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const userInfo = getDecodedToken(); 

  useEffect(() => {
    userApi.getMyCourses()
      .then(setCourses)
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <header className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Khóa học của tôi</h1>
          <p className="text-slate-500">Chào mừng trở lại, {userInfo?.email || 'Học viên'}</p>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {loading ? (
          [1, 2, 3].map((i) => <CourseCardSkeleton key={i} />)
        ) : (
          courses.map((course) => (
            <div 
              key={course.id} 
              onClick={() => navigate(ROUTES.LESSONS.replace(':courseId', course.id))}
              className="group p-6 bg-white border border-slate-200 rounded-2xl shadow-sm hover:border-blue-500 hover:shadow-md cursor-pointer transition-all"
            >
              <div className="h-12 w-12 bg-blue-50 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-600 transition-colors">
                 <span className="text-blue-600 group-hover:text-white font-bold">EN</span>
              </div>
              <h3 className="text-lg font-bold text-slate-800">{course.name}</h3>
              <p className="text-slate-500 text-sm mt-2 line-clamp-2">{course.description || 'Bắt đầu lộ trình học tiếng Anh ngay hôm nay.'}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MyCoursesPage;