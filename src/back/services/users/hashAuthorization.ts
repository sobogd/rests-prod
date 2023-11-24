import * as crypto from "crypto";
import * as jose from "jose";
import dotenv from "dotenv";
import FieldsError from "../../helpers/fieldsError";
import { AuthorizationResponse, HashAuthorizationRequest, mapUsersFromDB } from "../../mappers/users";
import pool from "../../db";
import { mapCompaniesFromDB } from "../../mappers/comapnies";
import { mapRatesFromDB } from "../../mappers/rates";

dotenv.config();

const secretKey = crypto.createSecretKey((process.env.TOKEN || "").toString(), "utf-8");

const hashAuthorization = async (request: HashAuthorizationRequest): Promise<AuthorizationResponse> => {
  const client = await pool.connect();

  if (!request.hash) {
    throw new Error("Hash is empty");
  }

  const { payload } = await jose.jwtVerify(request.hash, secretKey);

  if (!payload || !payload.id || !payload.password) {
    throw new Error("Invalid hash");
  }

  const { rows: usersDB } = await client.query(
    `SELECT u.password, u.id, u.login, u.status, u.type, u.name, u.lang, c.login as "companyLogin" FROM users u LEFT JOIN companies c ON c.id = u.company_id WHERE u.status = 'active' AND u.id = $1 AND u.password = $2`,
    [payload.id, payload.password]
  );
  const user = mapUsersFromDB(usersDB)[0];

  const { rows: companiesDB } = await client.query(`SELECT * FROM companies WHERE login = $1`, [
    user?.companyLogin,
  ]);
  const company = mapCompaniesFromDB(companiesDB)[0];

  if (!user?.id || !user?.password) {
    throw new Error("User with this login not found");
  }

  if (!company?.rateId) {
    throw new Error("Rate for company not found");
  }

  const { rows: ratesDB } = await client.query(`SELECT * FROM rates WHERE id = $1`, [company.rateId]);
  const rate = mapRatesFromDB(ratesDB)[0];

  if (!rate?.id) {
    throw new FieldsError("Error while rate is loading");
  }

  await client.release();

  const token = await new jose.SignJWT({
    id: user.id,
    name: user.name,
    login: user.login,
    status: user.status,
    type: user.type,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("12h")
    .sign(secretKey);

  const loginHash = await new jose.SignJWT({
    id: user.id,
    password: user.password,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("365d")
    .sign(secretKey);

  return {
    ...user,
    password: undefined,
    company: {
      ...company,
      rate,
    },
    token,
    loginHash,
  };
};

export default hashAuthorization;
