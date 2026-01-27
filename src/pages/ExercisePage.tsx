import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { userApi } from '@/api/userApi';
import { ExerciseSkeleton } from '@/components/Skeleton';

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
        .catch((err) => setError(err.message))
        .finally(() => setLoading(false));
    }
  }, [lessonId]);

  if (loading) return <div className="max-w-3xl mx-auto p-8"><ExerciseSkeleton /></div>;

  return (
    <div className="max-w-3xl mx-auto p-8 text-center">
      <button onClick={() => navigate(-1)} className="mb-6 text-sm text-slate-500 underline">
        ← Quay lại Dashboard
      </button>

      {error ? (
        <div className="p-10 bg-red-50 text-red-600 rounded-3xl border border-red-200">{error}</div>
      ) : (
        <div className="bg-white p-10 rounded-3xl shadow-sm border border-slate-100">
          <h2 className="text-2xl font-bold text-slate-800 mb-6 italic">
            Dịch: "{exercise?.translation}"
          </h2>
          <div className="p-8 mb-8 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200 text-xl">
            {exercise?.question}
          </div>
          <div className="text-slate-400 font-medium italic">Vùng làm bài của WordBank</div>
        </div>
      )}
    </div>
  );
};

export default ExercisePage;