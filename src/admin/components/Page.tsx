import styled from '@emotion/styled';
import { useMemo } from 'react';

import { useAuth } from '../providers/Auth';

import { CategoriesList } from './Categories/CategoriesList';
import { Company } from './Company/Company';
import { ItemsList } from './Items/ItemsList';
import { Kitchen } from './Kitchen';
import { Map } from './Map/Map';
import { Menu } from './Menu';
import { MethodsList } from './Methods/MethodsList';
import { Orders } from './Orders';
import { Settings } from './Settings';
import { Stats } from './Stats/Stats';
import { UsersList } from './Users/UsersList';

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
  | 'SETTINGS'
  | 'METHODS';

export const PageComponents: { [key in TPages]: any } = {
  STATS: <Stats />,
  COMPANY: <Company />,
  ORDERS: <Orders />,
  TABLES: <Map />,
  CATEGORIES: <CategoriesList />,
  KITCHEN: <Kitchen />,
  POSITIONS: <ItemsList />,
  USERS: <UsersList />,
  METHODS: <MethodsList />,
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
