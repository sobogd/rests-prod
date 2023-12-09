import pool from "../../db";
import { mapRatesFromDB } from "../../mappers/rates";
import { ICompany } from "../../types";

const updateCompanyInfo = async (companyId: number): Promise<ICompany> => {
  const client = await pool.connect();

  if (!companyId) {
    throw new Error("Company ID is required");
  }

  const { rows: companiesDB } = await client.query("SELECT * FROM companies WHERE id = $1 LIMIT 1", [
    companyId,
  ]);
  const company = companiesDB[0];

  if (!company?.id || !company?.rateId) {
    throw new Error("Company or rate not found in DB");
  }

  const { rows: ratesDB } = await client.query("SELECT * FROM rates WHERE id = $1 LIMIT 1", [company.rateId]);
  const rate = mapRatesFromDB(ratesDB)[0];

  if (!rate?.id) {
    throw new Error("Rate for company not found in DB");
  }

  await client.release();

  return {
    ...company,
    rate,
  };
};

export default updateCompanyInfo;
