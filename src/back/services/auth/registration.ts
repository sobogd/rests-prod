import pool from "../../db";
import { ECompanyStatuses, IRegistrationRequest, mapCompaniesFromDB } from "../../mappers/comapnies";
import FieldsError from "../../helpers/fieldsError";
import { mapUsersFromDB } from "../../mappers/users";
import * as bcrypt from "bcryptjs";
import { ICompany } from "../../types";

const registration = async (request: IRegistrationRequest): Promise<ICompany> => {
  const client = await pool.connect();

  const { rows: foundedCompaniesDB } = await client.query(
    "SELECT * FROM companies WHERE login = $1 OR email = $2 OR tin = $3",
    [request.login, request.email, request.tin]
  );
  const foundedCompany = mapCompaniesFromDB(foundedCompaniesDB)[0];

  if (foundedCompany != null) {
    if (foundedCompany.email === request.email)
      throw new FieldsError("Company with this email already exist");
    if (foundedCompany.login === request.login)
      throw new FieldsError("Company with this login already exist");
    if (foundedCompany.tin === request.tin) throw new FieldsError("Company with this TIN already exist");
  }

  const utcDate = new Date(new Date().toLocaleString("en-US", { timeZone: "UTC" }));
  const tzDate = new Date(new Date().toLocaleString("en-US", { timeZone: request.timezone }));
  const utcDiff = (tzDate.getTime() - utcDate.getTime()) / 6e4 / 60;

  const { rows: lastRateIds } = await client.query("SELECT id FROM rates ORDER BY id DESC LIMIT 1");
  const lastRateId = lastRateIds?.[0];

  const { rows: createdCompaniesDB } = await client.query(
    `
        INSERT INTO companies 
            (title, login, utc_diff, currency_symbol, timezone, email, lang, tin, balance, status, rate_id) 
        VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11) 
        RETURNING *
    `,
    [
      request.title,
      request.login.toLowerCase().replaceAll(" ", "").trim(),
      utcDiff || 0,
      request.currency,
      request.timezone,
      request.email,
      request.lang,
      request.tin,
      0,
      ECompanyStatuses.ACTIVE,
      lastRateId,
    ]
  );
  const createdCompany = mapCompaniesFromDB(createdCompaniesDB)[0];

  if (!createdCompany?.id) {
    throw new FieldsError("Error while creating company");
  }

  const userPassword = await bcrypt.hash(request.password, 13);

  const { rows: createdUsersDB } = await client.query(
    "INSERT INTO users (name, login, password, type, company_id, status) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *",
    ["Administrator", "admin", userPassword, "admin", createdCompany.id, "active"]
  );
  const createdUser = mapUsersFromDB(createdUsersDB)[0];

  if (!createdUser?.id) {
    throw new FieldsError("Error while creating administrator for company");
  }

  await client.release();

  return createdCompany;
};

export default registration;
