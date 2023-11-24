import pool from "../../db";

export default async (orderNumber: number, companyId: number): Promise<void> => {
  const client = await pool.connect();

  try {
    await client.query(`DELETE FROM o WHERE cid = $1 AND n = $2`, [companyId, orderNumber]);
  } finally {
    client.release();
  }
};
