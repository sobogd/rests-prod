import pool from "../../db";
import { IDiscount, mapDiscountsFromDB } from "../../mappers/discounts";

export const searchDiscounts = async (
  companyId: number
): Promise<IDiscount[]> => {
  const client = await pool.connect();

  const { rows: discountsDB } = await client.query(
    "SELECT * FROM discounts WHERE company_id = $1",
    [companyId]
  );

  const discounts = mapDiscountsFromDB(discountsDB);

  await client.release();

  return discounts;
};
