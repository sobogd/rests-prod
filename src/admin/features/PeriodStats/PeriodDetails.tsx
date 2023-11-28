import React from "react";
import { useTranslation } from "react-i18next";
import { IPeriodStats } from "../../../back/controllers/period-stats";
import { UniversalList, UniversalListItemBordered } from "../../app/styles";
import { useAppSelector } from "../../app/store";
import styled from "@emotion/styled";
import priceInFormat from "../../utils/priceInFormat";

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
  const currencySymbol = useAppSelector((s) => s.common.user?.company?.currencySymbol);

  return (
    <UniversalList>
      <UniversalListItemBorderedStats>Orders count: {data.count}</UniversalListItemBorderedStats>
      <UniversalListItemBorderedStats>
        Total: {priceInFormat(data.total)} {currencySymbol}
      </UniversalListItemBorderedStats>
      <UniversalListItemBorderedStats>
        <p>Total by payment methods:</p>
        {data.summary.map((el) => (
          <PaymentMethodRow>
            <span>{el.paymentMethod}:</span>
            <span>
              {priceInFormat(el.summ)} {currencySymbol}
            </span>
          </PaymentMethodRow>
        ))}
      </UniversalListItemBorderedStats>
    </UniversalList>
  );
};
