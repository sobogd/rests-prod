import { FC } from "react";
import { CTableTypesIcons } from "./consts";
import { ITableWithOrders } from "./types";
import { primaryColor, textDefaultWhiteColor, warningColor } from "../../app/styles";
import { grey } from "@mui/material/colors";
import { ETableTypes } from "./enums";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import styled from "@emotion/styled";

const sxForStatusOrders = {
  color: textDefaultWhiteColor + " !important",
  position: "absolute",
  right: "-10px !important",
  top: "-10px !important",
  width: "40px !important",
  height: "40px !important",
  zIndex: 5,
  background: warningColor,
  padding: 1,
  borderRadius: 40,
};

const getColorForTableSvg = (table: ITableWithOrders, selectedTableId?: number): string => {
  if (!table.forOrder) {
    return grey[400];
  } else if (selectedTableId && Number(table?.id) === Number(selectedTableId)) {
    return primaryColor;
  } else if (!selectedTableId && !table?.isHaveOrders) {
    return primaryColor;
  } else if (!selectedTableId && table?.isHaveOrders) {
    return primaryColor;
  } else {
    return "#BAA5F8";
  }
};

const Map = styled.div`
  position: relative;
  width: 100%;
  height: 0;
  padding-bottom: 100%;
  overflow: hidden;
  background: #f0f0f0;
`;

const Icon = styled.div<{
  forOrder?: boolean;
  type?: ETableTypes;
  x: number;
  y: number;
  w: number;
  h: number;
  selectedTableId?: number;
  table: ITableWithOrders;
}>`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: ${(p) => (p.forOrder ? "2" : "1")};
  transition: none !important;
  touch-action: none;
  background: ${(p) => (p.type !== ETableTypes.WALL ? "none" : grey[400])};
  svg {
    color: ${(p) => getColorForTableSvg(p.table, p.selectedTableId)};
    width: 100%;
    height: 100%;
  }
  left: ${(p) => p.x}%;
  top: ${(p) => p.y}%;
  width: ${(p) => p.w}%;
  height: ${(p) => p.h}%;
  ::before {
    content: "${(p) => (p.table.forOrder ? p.table.number : "")}";
    display: ${(p) => (!p.table.forOrder ? "none" : "flex")};
    position: absolute;
    top: 70%;
    right: 60%;
    background: #baa5f8b7;
    border-radius: 25px;
    width: 25px;
    height: 25px;
    align-items: center;
    justify-content: center;
    color: white;
    font-weight: 600;
    font-size: 14px;
    line-height: 14px;
  }
`;

export const MapBlock: FC<{
  items: ITableWithOrders[];
  onClickTable?: (t: ITableWithOrders) => void;
  selectedTableId?: number;
}> = ({ items, onClickTable, selectedTableId }) => {
  const handleClickTable = (t: ITableWithOrders) => () => {
    if (t && onClickTable) onClickTable(t);
  };

  return (
    <Map>
      {items.map((table) => (
        <Icon
          onClick={handleClickTable(table)}
          x={table.x}
          y={table.y}
          w={table.w}
          h={table.h}
          type={table.type}
          forOrder={table.forOrder}
          table={table}
          selectedTableId={selectedTableId}
        >
          {!selectedTableId && table.isHaveOrders && table.ifAllReady && (
            <DoneAllIcon sx={sxForStatusOrders} />
          )}
          {!selectedTableId && table.isHaveOrders && !table.ifAllReady && (
            <HourglassEmptyIcon sx={sxForStatusOrders} />
          )}
          {CTableTypesIcons[table.type]}
        </Icon>
      ))}
    </Map>
  );
};
