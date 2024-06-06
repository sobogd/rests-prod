import styled from '@emotion/styled';
import { memo, ReactElement, useCallback, useEffect, useRef } from 'react';
import {
  TbBasket,
  TbBuildingSkyscraper,
  TbCash,
  TbChartHistogram,
  TbLayoutList,
  TbMap,
  TbSettings,
  TbSitemap,
  TbToolsKitchen,
  TbUsers,
} from 'react-icons/tb';

import { useAuth } from '../providers/Auth';

import { TPages } from './Page';

export type TPermissions = 'manager' | 'kitchen' | 'admin' | 'personal';

export const PagePermissions: { [key in TPages]: TPermissions[] } = {
  STATS: ['manager', 'admin', 'personal'],
  COMPANY: ['admin'],
  ORDERS: ['manager', 'personal', 'admin'],
  TABLES: ['admin'],
  CATEGORIES: ['admin'],
  KITCHEN: ['manager', 'kitchen', 'admin', 'personal'],
  POSITIONS: ['admin'],
  USERS: ['admin'],
  METHODS: ['admin'],
  SETTINGS: ['manager', 'kitchen', 'admin', 'personal'],
};

export const PageIcons: { [key in TPages]: ReactElement<any, any> } = {
  STATS: <TbChartHistogram />,
  COMPANY: <TbBuildingSkyscraper />,
  ORDERS: <TbBasket />,
  TABLES: <TbMap />,
  CATEGORIES: <TbSitemap />,
  KITCHEN: <TbToolsKitchen />,
  POSITIONS: <TbLayoutList />,
  USERS: <TbUsers />,
  METHODS: <TbCash />,
  SETTINGS: <TbSettings />,
};

const MenuContainer = styled.div`
  display: flex;
  width: 100%;
  height: 55px;
  min-height: 55px;
  max-height: 55px;
  background: ${(props) => props.theme.background2};
  border-top: 1px solid ${(props) => props.theme.divider};
  z-index: 2;
  position: relative;
  overflow-x: auto;
  overflow-y: hidden;
`;

const MenuScrollable = styled.div`
  min-width: 100%;
  display: flex;
  justify-content: space-between;
`;

const MenuItem = styled.div<{ active: boolean }>`
  display: flex;
  flex-direction: column;
  color: ${(p) =>
    p.active ? (props) => props.theme.primary1 : (props) => props.theme.text1};
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  text-align: center;

  @media (max-width: 500px) {
    min-width: 17.5vw;
  }

  span {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    font-size: 10px;
  }

  svg {
    min-width: 25px;
    min-height: 25px;
    max-width: 25px;
    max-height: 25px;
  }

  :first-of-type {
    margin-left: 10px;
  }

  :last-of-type {
    margin-right: 10px;
  }
`;

export const Menu = memo(() => {
  const { activePage, setActivePage, userType } = useAuth();
  const ref = useRef<HTMLDivElement | null>(null);
  const activeRef = useRef<HTMLDivElement | null>(null);

  const clickMenuItemHandler = useCallback(
    (type: TPages) => () => {
      setActivePage(type);
    },
    [setActivePage],
  );

  const renderMenuItem = useCallback(
    (type: TPages) => {
      if (!userType || !PagePermissions[type].includes(userType)) {
        return null;
      }

      const active = activePage === type;

      return (
        <MenuItem
          active={active}
          ref={active ? activeRef : null}
          onClick={clickMenuItemHandler(type)}
        >
          {PageIcons[type]}
        </MenuItem>
      );
    },
    [userType, activePage, clickMenuItemHandler],
  );

  useEffect(() => {
    const activePosition = activeRef.current?.getBoundingClientRect().left;
    const windowWidth = window.innerWidth;

    if (Number(activePosition) > windowWidth) {
      ref.current?.scrollTo({ left: activePosition });
    }
  }, [activePage, ref, activeRef]);

  return (
    <MenuContainer ref={ref}>
      <MenuScrollable>
        {renderMenuItem('COMPANY')}
        {renderMenuItem('ORDERS')}
        {renderMenuItem('TABLES')}
        {renderMenuItem('CATEGORIES')}
        {renderMenuItem('KITCHEN')}
        {renderMenuItem('POSITIONS')}
        {renderMenuItem('USERS')}
        {renderMenuItem('STATS')}
        {renderMenuItem('METHODS')}
        {renderMenuItem('SETTINGS')}
      </MenuScrollable>
    </MenuContainer>
  );
});
