import pool from "../../db";

export default async (
  orderNumber: number,
  paymentMethod: string,
  companyId: number,
  finishTime: number
): Promise<void> => {
  const client = await pool.connect();

  try {
    await client.query(
      "UPDATE o SET m = $1, f = $2 WHERE n = $3 AND cid = $4 ",
      [paymentMethod, finishTime, orderNumber, companyId]
    );
  } finally {
    client.release();
  }
};
