import pool from "../../db";
import { IOrder } from "../../types/o";

export default async (companyId: number): Promise<{ t: number; f?: boolean }[]> => {
  const client = await pool.connect();

  try {
    const orders = (await client.query(`SELECT * FROM o WHERE cid = $1 AND f IS NULL`, [companyId]))?.rows;

    const objectWithTablesWithOrders: any = {};

    orders.forEach((order: IOrder) => {
      objectWithTablesWithOrders[`table_${order.t}`] = {
        t: order.t,
        f: (objectWithTablesWithOrders[`table_${order.t}`]?.f ?? []).concat([false]),
      };
    });

    const tablesWithOrders = Object.values(objectWithTablesWithOrders).map((order: any) => ({
      ...order,
      f: !order?.f?.includes(false) ?? false,
    }));

    return tablesWithOrders;
  } finally {
    client.release();
  }
};
