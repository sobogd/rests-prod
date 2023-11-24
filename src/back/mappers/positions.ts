export enum EPositionStatuses {
  ACTIVE = "active",
  ARCHIVED = "archived",
}

export interface IPosition {
  id?: number;
  name: string;
  price: number;
  description?: string;
  isAdditional: boolean;
  sort: number;
  status?: EPositionStatuses;
  fileName?: string;
  hide?: boolean;
  multipleChoice?: boolean;
}

export interface IPositionDB {
  id?: number;
  name: string;
  price: number;
  description?: string;
  is_additional: boolean;
  sort: number;
  status?: EPositionStatuses;
  file_name?: string;
  hide?: boolean;
  multiple_choice?: boolean;
}

export const mapPositionsFromDB = (rows: IPositionDB[]): IPosition[] =>
  rows?.length
    ? rows.map((row) => ({
        id: row.id,
        name: row.name,
        description: row.description,
        price: Number(row.price),
        isAdditional: row.is_additional,
        sort: row.sort,
        status: row.status,
        fileName: row.file_name,
        hide: row.hide,
        multipleChoice: row.multiple_choice,
      }))
    : [];

export const mapPositionsToDB = (rows: IPosition[]): IPositionDB[] =>
  rows?.length
    ? rows.map((row) => ({
        id: row.id,
        name: row.name,
        description: row.description,
        price: Number(row.price),
        is_additional: row.isAdditional,
        sort: row.sort,
        status: row.status,
        file_name: row.fileName,
        multiple_choice: row.multipleChoice,
      }))
    : [];
