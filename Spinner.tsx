import { SizeProp } from "@fortawesome/fontawesome-svg-core";
import { faCircleNotch } from "@fortawesome/pro-light-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Spinner({
  className,
  size,
}: {
  className?: string;
  size?: SizeProp;
}) {
  return (
    <FontAwesomeIcon
      icon={faCircleNotch}
      className={`fa-spin w-6 h-6 ${className}`}
      size={size}
    />
  );
}
// Spinner component that displays a loading spinner icon.
