import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { userApi } from '@/api/userApi';
import { ROUTES } from '@/constants';
import { LessonItemSkeleton } from '@/components/Skeleton';

const LessonsPage = () => {
  const { courseId } = useParams<{ courseId: string }>();
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
      <button 
        onClick={() => navigate(ROUTES.DASHBOARD)}
        className="mb-8 text-sm font-medium text-slate-500 hover:text-blue-600 transition-colors"
      >
        ← Quay lại danh sách khóa học
      </button>

      <h2 className="text-2xl font-bold mb-6 text-slate-800">Danh sách bài học</h2>

      <div className="space-y-4">
        {loading ? (
          [1, 2, 3, 4].map((i) => <LessonItemSkeleton key={i} />)
        ) : (
          lessons.map((lesson) => (
            <div 
              key={lesson.id}
              onClick={() => navigate(ROUTES.EXERCISE.replace(':lessonId', lesson.id))}
              className="flex justify-between items-center p-5 bg-white border border-slate-200 rounded-2xl hover:border-blue-400 hover:shadow-sm cursor-pointer transition-all"
            >
              <div>
                <h4 className="font-semibold text-slate-700">{lesson.name}</h4>
                <p className="text-sm text-slate-500">{lesson.duration || '15 phút'}</p>
              </div>
              <div className="bg-blue-50 text-blue-600 px-4 py-2 rounded-xl font-bold text-sm">
                HỌC NGAY
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default LessonsPage;