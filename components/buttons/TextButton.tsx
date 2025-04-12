/**
 * TextButton Component
 *
 * It supports the loading state.
 *
 * @param param0
 * @returns
 */

import Spinner from "../Spinner";

export default function TextButton({
  children,
  type = "submit",
  className = "",
  onClick,
  disabled = false,
  loading = false,
}: {
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
}) {
  const child = (
    <button
      type={type}
      className={`text button ${className}`}
      onClick={onClick}
      disabled={disabled || loading}
      style={disabled ? { cursor: "not-allowed" } : {}}
    >
      {children}
    </button>
  );
  if (loading) {
    return (
      <span className="relative inline-block">
        <span className="opacity-0">{child}</span>
        <span className="absolute inset-0 flex items-center justify-center">
          <Spinner />
        </span>
      </span>
    );
  }
  return child;
}
