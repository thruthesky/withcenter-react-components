import clsx from "clsx";

/**
 * Button component for consistent button styling across the app.
 *
 * @param props - Props for the Button component.
 * @param props.children - The content to be displayed inside the button.
 * @param props.type - The button type attribute (button, submit, reset). Defaults to "submit".
 * @param props.className - Additional CSS class names to apply to the button.
 * @param props.onClick - Click event handler function.
 * @param props.disabled - Boolean indicating if the button is disabled. Defaults to false.
 */
export default function Button({
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
    <button type={type} className={clsx("button", className)} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}
