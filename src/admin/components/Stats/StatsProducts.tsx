import styled from '@emotion/styled';
import { memo, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useAuth } from '../../providers/Auth';

import { DayWithOrders } from './types';

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

const List = styled.div`
  font-size: 16px;
  display: flex;
  flex-direction: column;
  height: 100%;
  margin-top: 20px;
  gap: 10px;
  @media (max-width: 750px) {
    max-height: 100%;
    overflow-y: hidden;
  },
`;

const Item = styled.div`
  display: flex;
  gap: 10px;
`;

const ItemQty = styled.div`
  display: flex;
  color: ${(props) => props.theme.text1};
`;

const ItemName = styled.div`
  display: flex;
  color: ${(props) => props.theme.text2};
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

type Props = {
  selectedDay?: DayWithOrders;
  ordersByDays: DayWithOrders[];
};

type Product = { name: string; qty: number };

export const StatsProducts = memo((props: Props) => {
  const { selectedDay, ordersByDays } = props;

  const { t } = useTranslation();

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

  const products = useMemo(() => {
    if (!isFullPeriod) {
      return (
        Object.values(
          selectedDay?.orders?.reduce((acc: any, order) => {
            order.p.forEach((p) => {
              const id = p.id ?? 0;
              if (acc[id]) {
                acc[id] = { ...acc[id], qty: acc[id].qty + 1 };
              } else {
                acc[id] = { name: p.n ?? '', qty: 1 };
              }
            });

            return acc;
          }, {}) ?? [],
        ) as Product[]
      )?.sort((a, b) => b.qty - a.qty);
    }

    return (
      Object.values(
        ordersByDays?.reduce((acc: any, day) => {
          day?.orders?.forEach((order) => {
            order.p.forEach((p) => {
              const id = p.id ?? 0;
              if (acc[id]) {
                acc[id] = { ...acc[id], qty: acc[id].qty + 1 };
              } else {
                acc[id] = { name: p.n ?? '', qty: 1 };
              }
            });
          });

          return acc;
        }, {}),
      ) as Product[]
    )?.sort((a, b) => b.qty - a.qty);
  }, [selectedDay, ordersByDays, isFullPeriod]);

  return (
    <Container>
      <Title>{t('newStats.dayProducts.title')}</Title>
      <SubTitle>{t('newStats.dayProducts.subtitle')}</SubTitle>
      <Tabs>
        <Tab onClick={() => setIsFullPeriod(true)} active={isFullPeriod}>
          {t('newStats.dayProducts.allPeriod')}
        </Tab>
        <Tab onClick={() => setIsFullPeriod(false)} active={!isFullPeriod}>
          {t('newStats.dayProducts.onlyDay')}
        </Tab>
      </Tabs>
      <List>
        {products.map((p, i) => (
          <Item key={p.name + p.qty + i}>
            <ItemQty>{p.qty}x</ItemQty>
            <ItemName>{p.name}</ItemName>
          </Item>
        ))}
      </List>
    </Container>
  );
});
