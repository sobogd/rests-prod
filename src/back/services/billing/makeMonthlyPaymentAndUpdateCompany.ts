import { EPaymentStatuses, EPaymentTypes } from "../../mappers/payments";
import pool from "../../db";
import { DateTime } from "luxon";

const componentName = "makeMonthlyPaymentAndUpdateCompany";
export const makeMonthlyPaymentAndUpdateCompany = async (companyId: number): Promise<boolean> => {
  const client = await pool.connect();

  // get company with peer month rate
  const { rows: companiesWithRatesDB } = await client.query(
    "SELECT c.balance, c.next_payment, c.rate_id, r.per_month FROM companies c LEFT JOIN rates r ON r.id = c.rate_id WHERE c.id = $1 LIMIT 1",
    [companyId]
  );
  const companyWithRates = companiesWithRatesDB?.[0];

  if (
    !companyWithRates?.balance ||
    !companyWithRates?.nextPayment ||
    !companyWithRates?.rateId ||
    !companyWithRates?.perMonth
  ) {
    await client.release();
    throw new Error("error");
  }

  const now = DateTime.fromJSDate(new Date()).toUTC();
  const next = DateTime.fromJSDate(new Date(companyWithRates.nextPayment)).toUTC();
  const nowSec = now.toSeconds();
  const nextSec = next.toSeconds();
  const isDateInThePast = nextSec - nowSec <= 0;

  // return true if all is ok and date in a future
  if (!isDateInThePast) {
    await client.release();
    return true;
  }

  const isNotAvailableForRenew = companyWithRates.balance < companyWithRates.perMonth;

  // if we block company
  if (isNotAvailableForRenew) {
    await client.query("UPDATE companies SET status = $1 WHERE id = $2", ["unpaid", companyId]);

    await client.release();
    return false;
  }

  // make subscription payment
  await client.query(
    `INSERT INTO payments (status, amount, company_id, type) VALUES ($1,$2,$3,$4) RETURNING *`,
    [EPaymentStatuses.PAID, companyWithRates.perMonth, companyId, EPaymentTypes.WITHDRAW]
  );

  // update balance after renew
  await client.query(
    "UPDATE companies SET balance = $1, status = $2, next_payment = timezone('utc'::text, (now() + '1 mon'::interval)) WHERE id = $3",
    [companyWithRates.balance - companyWithRates.perMonth, "active", companyId]
  );

  await client.release();
  return true;
};
