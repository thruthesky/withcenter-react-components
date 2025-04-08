import { HTMLAttributes, JSX } from "react";

interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Width of the skeleton
   * @default "100%"
   */
  width?: string | number;

  /**
   * Height of the skeleton
   * @default "1rem"
   */
  height?: string | number;

  /**
   * Whether the skeleton has a rounded shape
   * @default false
   */
  circle?: boolean;

  /**
   * Number of skeleton items to render (for creating lists/grids)
   * @default 1
   */
  count?: number;
}

export default function Skeleton({
  width = "100%",
  height = "1rem",
  circle = false,
  count = 1,
  className = "",
  ...props
}: SkeletonProps): JSX.Element {
  const items = Array.from({ length: count }, (_, i) => i);

  const skeletonStyle = {
    width: typeof width === "number" ? `${width}px` : width,
    height: typeof height === "number" ? `${height}px` : height,
    borderRadius: circle ? "50%" : "0.25rem",
  };

  return (
    <>
      {items.map((i) => (
        <div
          key={i}
          className={`animate-pulse bg-gray-300 dark:bg-gray-700 ${className}`}
          style={skeletonStyle}
          {...props}
        />
      ))}
    </>
  );
}

export function SkeletonCard() {
  return (
    <section className="flex flex-col gap-3 my-8 bg-gray-100 p-4 rounded-xl">
      <nav className="flex gap-3">
        <Skeleton width={40} height={40} circle />
        <div className="flex gap-1 flex-col grow">
          <Skeleton width={120} height={16} className="rounded-md" />
          <Skeleton width="69%" height={16} className="rounded-md" />
        </div>
      </nav>
      <Skeleton height={150} className="rounded-t-lg" />
      <nav className="flex justify-between">
        <Skeleton width="44%" height={16} className="rounded-md" />
        <Skeleton width="28%" height={16} className="rounded-md" />
      </nav>
    </section>
  );
}

interface SkeletonListProps {
  /**
   * Number of list items to render
   * @default 5
   */
  count?: number;

  /**
   * Whether to include an avatar for each item
   * @default true
   */
  withAvatar?: boolean;

  /**
   * Whether to include actions (like buttons) for each item
   * @default true
   */
  withActions?: boolean;

  /**
   * Height of each list item
   * @default 80
   */
  itemHeight?: number;

  /**
   * Additional class name for the list container
   */
  className?: string;
}

export function SkeletonList({
  count = 5,
  withAvatar = true,
  withActions = true,
  itemHeight = 80,
  className = "",
}: SkeletonListProps): JSX.Element {
  const items = Array.from({ length: count }, (_, i) => i);

  return (
    <div className={`space-y-4 ${className}`}>
      {items.map((index) => (
        <div
          key={index}
          className="flex items-center p-4 bg-gray-100 dark:bg-gray-800 rounded-lg"
          style={{ height: `${itemHeight}px` }}
        >
          {withAvatar && (
            <div className="flex-shrink-0 mr-4">
              <Skeleton width={40} height={40} circle />
            </div>
          )}

          <div className="flex-grow space-y-2">
            <Skeleton width="70%" height={16} className="rounded-md" />
            <Skeleton width="40%" height={12} className="rounded-md" />
          </div>

          {withActions && (
            <div className="flex-shrink-0 flex space-x-2">
              <Skeleton width={60} height={30} className="rounded-md" />
              <Skeleton width={60} height={30} className="rounded-md" />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export function SkeletonListWithNavigator(): JSX.Element {
  return (
    <div className="space-y-3">
      <SkeletonList count={5} withAvatar={true} withActions={true} />

      <div className="py-2 flex justify-center">
        <Skeleton width={260} height={32} className="rounded-md" />
      </div>
    </div>
  );
}

export function SkeletonTableList(): JSX.Element {
  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700">
      <div className="bg-gray-100 dark:bg-gray-800 px-4 py-3 border-b border-gray-200 dark:border-gray-700">
        <div className="flex justify-between items-center">
          <Skeleton width={100} height={20} className="rounded-md" />
          <Skeleton width={150} height={32} className="rounded-md" />
        </div>
      </div>

      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        {Array.from({ length: 5 }, (_, i) => (
          <div key={i} className="px-4 py-3 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Skeleton width={20} height={20} circle />
              <Skeleton width={180} height={16} className="rounded-md" />
            </div>
            <Skeleton width={80} height={16} className="rounded-md" />
            <Skeleton width={100} height={16} className="rounded-md" />
          </div>
        ))}
      </div>

      <div className="bg-gray-50 dark:bg-gray-800 px-4 py-3 border-t border-gray-200 dark:border-gray-700 flex justify-between">
        <Skeleton width={100} height={24} className="rounded-md" />
        <div className="flex space-x-1">
          <Skeleton width={32} height={32} className="rounded-md" />
          <Skeleton width={32} height={32} className="rounded-md" />
          <Skeleton width={32} height={32} className="rounded-md" />
        </div>
      </div>
    </div>
  );
}
