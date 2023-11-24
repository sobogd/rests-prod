import pool from "../../db";
import { ETableStatuses, ITable } from "../../mappers/tables";

export const createTable = async (table: ITable, companyId: number) => {
  const client = await pool.connect();

  await client.query(
    "INSERT INTO tables (name, number, x, y, company_id, status, w,h,for_order, type) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)",
    [
      table.name || null,
      table.number || null,
      table.x,
      table.y,
      companyId,
      ETableStatuses.ACTIVE,
      table.w,
      table.h,
      table.forOrder,
      table.type,
    ]
  );

  await client.release();
};
