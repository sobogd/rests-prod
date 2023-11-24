import pool from "../../db";
import { ICategory, mapCategoriesFromDB } from "../../mappers/categories";
import { mapCategoriesI18nFromDB } from "../../mappers/categoriesI18n";

export interface IGetCategoryDetails extends ICategory {
  translations: { code: string; name: string }[];
}

export const getCategoryDetails = async (categoryId: number): Promise<IGetCategoryDetails> => {
  const client = await pool.connect();

  const { rows: categoriesDB } = await client.query("SELECT * FROM categories WHERE id = $1 LIMIT 1", [
    categoryId,
  ]);

  const category = mapCategoriesFromDB(categoriesDB)?.[0];

  if (!category?.id) {
    throw new Error("Error while loading category");
  }

  const result: IGetCategoryDetails = {
    ...category,
    translations: [],
  };

  const { rows: categoriesTranslationsDB } = await client.query(
    `SELECT code, title  FROM categories_i18n WHERE category_id = $1`,
    [category.id]
  );

  const categoriesTranslations = mapCategoriesI18nFromDB(categoriesTranslationsDB);

  result.translations =
    categoriesTranslations?.map((t) => ({
      code: t.code,
      name: t.title,
    })) || [];

  await client.release();

  return result;
};
