import { faUser } from "@fortawesome/pro-light-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { useState } from "react";

/**
 * UserAvatar component displays a user's avatar image or a placeholder icon.
 * It can show an image from a URL, a placeholder with the user's initials, or a FontAwesome user icon.
 * @param params
 * @param params.src - The URL of the user's avatar image.
 * @param params.size - The size of the avatar (default is 40).
 * @param params.nickname - The nickname of the user (used if no URL is provided).
 * @param params.className - Additional class names to apply to the avatar.
 * @returns A JSX element representing the user's avatar.
 * If a URL is provided, it renders an image. If no URL is provided but a nickname is given, it renders a div with the first letter of the nickname. If neither is provided, it renders a FontAwesome user icon.
 */
export default function Avatar({
  src,
  alt,
  size = 40,
  nickname,
  className,
  unoptimized = false,
}: {
  src?: string;
  alt?: string;
  size?: number;
  nickname?: string;
  className?: string;
  unoptimized?: boolean;
}) {
  const [error, setError] = useState(false);

  if (src && !error) {
    return (
      <div
        style={{ width: size + "px", height: size + "px" }}
        className={`relative ${className}`}
      >
        <Image
          src={src}
          alt={alt || nickname || "User Avatar"}
          width={size}
          height={size}
          className={`h-full w-full rounded-full object-cover ${className}`}
          priority={false}
          unoptimized={unoptimized}
          onError={() => setError(true)}
        />
      </div>
    );
  } else if (nickname) {
    return (
      <div
        className={`flex items-center justify-center rounded-full bg-gray-200 text-gray-500 ${className}`}
        style={{ width: size + "px", height: size + "px", fontSize: size / 2 }}
      >
        {nickname ? nickname.charAt(0).toUpperCase() : "?"}
      </div>
    );
  } else {
    return (
      <div
        className={`flex items-center justify-center rounded-full bg-gray-200 text-gray-500 ${className}`}
        style={{ width: size + "px", height: size + "px" }}
      >
        <FontAwesomeIcon
          icon={faUser}
          style={{
            fontSize: size / 1.5 + "px",
          }}
        />
      </div>
    );
  }
}
