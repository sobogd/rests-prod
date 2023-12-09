import { FC, useMemo } from "react";
import { useTranslation } from "react-i18next";
import getSummForOrder from "../../../../utils/getSummForOrder";
import { useAuth } from "../../Auth/Context";
import styled from "@emotion/styled";
import { IPositionForOrder } from "../../../../back/types";
import { newPallet, boxShadow } from "../../../styles";

const TotalContainer = styled.div`
  float: left;
  position: absolute;
  bottom: 15px;
  left: 15px;
  min-height: 50px;
  display: flex;
  font-size: 16px;
  color: white;
  padding: 0px 20px;
  border-radius: 50px;
  align-items: center;
  justify-content: center;
  background-color: ${newPallet.orange1};
  box-shadow: ${boxShadow};
  span,
  b {
    margin-left: 5px;
  }
  b {
    position: relative;
    font-size: 16px;
    color: #ffe3af;
    font-weight: 400;
  }
`;

export const OrderModalTotalBlock: FC<{
  discountInPercent?: number;
  positions: IPositionForOrder[];
  onClickTotalBlcok: () => void;
}> = ({ positions, discountInPercent, onClickTotalBlcok }) => {
  const i18n = useTranslation();
  const symbol = useAuth()?.whoami?.company?.symbol;

  const { summWithoutDiscount, summWithDiscount } = useMemo(
    () => getSummForOrder(positions, discountInPercent),
    [positions, discountInPercent]
  );

  const isWithoutDiscount = Number(summWithoutDiscount) === Number(summWithDiscount);

  return (
    <TotalContainer onClick={() => onClickTotalBlcok()}>
      <span>{i18n.t("orders.totalTitle")}</span>
      <span>
        {summWithDiscount}
        {symbol}
      </span>
      <b
        style={{
          display: isWithoutDiscount ? "none" : undefined,
        }}
      >
        ({summWithDiscount - summWithoutDiscount}
        {symbol})
      </b>
    </TotalContainer>
  );
};
