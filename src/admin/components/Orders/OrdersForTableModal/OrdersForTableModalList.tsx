import { FC } from "react";
import styled from "@emotion/styled";
import { useTranslation } from "react-i18next";
import { getTimeFromUTCTimeStamp } from "../../../utils/getUTCTimestamp";
import List from "../../List";
import { IOrder } from "../../../../back/types";
import { newPallet, textDefaultColor } from "../../../styles";

const OrderForTableTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  span {
    :nth-child(2) {
      background: ${newPallet.orange1};
      color: white !important;
      border-radius: 5px;
      font-size: 14px !important;
      padding: 3px 5px;
      white-space: nowrap;
    }
    :nth-child(3) {
      background: ${textDefaultColor};
      color: white !important;
      border-radius: 5px;
      font-size: 14px !important;
      padding: 3px 5px;
      white-space: nowrap;
    }
  }
`;

export const OrdersForTableModalList: FC<{
  setOrderNumber: (orderNumber: number | undefined) => void;
  orders?: IOrder[];
}> = ({ orders, setOrderNumber }) => {
  const i18n = useTranslation();

  return (
    <List
      items={
        orders?.map((order) => ({
          title: (
            <OrderForTableTitle>
              <span style={{ flex: "100%" }}>
                {i18n.t("orders.tabModBeforeOrd")}
                {order.n}
              </span>
              <span>{getTimeFromUTCTimeStamp(order.crt ?? 0)}</span>
              <span>
                {i18n.t("orders.tabModItems")}: {order.p.length}
              </span>
            </OrderForTableTitle>
          ),
          description: <span>{order.c && order.c !== "" ? order.c : i18n.t("orders.tabModNoComment")}</span>,
          buttonType: "next",
          onClick: () => setOrderNumber(order.n),
          id: order.id,
        })) ?? []
      }
    />
  );
};
