export default function Title({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <h1 className={`mt-3 text-3xl font-semibold ${className}`}>{children}</h1>;
}
