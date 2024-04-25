import pool from "../../db";
import { IPositionForOrder } from "../../types";

export default async (
  orderNumber: number,
  doneTime: number,
  positionIndex: number,
  companyId: number
): Promise<void> => {
  const client = await pool.connect();

  try {
    const order = (
      await client.query(`SELECT * FROM o WHERE cid = $1 AND n = $2 LIMIT 1`, [
        companyId,
        orderNumber,
      ])
    )?.rows?.[0];

    const positions = order.p.map((p: IPositionForOrder) => ({
      ...p,
      f: positionIndex === p.i ? doneTime : p.f,
    }));

    await client.query("UPDATE o SET p = $1 WHERE n = $2 AND cid = $3 ", [
      JSON.stringify(positions),
      orderNumber,
      companyId,
    ]);
  } finally {
    client.release();
  }
};
