import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import { memo, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Cell, Pie, PieChart } from 'recharts';

import { useAuth } from '../../providers/Auth';
import { formatPrice } from '../../utils/priceFormatter';

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

  @media (min-width: 550px) {
    max-width: 320px;
  }
`;

const ChartContainer = styled.div`
  width: 100%;
  display: flex;

  > div {
    max-width: 100%;
    margin: 0 -25px;
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

const ChartLabel = styled.div`
  display: flex;
  gap: 10px;
`;

const ChartLabelTotal = styled.div`
  font-weight: 600;
  color: ${(props) => props.theme.text1};
`;

const ChartLabelTitle = styled.div`
  color: ${(props) => props.theme.text2};
`;

const ChartLabelColor = styled.div<{ background: string }>`
  background: ${(p) => p.background};
  width: 25px;
  height: 25px;
  border-radius: 20px;
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

export const StatsPayments = memo((props: Props) => {
  const { selectedDay, ordersByDays } = props;

  const { t } = useTranslation();
  const theme = useTheme();

  const symbol = useAuth()?.whoami?.company?.symbol;

  const [isFullPeriod, setIsFullPeriod] = useState<boolean>(true);

  const summary: { title: string; total: number }[] = useMemo(() => {
    if (!isFullPeriod) {
      return selectedDay?.summary ?? [];
    }

    const summaryObject = ordersByDays?.reduce(
      (acc: any, day: DayWithOrders) => {
        day?.summary?.forEach((s) => {
          if (acc[s.title]) {
            acc[s.title] = {
              ...acc?.[s.title],
              total: (acc?.[s.title]?.total ?? 0) + (s.total ?? 0),
            };
          } else {
            acc[s.title] = {
              title: s.title,
              total: s.total ?? 0,
            };
          }
        });

        return acc;
      },
      {},
    );

    return Object.values(summaryObject) ?? [];
  }, [ordersByDays, isFullPeriod, selectedDay]);

  return (
    <Container>
      <Title>{t('newStats.dayPayments.title')}</Title>
      <SubTitle>{t('newStats.dayPayments.subtitle')}</SubTitle>
      <Tabs>
        <Tab onClick={() => setIsFullPeriod(true)} active={isFullPeriod}>
          {t('newStats.dayPayments.allPeriod')}
        </Tab>
        <Tab onClick={() => setIsFullPeriod(false)} active={!isFullPeriod}>
          {t('newStats.dayPayments.onlyDay')}
        </Tab>
      </Tabs>
      <ChartContainer>
        <PieChart width={320} height={320}>
          <Pie
            data={summary}
            cx={160}
            cy={160}
            innerRadius={60}
            outerRadius={140}
            dataKey="total"
          >
            {summary.map((s, index) => (
              <Cell
                key={`cell-${s.title}-${s.total}`}
                fill={theme.diagramColors[index]}
              />
            ))}
          </Pie>
        </PieChart>
      </ChartContainer>
      {summary.map((s, index) => (
        <ChartLabel key={`cell-${s.title}-${s.total}`}>
          <ChartLabelColor background={theme.diagramColors[index]} />
          <ChartLabelTotal>
            {formatPrice({ price: s.total, symbol })}
          </ChartLabelTotal>
          <ChartLabelTitle>{s.title}</ChartLabelTitle>
        </ChartLabel>
      ))}
    </Container>
  );
});
