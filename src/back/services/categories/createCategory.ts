import pool from "../../db";
import { ECategoryStatus, ICategory, mapCategoriesFromDB } from "../../mappers/categories";

export const createCategory = async (category: ICategory, companyId: number) => {
  const client = await pool.connect();

  const { rows: createdCategoriesDB } = await client.query(
    "INSERT INTO categories (name, description, company_id, status) VALUES ($1,$2,$3,$4) RETURNING *",
    [category.name, category.description || null, companyId, ECategoryStatus.ACTIVE]
  );

  const createdCategoryId = mapCategoriesFromDB(createdCategoriesDB)?.[0]?.id;

  if (!createdCategoryId) {
    client.release();
    throw new Error("Error while creating category");
  }

  await client.query("DELETE FROM categories_i18n WHERE category_id = $1", [createdCategoryId]);

  for (const { code, name } of category.translations ?? []) {
    await client.query(`INSERT INTO categories_i18n (category_id, code, title) VALUES ($1, $2, $3)`, [
      createdCategoryId,
      code,
      name,
    ]);
  }

  client.release();
};
