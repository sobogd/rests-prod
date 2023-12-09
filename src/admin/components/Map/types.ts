import { ETableType, ITable } from "../../../back/types";

export interface ITableImage {
  filePath?: string;
}

export interface ITableConstructor {
  number?: number;
  name?: string;
  x: number;
  y: number;
  w: number;
  h: number;
  type: ETableType;
  forOrder: boolean;
}

export interface ITableForCreate extends ITableConstructor {}

export interface ITableWithOrders extends ITable {
  isHaveOrders?: boolean;
  ifAllReady?: boolean;
}

export interface ITablesState {
  items: ITable[];
  form?: ITable;
  isLoading: boolean;
  isOpenForm: boolean;
}
