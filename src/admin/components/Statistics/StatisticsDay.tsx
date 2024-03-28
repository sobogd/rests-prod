import React from "react";
import { useTranslation } from "react-i18next";
import { DayWithOrders } from "./types";
import { ModalRests } from "../ModalRests";

export const StatisticsDay: React.FC<{
  selectedDay: DayWithOrders | undefined;
  onBack: () => void;
}> = ({ selectedDay, onBack }) => {
  const { t } = useTranslation();

  return (
    <ModalRests
      isShow={selectedDay !== undefined ? true : false}
      title={t("map.form.new")}
      onBack={onBack}
      withPadding
    >
      test
    </ModalRests>
  );
};
