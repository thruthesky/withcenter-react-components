export default function Note({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`mt-3 text-sm text-red-800 border-b  p-3 border-l-4 border-red-700 bg-gray-100 ${className}`}
    >
      {children}
    </div>
  );
}
