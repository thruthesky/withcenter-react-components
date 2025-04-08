import { IconProp, SizeProp } from "@fortawesome/fontawesome-svg-core";
import { faCamera } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import { JSX } from "react";

export default function CameraIcon({
  className = "",
  color = "currentColor",
  size = "2xl",
  icon = faCamera,
}: {
  className?: string;
  color?: string;
  size?: SizeProp;
  icon?: IconProp;
}): JSX.Element {
  return <FontAwesomeIcon className={clsx(className)} color={color} size={size} icon={icon} />;
}
