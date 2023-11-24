import * as crypto from "crypto";
import * as jose from "jose";
import dotenv from "dotenv";
import FieldsError from "../../helpers/fieldsError";
import * as bcrypt from "bcryptjs";
import { AuthorizationRequest, AuthorizationResponse, mapUsersFromDB } from "../../mappers/users";
import pool from "../../db";
import { mapCompaniesFromDB } from "../../mappers/comapnies";
import { mapRatesFromDB } from "../../mappers/rates";

dotenv.config();

const secretKey = crypto.createSecretKey((process.env.TOKEN || "").toString(), "utf-8");

const authorization = async (request: AuthorizationRequest): Promise<AuthorizationResponse> => {
  const client = await pool.connect();

  if (!request.login) {
    throw new FieldsError("Login is empty");
  }

  if (!request.password) {
    throw new FieldsError("Password is empty");
  }

  const loginSplit = request.login.toLowerCase().replaceAll(" ", "").trim().split("-");
  const companyLogin = loginSplit[0];
  const userLogin = loginSplit[1];

  const { rows: usersDB } = await client.query(
    `SELECT u.password, u.id, u.login, u.status, u.type, u.name, u.lang, c.login as "companyLogin" FROM users u LEFT JOIN companies c ON c.id = u.company_id WHERE u.status = 'active' AND c.login = $1 AND u.login = $2`,
    [companyLogin, userLogin]
  );
  const user = mapUsersFromDB(usersDB)[0];

  const { rows: companiesDB } = await client.query(`SELECT * FROM companies WHERE login = $1`, [
    companyLogin,
  ]);
  const company = mapCompaniesFromDB(companiesDB)[0];

  if (!user?.id || !user?.password) {
    throw new FieldsError("User with this login not found");
  }

  if (!company?.rateId) {
    throw new FieldsError("Rate for company not found");
  }

  const { rows: ratesDB } = await client.query(`SELECT * FROM rates WHERE id = $1`, [company.rateId]);
  const rate = mapRatesFromDB(ratesDB)[0];

  if (!rate?.id) {
    throw new FieldsError("Error while rate is loading");
  }

  await client.release();

  const match = await bcrypt.compare(request.password, user.password);

  if (!match) {
    throw new FieldsError("Password is incorrect");
  }

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

export default authorization;
