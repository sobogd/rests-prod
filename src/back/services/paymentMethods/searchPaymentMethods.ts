import pool from "../../db";
import {
  IPaymentMethod,
  mapPaymentMethodsFromDB,
} from "../../mappers/paymentMethods";

export const searchPaymentMethods = async (
  companyId: number
): Promise<IPaymentMethod[]> => {
  const client = await pool.connect();

  const { rows: paymentMethodsDB } = await client.query(
    "SELECT * FROM payment_methods WHERE company_id = $1",
    [companyId]
  );

  const paymentMethods = mapPaymentMethodsFromDB(paymentMethodsDB);

  await client.release();

  return paymentMethods;
};
