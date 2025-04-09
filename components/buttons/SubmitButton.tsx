import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Spinner from "../Spinner";
import { faPaperPlane } from "@fortawesome/pro-light-svg-icons";
import { useTranslations } from "next-intl";

export default function SubmitButton({
  children,
  loading = false,
}: {
  children?: React.ReactNode;
  loading?: boolean;
}) {
  const t = useTranslations();
  if (loading == true) return <Spinner />;
  if (!children) {
    children = (
      <>
        <FontAwesomeIcon icon={faPaperPlane} className="mr-2" />
        {t("submit")}
      </>
    );
  }
  return (
    <button type="submit" className="primary button" disabled={loading}>
      {children}
    </button>
  );
}
