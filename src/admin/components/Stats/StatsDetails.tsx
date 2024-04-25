import styled from "@emotion/styled";
import {
  black2,
  black3,
  blackDivider,
  blackText1,
  blackText2,
  tab1,
  tab2,
} from "../../styles";
import { DayWithOrders } from "./types";
import { useTranslation } from "react-i18next";
import { memo } from "react";
import {
  TbCalculator,
  TbDeviceAnalytics,
  TbDiscount2,
  TbMap,
  TbNumber,
  TbWriting,
} from "react-icons/tb";
import { getTimeFromUTCTimeStamp } from "../../utils/getUTCTimestamp";
import getSummForOrder from "../../../utils/getSummForOrder";
import { useAllTablesQuery } from "../Orders/api";
import { useAuth } from "../Auth/Context";
import { dateHHmm } from "../../utils/timeInFormat";

type Props = {
  selectedDay?: DayWithOrders;
  onReturn: (id: number) => void;
};

const Container = styled.div`
  background: ${black2};
  padding: 20px 30px 0px;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  flex: 1;
  max-width: 100%;
`;

const Title = styled.div`
  color: ${blackText1};
  font-weight: 600;
  font-size: 32px;
  line-height: 36px;
`;

const SubTitle = styled.div`
  color: ${blackText2};
  font-size: 16px;
`;

const List = styled.div`
  font-size: 16px;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  height: 100%;
  max-height: 570px;
  padding-bottom: 30px;
  gap: 30px;
  margin-top: 20px;
  @media (max-width: 750px) {
    max-height: 100%;
    overflow-y: hidden;
  },
`;

const Item = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding-bottom: 30px;
  border-bottom: 1px solid ${blackDivider};
`;

const Tabs = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
`;

const Tab = styled.div`
  color: ${blackText1};
  padding: 5px 20px;
  border-radius: 20px;
  background: ${black3};
  display: flex;
  align-items: center;
  gap: 15px;
  line-height: 20px;
  max-width: 100%;

  span {
    white-space: nowrap;
    overflow-x: hidden;
    text-overflow: ellipsis;
  }

  svg {
    min-width: 20px;
    min-height: 20px;
  }
`;

const ItemProducts = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const ItemProduct = styled.div`
  font-size: 16px;
  color: ${blackText2};
`;

const Return = styled.div`
  font-size: 16px;
  color: ${blackText1};
  width: 100%;
  background: ${tab2};
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  border-radius: 20px;
  height: 40px;
  cursor: pointer;
  transition: 0.2s;
  opacity: 0.7;

  :hover {
    opacity: 1;
  }
`;

export const StatsDetails = memo((props: Props) => {
  const { selectedDay, onReturn } = props;

  const { t } = useTranslation();

  const { data: tables } = useAllTablesQuery();

  const symbol = useAuth()?.whoami?.company?.symbol;

  return (
    <Container>
      <Title>{t("newStats.dayDetails.title")}</Title>
      <SubTitle>{t("newStats.dayDetails.subtitle")}</SubTitle>
      <List>
        {selectedDay?.orders?.map((order) => {
          const table = tables?.find((t) => Number(t.id) === Number(order.t));
          const totalOrder = Number(
            getSummForOrder(order.p, order.d).summWithDiscount
          );
          return (
            <Item key={`cell-${order.n}`}>
              <Tabs>
                <Tab>
                  <TbNumber /> {order.n}
                </Tab>
                <Tab>{dateHHmm(order.crt)}</Tab>
                <Tab>
                  <TbMap />
                  <span>
                    №{table?.number} {table?.name}
                  </span>
                </Tab>
                <Tab>
                  <TbCalculator /> {totalOrder} {symbol}
                </Tab>
                {!!order.d ? (
                  <Tab>
                    <TbDiscount2 /> {order.d}%
                  </Tab>
                ) : null}
                <Tab>
                  <TbDeviceAnalytics />
                  <span>{order.m}</span>
                </Tab>
                {!!order.c && order.c !== "" ? (
                  <Tab>
                    <TbWriting /> {order.c}
                  </Tab>
                ) : null}
              </Tabs>
              <ItemProducts>
                {order.p.map((p, i) => (
                  <ItemProduct>
                    {/** @ts-ignore for old names values */}
                    {i + 1}. {p.n ?? p.name}
                  </ItemProduct>
                ))}
              </ItemProducts>
              <Return onClick={() => onReturn(order?.id ?? 0)}>
                {t("newStats.dayDetails.return")}
              </Return>
            </Item>
          );
        })}
      </List>
    </Container>
  );
});
