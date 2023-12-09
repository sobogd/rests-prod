import React from "react";
import { useTranslation } from "react-i18next";
import { IPeriodStats } from "../../../back/controllers/period-stats";
import styled from "@emotion/styled";
import priceInFormat from "../../utils/priceInFormat";
import { useAuth } from "../Auth/Context";
import { UniversalList, UniversalListItemBordered } from "../../styles";

const UniversalListItemBorderedStats = styled(UniversalListItemBordered)`
  span {
    font-weight: 400;
  }
  p {
    margin-bottom: 10px;
  }
`;

const PaymentMethodRow = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
  span {
    width: 35%;
    :first-child {
      width: 60%;
    }
  }
`;

export const PeriodDetails: React.FC<{ data: IPeriodStats }> = ({ data }) => {
  const i18n = useTranslation();
  const symbol = useAuth()?.whoami?.company?.symbol;

  return (
    <UniversalList>
      <UniversalListItemBorderedStats>
        {i18n.t("periodStats.ordersCount")}: {data.count}
      </UniversalListItemBorderedStats>
      <UniversalListItemBorderedStats>
        {i18n.t("periodStats.total")}: {priceInFormat(data.total)} {symbol}
      </UniversalListItemBorderedStats>
      <UniversalListItemBorderedStats>
        <p>{i18n.t("periodStats.totalByPaymentMethods")}:</p>
        {data.summary.map((el) => (
          <PaymentMethodRow>
            <span>{el.paymentMethod}:</span>
            <span>
              {priceInFormat(el.summ)} {symbol}
            </span>
          </PaymentMethodRow>
        ))}
      </UniversalListItemBorderedStats>
    </UniversalList>
  );
};
