import { faUser } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import Image, { StaticImageData } from "next/image";

/**
 * @refer URL: http://127.0.0.1:3000/dev/design for details.
 * @param src - The source of the image.
 * @param alt - Alternative text for the image.
 * @param size - The size of the avatar.
 * @param className - Additional class names for styling.
 * @returns A styled avatar component.
 */
export default function Avatar({
  src,
  alt,
  size = 32,
  className,
  unoptimized = false,
}: {
  src?: string | StaticImageData;
  alt?: string;
  size?: number;
  className?: string;
  unoptimized?: boolean;
}) {
  return (
    <div
      style={{ width: size + "px", height: size + "px" }}
      className={clsx(
        `rounded-full`,
        `overflow-hidden`,
        `bg-gray-100`,
        className
      )}
    >
      {src ? (
        <Image
          src={src}
          alt={alt || "User avatar"}
          width={size}
          height={size}
          unoptimized={unoptimized}
        />
      ) : (
        <FontAwesomeIcon
          icon={faUser}
          className={clsx(`text-gray-500`, className)}
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
