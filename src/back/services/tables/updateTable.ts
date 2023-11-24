import pool from "../../db";
import { ITable } from "../../mappers/tables";

export const updateTable = async (table: ITable) => {
  const client = await pool.connect();

  if (!table?.id) {
    throw Error("Id is empty");
  }

  await client.query(
    "UPDATE tables SET name = $1, number = $2, x = $3, y = $4, w = $5, h = $6, for_order = $7, type = $8 WHERE id = $9",
    [
      table.name || null,
      table.number || null,
      table.x,
      table.y,
      table.w,
      table.h,
      table.forOrder,
      table.type,
      table.id,
    ]
  );

  await client.release();
};
