import pool from "../../db";
import { IItem } from "../../mappers/items";

export default async (itemId: number, companyId: number): Promise<IItem> => {
  const client = await pool.connect();

  try {
    const item = (
      await client.query(`SELECT * FROM items WHERE id = $1 AND company = $2 LIMIT 1`, [itemId, companyId])
    )?.rows?.[0] as IItem | undefined;

    if (!item) throw new Error("Item not found");

    return item;
  } finally {
    client.release();
  }
};
