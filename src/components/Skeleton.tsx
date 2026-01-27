export const SkeletonBox = ({ className }: { className?: string }) => (
  <div className={`bg-slate-200 animate-pulse rounded-lg ${className}`}></div>
);

export const CourseCardSkeleton = () => (
  <div className="p-6 bg-white border border-slate-100 rounded-xl shadow-sm h-32 animate-pulse">
    <SkeletonBox className="h-5 w-3/4 mb-4" />
    <SkeletonBox className="h-3 w-1/2" />
  </div>
);

export const LessonItemSkeleton = () => (
  <div className="p-5 bg-white border border-slate-100 rounded-2xl flex justify-between items-center h-20 animate-pulse">
    <div className="space-y-2 w-1/2">
      <SkeletonBox className="h-4 w-full" />
      <SkeletonBox className="h-3 w-2/3" />
    </div>
    <SkeletonBox className="h-8 w-20 rounded-full" />
  </div>
);

export const ExerciseSkeleton = () => (
  <div className="bg-white p-10 rounded-3xl shadow-sm border border-slate-100 animate-pulse">
    <SkeletonBox className="h-4 w-1/4 mx-auto mb-4" />
    <SkeletonBox className="h-8 w-3/4 mx-auto mb-10" />
    <SkeletonBox className="h-24 w-full mb-8 rounded-2xl" />
    <div className="flex flex-wrap justify-center gap-3">
      {[1, 2, 3, 4].map(i => <SkeletonBox key={i} className="h-10 w-24" />)}
    </div>
  </div>
);