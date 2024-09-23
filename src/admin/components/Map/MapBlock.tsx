import styled from '@emotion/styled';
import { memo, useCallback, useMemo } from 'react';
import {
  MdBalcony,
  MdCountertops,
  MdDeck,
  MdDeleteOutline,
  MdEventSeat,
  MdGrass,
  MdInfo,
  MdLightbulb,
  MdLocalBar,
  MdLocalFlorist,
  MdMeetingRoom,
  MdPark,
  MdSportsEsports,
  MdStorage,
  MdTableBar,
  MdTableRestaurant,
  MdVolumeUp,
  MdWc,
} from 'react-icons/md';
import { TbChecks, TbClock } from 'react-icons/tb';

import { ETableType, ITable } from '../../../back/types';
import { useTheme } from '../../providers/Theme';

import { ITableWithOrders } from './types';

const CTableTypesIcons = {
  [ETableType.TABLE_SQUARE]: <MdTableRestaurant />,
  [ETableType.TABLE_CIRCLE]: <MdTableBar />,
  [ETableType.WALL]: null,
  [ETableType.FLOWER]: <MdLocalFlorist />,
  [ETableType.DOOR]: <MdMeetingRoom />,
  [ETableType.WINDOW]: <MdBalcony />,
  [ETableType.KITCHEN]: <MdCountertops />,
  [ETableType.GRASS]: <MdGrass />,
  [ETableType.PAVILION]: <MdDeck />,
  [ETableType.CHAIR]: <MdEventSeat />,
  [ETableType.INFO]: <MdInfo />,
  [ETableType.TRASH]: <MdDeleteOutline />,
  [ETableType.WC]: <MdWc />,
  [ETableType.BAR]: <MdLocalBar />,
  [ETableType.PLAY]: <MdSportsEsports />,
  [ETableType.MUSIC]: <MdVolumeUp />,
  [ETableType.TREE]: <MdPark />,
  [ETableType.STORAGE]: <MdStorage />,
  [ETableType.LIGHT]: <MdLightbulb />,
};

const Map = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  background: ${(p) => p.theme.background1};
`;

const MapEmpty = styled(Map)`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  color: ${(p) => p.theme.text3};
`;

const Icon = styled.div<{
  type?: ETableType;
  x: number;
  y: number;
  w: number;
  h: number;
}>`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
  transition: none !important;
  background: ${(p) => (p.type !== ETableType.WALL ? 'none' : p.theme.divider)};
  left: ${(p) => p.x}%;
  top: ${(p) => p.y}%;
  width: ${(p) => p.w}%;
  height: ${(p) => p.h}%;
`;

const IconContainer = styled.div<{
  selectedTableId?: number;
  table: ITableWithOrders;
  colored?: boolean;
  isVertical: boolean;
}>`
  position: absolute;
  ${(p) => (p.isVertical ? 'width: 100%;' : 'height: 100%;')}
  container-name: object;

  svg {
    color: ${(p) => {
      if (p.colored) {
        return p.theme.secondary1;
      } else if (!p.table.for_order) {
        return p.theme.divider;
      } else if (
        p.selectedTableId &&
        Number(p.table?.id) === Number(p.selectedTableId)
      ) {
        return p.theme.primary1;
      } else if (!p.selectedTableId && !p.table?.isHaveOrders) {
        return p.theme.primary2;
      } else if (!p.selectedTableId && p.table?.isHaveOrders) {
        return p.theme.primary2;
      } else {
        return p.theme.primary2;
      }
    }};
    width: 100%;
    height: 100%;
  }
`;

const IconStatus = styled.div<{
  ifAllReady?: boolean;
}>`
  display: flex;
  position: absolute;
  top: 0;
  left: 0;
  background: ${(p) => p.theme.primary1};
  border-radius: 100%;
  width: 30%;
  height: 30%;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 13px;
  line-height: 13px;
  opacity: 1;
  svg {
    color: ${(p) => p.theme.white1} !important;
    width: 50% !important;
  }
`;

// const IconNumber = styled.div`
//   display: flex;
//   position: absolute;
//   bottom: 0;
//   right: 0;
//   background: ${(p) => p.theme.background2};
//   color: ${(p) => p.theme.text3};
//   border-radius: 15px;
//   width: 20px;
//   height: 20px;
//   align-items: center;
//   justify-content: center;
//   font-weight: 600;
//   font-size: 8px;
// `;

type Props = {
  items: ITableWithOrders[];
  onClickTable?: (t: ITableWithOrders) => void;
  selectedTableId?: number;
  tableForEdition?: ITable;
};

export const MapBlock = memo((props: Props) => {
  const { items, onClickTable, selectedTableId, tableForEdition } = props;

  const { isVertical } = useTheme();

  const handleClickTable = useCallback(
    (t: ITableWithOrders) => () => {
      if (t && onClickTable) onClickTable(t);
    },
    [onClickTable],
  );

  const mapItems = useMemo(() => (items?.length ? items : []), [items]);

  const mapObjects = useMemo(
    () => mapItems?.filter((item) => !item.for_order),
    [mapItems],
  );
  const mapTables = useMemo(
    () => mapItems?.filter((item) => item.for_order),
    [mapItems],
  );

  const renderMapElement = useCallback(
    (table?: ITableWithOrders) => {
      if (!table) return null;

      return (
        <Icon
          onClick={handleClickTable(table)}
          x={table.x}
          y={table.y}
          w={table.w}
          h={table.h}
          type={table.type ?? ETableType.TABLE_CIRCLE}
        >
          <IconContainer
            isVertical={isVertical}
            onClick={handleClickTable(table)}
            table={table}
            selectedTableId={selectedTableId}
          >
            {table.isHaveOrders && (
              <IconStatus ifAllReady={table.ifAllReady}>
                {table.ifAllReady ? <TbChecks /> : <TbClock />}
              </IconStatus>
            )}
            {/*{table.for_order && <IconNumber>{table.number}</IconNumber>}*/}
            {CTableTypesIcons[table.type]}
          </IconContainer>
        </Icon>
      );
    },
    [handleClickTable, isVertical, selectedTableId],
  );

  if (!mapTables?.length) {
    return <MapEmpty>Сначала добавьте столы</MapEmpty>;
  }

  return (
    <Map>
      {mapObjects.map((t) => renderMapElement(t))}
      {mapTables.map((t) => renderMapElement(t))}
      {renderMapElement(tableForEdition)}
    </Map>
  );
});
