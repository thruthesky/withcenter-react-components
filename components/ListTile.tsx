import Link from "next/link";
import { AnchorHTMLAttributes, JSX } from "react";

interface ListTileProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href?: string;
  onClick?: (event: React.MouseEvent) => void;
  // Add any custom props here if needed
  className?: string;
  text?: string;
  label?: string;
}

/**
 * A reusable anchor component that supports all HTML anchor attributes.
 *
 * @example
 * <An href="/about" className="text-blue-500">About</An>
 * <An href="https://example.com" target="_blank" rel="noopener noreferrer">External Link</An>
 *
 * @param props - All standard HTML anchor attributes plus custom props
 * @returns JSX.Element representing the Anchor tag
 */
export default function ListTile({
  className = "",
  label,
  text,
  href,
  onClick,
}: ListTileProps): JSX.Element {
  const baseClasses =
    "mt-3 flex flex-col items-start gap-1 p-3 bg-slate-200 rounded cursor-pointer";
  const classes = `${baseClasses} ${className}`;

  // Determine what to display in the first line (prioritize title over translated label)
  const firstLine = label || "";

  // Determine what to display in the second line (prioritize subtitle over translated text)
  const secondLine = text || "";

  const content = (
    <>
      {firstLine && (
        <div className="label text-sm font-semibold">{firstLine}</div>
      )}
      {secondLine && (
        <div className="text text-lg text-gray-600">{secondLine}</div>
      )}
    </>
  );

  if (onClick) {
    return (
      <button onClick={onClick} className={classes}>
        {content}
      </button>
    );
  }
  if (href) {
    return (
      <Link className={classes} href={href!}>
        {content}
      </Link>
    );
  }
  return <div className={classes + " !cursor-default"}>{content}</div>;
}
