export default function Progress({
  progress,
  className = "",
}: {
  progress: number;
  className?: string;
}) {
  return (
    <>
      {progress > 0 && (
        <div className={`w-32 mt-2 text-center ${className}`}>
          <div className="w-full bg-gray-200 rounded-full h-1.5 dark:bg-gray-700">
            <div className="bg-blue-600 h-1.5 rounded-full" style={{ width: `${progress}%` }}></div>
          </div>
        </div>
      )}
    </>
  );
}
