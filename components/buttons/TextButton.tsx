export default function TextButton({
  children,
  type = "submit",
  className = "",
  onClick,
  disabled = false,
}: {
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      type={type}
      className={`text button ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
