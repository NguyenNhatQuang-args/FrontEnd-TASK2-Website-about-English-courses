import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { userApi } from '@/api/userApi';
import { ROUTES } from '@/constants';

const LessonsPage = () => {
  const { courseId } = useParams();
  const [lessons, setLessons] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (courseId) {
      userApi.getLessons(courseId)
        .then(setLessons)
        .finally(() => setLoading(false));
    }
  }, [courseId]);

  return (
    <div className="max-w-4xl mx-auto p-8">
      <div className="h-10 w-32 bg-slate-200 rounded-lg mb-8 animate-pulse"></div> {/* Skeleton nút quay lại */}

      {loading ? (
        <div className="space-y-4 animate-pulse">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="p-5 bg-white border border-slate-100 rounded-2xl flex justify-between items-center h-20">
              <div className="space-y-2 w-1/2">
                <div className="h-4 bg-slate-200 rounded"></div>
                <div className="h-3 bg-slate-100 rounded w-2/3"></div>
              </div>
              <div className="h-6 w-16 bg-slate-200 rounded-full"></div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid gap-4">
          {lessons.map((lesson) => (
            <div 
              key={lesson.id}
              onClick={() => navigate(ROUTES.lessonDetail(lesson.id))}
              className="group p-5 bg-white border border-slate-200 rounded-2xl flex justify-between items-center cursor-pointer hover:border-blue-500 hover:shadow-md transition-all"
            >
              <h3 className="font-semibold text-slate-700 group-hover:text-blue-600">{lesson.name}</h3>
              <span className="text-blue-500 font-bold opacity-0 group-hover:opacity-100 transition-opacity">BẮT ĐẦU →</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LessonsPage;