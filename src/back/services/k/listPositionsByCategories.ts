import pool from "../../db";
import { IAllPositionsForKitchen } from "../../types";

export default async (companyId: number): Promise<IAllPositionsForKitchen[]> => {
  const client = await pool.connect();

  try {
    const orders = (
      await client.query(`SELECT * FROM o WHERE cid = $1 AND f IS NULL ORDER BY crt ASC`, [companyId])
    )?.rows;

    return orders.reduce((res: any, o: any) => {
      const arr: any = [];

      o.p.forEach((p: any) => {
        arr.push({
          tab: o.t,
          oc: o.c,
          c: p.c,
          i: p.i,
          cat: p.cat,
          crt: p.crt,
          ocrt: o.crt,
          on: o.n,
          f: p.f,
          n: p.n,
          t: p.t,
          v: p.v,
          o: p.o,
        });
      });

      return res.concat(arr);
    }, []);
  } finally {
    client.release();
  }
};
