import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { userApi } from '@/api/userApi';
import { ExerciseSkeleton } from '@/components/Skeleton';
// import SentenceBuilder from '@/features/sentences-builder/SentenceBuilder'; 

const ExercisePage = () => {
  const { lessonId } = useParams<{ lessonId: string }>();
  const [exercise, setExercise] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (lessonId) {
      userApi.getExercise(lessonId)
        .then(setExercise)
        .catch((err: any) => setError(err.message || "Không thể tải bài tập"))
        .finally(() => setLoading(false));
    }
  }, [lessonId]);

  return (
    <div className="max-w-3xl mx-auto p-8">
      {/* Nút quay lại luôn hiển thị để người dùng có thể thoát ra nếu lỗi/tải lâu */}
      <button 
          onClick={() => navigate(-1)}
          className="mb-8 text-sm text-slate-500 hover:text-slate-800 underline flex items-center gap-1"
      >
        ← Quay lại bài học
      </button>

      {loading ? (
        <ExerciseSkeleton />
      ) : error ? (
        <div className="bg-red-50 p-8 rounded-3xl text-red-700 text-center border border-red-200">
          <p className="font-bold mb-2">Đã xảy ra lỗi:</p>
          <p>{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 text-sm font-semibold underline"
          >
            Thử lại
          </button>
        </div>
      ) : (
        <div className="bg-white p-10 rounded-3xl shadow-sm border border-slate-100 text-center">
          <span className="inline-block px-3 py-1 mb-4 text-xs font-bold tracking-wider text-blue-600 uppercase bg-blue-50 rounded-full">
            Bài tập luyện tập
          </span>
          
          <h2 className="text-2xl font-bold text-slate-800 mb-6">
            Dịch: "{exercise?.translation || 'Câu hỏi đang được cập nhật...'}"
          </h2>
          
          <div className="p-8 mb-8 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
            <p className="text-xl text-slate-600">
              {exercise?.question || 'Nội dung bài tập...'}
            </p>
          </div>

          {/* <SentenceBuilder 
            data={exercise?.words || []} 
            onComplete={() => alert("Chính xác!")} 
          /> */}
          
          <div className="mt-6 text-slate-400 italic text-sm">
            [Phần WordBank sẽ hiển thị tại đây]
          </div>
        </div>
      )}
    </div>
  );
};

export default ExercisePage;