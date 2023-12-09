import { FC } from "react";
import { ITableWithOrders } from "./types";
import styled from "@emotion/styled";
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
} from "react-icons/md";
import { ETableType, ITable } from "../../../back/types";
import { TbChecks, TbClock } from "react-icons/tb";
import { newPallet, newBorderColor, textDefaultColor, backgroundDefault, boxShadow } from "../../styles";

const getColorForTableSvg = (
  table: ITableWithOrders,
  selectedTableId?: number,
  colored?: boolean
): string => {
  if (colored) {
    return newPallet.orange1;
  } else if (!table.for_order) {
    return newBorderColor;
  } else if (selectedTableId && Number(table?.id) === Number(selectedTableId)) {
    return textDefaultColor;
  } else if (!selectedTableId && !table?.isHaveOrders) {
    return newPallet.gray2;
  } else if (!selectedTableId && table?.isHaveOrders) {
    return textDefaultColor;
  } else {
    return newPallet.gray2;
  }
};

const Map = styled.div`
  width: 100%;
  max-width: calc(100vh - 55px);
  position: absolute;
  height: 0;
  padding-bottom: 100%;
  margin: auto;
  left: 0;
  right: 0;
  top: 55px;
  border: 0;
  > div {
    position: relative;
    width: 100%;
    height: 0;
    padding-bottom: 100%;
    overflow: hidden;
    background: ${backgroundDefault};
  }
`;

export const Icon = styled.div<{
  forOrder?: boolean;
  type?: ETableType;
  x: number;
  y: number;
  w: number;
  h: number;
  selectedTableId?: number;
  table: ITableWithOrders;
  colored?: boolean;
  isHaveOrders?: boolean;
}>`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: ${(p) => {
    if (p.colored) return "3";
    if (p.forOrder) return "2";
    return "1";
  }};
  transition: none !important;
  background: ${(p) =>
    p.type !== ETableType.WALL ? "none" : getColorForTableSvg(p.table, p.selectedTableId, p.colored)};
  svg {
    color: ${(p) => getColorForTableSvg(p.table, p.selectedTableId, p.colored)};
    width: 100%;
    height: 100%;
  }
  left: ${(p) => p.x}%;
  top: ${(p) => p.y}%;
  width: ${(p) => p.w}%;
  height: ${(p) => p.h}%;
  ::before {
    content: "${(p) => (p.table.for_order ? p.table.number : "")}";
    display: ${(p) => (!p.table.for_order ? "none" : "flex")};
    position: absolute;
    top: 0px;
    right: 0px;
    background: ${(p) => getColorForTableSvg(p.table, p.selectedTableId, p.colored)};
    border-radius: 10px;
    box-shadow: ${boxShadow};
    width: 30px;
    height: 30px;
    align-items: center;
    justify-content: center;
    color: white;
    font-weight: 600;
    font-size: 13px;
    line-height: 13px;
    opacity: 1;
  }
  span {
    display: flex;
    position: absolute;
    top: 0px;
    right: 35px;
    background: ${newPallet.orange1};
    border-radius: 10px;
    box-shadow: ${boxShadow};
    width: 30px;
    height: 30px;
    align-items: center;
    justify-content: center;
    color: white;
    font-weight: 600;
    font-size: 13px;
    line-height: 13px;
    opacity: 1;
    svg {
      color: white;
      width: 17px;
    }
  }
`;

export const MapBlock: FC<{
  items: ITableWithOrders[];
  onClickTable?: (t: ITableWithOrders) => void;
  selectedTableId?: number;
  tableForEdition?: ITable;
}> = ({ items, onClickTable, selectedTableId, tableForEdition }) => {
  const handleClickTable = (t: ITableWithOrders) => () => {
    if (t && onClickTable) onClickTable(t);
  };

  const CTableTypesIcons: any = {
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

  return (
    <Map>
      <div>
        {(items ?? [])?.map((table) => (
          <Icon
            onClick={handleClickTable(table)}
            x={table.x}
            y={table.y}
            w={table.w}
            h={table.h}
            type={table.type ?? ETableType.TABLE_CIRCLE}
            forOrder={table.for_order}
            table={table}
            selectedTableId={selectedTableId}
            isHaveOrders={table.isHaveOrders}
          >
            {CTableTypesIcons[table.type]}
            {table.isHaveOrders ? <span>{table.ifAllReady ? <TbChecks /> : <TbClock />}</span> : null}
          </Icon>
        ))}
        {tableForEdition ? (
          <Icon
            x={tableForEdition.x}
            y={tableForEdition.y}
            w={tableForEdition.w}
            h={tableForEdition.h}
            type={tableForEdition.type ?? ETableType.TABLE_CIRCLE}
            table={tableForEdition}
            selectedTableId={tableForEdition.id}
            colored
          >
            {CTableTypesIcons[tableForEdition.type]}
          </Icon>
        ) : null}
      </div>
    </Map>
  );
};
