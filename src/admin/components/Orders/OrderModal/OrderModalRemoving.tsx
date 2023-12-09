import { FC } from "react";
import { ModalRests } from "../../ModalRests";
import List from "../../List";
import { useTranslation } from "react-i18next";

export const OrderModalRemoving: FC<{
  onClose: () => void;
  onRemove: () => void;
  isShow?: boolean;
}> = ({ onClose, onRemove, isShow }) => {
  const i18n = useTranslation();
  return (
    <ModalRests
      title={i18n.t("orders.removeOrder")}
      onBack={() => onClose()}
      isAdditionalForAdditional
      isShow={isShow}
      withPadding
    >
      <List
        items={[
          {
            title: i18n.t("orders.removeOrderForever"),
            onClick: () => onRemove(),
            id: "remove",
          },
          {
            title: i18n.t("orders.removeOrderCancel"),
            onClick: () => onClose(),
            id: "close",
          },
        ]}
      />
    </ModalRests>
  );
};
