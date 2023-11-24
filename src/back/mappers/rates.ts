export interface IRate {
  id: number;
  name: string;
  perMonth: number;
}

export interface IRateDB {
  id: number;
  name: string;
  per_month: number;
}

export const mapRatesFromDB = (rows: IRateDB[]): IRate[] =>
  rows?.length
    ? rows.map((row) => ({
        id: row.id,
        name: row.name,
        perMonth: Number(row.per_month),
      }))
    : [];

export const mapRatesToDB = (rows: IRate[]): IRateDB[] =>
  rows?.length
    ? rows.map((row) => ({
        id: row.id,
        name: row.name,
        per_month: Number(row.perMonth),
      }))
    : [];
