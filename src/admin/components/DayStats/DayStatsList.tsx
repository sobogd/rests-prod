import React from "react";
import { useTranslation } from "react-i18next";
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
import Loading from "../loading";
import { useAllTablesQuery } from "../Orders/api";
import { getTimeFromUTCTimeStamp } from "../../utils/getUTCTimestamp";
import getSummForOrder from "../../../utils/getSummForOrder";
import { useAuth } from "../Auth/Context";
import { IOrder } from "../../../back/types";
import { newPallet, UniversalListItemBordered, UniversalList, textDefaultColor } from "../../styles";

const OrderCretionTime = styled.span`
  background: ${newPallet.orange1};
  color: white !important;
  border-radius: 5px;
  font-size: 13px !important;
  padding: 3px 5px;
  white-space: nowrap;
`;

const OrderAction = styled.button`
  background: ${textDefaultColor};
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

export const DayStatsList: React.FC<{ orders: IOrder[]; onReturn: (id: number) => void }> = ({
  orders,
  onReturn,
}) => {
  const i18n = useTranslation();
  const symbol = useAuth()?.whoami?.company?.symbol;
  const { data: tables, isFetching, isLoading } = useAllTablesQuery();

  const dayTotal = orders.reduce((summ, order) => {
    const orderSumm = Number(getSummForOrder(order.p, order.d).summWithDiscount);
    return summ + orderSumm;
  }, 0);

  return (
    <UniversalList>
      <Loading isLoading={isFetching || isLoading} />
      <UniversalListItemBorderedStats>
        Total: {dayTotal} {symbol}
      </UniversalListItemBorderedStats>
      {orders?.map((order: IOrder) => {
        const table = tables?.find((t) => Number(t.id) === Number(order.t));
        const totalOrder = Number(getSummForOrder(order.p, order.d).summWithDiscount);
        return (
          <UniversalListItemBorderedStats key={JSON.stringify(order.f)}>
            <p style={{ justifyContent: "space-between" }}>
              <p>
                <TbNumber /> №{order.n}
              </p>
              <OrderCretionTime>{getTimeFromUTCTimeStamp(order.crt ?? 0)}</OrderCretionTime>
            </p>
            <p>
              <TbMap /> №{table?.number} {table?.name}
            </p>
            <p>
              <TbCalculator /> {totalOrder} {symbol}
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
                    {/** @ts-ignore for old names values */}
                    {p.n ?? p.name}
                    <br />
                  </>
                ))}
              </span>
            </p>
            <OrderAction onClick={() => onReturn(order?.id ?? 0)}>Return</OrderAction>
          </UniversalListItemBorderedStats>
        );
      })}
    </UniversalList>
  );
};
