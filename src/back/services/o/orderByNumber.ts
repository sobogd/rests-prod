import pool from "../../db";
import { IOrder } from "../../types";

export default async (orderNumber: number, companyId: number): Promise<IOrder> => {
  const client = await pool.connect();

  try {
    const orderByNumber = (
      await client.query(`SELECT * FROM o WHERE cid = $1 AND n = $2 LIMIT 1`, [companyId, orderNumber])
    )?.rows?.[0];

    if (!orderByNumber) {
      throw new Error("Order not found");
    }

    return orderByNumber;
  } finally {
    client.release();
  }
};
