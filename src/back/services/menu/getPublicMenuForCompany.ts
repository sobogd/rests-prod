import { IPublicMenuCategory } from "../../controllers/menu";
import pool from "../../db";

export const getPublicMenuForCompany = async (
  companyId: number
): Promise<IPublicMenuCategory[]> => {
  const client = await pool.connect();

  const { rows } = await client.query(
    `SELECT menu FROM menus WHERE company_id = $1 LIMIT 1`,
    [companyId]
  );

  await client.release();

  const menu = rows?.[0]?.menu;

  if (!menu) {
    return [];
  }

  return menu as IPublicMenuCategory[];
};
