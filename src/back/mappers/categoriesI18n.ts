export interface ICategoryI18n {
  id?: number;
  categoryId: number;
  code: string;
  title: string;
}

export interface ICategoryI18nDB {
  id?: number;
  category_id: number;
  code: string;
  title: string;
}

export const mapCategoriesI18nFromDB = (rows: ICategoryI18nDB[]): ICategoryI18n[] =>
  rows?.length
    ? rows.map((row) => ({
        id: row.id,
        categoryId: row.category_id,
        code: row.code,
        title: row.title,
      }))
    : [];

export const mapCategoriesI18nToDB = (rows: ICategoryI18n[]): ICategoryI18nDB[] =>
  rows?.length
    ? rows.map((row) => ({
        id: row.id,
        category_id: row.categoryId,
        code: row.code,
        title: row.title,
      }))
    : [];
