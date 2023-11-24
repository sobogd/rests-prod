import pool from "../../db";
import { IPayment, mapPaymentsFromDB } from "../../mappers/payments";

const paymentsList = async (companyId: number): Promise<IPayment[]> => {
  const client = await pool.connect();

  const { rows: paymentsDB } = await client.query(
    "SELECT * FROM payments WHERE company_id = $1 ORDER BY id DESC",
    [companyId]
  );
  const payments = mapPaymentsFromDB(paymentsDB);

  await client.release();

  return payments;
};

export default paymentsList;
