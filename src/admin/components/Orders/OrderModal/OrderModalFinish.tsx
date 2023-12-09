import { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import { usePaymentMethodsQuery } from "../api";
import { ModalRests } from "../../ModalRests";
import { Notice } from "../../../hooks/useNotification";
import List from "../../List";
import Checkbox from "../../Checkbox/Checkbox";

export const OrderModalFinish: FC<{
  isShow: boolean;
  onClose: () => void;
  onFinish: (paymentMethod: string) => void;
}> = ({ onClose, onFinish, isShow }) => {
  const i18n = useTranslation();
  const [inputtedPaymentMethod, setInputtedPaymentMethod] = useState<string>("");
  const [isOpenCustomMethod, setIsOpenCustomMethod] = useState<boolean>(false);
  const { data: paymentMethods, isLoading, isFetching } = usePaymentMethodsQuery();

  return (
    <ModalRests
      title={i18n.t("orders.selectMethod")}
      onBack={() => onClose()}
      isAdditionalForAdditional
      isShow={isShow}
      withPadding
      footerSticks={[
        {
          icon: "save",
          onClick: () => {
            if (inputtedPaymentMethod !== "") {
              onFinish(inputtedPaymentMethod);
              onClose();
            } else {
              Notice.warning(i18n.t("orders.selectMethodMin"));
            }
          },
        },
      ]}
      isLoading={isLoading || isFetching}
    >
      <List
        items={
          paymentMethods?.map((paymentMethod) => ({
            title: (
              <Checkbox
                label={paymentMethod.title}
                value={
                  inputtedPaymentMethod === paymentMethod.title && isOpenCustomMethod === false ? true : false
                }
                onChange={() => {
                  setInputtedPaymentMethod(paymentMethod.title ?? "");
                  setIsOpenCustomMethod(false);
                }}
              />
            ),
            description: paymentMethod.description,
            onClick: () => {},
            id: paymentMethod.id,
          })) ?? []
        }
      />
    </ModalRests>
  );
};
