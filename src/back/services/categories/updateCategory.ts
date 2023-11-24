import pool from "../../db";
import { ICategory } from "../../mappers/categories";

export const updateCategory = async (category: ICategory) => {
  const client = await pool.connect();

  if (!category?.id) {
    throw Error("Id is empty");
  }

  await client.query("UPDATE categories SET name = $1, description = $2 WHERE id = $3", [
    category.name,
    category.description || null,
    category.id,
  ]);

  await client.query("DELETE FROM categories_i18n WHERE category_id = $1", [category.id]);

  for (const { code, name } of category.translations ?? []) {
    await client.query(`INSERT INTO categories_i18n (category_id, code, title) VALUES ($1, $2, $3)`, [
      category.id,
      code,
      name,
    ]);
  }

  await client.release();
};
