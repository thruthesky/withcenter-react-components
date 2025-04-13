import Spinner from "./Spinner";

export default function Loading({
  loading,
  text,
}: {
  loading: boolean;
  text?: string;
}) {
  if (!loading) return null;
  text ??= "Please wait...";
  return (
    <div className="mt-3 flex items-center gap-2 text-gray-500 dark:text-gray-400">
      <Spinner />
      {text}
    </div>
  );
}
