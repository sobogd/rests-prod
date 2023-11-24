import { utcToZonedTime } from "date-fns-tz";
import pool from "../../db";

export default async (orderNumber: number, paymentMethod: string, companyId: number): Promise<void> => {
  const client = await pool.connect();

  try {
    await client.query("UPDATE o SET m = $1, f = $2 WHERE n = $3 AND cid = $4 ", [
      paymentMethod,
      Number(utcToZonedTime(new Date(), "UTC").valueOf()),
      orderNumber,
      companyId,
    ]);
  } finally {
    client.release();
  }
};
