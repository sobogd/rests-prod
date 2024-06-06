import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import { memo, useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Area,
  CartesianGrid,
  ComposedChart,
  Line,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from 'recharts';

import { useAuth } from '../../providers/Auth';
import { dateDurationHHmm } from '../../utils/timeInFormat';
import { useCategoriesQuery } from '../Categories/api';

import { DayWithOrders } from './types';

type Props = {
  selectedDay?: DayWithOrders;
  ordersByDays: DayWithOrders[];
};

const Container = styled.div`
  background: ${(props) => props.theme.background2};
  padding: 20px 30px 30px;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  flex: 1;
  max-width: 100%;
`;

const ChartContainer = styled(ResponsiveContainer)`
  width: 100%;
  display: flex;
  height: 400px;
  min-height: 400px;

  > div {
    max-width: 100%;
  }
`;

const Title = styled.div`
  color: ${(props) => props.theme.text1};
  font-weight: 600;
  font-size: 32px;
  line-height: 36px;
`;

const SubTitle = styled.div`
  color: ${(props) => props.theme.text2};
  font-size: 16px;
`;

const Tabs = styled.div`
  display: flex;
  gap: 10px;
`;

const Tab = styled.div<{ active: boolean }>`
  background: ${(p) =>
    p.active ? (props) => props.theme.tab1 : (props) => props.theme.tab2};
  color: ${(props) => props.theme.white1};
  padding: 5px 20px;
  border-radius: 20px;
  cursor: pointer;
  transition: 0.2s;
  font-size: 16px;

  :hover {
    opacity: 0.7;
  }
`;

export const StatsCookingTime = memo((props: Props) => {
  const { selectedDay, ordersByDays } = props;

  const { t } = useTranslation();
  const theme = useTheme();

  const symbol = useAuth()?.whoami?.company?.symbol;

  const [isFullPeriod, setIsFullPeriod] = useState<boolean>(true);

  const { data: categories } = useCategoriesQuery();

  const summary = useMemo(() => {
    if (!categories?.length) return [];

    const categoriesObject = categories.reduce((acc: any, c) => {
      if (c.id)
        acc[c.id] = {
          id: c.id,
          name: c.name,
          avg: [],
        };

      return acc;
    }, []);

    if (!isFullPeriod) {
      selectedDay?.orders.forEach((order) => {
        order?.p?.forEach((position) => {
          const id = position?.cat;
          const cookingTime = position?.f
            ? Number(position?.f) - Number(position?.crt)
            : undefined;

          if (id)
            categoriesObject[id] = {
              ...categoriesObject[id],
              avg: [...categoriesObject[id]?.avg, cookingTime],
            };
        });
      });
    }

    if (isFullPeriod && ordersByDays) {
      ordersByDays?.forEach((day) => {
        day?.orders?.forEach((order) => {
          order?.p?.forEach((position) => {
            const id = position?.cat;
            const cookingTime = position?.f
              ? Number(position?.f) - Number(position?.crt)
              : undefined;

            if (id && cookingTime)
              categoriesObject[id] = {
                ...(categoriesObject?.[id] ?? {}),
                avg: [...(categoriesObject?.[id]?.avg ?? []), cookingTime],
              };
          });
        });
      });
    }

    const averageByCategories = Object.values(categoriesObject)
      ?.filter((item: any) => item?.avg?.length > 0)
      ?.map((item: any) => {
        const avgArray =
          item.avg?.filter((avg: number) => Number(avg) > 0) ?? [];

        const averageTime =
          avgArray.reduce((acc: number, time: number) => acc + time, 0) /
          avgArray.length;

        const maxTime = item.avg?.reduce(
          (acc: number, time: number) => (time >= acc ? time : acc),
          0,
        );

        const minTime = item.avg.reduce(
          (acc: number, time: number) => (time <= acc ? time : acc),
          9999999999999,
        );

        return {
          name: item.name,
          categoryId: item.id,
          averageTime,
          maxTime,
          minTime,
          avg: item.avg,
        };
      })
      ?.map((item: any) => {
        const hourInMs = 3600000;

        return {
          name: item.name,
          categoryId: item.categoryId,
          averageTime: item.averageTime,
          maxTime:
            item.maxTime - item.averageTime >= hourInMs
              ? item.averageTime + hourInMs
              : item.maxTime,
          minTime:
            item.averageTime - item.minTime >= hourInMs
              ? item.averageTime - hourInMs
              : item.minTime,
          avg: item.avg,
        };
      });

    return averageByCategories ?? [];
  }, [ordersByDays, isFullPeriod, selectedDay, categories]);

  const dateFormatter = (value: number) => dateDurationHHmm(value);
  const nameFormatter = useCallback(
    (id: number) => {
      const categoryName = categories?.find((c) => c.id === id)?.name;
      if (Number(categoryName?.length) > 18) {
        return `${categoryName?.slice(0, 18)}..`;
      }

      return categoryName;
    },
    [categories],
  );

  return (
    <Container>
      <Title>{t('newStats.cookingTime.title')}</Title>
      <SubTitle>{t('newStats.cookingTime.subtitle')}</SubTitle>
      <Tabs>
        <Tab onClick={() => setIsFullPeriod(true)} active={isFullPeriod}>
          {t('newStats.cookingTime.allPeriod')}
        </Tab>
        <Tab onClick={() => setIsFullPeriod(false)} active={!isFullPeriod}>
          {t('newStats.cookingTime.onlyDay')}
        </Tab>
      </Tabs>
      <ChartContainer>
        <ComposedChart
          width={500}
          height={400}
          data={summary}
          margin={{
            top: 20,
            right: 0,
            bottom: 20,
            left: -30,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke={theme.background3} />
          <XAxis
            dataKey="categoryId"
            stroke={theme.text3}
            axisLine={false}
            fontSize={10}
            width={10}
            height={100}
            tickLine={{ stroke: theme.background3 }}
            tickCount={20}
            allowDataOverflow={true}
            type="category"
            minTickGap={0}
            tick={({ x, y, payload }) => (
              <g transform={`translate(${x},${y})`}>
                <text
                  x={0}
                  y={0}
                  dy={2}
                  textAnchor="end"
                  fill={theme.text3}
                  transform="rotate(-90)"
                  fontSize={10}
                  width={100}
                >
                  {nameFormatter(payload.value)}
                </text>
              </g>
            )}
          />
          <YAxis
            dataKey="maxTime"
            tickFormatter={dateFormatter}
            tickCount={6}
            stroke={theme.text3}
            axisLine={false}
            fontSize={10}
            tickLine={{
              stroke: theme.background3,
            }}
          />
          <Area
            type="monotone"
            dataKey="maxTime"
            fill={theme.background3}
            stroke={theme.text3}
          />
          <Line
            dataKey="averageTime"
            stroke={theme.primary1}
            strokeWidth={3}
            dot={false}
            type="monotone"
          />
        </ComposedChart>
      </ChartContainer>
    </Container>
  );
});
