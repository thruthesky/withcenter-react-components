import clsx from "clsx";

type AlertType = "success" | "warning" | "info";

const alertStyles: Record<AlertType, string> = {
  info: "bg-blue-100 text-blue-700",
  success: "bg-green-100 text-green-700",
  warning: "bg-red-100 text-red-700",
};

type AlertProps = {
  type?: AlertType;
  className?: string;
  children: React.ReactNode;
};
export default function Alert({
  type = "info",
  className,
  children,
}: AlertProps) {
  return (
    <div className={clsx("rounded border p-3", alertStyles[type], className)}>
      {children}
    </div>
  );
}
