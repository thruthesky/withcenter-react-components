import { faTriangleExclamation } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Warning({
  message,
  className = "",
}: {
  message: string | null | undefined;
  className?: string;
}) {
  if (!message) return null;
  return (
    <section className={`${className}`}>
      <div className="flex items-center gap-2">
        <FontAwesomeIcon icon={faTriangleExclamation} className="text-2xl text-orange-600" />
        <span className="text-lg font-semibold text-orange-600">{message}</span>
      </div>
    </section>
  );
}
