import pool from "../../db";
import { IItem } from "../../mappers/items";
import deleteFileFromGoogle from "../files/deleteFileFromGoogle";

export default async (itemId: number, companyId: number) => {
  const client = await pool.connect();

  try {
    const deletedItem = (
      await client.query(`DELETE from items WHERE id = $1 AND company = $2 RETURNING *`, [itemId, companyId])
    )?.rows?.[0] as IItem | undefined;

    if (!!deletedItem?.f) {
      await deleteFileFromGoogle(deletedItem.f);
    }
  } finally {
    client.release();
  }
};
