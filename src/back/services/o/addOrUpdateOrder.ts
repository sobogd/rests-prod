import pool from "../../db";
import { getUTCTimestamp } from "../../../admin/utils/getUTCTimestamp";
import { IOrder } from "../../types";

export default async (orderQuery: IOrder, companyId: number): Promise<number> => {
  const client = await pool.connect();
  let orderNumber = orderQuery.n ?? 0;

  try {
    if (!orderQuery.n) {
      const lastOrderNumber =
        (await client.query(`SELECT n FROM o WHERE cid = $1 ORDER BY n DESC LIMIT 1`, [companyId]))?.rows?.[0]
          ?.n ?? 0;

      orderNumber = lastOrderNumber + 1;

      await client.query("INSERT INTO o (t, c, p, n, cid, crt, d) VALUES ($1,$2,$3,$4,$5,$6,$7)", [
        orderQuery.t,
        orderQuery.c,
        JSON.stringify(orderQuery.p),
        orderNumber,
        companyId,
        getUTCTimestamp(),
        orderQuery.d ?? null,
      ]);
    } else {
      await client.query("UPDATE o SET t = $1, c = $2, p = $3, d = $4 WHERE n = $5 AND cid = $6 ", [
        orderQuery.t,
        orderQuery.c,
        JSON.stringify(orderQuery.p),
        orderQuery.d ?? null,
        orderQuery.n,
        companyId,
      ]);
    }

    return orderNumber;
  } finally {
    client.release();
  }
};
