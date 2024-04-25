import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { ModalRests } from "../ModalRests";
import Loading from "../loading";
import { format } from "date-fns";
import { useLazyPeriodStatsQuery } from "./api";
import styled from "@emotion/styled";
import { blueGradient, pinkGradient } from "../../styles";
import { IOrder } from "../../../back/types";
import getSummForOrder from "../../../utils/getSummForOrder";
import { usePaymentMethodsQuery } from "../Orders/api";
import { DayWithOrders } from "./types";

import { useAuth } from "../Auth/Context";
import {
  StatisticContainer,
  StatisticSummaryDates,
  StatisticSummaryDatesInput,
  StatisticSummaryCard,
  StatisticSummaryCardTitle,
  StatisticSummaryCardValue,
} from "./styled";
import { StatsChart } from "./StatsChart";
import { StatsPayments } from "./StatsPayments";
import { StatsDetails } from "./StatsDetails";
import { useOrderReturnMutation } from "./api";
import { StatsProducts } from "./StatsProducts";
import { StatsCookingTime } from "./StatsCookingTime";

const getInitialDates = (): { startDate: Date; endDate: Date } => {
  const startDate = new Date();
  const endDate = new Date();

  startDate.setDate(startDate.getDate() - 7);

  return {
    startDate,
    endDate,
  };
};

const StatsHorisGrid = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
  justify-content: space-between;
  flex-wrap: wrap;
`;

export const Stats = () => {
  const i18n = useTranslation();
  const [dayStart, setDayStart] = useState<string>(
    format(getInitialDates().startDate, "yyyy-MM-dd")
  );
  const [dayEnd, setDayEnd] = useState<string>(
    format(getInitialDates().endDate, "yyyy-MM-dd")
  );

  const symbol = useAuth()?.whoami?.company?.symbol;
  const int = Intl.NumberFormat("en-US");

  const [selectedDay, setSelectedDay] = useState<DayWithOrders | undefined>();
  const [load, { data, isLoading, isFetching }] = useLazyPeriodStatsQuery();
  const {
    data: paymentMethods,
    isLoading: isLoadingPaymentMethods,
    isFetching: isFetchingPaymentMethods,
  } = usePaymentMethodsQuery();

  const [orderReturn, { isLoading: isLoadingReturn }] =
    useOrderReturnMutation();

  useEffect(() => {
    if (dayStart && dayStart !== "" && dayEnd && dayEnd !== "") {
      load({ dayStart, dayEnd });
    }
  }, [dayStart, dayEnd]);

  const ordersByDays: DayWithOrders[] = useMemo(() => {
    if (!paymentMethods) return [];

    const ordersByDaysObject = data?.reduce(
      (acc: { [key: string]: IOrder[] }, order: IOrder) => {
        if (order.crt) {
          const stringDate: string = format(
            new Date(Number(order.crt)),
            "dd.MM-yyyy"
          );
          acc[stringDate] = [...(acc[stringDate] ?? []), order];
        }
        return acc;
      },
      {}
    );

    if (!ordersByDaysObject) return [];

    return Object.keys(ordersByDaysObject).map((key) => {
      const summary = paymentMethods.map(({ title }) => ({
        title: title ?? "",
        total: ordersByDaysObject[key]
          .filter((order) => order.m === title)
          .reduce(
            (acc: number, order: IOrder) =>
              acc + getSummForOrder(order.p, order.d).summWithDiscount,
            0
          ),
      }));

      return {
        date: key,
        orders: ordersByDaysObject[key],
        summary,
        total: summary.reduce((acc, c) => acc + c.total, 0),
      };
    });
  }, [data, paymentMethods]);

  useEffect(() => {
    if (ordersByDays?.length) {
      setSelectedDay(ordersByDays[ordersByDays.length - 1]);
    }
  }, [ordersByDays]);

  const totalPerPeriod = useMemo(
    () => ordersByDays.reduce((acc, day) => acc + day.total, 0),
    [ordersByDays]
  );

  const averageOrderTotal = useMemo(
    () => (data?.length ? totalPerPeriod / data.length : 0),
    [totalPerPeriod, data]
  );

  const orderReturnHandler = (id: number) => {
    orderReturn({ id }).then(() => {
      load({ dayStart, dayEnd });
    });
  };

  return (
    <>
      <ModalRests title={i18n.t("menu.names.STATS")} isGeneral={true}>
        <StatisticContainer>
          <Loading
            isLoading={
              isLoading ||
              isFetching ||
              isLoadingPaymentMethods ||
              isFetchingPaymentMethods ||
              isLoadingReturn
            }
            isDark
          />
          <StatsHorisGrid>
            <StatisticSummaryDates>
              <StatisticSummaryDatesInput
                defaultValue={dayStart}
                value={dayStart}
                type="date"
                onChange={(e) => setDayStart(e.target.value)}
              />
              <StatisticSummaryDatesInput
                defaultValue={dayEnd}
                value={dayEnd}
                type="date"
                onChange={(e) => setDayEnd(e.target.value)}
              />
            </StatisticSummaryDates>
            <StatisticSummaryCard background={pinkGradient}>
              <StatisticSummaryCardTitle>
                Total per period
              </StatisticSummaryCardTitle>
              <StatisticSummaryCardValue>
                {int.format(totalPerPeriod)} {symbol}
              </StatisticSummaryCardValue>
            </StatisticSummaryCard>
            <StatisticSummaryCard background={blueGradient}>
              <StatisticSummaryCardTitle>
                Average order cost
              </StatisticSummaryCardTitle>
              <StatisticSummaryCardValue>
                {int.format(Math.ceil(averageOrderTotal))} {symbol} (
                {data?.length ?? 0})
              </StatisticSummaryCardValue>
            </StatisticSummaryCard>
          </StatsHorisGrid>
          <StatsChart
            ordersByDays={ordersByDays}
            setSelectedDay={setSelectedDay}
          />
          <StatsHorisGrid>
            <StatsPayments
              selectedDay={selectedDay}
              ordersByDays={ordersByDays}
            />
            <StatsCookingTime
              selectedDay={selectedDay}
              ordersByDays={ordersByDays}
            />
          </StatsHorisGrid>
          <StatsHorisGrid>
            <StatsProducts
              selectedDay={selectedDay}
              ordersByDays={ordersByDays}
            />
            <StatsDetails
              selectedDay={selectedDay}
              onReturn={orderReturnHandler}
            />
          </StatsHorisGrid>
        </StatisticContainer>
      </ModalRests>
    </>
  );
};
