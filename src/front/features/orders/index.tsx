import React from "react";
import { TablesMap } from "./TablesMap/TablesMap";
import { useTranslation } from "react-i18next";
import { ModalRests } from "../../shared/ModalRests";

export const Orders: React.FC = () => {
  const i18n = useTranslation();
  return (
    <ModalRests title={i18n.t("menu.names.ORDERS")} isHaveMenu={true}>
      <TablesMap />
    </ModalRests>
  );
};
