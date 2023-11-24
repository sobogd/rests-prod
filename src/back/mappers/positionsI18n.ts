export interface IPositionI18n {
  id?: number;
  positionId: number;
  code: string;
  title: string;
}

export interface IPositionI18nDB {
  id?: number;
  position_id: number;
  code: string;
  title: string;
}

export const mapPositionsI18nFromDB = (
  rows: IPositionI18nDB[]
): IPositionI18n[] =>
  rows?.length
    ? rows.map((row) => ({
        id: row.id,
        positionId: row.position_id,
        code: row.code,
        title: row.title,
      }))
    : [];

export const mapPositionsI18nToDB = (
  rows: IPositionI18n[]
): IPositionI18nDB[] =>
  rows?.length
    ? rows.map((row) => ({
        id: row.id,
        position_id: row.positionId,
        code: row.code,
        title: row.title,
      }))
    : [];
