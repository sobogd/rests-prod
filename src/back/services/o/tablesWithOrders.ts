import pool from "../../db";
import { IOrder } from "../../types";

export default async (companyId: number): Promise<{ t: number; f?: boolean }[]> => {
  const client = await pool.connect();

  try {
    const orders = (await client.query(`SELECT * FROM o WHERE cid = $1 AND f IS NULL`, [companyId]))?.rows;

    const objectWithTablesWithOrders: any = {};

    orders.forEach((order: IOrder) => {
      objectWithTablesWithOrders[`table_${order.t}`] = {
        t: order.t,
        f: order?.p?.filter((p) => p.f == null)?.length === 0,
      };
    });

    const tablesWithOrders = Object.values(objectWithTablesWithOrders) as { t: number; f?: boolean }[];

    return tablesWithOrders;
  } finally {
    client.release();
  }
};
