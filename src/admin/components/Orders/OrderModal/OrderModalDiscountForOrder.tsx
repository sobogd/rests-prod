import styled from "@emotion/styled";
import { FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { ModalRests } from "../../ModalRests";
import { newPallet } from "../../../styles";

const DiscountContainer = styled.div`
  margin: 0;
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-wrap: wrap;
`;

const DiscountTab = styled.div<{ active: boolean }>`
  padding: 5px 10px;
  font-size: 16px;
  background: ${({ active }) => (active ? newPallet.orange1 : newPallet.gray2)};
  border-radius: 10px;
  color: white;
  float: left;
  margin-right: 10px;
  margin-bottom: 10px;
  width: 20%;
  text-align: center;
`;

export const OrderModalDiscountForOrder: FC<{
  discountForOrder?: number;
  onClose: () => void;
  onApplyDiscount: (discount: number) => void;
  isShow?: boolean;
}> = ({ onClose, onApplyDiscount, isShow, discountForOrder }) => {
  const i18n = useTranslation();
  const [percent, setPercent] = useState<number>(0);

  useEffect(() => {
    setPercent(discountForOrder ?? 0);
  }, [discountForOrder]);

  return (
    <ModalRests
      title={i18n.t("orders.discountOrderTitle")}
      onBack={() => onClose()}
      isAdditionalForAdditional
      isShow={isShow}
      withPadding
      footerSticks={[
        {
          icon: "save",
          onClick: () => {
            onApplyDiscount(percent);
          },
        },
      ]}
    >
      <DiscountContainer>
        {[0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100].map((p) => (
          <DiscountTab active={percent === p} onClick={() => setPercent(p)}>
            {p}%
          </DiscountTab>
        ))}
      </DiscountContainer>
    </ModalRests>
  );
};
