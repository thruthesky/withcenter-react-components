import { SizeProp } from "@fortawesome/fontawesome-svg-core";
import { faUser } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import Image, { StaticImageData } from "next/image";

export default function Avatar({
  src,
  alt,
  size = 32,
}: {
  src?: string | StaticImageData;
  alt?: string;
  size?: number;
  iconSize?: SizeProp;
}) {
  const w = size + "px";
  const h = size + "px";
  return (
    <div
      style={{ width: w, height: h }}
      className={clsx(`rounded-full`, `overflow-hidden`, `bg-white`)}
    >
      {src ? (
        <Image
          src={src}
          alt={alt || "User avatar"}
          width={size}
          height={size}
        />
      ) : (
        <FontAwesomeIcon
          icon={faUser}
          className={`text-gray-500`}
          style={{ width: w, height: h }}
        />
      )}
    </div>
  );
}
