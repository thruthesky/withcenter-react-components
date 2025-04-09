import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/pro-light-svg-icons";
import { useTranslations } from "next-intl";

export default function CancelButton({
  children,
  loading = false,
  onClick = () => {},
}: {
  children?: React.ReactNode;
  loading?: boolean;
  onClick?: () => void;
}) {
  const t = useTranslations();
  if (loading == true) return null;
  if (!children) {
    children = (
      <>
        <FontAwesomeIcon icon={faXmark} className="mr-2" />
        {t("cancel")}
      </>
    );
  }
  return (
    <button type="button" className="secondary button" onClick={onClick}>
      {children}
    </button>
  );
}
