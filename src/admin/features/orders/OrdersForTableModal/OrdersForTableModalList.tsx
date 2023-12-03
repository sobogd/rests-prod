import { FC } from "react";
import { useAppSelector } from "../../../app/store";
import { UniversalList, UniversalListItemBordered, prePrimaryColor } from "../../../app/styles";
import styled from "@emotion/styled";
import { useTranslation } from "react-i18next";
import { IOrder } from "../../../../back/types/o";
import { getTimeFromUTCTimeStamp } from "../../../utils/getUTCTimestamp";

const OrderCretionTime = styled.span`
  background: #ffc858;
  color: white !important;
  border-radius: 5px;
  font-size: 13px !important;
  padding: 3px 5px;
  white-space: nowrap;
`;

const OrderItemsCount = styled.span`
  background: ${prePrimaryColor};
  color: white !important;
  border-radius: 5px;
  font-size: 13px !important;
  padding: 3px 5px;
  white-space: nowrap;
`;

export const OrdersForTableModalList: FC<{
  setOrderNumber: (orderNumber: number | undefined) => void;
  orders?: IOrder[];
}> = ({ orders, setOrderNumber }) => {
  const utcDiff = useAppSelector((s) => s.common.user?.company?.utcDiff);
  const i18n = useTranslation();

  return (
    <UniversalList>
      {orders?.map((order) => (
        <UniversalListItemBordered
          onClick={() => {
            setOrderNumber(order.n);
          }}
          key={JSON.stringify(order.p)}
        >
          <p style={{ justifyContent: "flex-end", gap: "10px" }}>
            <span style={{ flex: "100%" }}>
              {i18n.t("orders.tabModBeforeOrd")}
              {order.n}
            </span>
            <OrderCretionTime>{getTimeFromUTCTimeStamp(order.crt ?? 0)}</OrderCretionTime>
            <OrderItemsCount>{order.p.length} items</OrderItemsCount>
          </p>
          <p>
            <span>{order.c && order.c !== "" ? order.c : i18n.t("orders.tabModNoComment")}</span>
          </p>
        </UniversalListItemBordered>
      ))}
    </UniversalList>
  );
};
