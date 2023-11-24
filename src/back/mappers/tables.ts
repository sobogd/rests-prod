export interface ITableImageResponse {
  filePath?: string;
}

export enum ETableType {
  TABLE_SQUARE = "table_s",
  TABLE_CIRCLE = "table_c",
  WALL = "wall",
  FLOWER = "flower",
  DOOR = "door",
  WINDOW = "window",
  KITCHEN = "kitchen",
  GRASS = "grass",
  PAVILION = "pavilion",
  CHAIR = "chair",
  INFO = "info",
  TRASH = "trash",
  WC = "wc",
  BAR = "bar",
  PLAY = "play",
  MUSIC = "music",
  TREE = "tree",
  LIGHT = "light",
  STORAGE = "storage",
}

export interface ITable {
  id?: number;
  number?: number;
  name?: string;
  x: number;
  y: number;
  forOrder: boolean;
  w: number;
  h: number;
  type: ETableType;
  companyId?: number;
  status?: ETableStatuses;
}

export interface ITableDB {
  id?: number;
  number?: number;
  name?: string;
  x: number;
  y: number;
  for_order: boolean;
  w: number;
  h: number;
  type: ETableType;
  company_id?: number;
  status?: ETableStatuses;
}

export enum ETableStatuses {
  ACTIVE = "active",
  ARCHIVED = "archived",
}

export interface ITableWithOrder {
  id: number;
  finished?: boolean;
}

export const mapTablesFromDB = (rows: ITableDB[]): ITable[] =>
  rows?.length
    ? rows.map((row) => ({
        id: row.id,
        name: row.name,
        number: row.number,
        y: row.y,
        x: row.x,
        companyId: row.company_id,
        status: row.status,
        h: row.h,
        w: row.w,
        forOrder: row.for_order,
        type: row.type,
      }))
    : [];

export const mapTablesToDB = (rows: ITable[]): ITableDB[] =>
  rows?.length
    ? rows.map((row) => ({
        id: row.id,
        name: row.name,
        number: row.number,
        y: row.y,
        x: row.x,
        company_id: row.companyId,
        status: row.status,
        h: row.h,
        w: row.w,
        for_order: row.forOrder,
        type: row.type,
      }))
    : [];
