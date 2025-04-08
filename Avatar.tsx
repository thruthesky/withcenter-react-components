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
  return (
    <div
      style={{ width: size + "px", height: size + "px" }}
      className={clsx(`rounded-full`, `overflow-hidden`, `bg-gray-100`)}
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
          className={` text-gray-500`}
          style={{
            width: size,
            height: size / (size > 60 ? 1 : 1.3) + "px",
            paddingTop: size > 60 ? ".75em" : ".5em",
          }}
        />
      )}
    </div>
  );
}
