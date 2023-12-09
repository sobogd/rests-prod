import pool from "../../db";
import { EPaymentStatuses, mapPaymentsFromDB } from "../../mappers/payments";
import crypto from "crypto";
import dotenv from "dotenv";
import { makeMonthlyPaymentAndUpdateCompany } from "./makeMonthlyPaymentAndUpdateCompany";

dotenv.config();

const merchantKey = process.env.PAYTR_KEY || "";
const merchantSalt = process.env.PAYTR_SALT || "";

const componentName = "paymentResult";
const paymentResult = async (
  hash: string,
  paymentId: number,
  status: "success" | "failed",
  totalAmount?: any
): Promise<void> => {
  if (hash == null || paymentId == null || status == null) {
    throw new Error("error");
  }

  const token = crypto
    .createHmac("sha256", merchantKey)
    .update(paymentId + merchantSalt + status + totalAmount)
    .digest("base64");

  if (token !== hash) {
    throw new Error("error");
  }

  const client = await pool.connect();

  const { rows: paymentsStatusesDB } = await client.query(
    "SELECT status FROM payments WHERE id = $1 LIMIT 1",
    [paymentId]
  );
  const paymentStatus = mapPaymentsFromDB(paymentsStatusesDB)?.[0];

  if (!paymentStatus?.status) {
    await client.release();
    throw new Error("error");
  }

  if (paymentStatus.status === EPaymentStatuses.PAID || paymentStatus.status === EPaymentStatuses.ERROR) {
    await client.release();
    throw new Error("error");
  }

  // if status unsuccessful, update failed payment and return void
  if (status !== "success") {
    await client.query("UPDATE payments SET status = $1 WHERE id = $2", [EPaymentStatuses.ERROR, paymentId]);
    await client.release();
    return;
  }

  const { rows: updatedPaymentsDB } = await client.query(
    "UPDATE payments SET status = $1 WHERE id = $2 RETURNING *",
    [EPaymentStatuses.PAID, paymentId]
  );
  const updatedPayment = mapPaymentsFromDB(updatedPaymentsDB)?.[0];

  if (!updatedPayment?.companyId || !updatedPayment?.amount) {
    await client.release();
    throw new Error("error");
  }

  const { rows: companiesDB } = await client.query("SELECT balance FROM companies WHERE id = $1 LIMIT 1", [
    updatedPayment.companyId,
  ]);
  const companyBalance = companiesDB?.[0]?.balance;

  if (!companyBalance && companyBalance !== 0) {
    await client.release();
    throw new Error("error");
  }

  await client.query("UPDATE companies SET balance = $1 WHERE id = $2", [
    companyBalance + updatedPayment.amount,
    updatedPayment.companyId,
  ]);

  // after update check if company needs to renew
  await makeMonthlyPaymentAndUpdateCompany(updatedPayment.companyId);
  await client.release();
};

export default paymentResult;
