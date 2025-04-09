import Spinner from "../Spinner";

export default function SubmitButton({
  children,
  loading = false,
}: {
  children: React.ReactNode;
  loading?: boolean;
}) {
  if (loading == true) return <Spinner />;
  return (
    <button type="submit" className="primary button" disabled={loading}>
      {children}
    </button>
  );
}
