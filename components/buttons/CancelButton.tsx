export default function CancelButton({
  children,
  loading = false,
  onClick = () => {},
}: {
  children: React.ReactNode;
  loading?: boolean;
  onClick?: () => void;
}) {
  if (loading == true) return null;
  return (
    <button type="button" className="secondary button" onClick={onClick}>
      {children}
    </button>
  );
}
