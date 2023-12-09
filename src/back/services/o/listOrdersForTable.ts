import pool from "../../db";
import { IOrder } from "../../types";

export default async (tableId: number, companyId: number): Promise<IOrder[]> => {
  const client = await pool.connect();

  try {
    const ordersForTableId = (
      await client.query(`SELECT * FROM o WHERE cid = $1 AND t = $2 AND f IS NULL ORDER BY crt ASC`, [
        companyId,
        tableId,
      ])
    )?.rows;

    return ordersForTableId;
  } finally {
    client.release();
  }
};
