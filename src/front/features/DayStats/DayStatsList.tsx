import React from "react";
import { useTranslation } from "react-i18next";
import { IOrder } from "../../../back/types/o";
import { UniversalList, UniversalListItemBordered } from "../../app/styles";
import styled from "@emotion/styled";
import {
  TbMap,
  TbNumber,
  TbCalculator,
  TbDeviceAnalytics,
  TbWriting,
  TbListDetails,
  TbDiscount2,
} from "react-icons/tb";
import { getSummWithDiscount } from "../orders/OrderModal/OrderModalTotalBlock";
import { useAppSelector } from "../../app/store";
import Loading from "../../shared/loading";
import { useAllTablesQuery } from "../orders/api";
import { format } from "date-fns";
import { getTimeFromUTCTimeStamp, getUTCTimestamp } from "../../utils/getUTCTimestamp";

const OrderCretionTime = styled.span`
  background: #ffc858;
  color: white !important;
  border-radius: 5px;
  font-size: 13px !important;
  padding: 3px 5px;
  white-space: nowrap;
`;

const OrderAction = styled.button`
  background: #cf7ff8;
  width: 100%;
  color: white;
  font-weight: 600;
  font-size: 17px;
  border: 0;
  border-radius: 10px;
  height: 40px;
  margin-top: 15px;
`;

const UniversalListItemBorderedStats = styled(UniversalListItemBordered)`
  p {
    justify-content: flex-start;
    align-items: flex-start;
    gap: 10px;
    svg {
      margin-top: 4px;
      min-width: 17px;
    }
  }
`;

export const DayStatsList: React.FC<{ orders: IOrder[] }> = ({ orders }) => {
  const i18n = useTranslation();
  const company = useAppSelector((s) => s.common.user?.company);
  const { data: tables, isFetching, isLoading } = useAllTablesQuery();

  return (
    <UniversalList>
      <Loading isLoading={isFetching || isLoading} />
      {orders?.map((order: IOrder) => {
        const table = tables?.find((t) => Number(t.id) === Number(order.t));
        return (
          <UniversalListItemBorderedStats key={JSON.stringify(order.f)}>
            <p style={{ justifyContent: "space-between" }}>
              <p>
                <TbNumber /> №{order.n}
              </p>
              <OrderCretionTime>
                {getTimeFromUTCTimeStamp(order.crt ?? 0, company?.utcDiff ?? 0)}
              </OrderCretionTime>
            </p>
            <p>
              <TbMap /> №{table?.number} {table?.name}
            </p>
            <p>
              <TbCalculator /> {getSummWithDiscount(order.p, order.d).summWithDiscount}{" "}
              {company?.currencySymbol}
              {!!order.d ? (
                <>
                  <TbDiscount2 style={{ marginLeft: 25 }} /> {order.d}%
                </>
              ) : null}
            </p>
            <p>
              <TbDeviceAnalytics /> {order.m}
            </p>
            {!!order.c && order.c !== "" ? (
              <p>
                <TbWriting /> {order.c}
              </p>
            ) : null}
            <p
              style={{
                alignItems: "flex-start",
                borderTop: "1px solid #ede7ff",
                marginTop: 10,
                paddingTop: 10,
              }}
            >
              <TbListDetails />
              <span>
                {order.p.map((p) => (
                  <>
                    {p.n}
                    <br />
                  </>
                ))}
              </span>
            </p>
            <OrderAction>Return</OrderAction>
          </UniversalListItemBorderedStats>
        );
      })}
    </UniversalList>
  );
};
