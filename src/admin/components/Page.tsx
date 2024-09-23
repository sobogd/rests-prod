import styled from '@emotion/styled';
import { useMemo } from 'react';

import { useAuth } from '../providers/Auth';

import { Categories } from './Categories';
import { Company } from './Company';
import { ItemsList } from './Items/ItemsList';
import { Kitchen } from './Kitchen';
import { Map } from './Map/Map';
import { Menu } from './Menu';
import { Orders } from './Orders';
import { Settings } from './Settings';
import { Stats } from './Stats/Stats';
import { Users } from './Users';

export enum EPages {
  LOGIN = 'LOGIN',
  COMPANY = 'COMPANY',
  ORDERS = 'ORDERS',
  TABLES = 'TABLES',
  CATEGORIES = 'CATEGORIES',
  KITCHEN = 'KITCHEN',
  POSITIONS = 'POSITIONS',
  USERS = 'USERS',
  BILLING = 'BILLING',
  STATS = 'STATS',
  METHODS = 'METHODS',
  SETTINGS = 'SETTINGS',
}

export type TPages =
  | 'COMPANY'
  | 'ORDERS'
  | 'TABLES'
  | 'CATEGORIES'
  | 'KITCHEN'
  | 'POSITIONS'
  | 'USERS'
  | 'STATS'
  | 'SETTINGS';

export const PageComponents: { [key in TPages]: any } = {
  STATS: <Stats />,
  COMPANY: <Company />,
  ORDERS: <Orders />,
  TABLES: <Map />,
  CATEGORIES: <Categories />,
  KITCHEN: <Kitchen />,
  POSITIONS: <ItemsList />,
  USERS: <Users />,
  SETTINGS: <Settings />,
};

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`;

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  position: relative;
  z-index: 1;
`;

export function Page() {
  const { activePage } = useAuth();

  const page = useMemo(() => PageComponents[activePage] ?? null, [activePage]);

  return (
    <Container>
      <Wrapper>{page}</Wrapper>
      <Menu />
    </Container>
  );
}
