import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import { memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';

import { useAuth } from '../../providers/Auth';
import { formatPrice } from '../../utils/priceFormatter';

import { DayWithOrders } from './types';

const Chart = styled.div`
  background: ${(props) => props.theme.background2};
  padding: 20px 30px 30px;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  flex: 1;
`;

const ChartScroll = styled.div`
  width: calc(100% + 60px);
  height: 400px;
  overflow-y: hidden;
  overflow-x: scroll;
  margin: 0 -30px;
`;

const ChartContainer = styled(ResponsiveContainer)`
  max-height: 400px;
  min-height: 400px;
  height: 400px;
  min-width: 100%;
  padding: 0 30px;
`;

const ChartTitle = styled.div`
  color: ${(props) => props.theme.text1};
  font-weight: 600;
  font-size: 32px;
  line-height: 36px;
`;

const ChartText = styled.div`
  color: ${(props) => props.theme.text2};
  font-size: 16px;
`;

const getNumberLength = (number: number) => {
  switch (number.toString().length) {
    case 1:
      return 1;
    case 2:
      return 10;
    default:
      return 100;
  }
};

type Props = {
  ordersByDays: DayWithOrders[];
  setSelectedDay: (dayWithOrders: DayWithOrders) => void;
};

export const StatsChart = memo((props: Props) => {
  const { ordersByDays, setSelectedDay } = props;

  const { t } = useTranslation();
  const theme = useTheme();

  const symbol = useAuth()?.whoami?.company?.symbol;

  const totalBorders = useMemo(() => {
    const borders = ordersByDays.reduce(
      (acc, day) => {
        if (day.total <= acc[0]) return [day.total, acc[1]];
        if (day.total >= acc[1]) return [acc[0], day.total];

        return acc;
      },
      [1000000000, 0],
    );

    const maxBorder = Math.round(borders[1]);
    const minBorder = Math.round(borders[0]);

    const minNumberRound = getNumberLength(minBorder);
    const maxNumberRound = getNumberLength(maxBorder);

    return [
      Math.floor(minBorder / minNumberRound) * minNumberRound,
      Math.ceil(maxBorder / maxNumberRound) * maxNumberRound,
    ];
  }, [ordersByDays]);

  const clickDayHandler = (index: number) => {
    setSelectedDay(ordersByDays?.[index]);
  };

  const widthForContainer = (ordersByDays?.length ?? 0) * 120;

  return ordersByDays?.length > 1 ? (
    <Chart>
      <ChartTitle>{t('newStats.chart.title')}</ChartTitle>
      <ChartText>{t('newStats.chart.subtitle')}</ChartText>
      <ChartScroll>
        <ChartContainer width={widthForContainer} height="100%">
          <LineChart
            width={widthForContainer}
            height={400}
            data={ordersByDays}
            margin={{ top: 50, right: 100, bottom: 20, left: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke={theme.background3} />
            <XAxis axisLine={false} tickLine={false} hide />
            <YAxis domain={totalBorders} hide />
            <Line
              type="monotone"
              dataKey="total"
              stroke={theme.primary1}
              strokeWidth={2}
              dot={{
                stroke: theme.secondary1,
                strokeWidth: 4,
              }}
              label={(p) => (
                <>
                  <text
                    onClick={() => clickDayHandler(p.index)}
                    x={p.x + 15}
                    y={p.y - 20}
                    fill={theme.text1}
                    fontSize={20}
                    fontWeight={600}
                  >
                    {formatPrice({
                      price: ordersByDays?.[p?.index]?.total,
                      symbol,
                    })}
                  </text>
                  <text
                    onClick={() => clickDayHandler(p.index)}
                    x={p.x + 15}
                    y={p.y}
                    fill={theme.text2}
                    fontSize={14}
                  >
                    {ordersByDays?.[p?.index]?.date}
                  </text>
                </>
              )}
            />
          </LineChart>
        </ChartContainer>
      </ChartScroll>
      <ChartText>{t('newStats.chart.description')}</ChartText>
    </Chart>
  ) : null;
});
