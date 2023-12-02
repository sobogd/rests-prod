import pool from "../../db";
import { ICategory } from "../../types";

export default async (companyId: number): Promise<{ n: string; i: number }[]> => {
  const client = await pool.connect();

  try {
    const categories = (
      await client.query(
        `SELECT name, id FROM categories WHERE company_id = $1 AND (select count(*) from items WHERE items.c = categories.id) > 0 ORDER BY sort ASC`,
        [companyId]
      )
    )?.rows as ICategory[] | undefined;

    return categories?.map((c) => ({ i: Number(c.id), n: c.name })) ?? [];
  } finally {
    client.release();
  }
};
