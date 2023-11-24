import pool from "../../db";
import FieldsError from "../../helpers/fieldsError";
import {
  EPaymentStatuses,
  EPaymentTypes,
  mapPaymentsFromDB,
} from "../../mappers/payments";
import crypto from "crypto";
// @ts-ignore
import nodeBase64 from "nodejs-base64-converter";
import { mapCompaniesFromDB } from "../../mappers/comapnies";
import request from "request";
import dotenv from "dotenv";

dotenv.config();

const merchantId = process.env.PAYTR_NUMBER || "";
const merchantKey = process.env.PAYTR_KEY || "";
const merchantSalt = process.env.PAYTR_SALT || "";

const requestPayTr = (url: any, options: any): Promise<string> => {
  return new Promise(function (resolve, reject) {
    request(options, function (error: any, response: any, body: any) {
      if (error) throw new Error(error);
      const res_data = JSON.parse(body);
      if (res_data.status == "success") {
        resolve(res_data.token);
      } else {
        reject(error);
      }
    });
  });
};

const makePayment = async (
  companyId: number,
  amount: number
): Promise<{ token: string }> => {
  const client = await pool.connect();

  if (!companyId) {
    throw new FieldsError("Company ID is required");
  }

  if (!amount) {
    throw new FieldsError("Amount is required");
  }

  const { rows: companiesDB } = await client.query(
    "SELECT * FROM companies WHERE id = $1",
    [companyId]
  );
  const company = mapCompaniesFromDB(companiesDB)[0];

  if (!company?.id) {
    throw new FieldsError("Error while loading company from DB");
  }

  const { rows: createdPaymentsDB } = await client.query(
    `
        INSERT INTO payments 
            (status, amount, company_id, type) 
        VALUES ($1,$2,$3,$4) 
        RETURNING *
    `,
    [EPaymentStatuses.NEW, amount, companyId, EPaymentTypes.DEPOSIT]
  );
  const createdPayment = mapPaymentsFromDB(createdPaymentsDB)[0];

  if (!createdPayment?.id) {
    throw new FieldsError("Error while create payment in DB");
  }
  const basket = JSON.stringify([
    ["Subscription for company ID: " + companyId, amount, 1],
  ]);
  const user_basket = nodeBase64.encode(basket);
  const merchant_oid = createdPayment.id;
  const max_installment = "0";
  const no_installment = "0";
  const user_ip = "1";
  const email = company.email;
  const payment_amount = amount * 100;
  const currency = "TL";
  const test_mode = "1";
  const user_name = company.title;
  const user_address = company.tin;
  const user_phone = "05347908970";
  const merchant_ok_url = "https://server.rests.app/billing/success-payment";
  const merchant_fail_url = "https://server.rests.app/billing/failed-payment";
  const timeout_limit = 30;
  const debug_on = 0;
  const lang = "en";

  const hashSTR = `${merchantId}${user_ip}${merchant_oid}${email}${payment_amount}${user_basket}${no_installment}${max_installment}${currency}${test_mode}`;
  const paytr_token = hashSTR + merchantSalt;
  const token = crypto
    .createHmac("sha256", merchantKey)
    .update(paytr_token)
    .digest("base64");

  const options = {
    method: "POST",
    url: "https://www.paytr.com/odeme/api/get-token",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    formData: {
      merchant_id: merchantId,
      merchant_key: merchantKey,
      merchant_salt: merchantSalt,
      email: email,
      payment_amount: payment_amount,
      merchant_oid: merchant_oid,
      user_name: user_name,
      user_address: user_address,
      user_phone: user_phone,
      merchant_ok_url: merchant_ok_url,
      merchant_fail_url: merchant_fail_url,
      user_basket: user_basket,
      user_ip: user_ip,
      timeout_limit: timeout_limit,
      debug_on: debug_on,
      test_mode: test_mode,
      lang: lang,
      no_installment: no_installment,
      max_installment: max_installment,
      currency: currency,
      paytr_token: token,
    },
  };

  try {
    const token = await requestPayTr(options.url, options);
    return { token };
  } catch (error) {
    throw new FieldsError("Error while try to payment with Pay Tr System");
  } finally {
    await client.release();
  }
};

export default makePayment;
