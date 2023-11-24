import pool from "../../db";
import { IItem } from "../../mappers/items";

export default async (categoryId: number, companyId: number): Promise<IItem[]> => {
  const client = await pool.connect();

  try {
    const items = (
      await client.query(
        `SELECT id, n, p, s FROM items WHERE c = $1 AND company = $2 ORDER BY s, n, id ASC`,
        [categoryId, companyId]
      )
    )?.rows as IItem[] | undefined;

    if (items?.length === undefined) throw new Error("Items not found");

    return items ?? [];
  } finally {
    client.release();
  }
};
