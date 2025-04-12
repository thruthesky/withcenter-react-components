import Spinner from "../Spinner";

export default function SubmitButton({
  children,
  loading = false,
}: {
  children: React.ReactNode;
  loading?: boolean;
}) {
  const child = (
    <button type="submit" className="primary button" disabled={loading}>
      {children}
    </button>
  );
  if (loading == true)
    return (
      <span className="relative inline-block">
        <span className="opacity-0">{child}</span>
        <span className="absolute inset-0 flex items-center justify-center">
          <Spinner />
        </span>
      </span>
    );
  return child;
}
