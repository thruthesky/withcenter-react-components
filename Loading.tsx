import { useTranslations } from "next-intl";
import Spinner from "./Spinner";

export default function Loading({
  loading,
  text,
}: {
  loading: boolean;
  text?: string;
}) {
  const t = useTranslations();
  if (!loading) return null;
  text ??= "in-submit-desc";
  return (
    <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
      <Spinner />
      {t(text)}
    </div>
  );
}
