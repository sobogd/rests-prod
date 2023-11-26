import { ETableTypes } from "./enums";

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
  type: ETableTypes;
  forOrder: boolean;
}

export interface ITableForCreate extends ITableConstructor {}

export interface ITable extends ITableConstructor {
  id: string;
}

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
