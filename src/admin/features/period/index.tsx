import React from "react";
import { useTranslation } from "react-i18next";
import { ModalRests } from "../../shared/ModalRests";
import Loading from "../../shared/loading";

export const Period: React.FC = () => {
  const i18n = useTranslation();

  return (
    <ModalRests title={i18n.t("menu.names.PERIOD")} isHaveMenu={true}>
      <Loading isLoading={false} />
      Period
    </ModalRests>
  );
};
