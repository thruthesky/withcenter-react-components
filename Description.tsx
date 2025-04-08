export default function Description({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={`mt-3 text-sm text-gray-600 ${className}`}>{children}</div>;
}
