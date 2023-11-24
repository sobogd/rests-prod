import styled from "@emotion/styled";
import { textDefaultWhiteColor } from "../../app/styles";
import { ETableTypes } from "./enums";

export const TablesMap = styled.div`
  position: relative;
  max-width: 100%;
  width: 500px;
  padding-bottom: 100%;
  border-radius: 10px;
  background: #f0f0f0;
  overflow: hidden;
`;

export const TableInMap = styled.div<{
  x: number;
  y: number;
  sizeY: number;
  sizeX: number;
  active?: boolean;
  tableType: ETableTypes;
}>`
  position: absolute;
  bottom: ${(p) => p.y}%;
  left: ${(p) => p.x}%;
  width: ${(p) => p.sizeX}%;
  height: ${(p) => p.sizeY}%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  z-index: ${(p) =>
    p.active ? 902 : p.tableType === ETableTypes.TABLE_CIRCLE ? 901 : 900};
  color: #ffffff;
  font-size: ${(p) =>
    p.tableType === ETableTypes.TABLE_CIRCLE ? "14px" : "0px"};

  svg {
    color: ${textDefaultWhiteColor};
  }
`;
