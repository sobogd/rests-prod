import styled from '@emotion/styled';
import { format } from 'date-fns';
import { useEffect, useMemo, useState } from 'react';

import { IOrder } from '../../../back/types';
import getSummForOrder from '../../../utils/getSummForOrder';
import { useAuth } from '../../providers/Auth';
import { useTheme } from '../../providers/Theme';
import { Loading } from '../Loading';
import { usePaymentMethodsQuery } from '../Orders/api';

import { useLazyPeriodStatsQuery } from './api';
import { useOrderReturnMutation } from './api';
import { StatsChart } from './StatsChart';
import { StatsCookingTime } from './StatsCookingTime';
import { StatsDetails } from './StatsDetails';
import { StatsPayments } from './StatsPayments';
import { StatsProducts } from './StatsProducts';
import {
  StatisticContainer,
  StatisticSummaryDates,
  StatisticSummaryDatesInput,
  StatisticSummaryCard,
  StatisticSummaryCardTitle,
  StatisticSummaryCardValue,
} from './styled';
import { DayWithOrders } from './types';

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
  const { theme } = useTheme();

  const [dayStart, setDayStart] = useState<string>(
    format(getInitialDates().startDate, 'yyyy-MM-dd'),
  );
  const [dayEnd, setDayEnd] = useState<string>(
    format(getInitialDates().endDate, 'yyyy-MM-dd'),
  );

  const symbol = useAuth()?.whoami?.company?.symbol;
  const int = Intl.NumberFormat('en-US');

  const [selectedDay, setSelectedDay] = useState<DayWithOrders | undefined>();
  const [load, { data, isLoading, isFetching }] = useLazyPeriodStatsQuery();
  const {
    data: paymentMethods,
    isLoading: isLoadingPaymentMethods,
    isFetching: isFetchingPaymentMethods,
    isUninitialized,
  } = usePaymentMethodsQuery();

  const [orderReturn, { isLoading: isLoadingReturn }] =
    useOrderReturnMutation();

  useEffect(() => {
    if (dayStart && dayStart !== '' && dayEnd && dayEnd !== '') {
      load({ dayStart, dayEnd });
    }
  }, [dayStart, dayEnd, load]);

  const ordersByDays: DayWithOrders[] = useMemo(() => {
    if (!paymentMethods) return [];

    const ordersByDaysObject = data?.reduce(
      (acc: { [key: string]: IOrder[] }, order: IOrder) => {
        if (order.crt) {
          const stringDate: string = format(
            new Date(Number(order.crt)),
            'dd.MM-yyyy',
          );
          acc[stringDate] = [...(acc[stringDate] ?? []), order];
        }

        return acc;
      },
      {},
    );

    if (!ordersByDaysObject) return [];

    return Object.keys(ordersByDaysObject).map((key) => {
      const summary = paymentMethods.map(({ title }) => ({
        title: title ?? '',
        total: ordersByDaysObject[key]
          .filter((order) => order.m === title)
          .reduce(
            (acc: number, order: IOrder) =>
              acc + getSummForOrder(order.p, order.d).summWithDiscount,
            0,
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
    [ordersByDays],
  );

  const averageOrderTotal = useMemo(
    () => (data?.length ? totalPerPeriod / data.length : 0),
    [totalPerPeriod, data],
  );

  const orderReturnHandler = (id: number) => {
    orderReturn({ id }).then(() => {
      load({ dayStart, dayEnd });
    });
  };

  return (
    <StatisticContainer>
      <Loading
        isLoading={
          isLoading ||
          isFetching ||
          isLoadingPaymentMethods ||
          isFetchingPaymentMethods ||
          isLoadingReturn ||
          isUninitialized
        }
        isFullscreen
      />
      <StatsHorisGrid>
        <StatisticSummaryDates>
          <StatisticSummaryDatesInput
            // defaultValue={dayStart}
            value={dayStart}
            type="date"
            onChange={(e) => setDayStart(e.target.value)}
          />
          <StatisticSummaryDatesInput
            // defaultValue={dayEnd}
            value={dayEnd}
            type="date"
            onChange={(e) => setDayEnd(e.target.value)}
          />
        </StatisticSummaryDates>
        <StatisticSummaryCard background={theme.primaryGradient}>
          <StatisticSummaryCardTitle>
            Total per period
          </StatisticSummaryCardTitle>
          <StatisticSummaryCardValue>
            {int.format(totalPerPeriod)} {symbol}
          </StatisticSummaryCardValue>
        </StatisticSummaryCard>
        <StatisticSummaryCard background={theme.secondaryGradient}>
          <StatisticSummaryCardTitle>
            Average order cost
          </StatisticSummaryCardTitle>
          <StatisticSummaryCardValue>
            {int.format(Math.ceil(averageOrderTotal))} {symbol} (
            {data?.length ?? 0})
          </StatisticSummaryCardValue>
        </StatisticSummaryCard>
      </StatsHorisGrid>
      <StatsChart ordersByDays={ordersByDays} setSelectedDay={setSelectedDay} />
      <StatsHorisGrid>
        <StatsPayments selectedDay={selectedDay} ordersByDays={ordersByDays} />
        <StatsCookingTime
          selectedDay={selectedDay}
          ordersByDays={ordersByDays}
        />
      </StatsHorisGrid>
      <StatsHorisGrid>
        <StatsProducts selectedDay={selectedDay} ordersByDays={ordersByDays} />
        <StatsDetails selectedDay={selectedDay} onReturn={orderReturnHandler} />
      </StatsHorisGrid>
    </StatisticContainer>
  );
};
